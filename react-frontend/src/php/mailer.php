<?php

function sendEmail($to, $subject, $message) {
    // Replace the following lines with your actual mail sending logic
    $headers = 'From: your_email@example.com' . "\r\n" .
        'Reply-To: your_email@example.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    return mail($to, $subject, $message, $headers);
}
?>
