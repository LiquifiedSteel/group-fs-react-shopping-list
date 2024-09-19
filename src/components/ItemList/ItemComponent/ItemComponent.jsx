import {useState} from 'react';
import axios from 'axios';


function ItemComponent({ item }){
    const [bought, setBought] = useState(false);
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
        <div className='item'>
            <p><strong>Item:</strong>{item.name}</p>
            <p>{item.quantity} {item.unit || 'units'}</p>
            <p>{bought?<>purchased</>:<><button className='delete' onClick={() => {deleteItem(event)}}>Delete</button> <button className='purchase' onClick={() => setBought(true)}>Purchase</button></>}</p>
        </div>
    )
}
export default ItemComponent;