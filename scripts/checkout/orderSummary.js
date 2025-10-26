import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDaliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrancy} from '../../scripts/Utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/delivery-options.js';
import {renderPaymentSummary} from '/scripts/checkout/paymentSummary.js';

export function renderOrderSummary() {
  
  let cartSummaryHTML = '';
  
  cart.forEach((cartItem)=> {
  const {productId} = cartItem;
  
  const matchingItem = getProduct(productId);
  
  const {deliveryOptionId} = cartItem;
  
  const deliveryOption = getDeliveryOption(deliveryOptionId);
  
  const today = dayjs();
  const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
  const dateString = deliveryDate.format('dddd, MMMM D');
        
  
  cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingItem.image}">
  
                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingItem.name}
                  </div>
                  <div class="product-price">
                    ${matchingItem.getPrice()}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link js-update-quantity-link link-primary"
                      data-product-id="${matchingItem.id}">
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingItem.id}">
                    <span class="save-quantity-link link-primary js-save-link"
                      data-product-id="${matchingItem.id}">Save</span>
                    <span class="delete-quantity-link js-delete-quantity-link link-primary"
                      data-product-id="${matchingItem.id}">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionHTML(matchingItem,cartItem)}
                </div>
              </div>
            </div>
  `;
  });
  
  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;
    
  function deliveryOptionHTML(matchingItem,cartItem) {
    let html = '';
  
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
          deliveryOption.deliveryDays,
          'days'
        );
      const dateString = deliveryDate.format('dddd, MMMM D');
        
      const priceString = 
        deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrancy(deliveryOption.priceCents)}-`;
        
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        
      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingItem.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${(isChecked) ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });
    
    return html;
  }
    
  document.querySelectorAll('.js-delete-quantity-link')
    .forEach((link) => {
      link.addEventListener('click',() => {
        const {productId} = link.dataset;
        removeFromCart(productId);
        
        /*const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();*/
        
        renderOrderSummary();
        renderPaymentSummary();
        updateCartQuantity();
      });
    });
    
  document.querySelectorAll('.js-update-quantity-link')
    .forEach((link) => {
      link.addEventListener('click',() => {
        const {productId} = link.dataset;
        
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add("is-editing-quantity");
      });
    });
    
    
  document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const {productId} = link.dataset;
        
        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
        const newQuantity = Number(quantityInput.value);
        updateQuantity(productId,newQuantity);
         
        if (newQuantity < 0 ||  newQuantity >= 1000) {
          alert('not a valid quantity');
          return;
        }
        
        const container = document.querySelector(
          `.js-cart-item-container-${productId}`);
        container.classList.remove("is-editing-quantity");
        
        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
        quantityLabel.innerHTML = newQuantity;
       
        renderPaymentSummary();
        updateCartQuantity();
      });
    });
   
  
  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    
    document.querySelector('.js-return-to-home-link')
      .innerHTML = `${cartQuantity} items`;
  }
  
  updateCartQuantity();
  
  
  document.querySelectorAll('.js-delivery-option')
    .forEach((element) =>{
      element.addEventListener('click',() => {
        const {productId,deliveryOptionId} = element.dataset;
        updateDaliveryOption(productId,deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}