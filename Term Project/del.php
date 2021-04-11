<?php
  $connection = new mysqli("localhost", "root", "", "name_drop");
  $auth;

  $result = $connection->query("Select password from users where name ='" . strtolower(trim($_POST['name'])) . "'");

  if($result && $result = $result->fetch_assoc()) {
    if($result['password'] == $_POST['password']) {
      $auth = true;
    }
    else {
      echo -1;
    }

  }
  else {
    echo -1;
  }

  if($auth){
    $result = $connection->query("Delete from followers where user ='" . strtolower(trim($_POST['follow'])) . "' and follower='" . strtolower(trim($_POST['name'])) . "'");
    
    if($result){
      echo $result;
    }
    else {
      echo 0; // user doesn't exist
    }
  }
  $connection->close();
 ?>
