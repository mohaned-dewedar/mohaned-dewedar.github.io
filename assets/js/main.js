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
    const searchSuggestions = document.getElementById('searchSuggestions');
    const searchStats = document.getElementById('searchStats');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const noResults = document.querySelector('.no-results');

    let currentFilter = 'all';
    let currentSearch = '';
    
    // Initialize stats
    const totalCount = projectCards.length;
    updateStats(totalCount);

    // Search functionality with suggestions
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase();
            
            if (currentSearch.length > 0) {
                showSearchSuggestions(currentSearch);
                searchStats.classList.add('show');
            } else {
                hideSearchSuggestions();
                searchStats.classList.remove('show');
            }
            
            filterProjects();
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                hideSearchSuggestions();
            }
        });

        // Show suggestions on focus if there's content
        searchInput.addEventListener('focus', () => {
            if (currentSearch.length > 0) {
                showSearchSuggestions(currentSearch);
            }
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
                name: card.dataset.name || '',
                description: card.dataset.description || '',
                category: card.dataset.category || '',
                tech: card.dataset.tech || '',
                tags: card.dataset.tags || '',
                // Also get visible text for fallback
                visibleName: card.querySelector('h3')?.textContent.toLowerCase() || '',
                visibleDescription: card.querySelector('p')?.textContent.toLowerCase() || '',
                visibleTags: Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()).join(' ')
            };

            // Enhanced search matching with semantic tags
            const searchMatch = currentSearch === '' || 
                cardData.name.includes(currentSearch) ||
                cardData.description.includes(currentSearch) ||
                cardData.tech.includes(currentSearch) ||
                cardData.tags.includes(currentSearch) ||
                // Fallback to visible content
                cardData.visibleName.includes(currentSearch) ||
                cardData.visibleDescription.includes(currentSearch) ||
                cardData.visibleTags.includes(currentSearch) ||
                // Smart matching for common terms
                matchSmartTerms(currentSearch, cardData);

            // Enhanced category/tag filtering
            const categoryMatch = currentFilter === 'all' || 
                cardData.category === currentFilter ||
                cardData.tags.includes(currentFilter) ||
                // Check if filter matches any part of tags or tech
                cardData.tags.split(' ').includes(currentFilter) ||
                cardData.tech.split(' ').includes(currentFilter);

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

        // Update stats
        updateStats(visibleCount);
    }

    function updateStats(visibleCount) {
        if (searchStats) {
            document.getElementById('visibleCount').textContent = visibleCount;
            document.getElementById('totalCount').textContent = totalCount;
        }
    }

    function showSearchSuggestions(search) {
        if (!searchSuggestions || search.length < 2) return;

        // Generate suggestions based on available tags and synonyms
        const suggestions = generateSuggestions(search);
        
        if (suggestions.length > 0) {
            searchSuggestions.innerHTML = suggestions.map(suggestion => `
                <div class="suggestion-item" onclick="applySuggestion('${suggestion.term}')">
                    <span class="suggestion-text">${suggestion.display}</span>
                    <span class="suggestion-count">${suggestion.count}</span>
                </div>
            `).join('');
            searchSuggestions.classList.add('show');
        } else {
            hideSearchSuggestions();
        }
    }

    function hideSearchSuggestions() {
        if (searchSuggestions) {
            searchSuggestions.classList.remove('show');
        }
    }

    function generateSuggestions(search) {
        const allTerms = [
            { term: 'ai', display: 'AI / Artificial Intelligence', tags: ['ai', 'llm', 'chatbot', 'ml'] },
            { term: 'ml', display: 'Machine Learning', tags: ['ml', 'deep-learning', 'neural-networks'] },
            { term: 'web-dev', display: 'Web Development', tags: ['web-dev', 'frontend', 'backend'] },
            { term: 'realtime', display: 'Real-time Applications', tags: ['realtime', 'websockets'] },
            { term: 'gaming', display: 'Gaming Projects', tags: ['gaming', 'multiplayer'] },
            { term: 'computer-vision', display: 'Computer Vision', tags: ['computer-vision', 'image-processing'] },
            { term: 'chatbot', display: 'Chatbots', tags: ['chatbot', 'ai', 'llm'] },
            { term: 'python', display: 'Python Projects', tags: [] },
            { term: 'react', display: 'React Projects', tags: [] },
            { term: 'robotics', display: 'Robotics', tags: [] }
        ];

        return allTerms
            .filter(item => 
                item.term.includes(search) || 
                item.display.toLowerCase().includes(search) ||
                item.tags.some(tag => tag.includes(search))
            )
            .map(item => ({
                ...item,
                count: countProjectsWithTerm(item.term, item.tags)
            }))
            .filter(item => item.count > 0)
            .slice(0, 5); // Limit to 5 suggestions
    }

    function countProjectsWithTerm(term, tags) {
        let count = 0;
        projectCards.forEach(card => {
            const cardTags = card.dataset.tags || '';
            const cardTech = card.dataset.tech || '';
            const cardCategory = card.dataset.category || '';
            
            if (cardTags.includes(term) || 
                cardTech.includes(term) || 
                cardCategory.includes(term) ||
                tags.some(tag => cardTags.includes(tag))) {
                count++;
            }
        });
        return count;
    }

    // Make applySuggestion globally accessible
    window.applySuggestion = function(term) {
        searchInput.value = term;
        currentSearch = term.toLowerCase();
        hideSearchSuggestions();
        filterProjects();
    }

    // Smart term matching for better search experience
    function matchSmartTerms(search, cardData) {
        const synonyms = {
            'ai': ['artificial intelligence', 'machine learning', 'ml', 'deep learning', 'neural', 'llm', 'gpt', 'bert', 'transformer'],
            'ml': ['machine learning', 'ai', 'deep learning', 'neural', 'model', 'training'],
            'web': ['website', 'frontend', 'backend', 'react', 'javascript', 'html', 'css'],
            'bot': ['chatbot', 'assistant', 'automation', 'llm'],
            'realtime': ['real-time', 'live', 'websocket', 'socket.io'],
            'vision': ['computer vision', 'cv', 'image', 'opencv', 'detection'],
            'game': ['gaming', 'esports', 'multiplayer'],
            'data': ['analytics', 'visualization', 'database', 'processing']
        };

        // Check if search term has synonyms
        for (const [key, syns] of Object.entries(synonyms)) {
            if (search === key || syns.includes(search)) {
                // Check if any synonym matches the card data
                const allTerms = [key, ...syns];
                return allTerms.some(term => 
                    cardData.name.includes(term) ||
                    cardData.description.includes(term) ||
                    cardData.tags.includes(term) ||
                    cardData.tech.includes(term)
                );
            }
        }

        return false;
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