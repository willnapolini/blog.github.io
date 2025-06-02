// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Add fade-in animation to blog cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const cards = document.querySelectorAll('article');
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // Reading progress indicator
    createReadingProgress();
    
    // Copy code blocks functionality
    addCopyButtons();
});

// Reading progress indicator
function createReadingProgress() {
    if (document.querySelector('article')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'fixed top-0 left-0 w-full h-1 bg-blue-500 z-50 transform scale-x-0 origin-left transition-transform duration-150';
        progressBar.id = 'reading-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', updateReadingProgress);
    }
}

function updateReadingProgress() {
    const article = document.querySelector('article');
    if (!article) return;
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.pageYOffset;
    const progress = scrollTop / documentHeight;
    
    const progressBar = document.getElementById('reading-progress');
    if (progressBar) {
        progressBar.style.transform = `scaleX(${Math.min(progress, 1)})`;
    }
}

// Copy code blocks
function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((codeBlock) => {
        const button = document.createElement('button');
        button.className = 'absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs transition-colors';
        button.textContent = 'Копировать';
        
        const pre = codeBlock.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        button.addEventListener('click', () => {
            const text = codeBlock.textContent;
            navigator.clipboard.writeText(text).then(() => {
                button.textContent = 'Скопировано!';
                setTimeout(() => {
                    button.textContent = 'Копировать';
                }, 2000);
            });
        });
    });
}

// Search functionality (if you want to add search later)
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) return;
    
    let posts = [];
    
    // Fetch posts data (you would need to create a posts.json file)
    fetch('/posts.json')
        .then(response => response.json())
        .then(data => {
            posts = data;
        })
        .catch(error => console.error('Error loading posts:', error));
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            searchResults.classList.add('hidden');
            return;
        }
        
        const results = posts.filter(post => 
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query) ||
            post.tags.some(tag => tag.toLowerCase().includes(query))
        );
        
        displaySearchResults(results);
    });
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p class="text-gray-500 p-4">Ничего не найдено</p>';
    } else {
        searchResults.innerHTML = results.map(post => `
            <a href="${post.url}" class="block p-4 hover:bg-gray-50 border-b border-gray-200">
                <h3 class="font-medium text-gray-900">${post.title}</h3>
                <p class="text-sm text-gray-600 mt-1">${post.excerpt}</p>
                <div class="flex gap-2 mt-2">
                    ${post.tags.map(tag => `<span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">${tag}</span>`).join('')}
                </div>
            </a>
        `).join('');
    }
    
    searchResults.classList.remove('hidden');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = event.target.closest('button');
    
    if (!mobileMenu || !menuButton) return;
    
    if (!mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Back to top button
function addBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'fixed bottom-8 right-8 bg-blue-500 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 opacity-0 pointer-events-none';
    button.id = 'back-to-top';
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            button.classList.add('opacity-0', 'pointer-events-none');
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', addBackToTopButton);