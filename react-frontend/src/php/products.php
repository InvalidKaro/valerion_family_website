<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'db.inc.php';

// Replace with your database credentials
$conn = get_db_connection();


$sql = "SELECT * FROM products";
$result = $conn->query($sql);

$products = [];

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $product = [
      'id' => $row['id'],
      'pictureUrl' => $row['picture_url'],
      'title' => $row['title'],
      'price' => $row['price'],
      'author' => $row['author']
    ];
  }
}

$conn->close();

echo json_encode($product);
?>