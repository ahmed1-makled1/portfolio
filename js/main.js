/**
 * Main Application Entry Point
 * Orchestrates data loading and rendering
 */

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize mobile menu toggle
    initMobileMenu();

    // Initialize dark mode
    initDarkMode();

    // Load data and render content
    try {
        console.log('Starting data load...');
        const data = await DataLoader.loadAllData();
        console.log('Data loaded:', data);
        Renderers.renderAll(data);
        console.log('Rendering complete');
    } catch (error) {
        console.error('Failed to initialize application:', error);
    }
});

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

/**
 * Initialize dark mode toggle
 */
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle?.querySelector('i');

    if (!themeToggle || !icon) return;

    // Function to set theme
    function setDarkMode(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            document.body.classList.remove('dark-mode');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    }

    // Check saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        setDarkMode(true);
    }

    // Toggle on click
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        setDarkMode(!isDark);
    });
}
