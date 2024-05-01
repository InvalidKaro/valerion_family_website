<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once("_var.php");
$dbname = "login";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['username'])) {
  $username = $_GET['username'];

  // Retrieve user information
  $user_stmt = $conn->prepare("SELECT username, DATE_FORMAT(registration_date, '%d/%m/%Y') AS formatted_registration_date FROM users WHERE username = ?");
  $user_stmt->bind_param("s", $username);
  $user_stmt->execute();
  $user_result = $user_stmt->get_result();

  if ($user_result->num_rows > 0) {
    $user = $user_result->fetch_assoc();

    // Retrieve roles based on the username
    $roles_stmt = $conn->prepare("
      SELECT r.role_name
      FROM user_roles ur
      JOIN roles r ON ur.role_id = r.role_id
      JOIN users u ON ur.user_id = u.user_id
      WHERE u.username = ?
    ");
    $roles_stmt->bind_param("s", $username);
    $roles_stmt->execute();
    $roles_result = $roles_stmt->get_result();

    if ($roles_result->num_rows > 0) {
      $roles = array();
      while ($row = $roles_result->fetch_assoc()) {
        $roles[] = $row['role_name'];
      }
      $user['roles'] = $roles;
    } else {
      $user['roles'] = "No roles found for the user";
    }

    $roles_stmt->close();

    // Retrieve user badge information based on the provided username
    $badge_stmt = $conn->prepare("
      SELECT b.name, b.image_url
      FROM user_badges ub
      JOIN badges b ON ub.badge_id = b.id
      JOIN users u ON ub.user_id = u.user_id
      WHERE u.username = ?
    ");
    $badge_stmt->bind_param("s", $username);
    $badge_stmt->execute();
    $badge_result = $badge_stmt->get_result();

    if ($badge_result->num_rows > 0) {
        $badges = array();
        while ($row = $badge_result->fetch_assoc()) {
          $badge = array(
            'name' => $row['name'],
            'url' => $row['image_url']
          );
          $badges[] = $badge;
        }
        $user['badges'] = $badges;    
      } else {
        $user['badges'] = "No badges found for the user";
      }

    $badge_stmt->close();
  } else {
    echo "No user found";
  }

  $user_stmt->close();

  // Retrieve profile picture information based on the provided username
  $stmt = $conn->prepare("SELECT profile_pictures.filename, profile_pictures.filetype FROM users 
                          JOIN profile_pictures ON users.user_id = profile_pictures.userid 
                          WHERE users.username = ?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows > 0) {
    $profile_picture = $result->fetch_assoc();
    $user['profile_picture'] = $profile_picture;
  } else {
    $user['profile_picture'] = "No profile picture found for the user";
  }

  echo json_encode($user);
} else {
  echo "Username parameter is missing";
}

$conn->close();
?>