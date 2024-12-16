import { createNavigation } from './components/Navigation.js';

// Replace navigation
const oldNav = document.querySelector('nav');
const newNav = createNavigation();
oldNav.parentNode.replaceChild(newNav, oldNav);

// Create gallery items
function createGalleryItems() {
  const galleryGrid = document.getElementById('gallery-grid');
  
  // Create 50 gallery items
  for (let i = 1; i <= 10; i++) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    const img = document.createElement('img');
    img.src = `/assets/gallery/photo${i}.jpg`;
    img.alt = `Gallery Photo ${i}`;
    img.className = 'gallery-image';
    
    const overlay = document.createElement('div');
    overlay.className = 'gallery-overlay';
    overlay.textContent = `Photo ${i}`;
    
    item.appendChild(img);
    item.appendChild(overlay);
    galleryGrid.appendChild(item);
  }
}

// Handle comments
function handleComments() {
  const commentForm = document.getElementById('comment-form');
  const commentsContainer = document.getElementById('comments-container');

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const textarea = commentForm.querySelector('textarea');
    const comment = textarea.value.trim();

    if (comment) {
      const commentElement = document.createElement('div');
      commentElement.className = 'comment';
      commentElement.textContent = comment;
      
      commentsContainer.appendChild(commentElement);
      textarea.value = '';
    }
  });
}

// Initialize gallery and comments
createGalleryItems();
handleComments();