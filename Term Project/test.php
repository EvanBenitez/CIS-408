<?php
  $connection = new mysqli("localhost", "root", "", "name_drop");

  $result = $connection->query("Select * from emoji_posts where id = 18");

  //echo $result;
  if($result && $result = $result->fetch_assoc()) {
    echo $result['text'];
  }
  $connection->close();
 ?>
