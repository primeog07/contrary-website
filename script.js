// Add subtle scroll reveal effects and dynamic interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Reveal Options
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animateElements = document.querySelectorAll(
        '.downloader-content, .donation-card, .section-header, .hero-content'
    );
    
    // Set initial state
    animateElements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        // Add a slight stagger effect based on order
        el.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
        observer.observe(el);
    });

    // Mock progress bar simulator for the window mockup
    const mockStatusText = document.querySelector('.mock-status');
    const mockStates = [
        "Connecting to servers...",
        "Fetching game library...",
        "Applying optimizations...",
        "Ready to download."
    ];
    let stateIndex = 0;

    if (mockStatusText) {
        setInterval(() => {
            stateIndex = (stateIndex + 1) % mockStates.length;
            mockStatusText.style.opacity = '0';
            setTimeout(() => {
                mockStatusText.textContent = mockStates[stateIndex];
                mockStatusText.style.opacity = '1';
                mockStatusText.style.transition = 'opacity 0.3s ease';
            }, 300);
        }, 3500);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a, .cta-group a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}
