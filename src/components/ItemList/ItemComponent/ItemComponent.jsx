import axios from 'axios';


function ItemComponent({ item, fetchItems }){
    function setBought(id){
        axios({
            method: 'PUT',
            url: `/api/items/purchased/${id}`,
        }).then(function(response) {
            fetchItems();
        }).catch(function(error) {
            console.log('Error in PUT', error);
            alert('Unable to edit item at this time. Please try again later.');
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


    return (
        <div className={item.isPurchased ? "purchased item" : "item"}>
            <p><strong>Item: </strong>{item.name}</p>
            <p>{item.quantity} {item.unit || 'units'}</p>
            <p>Price: ${item.quantity*item.pricePerUnit}</p>
            <p>
                {item.isPurchased?<>purchased</>:<><button className='delete' onClick={() => {deleteItem(event)}}>Delete</button> 
            <button className='purchase' onClick={() => setBought(item.id)}>Purchase</button></>}
            </p>
        </div>
    )
}
export default ItemComponent;