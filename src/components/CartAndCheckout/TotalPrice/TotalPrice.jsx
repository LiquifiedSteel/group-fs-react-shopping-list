import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TotalPrice({items}){
    const[totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        let price = 0;
        for(let item of items){
            if(item.isPurchased){
                price += (item.quantity * item.pricePerUnit)
            }
        }
        setTotalPrice(price);
    },[items])
    return(
        <h2> Current Cart Total: ${totalPrice} </h2>
    )
}
export default TotalPrice;