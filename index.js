import { createNavigation } from './components/Navigation.js';
import { createMovingBoxes } from './components/MovingBoxes.js';

// Replace existing navigation with new responsive navigation
const oldNav = document.querySelector('nav');
const newNav = createNavigation();
oldNav.parentNode.replaceChild(newNav, oldNav);

// Add moving boxes after the main heading
const main = document.querySelector('main');
const movingBoxes = createMovingBoxes();
main.insertBefore(movingBoxes, main.children[1]); // Insert after the first section

// JavaScript
document.addEventListener('scroll', () => {
    const photo = document.querySelector('.scroll-animate'); // Select the image
    const scrollPosition = window.scrollY; // Current scroll position
    const moveDistance = Math.min(scrollPosition / 5, 100); // Control upward movement (max 100px)

    // Apply the dynamic transform
    photo.style.transform = `translateY(-${moveDistance}px)`;
});



document.addEventListener('DOMContentLoaded', () => {
    const target = document.querySelector('.scroll-animate'); // Select the image

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Move the image upward when it enters the viewport
                target.style.transform = 'translateY(-50px)';
            } else {
                // Reset the position when it leaves the viewport
                target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.11 }); // Trigger when 10% of the element is visible

    observer.observe(target); // Observe the target element
});