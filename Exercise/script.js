/**
 * JavaScript Shopping Cart
 */
// This to add plus, minus, delete it was a bonus point forthe codereview
function documentReady() { // w/o this function only will run but not add items
    let insertBtns = document.getElementsByClassName('product-button');
    for (let i = 0; i < insertBtns.length; i++) {
        let insertBtn = insertBtns[i];
        insertBtn.addEventListener("click", addItem);
    }

    let plusBtns = document.getElementsByClassName('plus');
    for (let i = 0; i < plusBtns.length; i++) {
        let plusBtn = plusBtns[i];
        plusBtn.addEventListener("click", plusQtt);
    }

    let minusBtns = document.getElementsByClassName('minus');
    for (let i = 0; i < minusBtns.length; i++) {
        let minusBtn = minusBtns[i];
        minusBtn.addEventListener("click", minusQtt);
    }
    let delItemBtns = document.getElementsByClassName('del');
    for (let i = 0; i < delItemBtns.length; i++) {
        let delBtn = delItemBtns[i];
        delBtn.addEventListener("click", delItem);
    }

    let btnPurchase = document.getElementById("btn-purchase");
    btnPurchase.addEventListener("click", purchase);
}
documentReady();



 //addItem(e):it is like a capsol that brings the element together
function addItem(e) 
    {
        let item = e.target.parentElement.parentElement;
        let title = item.querySelector('.product-title').innerText;
        let price = item.querySelector('.product-price').innerText.replace("€", "");
        let picSrc = item.querySelector('.product-image').src;
        // console.log(title, price, picSrc);
        rowCreate(title, price, picSrc);
        updateTotal();
    
    }

function rowCreate(title, price, picSrc) {
    let cartItems = document.getElementById('cart-items');
    let cartItemsNames = cartItems.getElementsByClassName('cart-item-title');
    let cartItemQtt = cartItems.getElementsByClassName('cart-quantity');
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("This item already exists in your cart");
            let qtt = Number(cartItemQtt[i].innerHTML);

            //Check for the stock option from here
            if(isFlowerAvailable)(title, qtt+1)
                {
                    cartItemQtt[i].innerHTML = qtt + 1;
                } 
                
            

            updateTotal();
            return;//it will stop our script

        }

    }
    let item = `
    <div class="cart-row row d-flex ">
        <div class="cart-item col-6 my-3 ">
            <img class="cart-item-image" src="${picSrc}" width="100" height="100">
            <span class="cart-item-title h5 ">${title}</span>
        </div>
        
        <span class="cart-price col-3 h4 my-3">€ ${price}</span>
       
        <div class="cart-qtty-action col-3 d-flex">            
            <i class="minus fa fa-minus-circle my-auto" ></i>            
            <div class="cart-quantity p-4 h4">1</div>            
            <i class="plus fa fa-plus-circle my-auto"></i>         
            <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>            
        </div>
    </div>`;
    let cart = document.getElementById('cart-items');
    cart.innerHTML += item;
    documentReady();
}

function updateTotal() {
    let cart = document.getElementById("cart-items");
    let cartRows = cart.getElementsByClassName("cart-row");
    let total = 0; // it will be calculated from zero each time it is updated
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let price = parseFloat(cartRow.getElementsByClassName("cart-price")[0].innerText.replace("€", ""));//we need the first one
        
        let qtt = Number(cartRow.getElementsByClassName("cart-quantity")[0].innerText);
        console.log(price, qtt);
        total += (price * qtt);
        console.log(total);
    }
    // Discount code
    if(total > 100 && total < 150)
    {
        total = total * 0.9;
        showDiscountMessage(10);
    }
    else if( total>=150 && total<230)
    {
        total = total * 0.75;
        showDiscountMessage(25);
    }
    else if( total>=230 && total<300)
    {
        total = total * 0.5;
        showDiscountMessage(50);
    }
    else
    {
        showDiscountMessage(0);
    }
    total = total.toFixed(2);//toFixed() will help rounding the number to 2 decimals
    let totalElement = document.getElementById("total").querySelector('#price');
    // console.log(total);
    totalElement.innerHTML = "€" + total;
    //Total Quantity code:
    updateTotalAmount();
}

function plusQtt(e) {
    let itemPlus = e.target.parentElement;
    let qtt = Number(itemPlus.querySelector('.cart-quantity').innerHTML);

    //Add here the checiking for stock; if not "no more items in stock sorry"
    let parentContainer = e.target.parentElement.parentElement; // why two times parentElement
    let FlowerName = parentContainer.getElementsByClassName("cart-item-title")[0].innerText;
    if (isFlowerAvailable(FlowerName, qtt +1))
    {
        itemPlus.querySelector('.cart-quantity').innerHTML = qtt + 1;
    }
    else
     {
        alert("No more items in stock. Sorry!");
    }
    
    
    updateTotal();
}

function minusQtt(e) {
    let itemMinus = e.target.parentElement.parentElement;
    let qtt = Number(itemMinus.querySelector('.cart-quantity').innerHTML);
    if (qtt == 1) {
        console.log("There shouldn't be 0 products in the cart");
        delItem(e); // comment this delItem(e)
    } else {
        itemMinus.querySelector('.cart-quantity').innerHTML = qtt - 1;
        console.log(qtt);
        updateTotal();
    }
}

function delItem(e) {
    let delBtnAction = e.target.parentElement.parentElement.remove();
    updateTotal();
}

function purchase() {
    alert("Thank you for buying with us.");
    let cartItems = document.getElementById('cart-items');
    //console.log(cartItems);
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    // cartItems.innerHTML = "";
    updateTotal();
}

//Total Quantity Code
function updateTotalAmount()
{
    let qttyElements = document.getElementsByClassName("cart-quantity");
    console.log("qttyElements", qttyElements)
    let total = 0;
    for (let vali of qttyElements)
        {
            if(!isNaN(parseInt(vali.innerText))) total +=parseInt(vali.innerText);
        }
        document.getElementById("amount").innerHTML = total;
}

//Code used for discount:
function showDiscountMessage(discount)

        {   
            console.log("Discount Message:", discount)
            if (discount == 0) {
                document.getElementById("discount").className="flower-total-price text-muted invisible";
                document.getElementById("discount1").className="flower-total-price text-muted invisible";
                document.getElementById("discount2").className="flower-total-price text-muted invisible";
            } else if (discount == 10) {
                document.getElementById("discount").className="flower-total-price text-muted visible";
                document.getElementById("discount1").className="flower-total-price text-muted invisible";
                document.getElementById("discount2").className="flower-total-price text-muted invisible";
            } else if (discount == 25) {
                document.getElementById("discount").className="flower-total-price text-muted invisible";
                document.getElementById("discount1").className="flower-total-price text-muted visible";
                document.getElementById("discount2").className="flower-total-price text-muted invisible";
            } else if (discount == 50) {
                document.getElementById("discount").className="flower-total-price text-muted invisible";
                document.getElementById("discount1").className="flower-total-price text-muted invisible";
                document.getElementById("discount2").className="flower-total-price text-muted visible";
            }
            
            
        }


// Code to check for the STOCK possibilties

function isFlowerAvailable(FlowerName, qtt)
        {
            let products = document.getElementsByClassName('product-title');
            console.log(products);

            let target;
            for(let product of products)
                {
                    if (product.innerText === FlowerName) 
                    {
                        target = products.parentElement;
                    }
                }
                let quantityInStock = parseInt(target.getElementsByClassName("product-stock")[0].innerHTML);

                if (qtt > quantityInStock) return false;

                    return true;
        
        
        }
        