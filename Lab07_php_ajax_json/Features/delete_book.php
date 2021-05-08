<?php

include '../database-connection.php';

global $conn;

session_start();

if ($_SERVER['REQUEST_METHOD']=='POST') { // if the login is found in the post array (from a login request)
    if($_SESSION['id'] === '1'){
        $id = $_POST['id'];

        $deleteQuery = "DELETE FROM books WHERE id='$id'";

        if ($deleteMysqliResult = mysqli_query($conn, $deleteQuery)) {
            echo "Successfully deleted";
        } else {
            echo "Failed deleting from the database";
        }
    }else{
        echo "Only administrators can delete!";
    }

}
