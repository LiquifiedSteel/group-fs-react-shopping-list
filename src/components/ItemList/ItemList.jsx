import ItemComponent from './ItemComponent/ItemComponent';
import axios from 'axios';
import './ItemList.css'
import 'bootstrap/dist/css/bootstrap.min.css';

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
                <div className="row">
                {items.map((item) => <ItemComponent item={item} key={item.id} fetchItems={fetchItems}/>)}
                </div>
            </div>
        </>
    )
}

export default ItemList;