/* ===================================
   Immersive Hero Slider Functionality
   =================================== */

(function() {
    'use strict';

    const slider = document.querySelector('.landing-slider');
    if (!slider) {
        return;
    }

    const slides = Array.from(slider.querySelectorAll('.slider-slide'));
    if (!slides.length) {
        return;
    }

    const prevButton = slider.querySelector('.slider-arrow--prev');
    const nextButton = slider.querySelector('.slider-arrow--next');
    const autoplayDelay = Number(slider.dataset.autoplay) || 0;

    let currentIndex = slides.findIndex(slide => slide.classList.contains('is-active'));
    if (currentIndex === -1) {
        currentIndex = 0;
    }

    let autoplayTimer = null;
    const hasAutoplay = autoplayDelay > 0;

    goToSlide(currentIndex, true);

    if (hasAutoplay) {
        autoplayTimer = startAutoplay();
        slider.addEventListener('focusin', pauseAutoplay);
        slider.addEventListener('focusout', () => {
            // Delay restart slightly to prevent flicker when tabbing through CTA buttons
            window.setTimeout(resetAutoplay, 150);
        });
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                pauseAutoplay();
            } else {
                resetAutoplay();
            }
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            resetAutoplay();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            resetAutoplay();
        });
    }

    slider.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            goToSlide(currentIndex - 1);
            resetAutoplay();
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            goToSlide(currentIndex + 1);
            resetAutoplay();
        }
    });

    let touchStartX = null;
    let touchStartTime = 0;

    slider.addEventListener('touchstart', (event) => {
        if (event.touches.length !== 1) {
            return;
        }

        touchStartX = event.touches[0].clientX;
        touchStartTime = Date.now();
        pauseAutoplay();
    }, { passive: true });

    slider.addEventListener('touchend', (event) => {
        if (touchStartX === null) {
            return;
        }

        const deltaX = event.changedTouches[0].clientX - touchStartX;
        const deltaTime = Date.now() - touchStartTime;

        if (Math.abs(deltaX) > 60 && deltaTime < 800) {
            if (deltaX > 0) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(currentIndex + 1);
            }
        }

        touchStartX = null;
        touchStartTime = 0;
        resetAutoplay();
    });

    function goToSlide(targetIndex, initial = false) {
        const totalSlides = slides.length;
        const normalizedIndex = ((targetIndex % totalSlides) + totalSlides) % totalSlides;

        slides.forEach((slide, index) => {
            const isActive = index === normalizedIndex;
            
            // Reset animations for all slides first
            slide.classList.remove('is-active');
            slide.setAttribute('aria-hidden', String(!isActive));
            
            if (isActive) {
                // Small delay to ensure reset, then activate
                setTimeout(() => {
                    slide.classList.add('is-active');
                }, 50);
            }
        });

        currentIndex = normalizedIndex;

        if (!initial) {
            slider.dispatchEvent(new CustomEvent('sliderchange', {
                detail: { index: currentIndex }
            }));
        }
    }

    function startAutoplay() {
        if (!hasAutoplay) {
            return null;
        }
        return window.setInterval(() => {
            goToSlide(currentIndex + 1);
        }, autoplayDelay);
    }

    function pauseAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    function resetAutoplay() {
        if (!hasAutoplay) {
            return;
        }
        pauseAutoplay();
        autoplayTimer = startAutoplay();
    }

})();
