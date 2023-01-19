document.addEventListener('DOMContentLoaded', function() {
  if (getCookie('name') == null) {
    location.href = 'index.html';
  } else {
    document.getElementById('name').innerText = getCookie('name');
    document.getElementById('name2').innerText = getCookie('name');
    document.getElementById('email').innerText = getCookie('email');
    document.getElementById('email2').innerText = getCookie('email');
    document.getElementById('phone').innerText = getCookie('phone');
    document.getElementById('quantity').innerText = getCookie('quantity');
    document.getElementById('pricePer').innerText = getCookie('pricePer');
    document.getElementById('donation').innerText = getCookie('donation');
    document.getElementById('total').innerText = getCookie('total');
    document.getElementById('total2').innerText = getCookie('total');
    document.getElementById('additionals').innerText = getCookie('additionals').replaceAll('|',', ');
    document.getElementById('totalAdmissions').innerText = parseInt(getCookie('pricePer')) * parseInt(getCookie('quantity'));
  }
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}