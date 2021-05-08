<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

include 'database-connection.php';

global $conn;

session_start();

if($_SESSION['id'] === '1'){
    $id = file_get_contents("php://input");
    $deleteQuery = "DELETE FROM books WHERE id='$id'";

    if ($deleteMysqliResult = mysqli_query($conn, $deleteQuery)) {
        echo json_encode("Successfully deleted book with id $id");
    }
}else{
    echo json_encode("Only administrators can delete!");
}
