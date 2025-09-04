// Burger menu toggle
document.getElementById('menu-toggle').onclick = function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
};

// Lightbox functionality
function openLightbox(element) {
    const imageSrc = element.getAttribute('data-src');
    document.getElementById('lightbox-img').src = imageSrc;
    document.getElementById('lightbox-img').alt = element.querySelector('img').alt;
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Close lightbox on outside click
document.getElementById('lightbox').onclick = function(e) {
    if (e.target === this) closeLightbox();
};

// Testimonial Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-track');
    const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
    const nextButton = document.querySelector('.testimonial-next');
    const prevButton = document.querySelector('.testimonial-prev');
    const indicators = Array.from(document.querySelectorAll('.indicator'));
    
    let currentIndex = 0;
    let autoplayInterval;
    const slideWidth = 100; // 100%
    const slidesCount = slides.length;
    
    // Initialize carousel
    function initCarousel() {
        updateSlidePosition();
        startAutoplay();
        
        // Event listeners
        nextButton.addEventListener('click', moveToNextSlide);
        prevButton.addEventListener('click', moveToPrevSlide);
        
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                moveToSlide(slideIndex);
            });
        });
        
        // Pause autoplay on hover/focus
        track.addEventListener('mouseenter', stopAutoplay);
        track.addEventListener('mouseleave', startAutoplay);
        track.addEventListener('focusin', stopAutoplay);
        track.addEventListener('focusout', startAutoplay);
        
        // Keyboard navigation
        slides.forEach(slide => {
            slide.addEventListener('keydown', handleKeyboardNavigation);
        });
    }
    
    // Update slide position
    function updateSlidePosition() {
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        
        // Update active indicator
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-current', 'true');
            } else {
                indicator.classList.remove('active');
                indicator.removeAttribute('aria-current');
            }
        });
    }
    
    // Move to next slide
    function moveToNextSlide() {
        currentIndex = (currentIndex + 1) % slidesCount;
        updateSlidePosition();
    }
    
    // Move to previous slide
    function moveToPrevSlide() {
        currentIndex = (currentIndex - 1 + slidesCount) % slidesCount;
        updateSlidePosition();
    }
    
    // Move to specific slide
    function moveToSlide(index) {
        currentIndex = index;
        updateSlidePosition();
    }
    
    // Start autoplay
    function startAutoplay() {
        stopAutoplay(); // Clear any existing interval
        autoplayInterval = setInterval(moveToNextSlide, 5000);
    }
    
    // Stop autoplay
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Handle keyboard navigation
    function handleKeyboardNavigation(e) {
        switch(e.key) {
            case 'ArrowRight':
                moveToNextSlide();
                break;
            case 'ArrowLeft':
                moveToPrevSlide();
                break;
            case 'Home':
                moveToSlide(0);
                break;
            case 'End':
                moveToSlide(slidesCount - 1);
                break;
        }
    }
    
    // Initialize the carousel
    if (track && slides.length > 0) {
        initCarousel();
    }
});