<?php
  $auth = getenv("AUTH");
  $url = getenv("THE_URL");
  $name= $_COOKIE["name"];
  $email= $_COOKIE["email"];
  $phone= $_COOKIE["phone"];
  $quantity= $_COOKIE["quantity"];
  $pricePer= $_COOKIE["pricePer"];
  $total= $_COOKIE["total"];
  $additional1= $_COOKIE["additional1"];
  $additional2= $_COOKIE["additional2"];
  $additional3= $_COOKIE["additional3"];
  $additionals= str_replace('|', ', ', $_COOKIE["additionals"]);
  $paypalEmail= $_COOKIE["paypalEmail"];
  if ($name === null) {
    echo "<script type='text/JavaScript'>document.addEventListener('DOMContentLoaded', function() {location.href = 'index.html';});</script>";
  } elseif ($_COOKIE["webhookSent"] != "true") {
    echo "<script type='text/JavaScript'>document.addEventListener('DOMContentLoaded', function() {document.cookie = 'webhookSent=true;';});</script>";
    $messagePayload = [
      'url' => $url,
      'auth' => $auth,
      'name' => $name,
      'email' => $email,
      'phone' => $phone,
      'additional1' => $additional1,
      'additional2' => $additional2,
      'additional3' => $additional3,
      'additionals' => $additionals,
      'quantity' => $quantity,
      'pricePer' => $pricePer,
      'total' => $total,
      'paypalEmail' => $paypalEmail
    ];
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($messagePayload));
    $response = curl_exec($ch);
    if ($response === false) {
      echo "<script type='text/JavaScript'>document.addEventListener('DOMContentLoaded', function() {location.href = 'failure.html';});</script>";
    } else {
      echo "<script type='text/JavaScript'>document.addEventListener('DOMContentLoaded', function() {location.href = 'success.html?' + (Math.random() + 1).toString(36).substring(7);});</script>";
    }
  }
?>