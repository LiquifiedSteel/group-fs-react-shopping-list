import ItemComponent from './ItemComponent/ItemComponent';
import axios from 'axios';
import './ItemList.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef } from 'react';

function ItemList({ items, fetchItems }){
        function clearAll(event){
            if(confirm('Are you sure you want to clear the list ya booty warrior?')){
            for(let item of items){
                axios({
                    method: "DELETE",
                    url: `/api/items/${item.id}`
                }).then(response => {
                    console.log('deleting', item.id)
                    fetchItems();
                })
                .catch(err => console.error('error deleting', err));
            }
            
         }
        }
        function resetPurchases() {
            for (let item of items) {
                if (item.isPurchased) {
                    axios({
                        method: "PUT",
                        url: `/api/items/purchased/${item.id}`
                    }).then(response => {
                        console.log('resetting', item.id);
                        fetchItems();
                    }).catch(err => console.error('error resetting', err));
                }
            }
            
        }
        const divRef = useRef(null);
        useEffect(() => {
            if (divRef.current) {
                applyRotationEffect(divRef.current);
            }
        }, []);
    return(
        <>
        <h2>Shopping List</h2>

            <div className='items'>
                <div className="row">
                <div className='col'>
                    <button className='listButton color-purple-gold btn-hover-center' id='clear' onClick={(event) => {clearAll(event)}}>Clear List</button>
                </div>
                <div className='col'>
                    <button className='listButton color-yellow-red btn-hover-center' id='reset' onClick={() => {resetPurchases()}}>Reset</button>
                </div>
                
                </div>
                <div className="row" ref={divRef}>
                {items.map((item) => <ItemComponent item={item} key={item.id} fetchItems={fetchItems}/>)}
                </div>
            </div>
        </>
    )
    function applyRotationEffect(element) {
        let currentAngle = 0;
        let lastTimestamp = null;
    
        element.addEventListener("mouseenter", () => {
          lastTimestamp = Date.now();
          element.style.transition = "transform 5s linear";
          element.style.transform = `rotate(${currentAngle + 360}deg)`;
        });
    
        element.addEventListener("mouseleave", () => {
          const elapsed = Date.now() - lastTimestamp;
          const percentComplete = elapsed / 5000;
          currentAngle += percentComplete * 360;
          element.style.transition = "none";
          element.style.transform = `rotate(${currentAngle}deg)`;
        });
    }
}

export default ItemList;