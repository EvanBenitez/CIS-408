<?php
  $connection = new mysqli("localhost", "root", "", "name_drop");

  $result = $connection->query("Select password, avatar from users where name ='" . strtolower(trim($_POST['name'])) . "'");

  if($result && $result = $result->fetch_assoc()) {
    if($result['password'] == $_POST['password']) {
      if($result['avatar'] == null)
        echo "Default";
      else
        echo $result['avatar'];
    }
    else {
      echo false;
    }

  }
  else {
    echo false;
}
 ?>
