<?php

function get_db_connection() {
    include_once("_var.php");
    $dbname = "login";

    // Create database connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}