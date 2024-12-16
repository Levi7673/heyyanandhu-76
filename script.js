/* import { createNavigation } from './components/Navigation.js';
import { createMovingBoxes } from './components/MovingBoxes.js';

// Replace existing navigation with new responsive navigation
const oldNav = document.querySelector('nav');
const newNav = createNavigation();
oldNav.parentNode.replaceChild(newNav, oldNav);

// Add moving boxes after the main heading
const main = document.querySelector('main');
const movingBoxes = createMovingBoxes();
main.insertBefore(movingBoxes, main.children[1]); // Insert after the first section

*/
// Only import and create navigation for all pages
import { createNavigation } from './components/Navigation.js';

// Replace existing navigation with new responsive navigation
const oldNav = document.querySelector('nav');
const newNav = createNavigation();
oldNav.parentNode.replaceChild(newNav, oldNav);

// Image Slider
function createImageSlider() {
    const sliderTrack = document.querySelector('.slider-track');
    const images = [1, 2, 3, 4, 5, 6];
    const doubledImages = [...images, ...images];
  
    doubledImages.forEach(num => {
      const div = document.createElement('div');
      div.className = 'slider-item';
      div.style.flexShrink = '0';
      div.style.width = '18rem';
      div.style.height = '12rem';
      div.style.borderRadius = '0.5rem';
      div.style.overflow = 'hidden';
  
      const img = document.createElement('img');
      img.src = `/images/slider-${num}.jpg`;
      img.alt = `Slide ${num}`;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
  
      div.appendChild(img);
      sliderTrack.appendChild(div);
    });
  }
  
  // FAQ Section
  function createFAQ() {
    const faqList = document.querySelector('.faq-list');
    const faqs = [
      {
        question: "What programs do you offer?",
        answer: "We offer a wide range of undergraduate and graduate programs across various disciplines."
      },
      {
        question: "How can I apply?",
        answer: "You can apply through our online application portal or visit our admissions office."
      },
      {
        question: "What are the admission requirements?",
        answer: "Requirements vary by program. Generally, we look at academic performance, test scores, and extracurricular activities."
      },
      {
        question: "Are scholarships available?",
        answer: "Yes, we offer merit-based and need-based scholarships. Contact our financial aid office for details."
      },
      {
        question: "What is campus life like?",
        answer: "Our campus offers a vibrant community with numerous clubs, sports teams, and cultural events."
      }
    ];
  
    faqs.forEach(faq => {
      const faqItem = document.createElement('div');
      faqItem.className = 'faq-item';
  
      const question = document.createElement('div');
      question.className = 'faq-question';
      question.innerHTML = `
        ${faq.question}
        <i class="fas fa-chevron-down"></i>
      `;
  
      const answer = document.createElement('div');
      answer.className = 'faq-answer';
      answer.textContent = faq.answer;
  
      faqItem.appendChild(question);
      faqItem.appendChild(answer);
      faqList.appendChild(faqItem);
  
      question.addEventListener('click', () => {
        const isActive = answer.classList.contains('active');
        // Close all other answers
        document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('active'));
        document.querySelectorAll('.fa-chevron-down').forEach(icon => {
          icon.style.transform = 'rotate(0deg)';
        });
  
        // Toggle current answer
        if (!isActive) {
          answer.classList.add('active');
          question.querySelector('.fa-chevron-down').style.transform = 'rotate(180deg)';
        }
      });
    });
  }
  
  // Header Animation
  function initializeHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
  
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
  
      if (currentScroll <= 0) {
        header.style.transform = 'translateY(0)';
      } else if (currentScroll > lastScroll) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
  
      lastScroll = currentScroll;
    });
  }
  
  // Initialize everything when the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    createImageSlider();
    createFAQ();
    initializeHeader();
  });
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });