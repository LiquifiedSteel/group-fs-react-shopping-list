import React from 'react';
import './Header.css';
import { useEffect, useRef } from 'react';

function Header() {
    const headerRef = useRef(null);
    useEffect(() => {
        if (headerRef.current) {
            applyRotationEffect(headerRef.current);
        }
    }, []);
    return (
        <header className="banner-header card" ref={headerRef}>
            <h1>Shopping List</h1>
        </header>
    );
}

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


export default Header;
