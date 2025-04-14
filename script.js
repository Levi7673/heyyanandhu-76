// Prevent right-click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Prevent keyboard shortcuts and F12
document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        return false;
    }
});

// Interactive Grid Background
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('gridCanvas');
    const ctx = canvas.getContext('2d');
    let mouseX = 0;
    let mouseY = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const spacing = 50;
        const dotSize = 1;
        const hoverRadius = 100;

        for(let x = 0; x <= canvas.width; x += spacing) {
            for(let y = 0; y <= canvas.height; y += spacing) {
                // Calculate distance from mouse to dot
                const distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2));
                
                // Set dot size and opacity based on distance from mouse
                let currentDotSize = dotSize;
                let opacity = 0.25;
                
                if (distance < hoverRadius) {
                    const scale = 1 - (distance / hoverRadius);
                    currentDotSize = dotSize + (scale * 2);
                    opacity = 0.25 + (scale * 0.45);
                }

                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.arc(x, y, currentDotSize, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        requestAnimationFrame(drawGrid);
    }

    drawGrid();
});

// 3D Effect (Only for home page)
if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
    document.addEventListener('mousemove', function(e) {
        const heroSection = document.querySelector('.hero-section');
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');

        if (!heroSection || !heroText || !heroImage) return;

        const xAxis = (window.innerWidth / 2 - e.pageX) / 100;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 100;

        heroSection.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        heroText.style.transform = `translateZ(30px)`;
        heroImage.style.transform = `translateZ(20px)`;
    });

    document.addEventListener('mouseleave', function() {
        const heroSection = document.querySelector('.hero-section');
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');

        if (!heroSection || !heroText || !heroImage) return;

        heroSection.style.transform = 'rotateY(0deg) rotateX(0deg)';
        heroText.style.transform = 'translateZ(30px)';
        heroImage.style.transform = 'translateZ(20px)';
    });
}

// Password Protection for Art Section
async function checkPassword() {
    const password = document.getElementById('artPassword').value;
    const modal = document.getElementById('passwordModal');
    const artGallery = document.querySelector('.art-gallery');

    try {
        const response = await fetch('/api/validate-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });

        const data = await response.json();

        if (data.valid) {
            modal.style.display = 'none';
            artGallery.classList.add('active');
            // Store the validation in session storage
            sessionStorage.setItem('artAccess', 'granted');
        } else {
            alert('Incorrect password. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
}

// Check if access was previously granted
document.addEventListener('DOMContentLoaded', function() {
    const artGallery = document.querySelector('.art-gallery');
    if (sessionStorage.getItem('artAccess') === 'granted') {
        artGallery.classList.add('active');
    }
});

// Show password modal when clicking art link
document.addEventListener('DOMContentLoaded', function() {
    const artLink = document.querySelector('a[href="art.html"]');
    const passwordModal = document.getElementById('passwordModal');
    
    if (artLink && passwordModal) {
        artLink.addEventListener('click', function(e) {
            e.preventDefault();
            passwordModal.style.display = 'flex';
        });
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const passwordModal = document.getElementById('passwordModal');
    if (e.target === passwordModal) {
        passwordModal.style.display = 'none';
    }
});

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    // Simulate page reload effect
    window.scrollTo(0, 0);
}

// Initialize slider
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.getElementById('sliderContainer');
    if (sliderContainer) {
        // Clone the items twice to ensure smooth infinite loop
        const items = sliderContainer.innerHTML;
        sliderContainer.innerHTML = items + items + items;

        // Reset animation when it ends
        sliderContainer.addEventListener('animationend', () => {
            sliderContainer.style.animation = 'none';
            sliderContainer.offsetHeight; // Trigger reflow
            sliderContainer.style.animation = null;
        });
    }
});

// Media Grid Configuration
const ITEMS_PER_PAGE = 12;

// Function to load media items
function loadMediaItems(items) {
    const grid = document.getElementById('memoriesGrid');
    if (!grid) return;

    // Clear existing content
    grid.innerHTML = '';

    // Add media items
    items.forEach((item, index) => {
        const box = document.createElement('div');
        box.className = 'memory-box';
        
        // Hide items beyond the first page initially
        if (index >= ITEMS_PER_PAGE) {
            box.style.display = 'none';
        }

        // Create media element (image or video)
        if (item.type === 'video') {
            const video = document.createElement('video');
            video.src = item.src;
            video.loop = true;
            video.muted = true;
            box.appendChild(video);

            // Add play button overlay
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            const playBtn = document.createElement('button');
            playBtn.className = 'play-button';
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            overlay.appendChild(playBtn);
            box.appendChild(overlay);

            // Add video controls
            playBtn.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    video.pause();
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
        } else {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.caption || 'Memory';
            box.appendChild(img);
        }

        // Add caption overlay if exists
        if (item.caption) {
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            const caption = document.createElement('p');
            caption.textContent = item.caption;
            overlay.appendChild(caption);
            box.appendChild(overlay);
        }

        grid.appendChild(box);
    });

    // Setup pagination
    setupPagination(items.length);
}

// Function to handle pagination
function setupPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    pagination.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.className = 'page-btn' + (i === 1 ? ' active' : '');
        button.textContent = i;
        
        button.addEventListener('click', () => {
            // Update active button
            document.querySelectorAll('.page-btn').forEach(btn => 
                btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show/hide appropriate items
            const boxes = document.querySelectorAll('.memory-box');
            boxes.forEach((box, index) => {
                const shouldShow = index >= (i - 1) * ITEMS_PER_PAGE && 
                                 index < i * ITEMS_PER_PAGE;
                box.style.display = shouldShow ? 'block' : 'none';
            });

            // Smooth scroll to top of grid
            document.querySelector('.memories-grid-container')
                .scrollIntoView({ behavior: 'smooth' });
        });
        
        pagination.appendChild(button);
    }
}

// Example usage:
document.addEventListener('DOMContentLoaded', () => {
    // Your media items data would go here
    const mediaItems = [
        // Example structure:
        // { type: 'image', src: 'path/to/image.jpg', caption: 'Caption text' },
        // { type: 'video', src: 'path/to/video.mp4', caption: 'Video caption' },
    ];

    loadMediaItems(mediaItems);
});

// Video playback functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle video playback
    document.querySelectorAll('.video-item').forEach(item => {
        const video = item.querySelector('video');
        const playBtn = item.querySelector('.play-pause');
        
        if (video && playBtn) {
            playBtn.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    this.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    video.pause();
                    this.innerHTML = '<i class="fas fa-play"></i>';
                }
            });

            // Reset play button when video ends
            video.addEventListener('ended', function() {
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            });

            // Show video controls on hover
            item.addEventListener('mouseenter', function() {
                if (!video.paused) {
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                }
            });
        }
    });

    // Memory filtering
    const memoryCategories = document.querySelectorAll('.memory-category');
    const memoryItems = document.querySelectorAll('.memory-item');
    const eventTimeline = document.querySelector('.event-timeline');
    
    memoryCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all categories
            memoryCategories.forEach(cat => cat.classList.remove('active'));
            category.classList.add('active');
            
            const filter = category.dataset.filter;
            
            // Show/hide timeline for events
            if (filter === 'events') {
                eventTimeline.classList.add('active');
            } else {
                eventTimeline.classList.remove('active');
            }
            
            // Filter memory items
            memoryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Video playback controls
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
        const video = item.querySelector('video');
        const playButton = item.querySelector('.play-button');
        const overlay = item.querySelector('.video-overlay');
        
        if (video && playButton) {
            playButton.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    playButton.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    video.pause();
                    playButton.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
            
            video.addEventListener('ended', () => {
                playButton.innerHTML = '<i class="fas fa-play"></i>';
            });
        }
        
        // Show/hide controls on hover
        if (overlay) {
            item.addEventListener('mouseenter', () => {
                overlay.style.opacity = '1';
            });
            
            item.addEventListener('mouseleave', () => {
                overlay.style.opacity = '0';
            });
        }
    });
}); 