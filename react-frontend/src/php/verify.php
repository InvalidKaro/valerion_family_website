<?php
// Verify.php

// Retrieve the verification token from the query parameters
$verificationToken = $_GET['token'];

$servername = "localhost:3306";
$username = "root";
$password = "b59]UY]jp9@ASDac";
$dbname = "login";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query the database to find a user with the matching verification token
$stmt = $conn->prepare("SELECT * FROM users WHERE verification_token = ?");
$stmt->bind_param("s", $verificationToken);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 1) {
    // A user with the matching verification token is found
    // Update the 'verified' column to '1' to mark them as verified
    $updateStmt = $conn->prepare("UPDATE users SET verified = 1 WHERE verification_token = ?");
    $updateStmt->bind_param("s", $verificationToken);
    $updateStmt->execute();
    $updateStmt->close();

    // Provide feedback to the user
    echo "Account verified successfully.";
} else {
    // No user with the matching verification token is found
    // Provide feedback to the user
    echo "Invalid verification token.";
}

$stmt->close();
$conn->close();
?>