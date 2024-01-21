<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type");

// Connect to the database
$servername = "localhost";
$username = "root";
$password = "b59]UY]jp9@ASDac";
$dbname = "login";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve Data
$reviewData = json_decode(file_get_contents('php://input'), true);

// Check if there is already a review for the author
$existingReviewStmt = $conn->prepare("SELECT * FROM reviews WHERE author = ?");
$existingReviewStmt->bind_param("s", $reviewData['author']);
$existingReviewStmt->execute();
$result = $existingReviewStmt->get_result();
$existingReview = $result->fetch_assoc();

if ($existingReview) {
    // If an existing review exists, update it
    $updateStmt = $conn->prepare("UPDATE reviews SET stars = ?, review = ? WHERE author = ?");
    $updateStmt->bind_param("iss", $reviewData['rating'], $reviewData['text'], $reviewData['author']);
    
    if ($updateStmt->execute()) {
        // Successful update
        $response = array('status' => 'success', 'message' => 'Review updated successfully');
        echo json_encode($response);
    } else {
        // Failed update
        $response = array('status' => 'error', 'message' => 'Error updating review');
        echo json_encode($response);
    }
} else {
    // If no existing review exists, insert a new one
    $insertStmt = $conn->prepare("INSERT INTO reviews (stars, review, author) VALUES (?, ?, ?)");
    $insertStmt->bind_param("iss", $reviewData['stars'], $reviewData['text'], $reviewData['author']);
    if ($insertStmt->execute()) {
        // Successful insertion
        $response = array('status' => 'success', 'message' => 'Review inserted successfully');
        echo json_encode($response);
    } else {
        // Failed insertion
        $response = array('status' => 'error', 'message' => 'Error inserting review');
        echo json_encode($response);
    }
}

// Close the statements and the database connection
$existingReviewStmt->close();
$updateStmt->close();
$insertStmt->close();
$conn->close();

?>