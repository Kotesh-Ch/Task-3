class Cart {
  cartItems;
  #localStorageKey;
  
  constructor (localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#addFromStorage();
  }
  
  #addFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
      if (!this.cartItems) {
        this.cartItems = [{
          productId: 'id1',
          quantity: 2,
          deliveryOptionId: '1'
        },{
          productId: 'id2',
          quantity:1,
          deliveryOptionId: '2'
        }];
      }
    }
    
    saveToStorage() {
      localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    }
    
    addToCart(productId) {
      let matchingItem;
          
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      
      let quantity = 1;
      /*const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      quantity = Number(quantitySelector.value);
        */
      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
        });
      }
      this.saveToStorage();
    }
    
    removeFromCart(productId) {
      let newCart = [];
      
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      
      this.cartItems = newCart;
      
      this.saveToStorage();
    }
    
    calculateCartQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      
      return cartQuantity;
    }
    
    updateQuantity(productId,newQuantity) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingItem = cartItem;
        }
      });
      
      matchingItem.quantity = newQuantity;
      
      this.saveToStorage();
    }
    
    updateDaliveryOption(productId,deliveryOptionId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      
      matchingItem.deliveryOptionId = deliveryOptionId;
      
      this.saveToStorage();
    }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);