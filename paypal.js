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
      const paypalEmail = details['payer']['email_address'];
      const additionals = quantityField.value > 1 ? [additionalField1.value, additionalField2.value, additionalField3.value].filter(item => item).join('|') : 'none';
      setCookie('name', nameField.value);
      setCookie('email', emailField.value);
      setCookie('phone', phoneField.value);
      setCookie('additional1', additionalField1.value);
      setCookie('additional2', additionalField2.value);
      setCookie('additional3', additionalField3.value);
      setCookie('additionals', additionals)
      setCookie('pricePer', pricePerField.value);
      setCookie('quantity', quantityField.value);
      setCookie('total', parseInt(quantityField.value) * parseInt(pricePerField.value));
      setCookie('paypalEmail', paypalEmail);
      location.href='register.php?' + Math.random();
    };
    return actions.order.capture().then(captureOrderHandler);
  },
  onError: (err) => {
    location.href='failure.html';
  }
});

paypalButtonsComponent.render("#paypal-button-container").catch((err) => {
  console.error('PayPal Buttons failed to render');
});

var setCookie = function(name, value) {
  document.cookie = name + "=" + value + ";";
};