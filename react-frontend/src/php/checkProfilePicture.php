<?php
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the request body as JSON
    $data = json_decode(file_get_contents("php://input"));

    // Check if the required data is present
    if (isset($data->username)) {
        // Assuming you have a database connection
        // Replace the following with your actual database connection code
        $servername = "localhost";
        $username = "root";
        $password = "b59]UY]jp9@ASDac";
        $dbname = "login";

        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Check if the user has a profile picture in the database
            $stmt = $conn->prepare("SELECT profile_pictures.filename, profile_pictures.filetype FROM users 
                                   JOIN profile_pictures ON users.id = profile_pictures.userid 
                                   WHERE users.username = :username");
            $stmt->bindParam(':username', $data->username);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                // Return profile picture information if found
                $response = array(
                    'success' => true,
                    'filename' => $result['filename'],
                    'fileType' => $result['filetype']
                );
            } else {
                // Return success false if no profile picture found
                $response = array('success' => false);
            }

            echo json_encode($response);
        } catch (PDOException $e) {
            // Handle database connection errors
            $response = array('success' => false, 'error' => $e->getMessage());
            echo json_encode($response);
        } finally {
            $conn = null;
        }
    } else {
        // Return an error if required data is not present
        $response = array('success' => false, 'error' => 'Invalid request data');
        echo json_encode($response);
    }
} else {
    // Return an error for unsupported request methods
    $response = array('success' => false, 'error' => 'Unsupported request method');
    echo json_encode($response);
}
?>

