import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ItemForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function ItemForm({ fetchItems }) {

  const divRef = useRef(null);
  let velocity = { x: 0, y: 0 };
  let acceleration = { x: 0, y: 0 };
  let position = { x: 0, y: 0 }; 
  const maxSpeed = 10;
  const friction = 0.9;

  useEffect(() => {
      const element = divRef.current;
      if (element) {
          const moveAwayFromMouse = handleMouseMovement;
          
          element.addEventListener("mousemove", moveAwayFromMouse);

          updatePosition();
          // applyRotationAndMovementEffect();
          return () => {
              element.removeEventListener("mousemove", moveAwayFromMouse);
          };
      }
  }, []);
  

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

  function handleMouseMovement(event) {
    const element = divRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const itemX = rect.left + rect.width / 2;
    const itemY = rect.top + rect.height / 2;

    const dx = itemX - mouseX;
    const dy = itemY - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 200) {
        const forceMagnitude = (200 - distance) / 200; 
        acceleration.x = (dx / distance) * forceMagnitude;
        acceleration.y = (dy / distance) * forceMagnitude;
    } else {
        acceleration.x = 0;
        acceleration.y = 0;
    }
}

function updatePosition() {

    velocity.x += acceleration.x;
    velocity.y += acceleration.y;

    velocity.x = Math.min(maxSpeed, Math.max(-maxSpeed, velocity.x));
    velocity.y = Math.min(maxSpeed, Math.max(-maxSpeed, velocity.y));

    velocity.x *= friction;
    velocity.y *= friction;

    position.x += velocity.x;
    position.y += velocity.y;

    const element = divRef.current;
    if (element) {
        element.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }

    requestAnimationFrame(updatePosition);
}

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