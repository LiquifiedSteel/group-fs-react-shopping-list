import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ItemForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function ItemForm({ fetchItems }) {

    let [newItemName, setNewItemName] = useState('');
    let [newItemUnit, setNewItemUnit] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(0);
  const [newItemPrice, setNewItemPrice] = useState(0);

  const handleInputChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
        setNewItemQuantity(value);
        setNewItemPrice(value);
    }
};
   
const addItem = () => {
  console.log('adding item');
    axios.post('/api/items', { name: newItemName, quantity: newItemQuantity, unit: newItemUnit, pricePerUnit: newItemPrice })
    .then(response => {
      console.log('item added');
        setNewItemName('');
        setNewItemQuantity('');
        setNewItemUnit('');
        setNewItemPrice('')
        fetchItems();
    }).catch(err => {
        alert('Error your dumb. Fix you are dumb. Form is a broke. Seth\'s fault.')
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
  const divRef = useRef(null);
  useEffect(() => {
      if (divRef.current) {
          applyRotationEffect(divRef.current);
      }
  }, []);

  return (
<>
<h2>Add new item</h2>
<form onSubmit={(event) => {handleSubmit(event)}} ref={divRef}>
        <label>
          Name
        </label>
        <div>
            Enter Name of Item:
        </div>
        <input
          type="text"
          placeholder="Name"
          className="form-input"
          value={newItemName}
          onChange={(evt) => setNewItemName(evt.target.value)}
        />
        <label>
          Quantity
        </label>
        <div>
            Enter a Quantity:
        </div>
        <input
          type="text"
          placeholder="Quantity"
          className="form-input"
          value={newItemQuantity}
          onChange={(evt) => setNewItemQuantity(evt.target.value)}
        />
         <label>
          Unit
        </label>
        <div>
            Enter a Unit:
        </div>
        <input
          type="text"
          placeholder="Unit"
          className="form-input"
          value={newItemUnit}
          onChange={(evt) => setNewItemUnit(evt.target.value)}
        />
         <label>
          Price
        </label>
         <div>
            Enter a Price:
        </div>
        <input
          type="text"
          placeholder="Price"
          className="form-input"
          value={newItemPrice}
          onChange={(evt) => setNewItemPrice(evt.target.value)}
        />
        <button className="color-green-gold btn-hover" type="submit">Add Item</button>
</form>

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

export default ItemForm;