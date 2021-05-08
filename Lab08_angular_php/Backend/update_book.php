<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

include 'database-connection.php';

global $conn;

session_start();

//if($_SESSION['id'] === '1'){
    $book = json_decode(file_get_contents("php://input"), true);
    $id = $book['id'];
    $comment = $book['comment'];

    $updateQuery = "UPDATE books SET comment='$comment' WHERE id='$id'";
    if($updateMysqliResult = mysqli_query($conn, $updateQuery)){
        echo json_encode("Successfully updated");
    }
//}else{
//    echo "Only administrators can update!";
//}
