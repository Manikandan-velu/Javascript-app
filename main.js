//prduct class: 
class Product {
    constructor(product, country, id){
        this.title = product;
        this.country = country;
        this.id = id;
    }
}

//Handle UI tasks
class UI {
    static displayProduct(){
        const products = Store.getProduct();
        products.forEach((product)=> UI.addProductList(product))
    }
    //show alert message
    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert w-50 mx-auto alert-${className}`;
        div.innerText = message;
        const parent = document.querySelector('.container');
        const form = document.querySelector('#product-form');
        parent.insertBefore(div,form);

        setTimeout(()=>document.querySelector('.alert').remove(), 3000)
    }
    // add products
    static addProductList (product){
        const list = document.querySelector('#product-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${product.title}</td>
        <td>${product.country}</td>
        <td>${product.id}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</td>`;
        list.appendChild(row);
    }
    //remove products
    static removeProduct(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    //clear products
    static clearFields(){
        document.querySelector('#name').value = '';
        document.querySelector('#country').value = '';
        document.querySelector('#id').value = '';
    }
}

//storage class
class Store{
    static addProduct(product){
        const products = Store.getProduct();
        products.push(product);
        localStorage.setItem('products-list', JSON.stringify(products))
    }

    static getProduct(){
        let products;
        if(localStorage.getItem('products-list') === null){
            products = [];
        }else{
            products = JSON.parse(localStorage.getItem('products-list'));
        }
        return products;
    }

    static removeProduct(id){
        const products = Store.getProduct();
        products.forEach((product, index)=>{
            if(product.id === id){
                products.splice(index, 1);
            }
        })
        localStorage.setItem('products-list', JSON.stringify(products))
    }
}

//Events: Display Book
document.addEventListener('DOMContentLoaded', UI.displayProduct)

//Events: Add a Book
document.querySelector('#product-form').addEventListener("submit", (e)=>{
    e.preventDefault;

    //get products from form elements
    const title = document.querySelector('#name').value;
    const country = document.querySelector('#country').value;
    const id = document.querySelector('#id').value;

    if(title === '' || country === '' || id === ''){
        UI.showAlert('Please fill required fields', 'danger');
    }else{
        const products = new Product(title,country,id);

        //add products to table
        UI.addProductList(products);

        //add products to store
        Store.addProduct(products);

        Store.addProduct(products);
        UI.showAlert('Added Products!', 'success');
        UI.clearFields();
    }
    
})

//Events: Remove a Book
document.querySelector('#product-list').addEventListener("click", (e)=>{
    e.preventDefault;
    UI.removeProduct(e.target);
    Store.removeProduct(e.target.parentElement.previousElementSibling.textContent)
})

