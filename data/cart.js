export let cart;

addFromStorage();

export function addFromStorage() {

  cart = JSON.parse(localStorage.getItem('cart')) ||
  [{
    productId: 'id1',
    quantity: 2,
    deliveryOptionId: '1'
  },{
    productId: 'id2',
    quantity:1,
    deliveryOptionId: '2'
  }];
}


function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;
      
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  
  let quantity = 1;
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  quantity = Number(quantitySelector.value);
    
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
    productId,
    quantity,
    deliveryOptionId: '1'
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  let newCart = [];
  
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  
  cart = newCart;
  
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  
  return cartQuantity;
}

export function updateQuantity(productId,newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  
  matchingItem.quantity = newQuantity;
  
  saveToStorage();
}

export function  updateDaliveryOption(productId,deliveryOptionId) {
  let matchingItem;
  cart. forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  
  matchingItem.deliveryOptionId = deliveryOptionId;
  
  saveToStorage();
}

/*
export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}*/