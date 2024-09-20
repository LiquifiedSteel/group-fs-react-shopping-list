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
          applyRotationAndMovementEffect(divRef.current);
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
  function applyRotationAndMovementEffect(element) {
    let currentAngle = 0;
    let movementTimestamp = 0;
    let animationFrameId = null;

    
    const moveRandomly = () => {
        const randomX = Math.random() * (window.innerWidth - element.offsetWidth);
        const randomY = Math.random() * (window.innerHeight - element.offsetHeight);

        element.style.position = 'absolute'; 
        element.style.left = `${randomX}px`;
        element.style.top = `${randomY}px`;
    };

   
    const rotateAndMove = (timestamp) => {
        if (!movementTimestamp) movementTimestamp = timestamp;

        const elapsed = timestamp - movementTimestamp;

        // Rotate continuously
        currentAngle += 0.2; 
        element.style.transform = `rotate(${currentAngle}deg)`;

        // Move every second (1000ms)
        if (elapsed >= 1000) {
            moveRandomly();
            movementTimestamp = timestamp; 
        }

        animationFrameId = requestAnimationFrame(rotateAndMove); 
    };

    element.addEventListener("mouseenter", () => {
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(rotateAndMove);
        }
    });

    element.addEventListener("mouseleave", () => {
        cancelAnimationFrame(animationFrameId); 
        animationFrameId = null;
    });
  }

}

export default ItemForm;