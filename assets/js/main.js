// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    document.body.appendChild(themeToggle);

    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    }

    // Initialize project filtering if on projects page
    if (document.querySelector('.project-controls')) {
        initializeProjectFiltering();
    }
});

// Project Filtering and Search Functionality
function initializeProjectFiltering() {
    const searchInput = document.getElementById('projectSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const noResults = document.querySelector('.no-results');

    let currentFilter = 'all';
    let currentSearch = '';

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase();
            filterProjects();
        });
    }

    // Filter button functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            currentFilter = button.dataset.filter;
            filterProjects();
        });
    });

    function filterProjects() {
        let visibleCount = 0;

        projectCards.forEach(card => {
            const cardData = {
                name: card.querySelector('h3')?.textContent.toLowerCase() || '',
                description: card.querySelector('p')?.textContent.toLowerCase() || '',
                tags: Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()),
                category: card.dataset.category?.toLowerCase() || '',
                tech: card.dataset.tech?.toLowerCase() || ''
            };

            // Check search match
            const searchMatch = currentSearch === '' || 
                cardData.name.includes(currentSearch) ||
                cardData.description.includes(currentSearch) ||
                cardData.tags.some(tag => tag.includes(currentSearch)) ||
                cardData.tech.includes(currentSearch);

            // Check category filter
            const categoryMatch = currentFilter === 'all' || 
                cardData.category === currentFilter ||
                cardData.tags.includes(currentFilter);

            if (searchMatch && categoryMatch) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Show/hide no results message
        if (noResults) {
            if (visibleCount === 0) {
                noResults.classList.add('show');
            } else {
                noResults.classList.remove('show');
            }
        }
    }

    // Initialize with "All" filter active
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }
}

// Skills Animation (optional enhancement)
function animateSkills() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
            tag.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, 100);
        }, index * 50);
    });
}

// Intersection Observer for animations (optional)
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });

    document.querySelectorAll('.skill-category').forEach(el => {
        observer.observe(el);
    });
}