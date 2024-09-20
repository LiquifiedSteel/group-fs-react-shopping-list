import axios from 'axios';
import { useEffect, useRef } from 'react';

function ItemComponent({ item, fetchItems }) {
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

            return () => {
                element.removeEventListener("mousemove", moveAwayFromMouse);
            };
        }
    }, []);

    function setBought(id) {
        axios({
            method: 'PUT',
            url: `/api/items/purchased/${id}`,
        })
        .then(function(response) {
            fetchItems();
        })
        .catch(function(error) {
            console.log('Error in PUT', error);
            alert('Unable to edit item at this time. Please try again later.');
        });
    }

    function deleteItem(event) {
        axios({
            method: 'DELETE',
            url: `/api/items/${item.id}`
        })
        .then(response => {
            console.log('Deleting item');
            event.target.closest('li').remove();
            fetchItems();
        })
        .catch(function(error) {
            console.log('Error in DELETE', error);
            alert('Unable to delete item at this time.');
        });
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
        <div className={item.isPurchased ? "purchased item" : "item"} ref={divRef}>
            <p><strong>Item: </strong>{item.name}</p>
            <p>{item.quantity} {item.unit || 'units'}</p>
            <p>Price: ${item.quantity * item.pricePerUnit}</p>
            <p>
                {item.isPurchased ? <>purchased</> : <>
                    <button className='delete' onClick={(e) => deleteItem(e)}>Delete</button>
                    <button className='purchase' onClick={() => setBought(item.id)}>Purchase</button>
                </>}
            </p>
        </div>
    );
}

export default ItemComponent;
