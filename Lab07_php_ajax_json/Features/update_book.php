<?php

include '../database-connection.php';

global $conn;

session_start();

if ($_SERVER['REQUEST_METHOD']=='POST') { // if the login is found in the post array (from a login request)
    if($_SESSION['id'] === '1'){
        $id = $_POST['id'];
        $comment = $_POST['comment'];

        $updateQuery = "UPDATE books SET comment='$comment' WHERE id='$id'";
        if($updateMysqliResult = mysqli_query($conn, $updateQuery)){
            echo "Successfully updated";
        }else{
            echo "Failed deleting from the database";
        }
    }else{
        echo "Only administrators can update!";
    }

}