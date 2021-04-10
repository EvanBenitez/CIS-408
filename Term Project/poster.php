<?php
  $connection = new mysqli("localhost", "root", "", "name_drop");

  $result = $connection->query("Select password from users where name ='" . strtolower(trim($_POST['name'])) . "'");

  if($result && $result = $result->fetch_assoc()){
    if($result['password'] == $_POST['password']){
      $query = $connection->query("Insert into emoji_posts (time, name, text)
            Values (CURRENT_TIMESTAMP(), '$_POST[name]', '$_POST[text]')");
      echo $_POST['text'];
    }
    else {
      echo false;
    }
  }
  else {
    echo false;
  }
  $connection->close();
 ?>
