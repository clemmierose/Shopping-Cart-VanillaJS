
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

/*create the 'ready' function which will populate the button function even if page is not fully loaded - event listeners*/
function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    /*loop through cart object buttons*/
    for (var i=0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
        }

        var quantityInput = document.getElementsByClassName('quantity-input')
        for (var i = 0; i < quantityInput.length; i++) {
            var input = quantityInput[i] 
            input.addEventListener('change', quantityChanged)
        }

        var addItemButtons = document.getElementsByClassName('btn-add')
        for (var i = 0; i < addItemButtons.length; i++){
            var button = addItemButtons[i]
            button.addEventListener('click', addToCartClicked)
        }

        document.getElementsByClassName('purchase-btn')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase!')
    var cartItems = document.getElementsByClassName('cart-item')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild) /*while loop will run until all items are cleared from cart*/
    }
    updateCartTotal()
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('item-title')[0].innerText
    var price = shopItem.getElementsByClassName('item-price-tag')[0].innerText
    var img = shopItem.getElementsByClassName('item-img')[0].src
    console.log(title, price, img)
    addItemToCart (title, price, img)
    updateCartTotal()
}

function addItemToCart(title, price, img) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('item-title')
    for (var i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerHTML == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = ` 
    <div class="cart-row">
     <div class="cart-item cart-column">
        <img class="item-img" src="${img}" alt="Avatar" style="width:30%">
         <span class="item-title">${title}</span>
         </div>
          <span class="item-price cart-column">${price}</span>
         <div class="cart-quantity cart-column">
         <input class="quantity-input" type="number" value="1" title="item-quantity">
         <button class="btn-danger">REMOVE</button>
        </div>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('quantity-input')[0].addEventListener('change', quantityChanged)
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1 /*setting lowest value user can select to 1*/
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

/*update total price*/
function updateCartTotal() {
    /*get cart rows*/
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i] /*wherever in the array we are that will be the current cartRow*/ 
        var priceElement = cartRow.getElementsByClassName('item-price')[0]
        var quantityElement = cartRow.getElementsByClassName('quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', '')) /*replacing $ with empty space and parsing string into a float(number)*/
        var quantity = quantityElement.value
        total = (price * quantity)
       
    }
    total = Math.round(total)
    document.getElementsByClassName('total-price')[0].innerText = '$' + total
    console.log(total)
}
/*$ parseFloat(priceElement.innerText.replace('$', ''))*/