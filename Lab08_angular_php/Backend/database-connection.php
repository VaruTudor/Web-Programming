<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "guest_books";

$conn = mysqli_connect(
  $servername,
  $username,
  $password,
  $dbname
);

if($conn->connect_error){
    die("Connection to the database failed" . $conn->connect_error);
}

