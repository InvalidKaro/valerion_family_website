// register.php

<?php
// Establish a connection to your database
$servername = "localhost";
$username = "root";
$password = "b59]UY]jp9@ASDac";
$dbname = "login";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Assuming you have a 'users' table with columns 'username' and 'password'
$username = $_POST['username'];
$password = $_POST['password'];

// Hash the password before storing it in the database
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (username, password) VALUES ('$username', '$hashedPassword')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true, 'message' => 'User registered successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error registering user']);
}

$conn->close();
?>
