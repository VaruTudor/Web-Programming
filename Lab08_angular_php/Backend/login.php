<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

include 'database-connection.php';

global $conn;

session_start(); // set a custom session for the user

// $username = json_decode(file_get_contents("php://input")); - use this if u send an object
$username = file_get_contents("php://input");
$selectQuery = "SELECT * FROM users WHERE username='$username' LIMIT 1";
$selectResult = $conn->query($selectQuery);
if ($selectResult) {

    $selectUserResult = mysqli_fetch_row($selectResult);
    $isUserAdmin = $selectUserResult[1];  // 1 - admin | 0 - normal user
    $usernameFromDatabase = $selectUserResult[0];  // storing the username

    if ($username == $usernameFromDatabase) {  // we find a match in the database
      echo json_encode($username);
        $_SESSION['username'] = $username;
        $_SESSION['id'] = $isUserAdmin;
    }
    // if no match an error will be received
}
