const app = {
    documents: [],
    state: {
        currentPage: 'home',
        currentGrade: null,
        searchQuery: '',
        activeFilter: 'Tất cả'
    },

    async init() {
        await this.loadDocuments();
        this.attachEventListeners();
        this.handleRouting();
        window.addEventListener('hashchange', () => this.handleRouting());
    },

    async loadDocuments() {
        try {
            const response = await fetch('tailieu.json');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            
            const seenTitles = new Set();
            const seenUrls = new Set();

            this.documents = (data.documents || [])
                .map(doc => this.normalizeDocument(doc))
                .filter(doc => {
                    if (!doc.title || !doc.url) return false;
                    const isTitleDuplicate = seenTitles.has(doc.title);
                    const isUrlDuplicate = seenUrls.has(doc.url);
                    if (!isTitleDuplicate && !isUrlDuplicate) {
                        seenTitles.add(doc.title);
                        seenUrls.add(doc.url);
                        return true;
                    }
                    return false;
                });

        } catch (error) {
            console.error('Không thể tải tệp tailieu.json:', error);
            this.documents = [];
        }
    },

    normalizeDocument(doc) {
        const subjectMap = {
            "lí": "Vật Lý", "sử": "Lịch Sử", "địa": "Địa Lý",
            "gdcd": "GDCD/Kinh tế & Pháp luật", "van": "Ngữ Văn", "anh": "Tiếng Anh"
        };
        const normalizedSubject = this.normalizeString(doc.subject);
        const subject = subjectMap[normalizedSubject] || doc.subject;

        return { ...doc, title: doc.title.trim(), url: doc.url.trim(), subject: subject };
    },

    normalizeString(str) {
        if (!str) return '';
        return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
    },

    attachEventListeners() {
        // Placeholder for event listeners
    }
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => app.init());

