<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

include 'database-connection.php';

global $conn;

$book = json_decode(file_get_contents("php://input"), true);
$author = $book['author'];
$title = $book['title'];
$comment = $book['comment'];
$date = $book['date'];

$insertQuery = "INSERT INTO books (author, title, comment, date) VALUES('$author','$title','$comment','$date')";
if($insertMysqliResult = mysqli_query($conn, $insertQuery)){
    echo json_encode($book);
}

