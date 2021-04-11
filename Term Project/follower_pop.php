<?php
  $connection = new mysqli("localhost", "root", "", "name_drop");

  $result = $connection->query("Select password from users where name ='" . strtolower(trim($_POST['name'])) . "'");

  if($result && $result = $result->fetch_assoc()) {
    if($result['password'] == $_POST['password']) {
      $list = $connection->query("Select user from followers where follower ='" . strtolower(trim($_POST['name'])) . "'");
      if($list->num_rows > 0){
        while($user = $list->fetch_assoc()) {
            echo "<option value='$user[user]'>$user[user]</option>";
        }
      }
      else {
        echo "Nobody";
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
