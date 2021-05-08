<?php

include 'C:\xampp\htdocs\Assignment7\database-connection.php';

global $conn;

session_start(); // set a custom session for the user

if ($_SERVER['REQUEST_METHOD']=='POST') { // if the login is found in the post array (from a login request)
    $username = $_POST['username'];;
    $selectQuery = "SELECT * FROM users WHERE username='$username' LIMIT 1";
    $selectResult = $conn->query($selectQuery);
    if ($selectResult) {

        $selectUserResult = mysqli_fetch_row($selectResult);
        $isUserAdmin = $selectUserResult[1];  // 1 - admin | 0 - normal user
        $usernameFromDatabase = $selectUserResult[0];  // storing the username

        if ($username == $usernameFromDatabase) {  // we find a match in the database
            $_SESSION['username'] = $username;
            $_SESSION['id'] = $isUserAdmin;
//            echo 'bb';
            header('Location: ../home.html');
        }
    }
}
