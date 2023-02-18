const ordersFormElements = document.querySelectorAll('.order-forms');

async function patchOrder(event) {
  event.preventDefault();
  const formElement = event.target;
  const formData = new FormData(formElement);
  const csrf = formData.get('_csrf');
  const orderID = formData.get('order-id');
  const status = formData.get('order-status');

  let response;

  try {
    response = await fetch('/admin/orders', {
      method: 'PATCH',
      body: JSON.stringify({
        _csrf: csrf,
        orderID: orderID,
        status: status,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    alert('Error');
  }
  response = await response.json();

  const statusElement =
    formElement.parentElement.querySelector('.text-uppercase');
  statusElement.innerHTML = response.status.toUpperCase();

  console.log(response);
}

for (const formElement of ordersFormElements) {
  formElement.addEventListener('submit', patchOrder);
}
