<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Replace with your database credentials
$servername = "localhost";
$username = "root";
$password = "b59]UY]jp9@ASDac";
$dbname = "art";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM products";
$result = $conn->query($sql);

$products = [];

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $products[] = [
      'id' => $row['id'],
      'pictureUrl' => $row['picture_url'],
      'title' => $row['title'],
      'price' => $row['price'],
      'author' => $row['author']
    ];
  }
}

$conn->close();

echo json_encode($products);
?>