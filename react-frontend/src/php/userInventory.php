<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "b59]UY]jp9@ASDac";
$dbname = "art";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['username'])) {
  $username = $_GET['username'];

  // Retrieve product data for the specified author
  $stmt = $conn->prepare("SELECT * FROM products WHERE author = ?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $result = $stmt->get_result();

  $products = array();
  while ($row = $result->fetch_assoc()) {
    $products[] = $row;
  }

  echo json_encode($products);
} else {
  echo "Username parameter is missing";
}

$conn->close();
?>