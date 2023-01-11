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
      localStorage.setItem('name', nameField.value);
      localStorage.setItem('email', emailField.value);
      localStorage.setItem('phone', phoneField.value);
      localStorage.setItem('note', noteField.value);
      localStorage.setItem('pricePer', pricePerField.value);
      localStorage.setItem('quantity', quantityField.value);
      location.href='success.html';
    };
    return actions.order.capture().then(captureOrderHandler);
  },
  onError: (err) => {
    console.error('An error prevented the buyer from checking out with PayPal');
  }
});

paypalButtonsComponent.render("#paypal-button-container").catch((err) => {
  console.error('PayPal Buttons failed to render');
});