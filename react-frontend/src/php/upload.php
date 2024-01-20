<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');


$json_data = file_get_contents('php://input');
error_log("Received JSON data: $json_data");
$data = json_decode($json_data, true);
print($data);

$servername = "localhost";
$username = "root";
$password = "b59]UY]jp9@ASDac";
$dbname = "art";
$uploadDirectory = "Art/"; // Directory to store the uploaded profile pictures

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the form data
    $image = $_FILES['image'];
    $prize = $_POST['prize'];
    $username = $_POST['username'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $category = $_POST['category'];

    // Check if the user exists
   

        // Generate a unique filename for the uploaded image
        $newFilename = uniqid() . '_' . $image['name'];
        $destination = $uploadDirectory . $newFilename;

        // Move the uploaded file to the specified destination
        if (move_uploaded_file($image['tmp_name'], $destination)) {
            // Insert a new record into the database
            $insertStmt = $conn->prepare("INSERT INTO products (author, picture_url, price, title, descr, category) VALUES (?, ?, ?, ?, ?, ?)");
            $insertStmt->bind_param("sissss", $username, $newFilename, $prize, $title, $description, $category);
            $insertStmt->execute();

            if ($insertStmt->affected_rows > 0) {
                $response = [
                    'success' => true,
                    'message' => 'Artwork uploaded successfully',
                    'filename' => $newFilename,
                    'url' => 'Art/' . $newFilename
                ];
            } else {
                // Delete the uploaded file if the database insertion fails
                unlink($destination);

                $response = [
                    'success' => false,
                    'message' => 'Failed to upload artwork to the database',
                ];
            }

            $insertStmt->close();
        } else {
            $response = [
                'success' => false,
                'message' => 'Failed to move the uploaded file',
            ];
        }
    } else {
        $response = [
            'success' => false,
            'message' => 'User does not exist',
        ];
    }

    $insertStmt->close();
    $conn->close();

echo json_encode($response);