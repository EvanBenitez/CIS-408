<?php
  $connection = new mysqli("localhost", "root", "", "name_drop");

  $result = $connection->query("Select password from users where name ='" . strtolower(trim($_POST['name'])) . "'");

  if($result && $result = $result->fetch_assoc()) {
    if($result['password'] == $_POST['password']) {
      $result = $connection->query("Select time, text from emoji_posts where name='" . strtolower(trim($_POST['name'])) . "'"
          . "Order By time Desc");
      if($result->num_rows > 0){
        while($post = $result->fetch_assoc()) {
          echo "<div class='emoji'><table><tr><td>$post[time]</td><td>$post[text]</td></tr></table></div>";
        }
      }
      else{
        echo "none";
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
