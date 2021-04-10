<?php
  $emoji = fopen("processed-emoji.txt", "r") or die("Unable to retrieve emoji");

  while(!feof($emoji)) {
    echo '<a class="scroll" onclick="emojiSelect(event)">';
    echo '&#x' . fgets($emoji);
    echo '</a>';
  }

  fclose($emoji);
 ?>
