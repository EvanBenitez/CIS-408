<?php
  $connection = new mysqli("localhost", "root", "", "CD_DB");
  if($connection->connect_error) {
    die("connection failed");
  }
  $query_string = "Select * from CD where " . $_GET['type'] . "='" . $_GET['search'] . "'";
  $results = $connection->query($query_string);
  if($results->num_rows > 0){
    $first = 1;
    echo '{"CD":[';
    while($row = $results->fetch_assoc()) {
      if($first == 0)
        echo ",";
      echo '{"TITLE":"' . $row['Title'] . '",';
      echo '"ARTIST":"' . $row['Artist'] . '",';
      echo '"COUNTRY":"' . $row['Country'] . '",';
      echo '"COMPANY":"' . $row['Company'] . '",';
      echo '"PRICE":' . $row['Price'] . ',';
      echo '"YEAR":' . $row['Year'] . '}';
      $first = 0;
    }
    echo "]}";
  }
  else {
    echo '{"CD":[]}';
  }
  $connection->close();
?>
