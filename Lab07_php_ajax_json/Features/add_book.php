<?php

include '../database-connection.php';

global $conn;

if ($_SERVER['REQUEST_METHOD']=='POST') { // if the login is found in the post array (from a login request)
    $author = $_POST['author'];
    $title = $_POST['title'];
    $comment = $_POST['comment'];
    $date = $_POST['date'];

    $insertQuery = "INSERT INTO books (author, title, comment, date) VALUES('$author','$title','$comment','$date')";
    if($insertMysqliResult = mysqli_query($conn, $insertQuery)){
        echo "Successfully added";
    }else{
        echo "Failed adding into the database";
    }
}