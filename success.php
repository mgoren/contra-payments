<!DOCTYPE html>
<html>
  <head>
    <title>Portland Megaband 2023</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel='stylesheet' href='styles.css'>
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'>
  </head>
  <body>
    <?php
      $auth = getenv("AUTH");
      $url = getenv("THE_URL");
      $name= $_COOKIE["name"];
      $email= $_COOKIE["email"];
      $phone= $_COOKIE["phone"];
      $note= $_COOKIE["note"];
      $quantity= $_COOKIE["quantity"];
      $pricePer= $_COOKIE["pricePer"];
      $total= $_COOKIE["total"];
      if ($_COOKIE["webhookSent"] != "true") {
        $messagePayload = [
          'url' => $url,
          'auth' => $auth,
          'name' => $name,
          'email' => $email,
          'phone' => $phone,
          'note' => $note,
          'quantity' => $quantity,
          'pricePer' => $pricePer,
          'total' => $total
        ];
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($messagePayload));
        $response = curl_exec($ch);
        if ($response === false) {
          echo "<script type='text/JavaScript'>document.addEventListener('DOMContentLoaded', function() {document.getElementById('failure').classList.remove('d-none');});</script>";
        } else {
          echo "<script type='text/JavaScript'>document.addEventListener('DOMContentLoaded', function() {document.cookie = 'webhookSent=true;'; document.getElementById('success').classList.remove('d-none');});</script>";
        }
      }
    ?>
    <div class="container">
      <div id="success" class="box d-none">
        <p>A receipt containing this information has been sent to <?= $email ?>.</p>
      </div>
      <div id="failure" class="box d-none">
        <p class='text-danger'><strong>
          Your payment was successful, but something went wrong in registration.<br>
          Please email us at <a href="contra@portlandcountrydance.org">contra@portlandcountrydance.org</a>.
        </strong></p>
      </div>
      <section id="thanks">
        <div class="block-heading">
          <h2>Thanks, <?= $name ?>!</h2>
        </div>
        <div class="row">
          <div class="col-md-12 thanks">
            <p>Your payment to PCDC for $<?= $total ?> has been successfully processed.</p>
            <hr>
            <p><strong>Megaband admissions:</strong></p>
            <p><?= $quantity ?> x $<?= $pricePer ?> = $<?= $total ?></p>
            <p><strong>You will not receive a physical ticket; your name will be on a list at the door.</strong></p>
            <hr>
            <p>
              Saturday, March 11, 2023<br>
              7:30pm (doors at 7)<br>
              Oaks Park Dance Pavilion<br>
              7805 SE Oaks Park Way in Portland
            </p>
            <p>Parking is free.</p>
            <p>If you have not already done so, please also fill out the <a href="https://pcdc.fun/contact-trace" target=_blank>PCDC Contact Tracing form</a>.</p>
            <p>Additionally, you can expedite the sign-in process by printing and filling out the <a href="https://pcdc.fun/files/PCDC_Events_Waiver.pdf" target=_blank>PCDC event waiver</a> in advance, if you have not already done so.</p>
            <p>
              Please email <a href="mailto:contra@portlandcountrydance.org">contra@portlandcountrydance.org</a> if you have any questions.
            </p>
            <hr>
            <p><strong>Covid policy:</strong> Everyone must be vaccinated, including at least one booster if eligible. A well-fitted mask covering nose and mouth is required for attendees. PCDC's full Covid policy is available <a href="https://pcdc.fun/covid19" target=_blank>here</a>.</p>
          </div>
        </div>
      </section>
    </div>
  </body>
</html>