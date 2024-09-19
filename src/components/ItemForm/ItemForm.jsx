import { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemForm.css';

function ItemForm({ fetchItems }) {

    let [newItemName, setNewItemName] = useState('');
    let [newItemUnit, setNewItemUnit] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(0);

  const handleInputChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
        setNewItemQuantity(value);
    }
};
   
const addItem = () => {
  console.log('adding item');
    axios.post('/api/items', { name: newItemName, quantity: newItemQuantity, unit: newItemUnit })
    .then(response => {
      console.log('item added');
        setNewItemName('');
        setNewItemQuantity('');
        setNewItemUnit('');
        console.log(newItemName)
        fetchItems();
    }).catch(err => {
        alert('Error your dumb. Fix you are dumb.')
        console.log(err)
    })
}
const handleSubmit = (event) => {
    event.preventDefault();
    if (newItemName && newItemQuantity) {
      addItem();
    }
    else {
      alert('Hey stinky! you needs a name! and an amount, and an unit!!!');
    }
  }

  return (
<>
<h2>Add new item man </h2>
<form onSubmit={(event) => {handleSubmit(event)}}>
        <label>
          Name
        </label>
        <input
          type="text"
          placeholder="Name"
          value={newItemName}
          onChange={(evt) => setNewItemName(evt.target.value)}
        />
        <div>
            Would you please put in a quantatity
        </div>
        <label>
          Quantotity
        </label>
        <input
          type="text"
          placeholder="Quantity"
          value={newItemQuantity}
          onChange={(evt) => setNewItemQuantity(evt.target.value)}
        />
        <div>
            Maybe a unit.............
        </div>
        <label>
          Unit
        </label>
        <input
          type="text"
          placeholder="Unit"
          value={newItemUnit}
          onChange={(evt) => setNewItemUnit(evt.target.value)}
        />
        <button type="submit">Add Item</button>
</form>

</>
  )


}

export default ItemForm;