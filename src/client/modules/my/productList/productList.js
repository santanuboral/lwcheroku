/* eslint-disable no-alert */
import { LightningElement,  track, api} from 'lwc';



export default class ProductList extends LightningElement {

    @track allProducts = [];
    @track products = [];

    @api recordId;

    products = this.allProducts = [
        {
            id : 1,
            name: 'Product 1',
            price: '$350',
            picture: 'https://www.ikea.com/PIAimages/0631750_PE695177_S5.JPG?f=xxs'
        },
        {
            id : 2,
            name: 'Product 2',
            price: '$350',
            picture: 'https://www.ikea.com/PIAimages/0631750_PE695177_S5.JPG?f=xxs'
        },
        {
            id : 3,
            name: 'Product 3',
            price: '$350',
            picture: 'https://www.ikea.com/PIAimages/0631750_PE695177_S5.JPG?f=xxs'
        }
    ];
    
    //on change of Quantity, append that in the correct array element
    handleQuantityChange(event){
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
    handleSearchKeyChange(event){
        const searchKey = event.target.value.toLowerCase();        
        this.products = this.allProducts.filter(
            product => product.name.toLowerCase().includes(searchKey)
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
}