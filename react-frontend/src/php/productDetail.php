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

$id = $_GET['id']; // Assuming you pass the id as a query parameter

$sql = "SELECT * FROM products WHERE id = $id";
$result = $conn->query($sql);

$product = null;

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $product = [
    'id' => $row['id'],
    'pictureUrl' => $row['picture_url'],
    'title' => $row['title'],
    'price' => $row['price'],
    'author' => $row['author'],
    'description' => $row['description']
  ];
}

$conn->close();

echo json_encode($product);
?>