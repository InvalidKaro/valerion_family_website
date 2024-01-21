<?php
// userRole.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
// Replace this with your actual database connection logic

$servername = "localhost";
$username = "root";
$password = "b59]UY]jp9@ASDac";
$dbname = "login";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Assuming you have the user's ID available, replace '123' with the actual user ID
$username = $_GET['username'];

// Fetch the user's role from the database
$sql = "SELECT roles.role_name
        FROM user_roles
        INNER JOIN roles ON user_roles.role_id = roles.role_id
        WHERE user_roles.user_id = (
          SELECT user_id FROM users WHERE username = '$username'
        )";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // Output data of each row
  $row = $result->fetch_assoc();
  $userRole = $row["role_name"];
  echo json_encode($userRole);
} else {
  echo json_encode(null); // Return null if the user's role is not found
}

$conn->close();
?>