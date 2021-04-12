<?php
  $connection = new mysqli("localhost", "root", "", "name_drop");

  $result = $connection->query("Select * from users where name ='" . strtolower(trim($_GET['name'])) . "'");

  if($result && $result = $result->fetch_assoc()) {
    echo "{";
    echo '"name":"' . $result['name'] . '",';
    echo '"bday":"' . ($result['birthday'] != null ? $result['birthday'] : "") . '",';
    echo '"gender":"' . ($result['gender'] != null ? $result['gender'] : "") . '",';
    echo '"weight":' . ($result['weight'] == null ? '""' : $result['weight']) . ',';
    echo '"height":' . ($result['height'] == null ? '""' : $result['height']) . ',';
    echo '"avatar":"' . ($result['avatar'] != null ? $result['avatar'] : "Default") . '"}';
  }
  else {
    echo "Empty";
  }

  $connection->close();
?>
