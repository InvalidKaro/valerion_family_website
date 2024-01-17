<?php
// Connect to your database

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "b59]UY]jp9@ASDac";
$dbname = "login";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// Fetch data from the login table and profile_pictures table
$sql = "SELECT author, review, stars, CONCAT('http://localhost:80/profile_pictures/', profile_pictures.filename) AS filename
        FROM reviews
        INNER JOIN profile_pictures ON author = profile_pictures.username";

$result = $conn->query($sql);

$reviews = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $review = [
            "author" => $row["author"],
            "text" => $row["review"],
            "stars" => $row["stars"],
            "profile_img" => $row["filename"] // Remove backslashes from the filename
        ];
        array_push($reviews, $review);
    }
}

// Return the reviews data as JSON
header("Content-Type: application/json");
echo json_encode($reviews);

$conn->close();
?>