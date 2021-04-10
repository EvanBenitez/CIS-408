<?php
  $connection = new mysqli("localhost", "root", "", "name_drop");

  $result = $connection->query("Select name from users where name ='" . strtolower(trim($_GET['follow'])) . "'");

  if($result && $result = $result->fetch_assoc()){
    if($_GET['name'] == $result['name']){
      echo -1; // can't follow self
    }
    else{
      $present = $connection->query("Select 1 from followers where user ='" . $result['name'] . "' and follower='" . $_GET['name'] . "'");
      $present = $present->fetch_array();
      if($present){
        echo $present; // already following
      }
      else{
        echo $connection->query("Insert into followers (user, follower) Values ('$result[name]', '$_GET[name]')");
      }
    }
  }
  else {
    echo 0; // user doesn't exist
  }
  $connection->close();
 ?>
