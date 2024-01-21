<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "b59]UY]jp9@ASDac";
$dbname = "login";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['username'])) {
  $username = $_GET['username'];

  // Retrieve user ID for the specified username
  $userIdQuery = "SELECT user_id FROM users WHERE username = ?";
  $userIdStmt = $conn->prepare($userIdQuery);
  $userIdStmt->bind_param("s", $username);
  $userIdStmt->execute();
  $userIdResult = $userIdStmt->get_result();

  if ($userIdResult->num_rows > 0) {
    $userIdRow = $userIdResult->fetch_assoc();
    $userId = $userIdRow['user_id'];

    // Retrieve user reviews data for the matched user ID
    $query = "SELECT * FROM user_reviews WHERE user_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
      $userReviews = array();
      while ($row = $result->fetch_assoc()) {
        $userReviews[] = $row;
      }
      echo json_encode($userReviews);
    } else {
      echo "No user reviews found for the specified user";
    }
  } else {
    echo "User not found";
  }
} else {
  echo "Username parameter is missing";
}

$conn->close();
?>