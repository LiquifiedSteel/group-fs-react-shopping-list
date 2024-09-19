import {useState} from 'react';
import axios from 'axios';
function ItemComponent({ item }){
    function deleteItem(event){
        axios({
            method: 'DELETE',
            url: `/api/items/${item.id}`
        }).then(response => {
            console.log('Deleting item');
            event.target.closest('li').remove();
        })
    }


    return (
        <li>
            <p><strong>Item:</strong>{item.name}</p>
            <p>{item.quantity} {item.unit || 'units'}</p>
            <p style="wi"><button onClick={() => {deleteItem(event)}}>Delete</button> <button onClick={() => bought()}>Purchase</button></p>
        </li>
    )
}
export default ItemComponent;