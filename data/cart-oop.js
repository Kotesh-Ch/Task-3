function Cart(storageKey) {

  const cart = {
    cartItems:undefined,
    
    addFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(storageKey));
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
    },
    
    saveToStorage() {
      localStorage.setItem(storageKey,JSON.stringify(this.cartItems));
    },
    
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
    },
    
    removeFromCart(productId) {
      let newCart = [];
      
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      
      this.cartItems = newCart;
      
      this.saveToStorage();
    },
    
    calculateCartQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      
      return cartQuantity;
    },
    
    updateQuantity(productId,newQuantity) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingItem = cartItem;
        }
      });
      
      matchingItem.quantity = newQuantity;
      
      this.saveToStorage();
    },
    
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
  };
  cart.addFromStorage();
  
  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

console.log(cart);
console.log(businessCart);