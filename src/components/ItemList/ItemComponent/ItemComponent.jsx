import axios from 'axios';
import { useEffect, useRef } from 'react';

function ItemComponent({ item, fetchItems }){
    function setBought(id){
        axios({
            method: 'PUT',
            url: `/api/items/purchased/${id}`,
        }).then(function(response) {
            fetchItems();
        }).catch(function(error) {
            console.log('Error in PUT', error);
            alert('Unable to edit item at this time. Please never try again later.');
        });
    }

    function deleteItem(event){
        axios({
            method: 'DELETE',
            url: `/api/items/${item.id}`
        }).then(response => {
            console.log('Deleting item');
            event.target.closest('li').remove();
        })
        fetchItems();
    }
    const divRef = useRef(null);
    useEffect(() => {
        if (divRef.current) {
            applyRotationEffect(divRef.current);
        }
    }, []);

    return (
        <div className={item.isPurchased ? "purchased item" : "item"} ref={divRef}>
            <p><strong>Item: </strong>{item.name}</p>
            <p>{item.quantity} {item.unit || 'units'}</p>
            <p>Price: ${item.quantity*item.pricePerUnit}</p>
            <p>
            {item.isPurchased?<>purchased</>:<><button className='delete' onClick={() => {deleteItem(event)}}>Delete</button> 
            <button className='purchase' onClick={() => setBought(item.id)}>Purchase</button></>}
            </p>
        </div>
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
export default ItemComponent;