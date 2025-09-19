// Routing logic
app.handleRouting = function() {
    const hash = window.location.hash.slice(1) || 'home';
    const routes = {
        'home': () => this.showPage('home'),
        'lop10': () => this.showPage('grade', 10),
        'lop11': () => this.showPage('grade', 11),
        'lop12': () => this.showPage('grade', 12),
        'dgnl': () => this.showPage('grade', 'dgnl'),
        'ngonngu': () => this.showPage('grade', 'ngonngu'),
        'vip': () => this.showPage('vip')
    };
    
    if (routes[hash]) {
        routes[hash]();
    } else {
        window.location.hash = 'home';
    }
    this.updateActiveNavLinks(hash);
};

app.showPage = function(pageId, grade = null) {
    document.querySelectorAll('.page-container').forEach(page => page.classList.add('hidden'));
    this.state.currentPage = pageId;
    this.state.currentGrade = grade;

    let pageElement;
    if (pageId === 'grade') {
        pageElement = document.getElementById('page-grade');
        this.prepareGradePage(grade);
    } else if (pageId === 'vip') {
        pageElement = document.getElementById('page-vip');
    } else {
        pageElement = document.getElementById(`page-${pageId}`);
        if (pageId === 'home') this.prepareHomePage();
    }
    
    if (pageElement) pageElement.classList.remove('hidden');
    window.scrollTo(0, 0);
    
    document.getElementById('mobileMenu').classList.add('hidden');
    document.getElementById('mobileMenuButton').setAttribute('aria-expanded', 'false');
};

app.updateActiveNavLinks = function(hash) {
    document.querySelectorAll('.nav-link, .nav-dropdown-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${hash}`) {
            link.classList.add('active');
        }
    });

    const parentButtons = document.querySelectorAll('nav .relative.group > button.nav-link');
    parentButtons.forEach(button => {
        button.classList.remove('active');
        const dropdown = button.nextElementSibling;
        if (dropdown && dropdown.querySelector(`a[href="#${hash}"]`)) {
             button.classList.add('active');
        }
    });
};

