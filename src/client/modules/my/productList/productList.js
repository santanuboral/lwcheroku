/* eslint-disable no-alert */
import { LightningElement, track, api } from 'lwc';

export default class ProductList extends LightningElement {
    @track allProducts = [];
    @track products = [];

    @api recordId;

    connectedCallback() {
        fetch('data/products')
            .then(response => {
                return response.json();
            })
            .then(products => {
                this.products = this.allProducts = products;
            });
    }

    //on change of Quantity, append that in the correct array element
    handleQuantityChange(event) {
        const productId = event.detail.productId;
        const qty = event.detail.quantity;
        if (qty > 0) {
            for (let i = 0; i < this.allProducts.length; i++) {
                if (this.allProducts[i].id === productId) {
                    this.allProducts[i].quantity = qty;
                }
            }
        }
    }

    //this will search on product name based on search input
    handleSearchKeyChange(event) {
        const searchKey = event.target.value.toLowerCase();
        this.products = this.allProducts.filter(product =>
            product.name.toLowerCase().includes(searchKey)
        );
    }

    /*
    handleClick(){
        //now call apex controller to insert the order items.
        submitOrder({contactId: this.recordId,
                    productList: JSON.stringify(this.allProducts)})
           
            .then(result => {
                alert(result);
            })
            .catch(error => {
                alert(error.body.message);
            });
        
    }
    */

    handleClick() {
        let emailaddress = this.template.querySelector('.emailaddress').value;
        let obj = {
            email: emailaddress,
            productList: JSON.stringify(this.allProducts)
        };
        if (emailaddress.length === 0) {
            // eslint-disable-next-line no-alert
            alert('Please enter email address');
        } else {
            fetch('data/placeOrder', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(obj), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // eslint-disable-next-line no-alert
                    alert(data);
                });
        }
    }
}
