import React, { useEffect, useRef } from 'react';
import './Header.css';

function Header() {
    const headerRef = useRef(null);

    useEffect(() => {
        if (headerRef.current) {
            applyRotationAndMovementEffect(headerRef.current);
        }
    }, []);

    return (
        <header className="banner-header card" ref={headerRef}>
            <h1>Shopping List</h1>
        </header>
    );
}

// Function to apply both rotation and random movement
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

export default Header;
