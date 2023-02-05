const addItemButton = document.getElementById('add-item');
const removeItemButton = document.getElementById('remove-item');
const cartTotalItems = document.querySelectorAll('.cart-total-items');
const cartTotalPrice = document.querySelectorAll('.cart-total-price');

function setContent(elementArray, content) {
  for (let i = 0; i < elementArray.length; i++) {
    elementArray[i].innerHTML = content;
  }
  return;
}

async function patchCart(addItemButton) {
  const actionButton = addItemButton;
  const productID = actionButton.dataset.productid;
  const csrfToken = actionButton.dataset.csrf;
  const action = actionButton.dataset.action;
  let response;
  try {
    response = await fetch('/cart/items', {
      method: 'PATCH',
      body: JSON.stringify({
        productID: productID,
        action: action,
        _csrf: csrfToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    alert('Error');
    return;
  }

  if (!response) {
    alert('Error');
    return;
  }

  const responseData = await response.json();
  setContent(cartTotalItems, responseData.totalItems);
  setContent(cartTotalPrice, '$' + responseData.totalPrice);
}

addItemButton.addEventListener('click', patchCart.bind(null, addItemButton));
removeItemButton.addEventListener(
  'click',
  patchCart.bind(null, removeItemButton)
);
