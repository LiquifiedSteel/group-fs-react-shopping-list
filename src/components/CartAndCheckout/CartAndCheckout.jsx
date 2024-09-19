import TotalPrice from './TotalPrice/TotalPrice';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CartAndCheckout.css'
import {useState, useEffect} from 'react';

function CartAndCheckout({items}){
    const [numItems, setNumItems] = useState(0);
   
    function inCart() {
        let numberItems = 0;
        for(let item of items) {
            if(item.isPurchased){
                numberItems +=1
            }
        }
        return numberItems;
    }
    

    useEffect(() => {
        setNumItems(inCart());
    }, [items]);
    return(
        <>
        <TotalPrice items={items} />
        
        
        <div className='row sub-header'>

        <button className="col butt">View Cart 🛒 {numItems}</button>
        <button className="col butt">Proceed to Checkout</button>
        </div>
        </>
    )
}
export default CartAndCheckout;