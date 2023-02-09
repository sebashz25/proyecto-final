let res = await fetch('https://api.escuelajs.co/api/v1/products');
let data = await res.json();

let shoppingCartArray = [];

let total = 0;
let productContainer = document.querySelector('.shop-items');
let totalElement = document.querySelector('.cart-total-title');

let productsArray = data.slice(0, 4);

productsArray.forEach((product) => {
  productContainer.innerHTML += `<div class="shop-item" id="${product.id}">
    <span class="shop-item-title">${product.title}</span>
    <img class="shop-item-image" src="${product.images[0]}">
    <div class="shop-item-details">
        <span class="shop-item-price">$${product.price}</span>
        <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
    </div>
</div>`;
});

let addBtns = document.querySelectorAll('.shop-item-button');

addBtns = [...addBtns];
let cartContainer = document.querySelector('.cart-items');
addBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    let actualId = parseInt(event.target.parentNode.parentNode.id);
    let actualProduct = productsArray.find((item) => item.id == actualId);
    if (actualProduct.quantity === undefined) {
      actualProduct.quantity = 1;
    }

    let existe = false;
    shoppingCartArray.forEach((product) => {
      if (actualId == product.id) {
        existe = true;
      }
    });
    if (existe) {
      actualProduct.quantity++;
    } else {
      shoppingCartArray.push(actualProduct);
    }
    drawItems();

    getTotal();

    updateNumberOfItems();

    deleteItems();
  });
});

function getTotal() {
  let sumTotal;
  let total = shoppingCartArray.reduce((sum, item) => {
    sumTotal = sum + item.quantity * item.price;
    return sumTotal;
  }, 0);
  totalElement.innerText = `$${total}`;
}

function drawItems() {
  cartContainer.innerHTML = '';
  shoppingCartArray.forEach((product) => {
    cartContainer.innerHTML += `<div class="cart-row">
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${product.images}" width="100" height="100">
            <span class="cart-item-title">${product.title}</span>
        </div>
        <span class="cart-price cart-column">$${product.price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" min="1" type="number" value="${product.quantity}">
            <button class="btn btn-danger" type="button">REMOVE</button>
    
        </div>
    </div>`;
  });
}

function updateNumberOfItems() {
  let inputNumber = document.querySelectorAll('.cart-quantity-input');
  inputNumber = [...inputNumber];
  inputNumber.forEach((input) => {
    input.addEventListener('click', (event) => {
      let actualInputTitle =
        event.target.parentElement.parentElement.childNodes[1].innerText;
      let actualProductQuanity = parseInt(event.target.value);
      console.log(actualInputTitle);
      let actualInputObject = shoppingCartArray.find(
        (product) => product.title == actualInputTitle
      );

      actualInputObject.quantity = actualProductQuanity;

      getTotal();
    });
  });
}

function deleteItems() {
  let btnDelete = document.querySelectorAll('.btn-danger');
  btnDelete = [...btnDelete];
  btnDelete.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      let actualInputTitle =
        event.target.parentElement.parentElement.childNodes[1].innerText;
      let actualInputObject = shoppingCartArray.find(
        (product) => product.title == actualInputTitle
      );

      shoppingCartArray = shoppingCartArray.filter(
        (product) => product != actualInputObject
      );
      drawItems();
      getTotal();
      updateNumberOfItems();
    });
  });
}

/* javascript */
