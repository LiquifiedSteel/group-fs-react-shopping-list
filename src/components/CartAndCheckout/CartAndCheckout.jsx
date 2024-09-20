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
    
    
    function spinTime1() {
        let counter = 0;
        setInterval(() => {
             const btn = document.getElementById("cartBtn");
            if (!btn.classList.contains("spinTime")) {
                console.log("start");
                btn.classList.add("spinTime");
                counter = 0;
            } else if (counter === 10) {
                btn.classList.remove("spinTime");
                console.log("stop")
            } else {
                counter++;
                console.log(counter);
            }
        }, 1000)
    }

    function spinTime2() {
        let counter = 0;
        setInterval(() => {
             const btn = document.getElementById("checkout");
            if (!btn.classList.contains("spinTime")) {
                console.log("start");
                btn.classList.add("spinTime");
                counter = 0;
            } else if (counter === 10) {
                btn.classList.remove("spinTime");
                console.log("stop")
            } else {
                counter++;
                console.log(counter);
            }
        }, 1000)
    }

    useEffect(() => {
        setNumItems(inCart());
    }, [items]);
    return(
        <>
        <TotalPrice items={items} />
        
        
        <div className='row sub-header'>

        <button id='cartBtn' onMouseOver={() => spinTime1()} className="col butt">View Cart 🛒 {numItems}</button>
        <button id='checkout' onMouseOver={() => spinTime2()} className="col butt">Proceed to Checkout</button>
        </div>
        </>
    )
}
export default CartAndCheckout;