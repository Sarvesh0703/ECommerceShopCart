// OPEN & CLOSE
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

// Start when the document is ready
if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}

// ================= START ================
function start() {
    addEvents();
}

// ================= UPDATE & RERENDER ================
function update() {
    addEvents();
    updateTotal();
}

// ================ ADD EVENTS ================
function addEvents() {
    // Remove items from cart
    let cartRemove_btns = document.querySelectorAll('.cart-remove');
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });

    // Change item quantity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantity);
    })

    // Add item to cart
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach((btn) => {
        btn.addEventListener("click", handle_addCartItem);
    });

    // Buy Order
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);
}

// =============== HANDLE EVENTS FUNCTION ================
let itemAdded = []

function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);

    let newToADD = {
        title,
        price,
        imgSrc,
    };


    // handle item is already exit
    if(itemAdded.find((el) => el.title == newToADD.title)) {
        alert("This Item is Already Exist!");
        return;
    }else{
        itemAdded.push(newToADD);
    }

    // Add product to cart
    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
}
function handle_removeCartItem() {
    this.parentElement.remove();
    itemAdded = itemAdded.filter(
        (el)=>
         el.title != 
         this.parentElement.querySelector('.cart-product-title').innerHTML
    );

    update();
}

function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value);  //to keep it integer

    update();
}

function handle_buyOrder(){
    if(itemAdded.length <= 0){
        alert("There is No Order to Please Yet! \nPlease Make an Order first.");
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = "";
    alert("Your Order is Placed Successfully :)");
    itemAdded = [];

    update();
}

// ============= UPDATE & RERENDER FUNCTION ==============
function updateTotal() {
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach(cartBox => {
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });

    // Keep 2 digits the decimal point
    total = total.toFixed(2);
    // or you can use also
    // total = Math.round(total * 100) / 100;

    totalElement.innerHTML = "$" + total;

    totalElement.innerHTML = "$" + total;
}


// =============== HTML COMPONENTS ================
function CartBoxComponent(title, price, imgSrc) {
  return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="details-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- REMOVE CART -->
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`
}