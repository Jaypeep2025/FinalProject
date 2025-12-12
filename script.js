document.addEventListener('DOMContentLoaded', function() {
    // Announcements auto-scroll
    const announcementsTrack = document.querySelector('.announcements-track');
    if (announcementsTrack) {
        setInterval(() => {
            announcementsTrack.scrollBy({ left: 520, behavior: 'smooth' });
        }, 5000);

        announcementsTrack.addEventListener('wheel', (e) => {
            e.preventDefault();
            announcementsTrack.scrollBy({ left: e.deltaY > 0 ? 100 : -100, behavior: 'smooth' });
        });
    }

    // Organizations auto-scroll
    const orgTrack = document.querySelector('.carousel-section#organizations .carousel-track');
    if (orgTrack) {
        setInterval(() => {
            orgTrack.scrollBy({ left: 374, behavior: 'smooth' });
        }, 8000);

        orgTrack.addEventListener('wheel', (e) => {
            e.preventDefault();
            orgTrack.scrollBy({ left: e.deltaY > 0 ? 374 : -374, behavior: 'smooth' });
        });
    }

    // Image carousel (Student Life)
    const imageTrack = document.querySelector('.image-track');
    const indicators = document.querySelectorAll('.indicator');
    if (imageTrack && indicators.length) {
        let currentIndex = 0;

        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }

        function autoScrollImages() {
            currentIndex = (currentIndex + 1) % indicators.length;
            imageTrack.scrollBy({ left: imageTrack.clientWidth, behavior: 'smooth' });
            updateIndicators();
        }

        const imgInterval = setInterval(autoScrollImages, 6000);

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                imageTrack.scrollTo({ left: index * imageTrack.clientWidth, behavior: 'smooth' });
                updateIndicators();
                clearInterval(imgInterval);
            });
        });

        imageTrack.addEventListener('wheel', (e) => {
            e.preventDefault();
            imageTrack.scrollBy({ left: e.deltaY > 0 ? imageTrack.clientWidth : -imageTrack.clientWidth, behavior: 'smooth' });
        });
    }

    // Accordion support for admissions/procedures
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    if (accordionBtns.length) {
        accordionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const panel = btn.nextElementSibling;
                const isOpen = panel && panel.style.display === 'block';
                // close all panels
                document.querySelectorAll('.accordion-panel').forEach(p => p.style.display = 'none');
                // reset plus/minus
                document.querySelectorAll('.accordion-btn').forEach(b => { b.querySelector('span') && (b.querySelector('span').textContent = '+'); });
                if (!isOpen && panel) {
                    panel.style.display = 'block';
                    const s = btn.querySelector('span'); if (s) s.textContent = '−';
                    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
        });
    }
});

// Helper used by carousel control buttons in HTML
function scrollCarousel(sectionEl, direction) {
    if (!sectionEl) return;
    const track = sectionEl.querySelector('.carousel-track');
    if (!track) return;
    const amount = direction > 0 ? track.clientWidth : -track.clientWidth;
    track.scrollBy({ left: amount, behavior: 'smooth' });
}

// ============ PROGRAMS PAGE INTERACTIVITY ============
// This checks if we are on the Programs page before running the code
const categoryButtons = document.querySelectorAll('.category-btn');
if (categoryButtons.length > 0) {
    const programGroups = document.querySelectorAll('.program-shortcuts');
    const programButtons = document.querySelectorAll('.program-btn');
    const programDetails = document.querySelectorAll('.program-details');
    const programCover = document.querySelector('.program-cover');

    // Toggle category buttons (4-Year vs 2-Year)
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all category buttons
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;
            
            // Hide all button groups first
            programGroups.forEach(g => g.style.display = 'none');
            
            // Show the specific group (four-year or two-year)
            const targetGroup = document.querySelector(`.${category}-year`);
            if (targetGroup) {
                targetGroup.style.display = 'flex';
            }

            // Reset view to Cover
            if(programCover) programCover.classList.add('show');
            programDetails.forEach(p => p.classList.remove('show'));

            // Remove active state from sub-buttons
            programButtons.forEach(pb => pb.classList.remove('active'));
        });
    });

    // Show only selected program details
    programButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hide cover and all program details
            if(programCover) programCover.classList.remove('show');
            programDetails.forEach(p => p.classList.remove('show'));

            // Show selected program
            const id = btn.dataset.program;
            const targetDetail = document.getElementById(id);
            if(targetDetail) {
                targetDetail.classList.add('show');
            }

            // Highlight active program button
            programButtons.forEach(pb => pb.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}