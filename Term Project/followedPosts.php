<?php // return all the post of people being followed
  $connection = new mysqli("localhost", "root", "", "name_drop");

  $result = $connection->query("Select password from users where name ='" . strtolower(trim($_POST['name'])) . "'");

  if($result && $result = $result->fetch_assoc()) {
    if($result['password'] == $_POST['password']) {
      $followed = $connection->query("Select user from followers where follower='" . strtolower(trim($_POST['name'])) . "'");
      if($followed->num_rows > 0) {
        $query_names = "'" . strtolower(trim($_POST['name'])) . "'";
        while($poster = $followed->fetch_assoc()) {
          $query_names = $query_names . " or name= '$poster[user]'";
        }
        // get Avatars
        $pics = array();
        $avatars = $connection->query("Select name, avatar from users where name=$query_names");
        if($avatars->num_rows > 0) {
          while($av = $avatars->fetch_assoc()) {
            $pics[$av['name']] = $av['avatar'];
          }
        }

        $main_query = "Select time, name, text from emoji_posts where name=$query_names Order By time DESC";
        $posts = $connection->query($main_query);
        if($posts->num_rows > 0) {
          // not difference between $post and #postS
          while($post = $posts->fetch_assoc()) {
            if($pics[$post['name']] != null){
              $table = "<table><tr><td><img src='Avatars/" . $pics[$post['name']] . "' /></td></tr><tr><td>$post[name]</td></tr></table>";
            }
            else {
              $table  = "<table><tr><td><img src='Avatars/Default' /></td></tr><tr><td>$post[name]</td></tr></table>";
            }
            echo "<div onclick=profile_picker('$post[name]')>";
            echo "<div class='emoji'><table><tr><td>$table</td><td>$post[time]</td><td>$post[text]</td></tr></table></div>";
            echo "</div>";
          }
        }
        else {
        echo "none";
        }
      }
      else {

        //not following anyone option
        $avatar = $connection->query("Select avatar from users where name='$_POST[name]'");
        if($avatar->num_rows > 0) {
          $avatar = $avatar->fetch_assoc()['avatar'];
        }
        if($avatar == null){
          $avatar = "Default";
        }

        $main_query = "Select time, name, text from emoji_posts where name='$_POST[name]' Order By time DESC";
        $posts = $connection->query($main_query);
        if($posts->num_rows > 0) {
          // not difference between $post and #postS
          while($post = $posts->fetch_assoc()) {
            $table = "<table><tr><td><img src='Avatars/" . $avatar . "' /></td></tr><tr><td>$post[name]</td></tr></table>";
            echo "<div onclick=profile_picker('$post[name]')>";
            echo "<div class='emoji'><table><tr><td>$table</td><td>$post[time]</td><td>$post[text]</td></tr></table></div>";
            echo "</div>";
          }
        }
        else {
          echo "none";
        }
      }
    }
    else {
      echo false;
    }
  }
  else {
    echo false;
}
 ?>
