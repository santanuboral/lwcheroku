import { LightningElement, api } from 'lwc';

export default class ProductItemTile extends LightningElement {
    @api product;

    handleQuantityChange(event) {
        this.dispatchEvent(
            new CustomEvent('qtyupdate', {
                detail: {
                    productId: this.product.id,
                    quantity: event.target.value
                }
            })
        );
    }
}
