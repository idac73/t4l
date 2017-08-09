<?php
  /**
   * Sets error header and json error message response.
   *
   * @param  String $messsage error message of response
   * @return void
   */
  function errorResponse ($messsage) {
    header('HTTP/1.1 500 Internal Server Error');
    die(json_encode(array('message' => $messsage)));
  }

  /**
   * Pulls posted values for all fields in $fields_req array.
   * If a required field does not have a value, an error response is given.
   */
  function constructMessageBody () {
    $fields_req =  array("name" => true, "email" => true, "message" => true);
    $message_body = "";
    foreach ($fields_req as $name => $required) {
      $postedValue = $_POST[$name];
      if ($required && empty($postedValue)) {
      } else {
        $message_body .= ucfirst($name) . ":  " . $postedValue . "\n";
      }
    }
    return $message_body;
  }

  header('Content-type: application/json');

  //do Captcha check, make sure the submitter is not a robot:)...
  $url = 'https://www.google.com/recaptcha/api/siteverify';
  $opts = array('http' =>
    array(
      'method'  => 'POST',
      'header'  => 'Content-type: application/x-www-form-urlencoded',
      'content' => http_build_query(array('secret' => '6LdVDw0TAAAAADEZQWhRimDjtkIwavy4ZslQUUhm', 'response' => $_POST["g-recaptcha-response"]))
    )
  );
  $context  = stream_context_create($opts);
  $result = json_decode(file_get_contents($url, false, $context, -1, 40000));
  
  //attempt to send email
  $messageBody = constructMessageBody();
  require '../lib/php_mailer/PHPMailerAutoload.php';
  
  //Create a new PHPMailer instance
  $mail = new PHPMailer;
  //Tell PHPMailer to use SMTP
  $mail->isSMTP();
  //Enable SMTP debugging
  // 0 = off (for production use)
  // 1 = client messages
  // 2 = client and server messages
  $mail->SMTPDebug = 2;
  //Ask for HTML-friendly debug output
  //$mail->Debugoutput = 'html';
  //Set the hostname of the mail server
  $mail->Host = "mail.joshua.sherer.biz";
  //Set the SMTP port number - likely to be 25, 465 or 587
  $mail->Port = 587;
  //Whether to use SMTP authentication
  $mail->SMTPAuth = true;
  //Username to use for SMTP authentication
  $mail->Username = "josh@joshua.sherer.biz";
  //Password to use for SMTP authentication
  $mail->Password = "Hs0jHs0j";
  //Set who the message is to be sent from
  $mail->setFrom($_POST['email'], $_POST['name']);
  //Set an alternative reply-to address
  //$mail->addReplyTo($_POST['email'], $_POST['name']);
  //Set who the message is to be sent to
  $mail->addAddress('joshua.sherer@gmail.com', 'Joshua Sherer');
  //Set the subject line
  $mail->Subject = 'Communication from Joshua.Sherer.Biz';
  $mail->Body  = $messageBody;
  
  //try to send the message
  if($mail->send()) {
    //header('Content-type: application/json');
    //echo json_encode(array('message' => 'Thank you for your message! Expect a reply soon!'));
  } else {
    errorResponse('Sorry, there was an unexpected error sending the email. You can use a different email program to send it to me: josh@joshua.sherer.biz');    
    //errorResponse('An unexpected error occured while attempting to send the email: ' . $mail->ErrorInfo);
  }
?>
