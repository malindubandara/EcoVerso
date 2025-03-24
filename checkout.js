let listCart = [];
function checkCart(){
        var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
        if(cookieValue){
            listCart = JSON.parse(cookieValue.split('=')[1]);
        }
}
checkCart();
addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">$${product.price * product.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
                totalPrice = totalPrice + (product.price * product.quantity);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice;
}


// Function to validate the checkout form
function validateForm() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const zipcode = document.getElementById('zipcode').value;
    const email = document.getElementById('email').value;
    const country = document.getElementById('country').value;

    // Validate required fields
    if (name.trim() === '' || phone.trim() === '' || address.trim() === '' || zipcode.trim() === '' || email.trim() === '') {
        alert('Please fill out all required fields.');
        return false;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Validation passed
    return true;
}

// Function to handle checkout
function checkout() {
    // Validate the form
    if (!validateForm()) {
        return;
    }

    // Proceed with checkout logic here...

    // Clear the form fields
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById('zipcode').value = '';
    document.getElementById('email').value = '';
    document.getElementById('country').value = '';

    // Clear the cart
    document.cookie = "listCart=[]; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Update the HTML to reflect the cleared cart
    addCartToHTML();

    // Display an alert indicating the order was placed successfully
    alert("Order placed successfully.");

    // Empty the list of products in the cart from the HTML
    const listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';
}

