document.addEventListener('DOMContentLoaded', function() {
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const phone = localStorage.getItem('phone');
  const note = localStorage.getItem('note');
  const quantity = parseInt(localStorage.getItem('quantity'));
  const pricePer = parseInt(localStorage.getItem('pricePer'));
  const total = quantity * pricePer;
  document.getElementById('email').textContent = email;
  document.getElementById('name').textContent = name;
  document.getElementById('pricePer').textContent = pricePer;
  document.getElementById('quantity').textContent = quantity;
  document.getElementById('total').textContent = total;
  document.getElementById('total-2').textContent = total;

  const params = { name: name, email: email, phone: phone, note: note, pricePer: pricePer, quantity: quantity};
  fetch('__INSERT_WEBHOOK_URL_HERE__', {
    method: 'POST',
    body: JSON.stringify(params)
  });
});