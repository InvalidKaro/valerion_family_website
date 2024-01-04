<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

// Get the JSON input from the client
$json = file_get_contents('php://input');
$data = json_decode($json, true); // Decode JSON data into an associative array

// Establish a connection to your database
$servername = "localhost:3306";
$username = "root";
$password = "b59]UY]jp9@ASDac";
$dbname = "login";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
error_log(print_r($data, true));
// Assuming you have a 'users' table with columns 'username' and 'password'
$username = $data['username'];
$password = $data['password'];
$mail = $data['mail'];

// Hash the password before storing it in the database
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Use prepared statements to prevent SQL injection
$stmt = $conn->prepare("INSERT INTO users (mail, username, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $hashedPassword, $mail);

$response = []; // Initialize a response array

if ($stmt->execute()) {
    $response['success'] = true;
    $response['message'] = 'User registered successfully';
} else {
    $response['success'] = false;
    $response['message'] = 'Error registering user';
}

// Output the JSON response
echo json_encode($response);

$stmt->close();
$conn->close();
?>
