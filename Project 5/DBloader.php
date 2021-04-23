<?php
  $xmlFile = simplexml_load_file("cd_catalog.xml") or die("Unable to open file");

  $connection = new mysqli("localhost", "root", "", "CD_DB");
  $result = $connection->query("Create table CD (Title varchar(50), Artist varchar(50),
                              Country varchar(50), Company varchar(50), Price decimal(4,2), Year int)");
  foreach($xmlFile as $cd) {
    $connection->query("Insert into CD Values ('$cd->TITLE', '$cd->ARTIST', '$cd->COUNTRY', '$cd->COMPANY', $cd->PRICE, $cd->YEAR)");
  }

  $connection->close();
  echo "Done " . time();
?>
