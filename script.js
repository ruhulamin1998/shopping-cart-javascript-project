addToCartBtn = document.querySelectorAll('.addToCartBtn');
cartList = document.querySelector('.cartList');

//add event listener
 for(var i = 0; i<addToCartBtn.length; i++){
     addToCartBtn[i].addEventListener('click',addToCart);
 }
cartList.addEventListener('click',deleteProduct);
document.addEventListener('DOMContentLoaded',showProducts);


// product class
class Product{
    constructor(title,price){
        this.title = title;
        this.price = price;
    }
}

//function
// update cart container

function addToCart(e){
    cart = e.target.parentElement;
    title = cart.querySelectorAll('.productTitle')[0].innerText
    price = cart.querySelectorAll('.productPrice')[0].innerText

    cartTitles = cartList.getElementsByClassName('cartTitle');

    for(var i = 0; i < cartTitles.length; i++){
        if(cartTitles[i].innerText == title){
            alert('This product is already added');
            return;
        }
    }

    let list = document.querySelector('.cartList');
    let row = document.createElement('tr');
    row.innerHTML = `
    <td class="cartTitle">${title}</td>
    <td>${price}</td>
    <td><a href="#">X</a></td>`
    list.appendChild(row);

    let product = new Product(title,price);

    console.log(product);

    addCartInLocalStorage(product);
}

//removeFromCart

function deleteProduct(e){
    let product = e.target;
    if(product.hasAttribute('href')){
        product.parentElement.parentElement.remove();
        deleteFromLS(product.parentElement.previousElementSibling.previousElementSibling.textContent.trim());
    }
}

// add products in local storage

function addCartInLocalStorage(product){
    let products;
    if(localStorage.getItem('products') === null){
        products = [];
    }
    else{
        products = JSON.parse(localStorage.getItem('products'));
    }
    products.push(product);

    localStorage.setItem('products',JSON.stringify(products));
}

// show products from local storage
function showProducts(){
    let products;
    if(localStorage.getItem('products') === null){
        products = [];
    }
    else{
        products = JSON.parse(localStorage.getItem('products'));
    }
    products.forEach((product) => {
        let list = document.querySelector('.cartList');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td class="cartTitle">${product.title}</td>
        <td>${product.price}</td>
        <td><a href="#">X</a></td>`
        list.appendChild(row);
    })
}

// remove from local storage
function deleteFromLS(title){
    let products;
    if(localStorage.getItem('products') === null){
        products = [];
    }
    else{
        products = JSON.parse(localStorage.getItem('products'));
    }

    products.forEach((product,index) =>{
        if(product.title === title){
            products.splice(index,1);
        }
    })
    localStorage.setItem('products',JSON.stringify(products));

}





