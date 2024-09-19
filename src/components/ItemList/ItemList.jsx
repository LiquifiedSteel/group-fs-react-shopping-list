import ItemComponent from './ItemComponent/ItemComponent';
import axios from 'axios';
import './ItemList.css'

function ItemList({ items, fetchItems }){
        function clearAll(event){
            if(confirm('Are you sure you want to clear the list?')){
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
    return(
        <>
        <h2>Shopping List</h2>

        <div className='items'>
            <p>
              <button className='listButton' id='clear' onClick={(event) => {clearAll(event)}}>Clear List</button>
              <button className='listButton' id='reset' onClick={() => {location.reload()}}>Reset</button>
            </p>
            {items.map((item) => <ItemComponent item={item} key={item.id} fetchItems={fetchItems}/>)}
        </div>
        </>
    )
}

export default ItemList;