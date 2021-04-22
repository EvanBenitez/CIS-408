<?php // Add user to the follower list
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
    $result = $connection->query("Select name from users where name ='" . strtolower(trim($_POST['follow'])) . "'");

    if($result && $result = $result->fetch_assoc()){
      if($_POST['name'] == $result['name']){
        echo -1; // can't follow self
      }
      else{
        $present = $connection->query("Select 1 from followers where user ='" . $result['name'] . "' and follower='" . $_POST['name'] . "'");
        $present = $present->fetch_array();
        if($present){
          echo $present; // already following
        }
        else{
          echo $connection->query("Insert into followers (user, follower) Values ('$result[name]', '$_POST[name]')");
        }
      }
    }
    else {
      echo 0; // user doesn't exist
    }
  }
  $connection->close();
 ?>
