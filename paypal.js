const paypalButtonsComponent = paypal.Buttons({
  style: {
    color: "gold",
    shape: "pill",
    layout: "vertical"
  },
  createOrder: (data, actions) => {
    // https://developer.paypal.com/api/orders/v2/#orders-create-request-body
    const createOrderPayload = {
      purchase_units: [
        {
          amount: {
            value: document.getElementById('total').textContent
          }
        }
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING'
      }
    };
    return actions.order.create(createOrderPayload);
  },
  onApprove: (data, actions) => {
    const captureOrderHandler = (details) => {
      setCookie('name', nameField.value);
      setCookie('email', emailField.value);
      setCookie('phone', phoneField.value);
      setCookie('note', noteField.value);
      setCookie('pricePer', pricePerField.value);
      setCookie('quantity', quantityField.value);
      setCookie('total', parseInt(quantityField.value) * parseInt(pricePerField.value));
      location.href='success.php';
    };
    return actions.order.capture().then(captureOrderHandler);
  },
  onError: (err) => {
    console.log(err);
    location.href='failure.html';
  }
});

paypalButtonsComponent.render("#paypal-button-container").catch((err) => {
  console.error('PayPal Buttons failed to render');
});

var setCookie = function(name, value) {
  document.cookie = name + "=" + value + ";";
};