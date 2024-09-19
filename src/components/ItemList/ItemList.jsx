import ItemComponent from './ItemComponent/ItemComponent';

function ItemList({ items, fetchItems }){
    
    return(
        <>
        <ul>
            {items.map((item) => <ItemComponent item={item} key={item.id}/>)}
        </ul>
        </>
    )
}

export default ItemList;