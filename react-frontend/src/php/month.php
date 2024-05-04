<?php
// monthly.php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
// Connect to the database
include_once("_var.php");
$dbname = "art";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Query the database to retrieve data from the table
$sql = "SELECT * FROM monthly";
$result = $conn->query($sql);

// Check if records were found
if ($result->num_rows > 0) {
  // Fetch the data and store it in an array
  $data = [];
  while ($row = $result->fetch_assoc()) {
    $data[] = $row;
  }

  // Return the data as JSON
  header('Content-Type: application/json');
  echo json_encode($data);
} else {
  // No records found
  echo "No data found in the table";
}

// Close the database connection
$conn->close();
?>