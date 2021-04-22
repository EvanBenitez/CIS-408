<?php
class profile {
  public $user_name;
  public $pw;
  public $bday;
  public $gender;
  public $weight;
  public $height;
  public $pic;
  public $errors = array();

  function __construct() {
    $this->user_name = strtolower(trim($_POST['user']));
    $this->pw = $_POST['password'];
    $this->bday = $_POST['birth_date']  == "" ? null : $_POST['birth_date'];
    $this->gender = $_POST['gender']  == "" ? null : $_POST['gender'];
    $this->weight = $_POST['weight']  == "" ? null : $_POST['weight'];
    $this->height = $_POST['height']  == "" ? null : $_POST['height'];
    // check for valide picture
    $name = $_FILES['pic']['name'];
    $end = explode('.', $name);
    $file_type = strtolower(end($end));
    $ext = array("jpg","jpeg","gif","png");
    if($_FILES['pic']['name'] != ""){
      if(in_array($file_type, $ext)) {
        $max = 1024*1024;
        if($_FILES['pic']['size'] <= $max) {
          $this->pic = $_FILES['pic'];
        }
        else {
          $this->errors[] = "File must not exceed 2mb";
        }
      }
      else {
        $this->errors[] = "invalid file type";
        $this->pic = null;
      }
    }
    else {
      $this->pic = null;
    }
  }
}

class db_adder {
  static function add($profile) {
    $host = "localhost";
    $user_name = "root";
    $password = "";
    $db = "name_drop";
    $pic_name = null;

    $connection = new mysqli($host, $user_name, $password, $db);


    //construct query strings
    $into = "Insert Into users (name, password";
    $values = "Values ('$profile->user_name', '$profile->pw'";
    if($profile->bday != null) {
      $into = $into . ", birthday";
      $values = $values . ",'$profile->bday'";
    }
    if($profile->gender != null) {
      $into = $into . ", gender";
      $values = $values . ",'$profile->gender'";
    }
    if($profile->weight != null) {
      $into = $into . ", weight";
      $values = $values . ",$profile->weight";
    }
    if($profile->height != null){
      $into = $into . ", height";
      $values = $values . ",$profile->height";
    }

    if($profile->pic != null){
      $into = $into . ", avatar";

      $pic_name = strtolower($profile->user_name);

      $values = $values . ",'$pic_name'";
    }
    $into = $into . ") ";
    $values = $values . ")";

    $result = $connection->query($into . $values);

    if($result && $profile->pic != null)
      move_uploaded_file($profile->pic['tmp_name'],"Avatars/".$pic_name);

    $connection->close();

    return $result;
  }
}

$pro = new profile();
$html = '<?xml version="1.0" encoding="UTF-8"?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1/EN"
"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Name Drop</title>
  <link type="text/css" href="style.css" rel="stylesheet" />
</head>

<body>';

if(trim($pro->user_name) != "" && $pro->pw != ""){
  if(count($pro->errors) == 0) {
    if(db_adder::add($pro) != false){
      $html = $html . "<center><h2>Profile successfully created!</h2></center>";
      $html = $html . "<center><h3><a href='feed.html'>Go to FEED</a></h3></center>";
      //Potentual issue here
      $html = $html . "<script>sessionStorage.setItem('user_id','$pro->user_name');
                        sessionStorage.setItem('password','$pro->pw');</script>";
    }
    else {
      $html = $html . "<center><h3>User name taken</h3></center>";
      $html = $html . "<center><a href='new_account.html'>Return to account creation</a></center>";
    }
  }
  else {
    $html = $html . "<center><h3>" . $pro->errors[0] . "</h3></center>";
    $html = $html . "<center><a href='new_account.html'>Return to account creation</a></center>";
  }
}
else {
  $html = $html . "<center><h3>New accounts must include user name and password</h3></center>";
  $html = $html . "<center><a href='new_account.html'>Return to account creation</a></center>";
}

$html = $html . "</body></html>";
echo $html;
?>
