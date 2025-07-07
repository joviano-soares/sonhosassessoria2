document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const btnAbrirMenu = document.getElementById('btn-menu');
    const menuMobile = document.getElementById('menu-mobile');
    const btnFecharMenu = document.querySelector('.btn-fechar-menu');
    const mobileMenuLinks = document.querySelectorAll('#menu-mobile ul li a');

    function toggleMenu() {
        menuMobile.classList.toggle('abrir-menu');
    }

    btnAbrirMenu.addEventListener('click', toggleMenu);
    btnFecharMenu.addEventListener('click', toggleMenu);

    // Close mobile menu when a link is clicked
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- Image Slider ---
    const sliderBoxes = document.querySelectorAll('.slider-box');
    const prevButton = document.getElementById('anterior');
    const nextButton = document.getElementById('proxima');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        sliderBoxes.forEach((box, i) => {
            box.classList.remove('ativo');
            if (i === index) {
                box.classList.add('ativo');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % sliderBoxes.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + sliderBoxes.length) % sliderBoxes.length;
        showSlide(currentSlide);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    prevButton.addEventListener('click', () => {
        stopSlider();
        prevSlide();
        startSlider(); // Restart timer after manual navigation
    });

    nextButton.addEventListener('click', () => {
        stopSlider();
        nextSlide();
        startSlider(); // Restart timer after manual navigation
    });

    showSlide(currentSlide); // Show the first slide initially
    startSlider(); // Start automatic slider

    // --- Image Modal (for Gallery and Testimonials) ---
    const modal = document.querySelector('.modal');
    const modalImg = document.getElementById('imgModal');
    const closeBtn = document.querySelector('.modal .close');

    function openModal(src) {
        modal.style.display = 'block';
        modalImg.src = src;
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    document.querySelectorAll('.image-item img').forEach(item => {
        item.addEventListener('click', () => openModal(item.src));
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // --- Scroll Animations (Intersection Observer) ---
    const sectionsToAnimate = document.querySelectorAll('.sobre-container, .galeria, .depoimentos, .contato-container');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Remove animations if they are one-time to prevent re-triggering on scroll
                if (entry.target.classList.contains('sobre-container')) {
                    entry.target.querySelector('img').style.animation = 'none';
                    entry.target.querySelector('.sobre-text').style.animation = 'none';
                } else if (entry.target.classList.contains('contato-container')) {
                     entry.target.style.animation = 'none';
                }
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sectionsToAnimate.forEach(section => {
        // Initially hide elements for animation
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });

    // Special handling for the .sobre-content elements as they have nested animations
    const sobreImage = document.querySelector('.sobre-content img');
    const sobreText = document.querySelector('.sobre-text');

    const sobreObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sobreImage.style.opacity = '1';
                sobreImage.style.transform = 'translateX(0)';
                sobreText.style.opacity = '1';
                sobreText.style.transform = 'translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of the sobre section is visible

    if (sobreImage && sobreText) {
        sobreImage.style.opacity = '0';
        sobreImage.style.transform = 'translateX(-20px)';
        sobreImage.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

        sobreText.style.opacity = '0';
        sobreText.style.transform = 'translateX(20px)';
        sobreText.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

        const sobreSection = document.getElementById('sobre');
        if (sobreSection) {
            sobreObserver.observe(sobreSection);
        }
    }
});
