/*=============== SHOW SIDEBAR ===============*/
const navMenu = document.getElementById('sidebar'),
navToggle = document.getElementById('nav-toggle'),
navClose = document.getElementById('nav-close')

/*===== SIDEBAR SHOW =====*/
/* Validate If Constant Exists */
if(navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add('show-sidebar')
    })
}

/*===== SIDEBAR HIDDEN =====*/
/* Validate If Constant Exists */
if(navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove('show-sidebar')
    })
}
//SideBar social
document.addEventListener('DOMContentLoaded', function() {
    const shareBtn = document.querySelector('.btn_share');
    const socialIcons = document.querySelector('.social_icons');

    if (shareBtn && socialIcons) {
        shareBtn.addEventListener('click', function(e) {
            e.stopPropagation(); 
            this.classList.toggle('active');
            socialIcons.classList.toggle('show');
        });
        

        document.addEventListener('click', function(e) {
            if (!socialIcons.contains(e.target) && e.target !== shareBtn) {
                socialIcons.classList.remove('show');
                shareBtn.classList.remove('active');
            }
        });
    }
});



        /*===== Home =====*/

        
        /*===== Portfolio =====*/
        // Filter Projects
        document.addEventListener('DOMContentLoaded', function() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked button
                    btn.classList.add('active');
                    
                    const filterValue = btn.getAttribute('data-filter');
                    
                    projectCards.forEach(card => {
                        if (filterValue === 'all') {
                            card.style.display = 'block';
                        } else {
                            const techFilters = card.getAttribute('data-tech').split(' ');
                            const categoryFilters = card.getAttribute('data-category').split(' ');
                            
                            if (techFilters.includes(filterValue) || categoryFilters.includes(filterValue)) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        }
                        
                        // Trigger reflow for animation
                        void card.offsetWidth;
                    });
                });
            });
            
            // Modal functionality
            const viewDemoBtns = document.querySelectorAll('.view-demo-btn');
            const modals = document.querySelectorAll('.modal-overlay');
            const closeBtns = document.querySelectorAll('.modal-close');
            
            viewDemoBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const projectId = btn.getAttribute('data-project');
                    document.getElementById(`modal-${projectId}`).classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });
            
            closeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    btn.closest('.modal-overlay').classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            });
            
            // Close modal when clicking outside
            modals.forEach(modal => {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                });
            });
            
            // Counter animation
            function animateCounter(element, target) {
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        clearInterval(timer);
                        current = target;
                    }
                    element.textContent = Math.floor(current);
                }, 20);
            }
            
            animateCounter(document.getElementById('total-projects'), 42);
            animateCounter(document.getElementById('ongoing-projects'), 6);
            animateCounter(document.getElementById('completed-projects'), 36);
        });
        
        
        /*===== Skills =====*/

        document.addEventListener('DOMContentLoaded', function() {
            // Animate progress bars on scroll
            function animateProgressBars() {
                const progressFills = document.querySelectorAll('.progress-fill, .sub-skill-fill');
                
                progressFills.forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    fill.style.width = width + '%';
                });
            }

            // Intersection Observer for progress bars
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateProgressBars();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            const progressSection = document.querySelector('.progress-section');
            if (progressSection) {
                observer.observe(progressSection);
            }

            // Competency card click handlers
            const competencyCards = document.querySelectorAll('.competency-card');
            
            competencyCards.forEach(card => {
                card.addEventListener('click', () => {
                    const competency = card.getAttribute('data-competency');
                    document.getElementById(`${competency}-modal`).classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });

            // Certificate card click handlers
            const certificateBtns = document.querySelectorAll('.view-certificate-btn');
            
            certificateBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const certificateId = btn.getAttribute('data-certificate');
                    document.getElementById(`certificate-${certificateId}`).classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });

            // Filter buttons
            const filterBtns = document.querySelectorAll('.filter-btn');
            const certificationCards = document.querySelectorAll('.certification-card');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked button
                    btn.classList.add('active');
                    
                    const filterValue = btn.getAttribute('data-filter');
                    
                    certificationCards.forEach(card => {
                        if (filterValue === 'all') {
                            card.style.display = 'block';
                        } else {
                            const category = card.getAttribute('data-category');
                            
                            if (category === filterValue) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        }
                        
                        // Trigger reflow for animation
                        void card.offsetWidth;
                    });
                });
            });

            // Close modals
            const closeBtns = document.querySelectorAll('.modal-close');
            const modals = document.querySelectorAll('.modal-overlay');
            
            closeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    btn.closest('.modal-overlay').classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            });
            
            // Close modal when clicking outside
            modals.forEach(modal => {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                });
            });
        });


        /*===== Blog =====*/
        document.addEventListener('DOMContentLoaded', function() {
            // Filter functionality
            const filterBtns = document.querySelectorAll('.filter-btn');
            const blogCards = document.querySelectorAll('.blog-card');
            const featuredArticle = document.querySelector('.featured-article');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked button
                    btn.classList.add('active');
                    
                    const filterValue = btn.getAttribute('data-filter');
                    
                    // Handle featured article visibility
                    if (filterValue === 'all' || filterValue === featuredArticle.getAttribute('data-category')) {
                        featuredArticle.style.display = 'grid';
                    } else {
                        featuredArticle.style.display = 'none';
                    }
                    
                    // Handle blog cards visibility
                    blogCards.forEach(card => {
                        if (filterValue === 'all' || filterValue === card.getAttribute('data-category')) {
                            card.style.display = 'block';
                            card.style.animation = 'fadeIn 0.5s ease forwards';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });

            // Simple search functionality
            const searchInput = document.querySelector('.search-input');
            
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                
                blogCards.forEach(card => {
                    const title = card.querySelector('.blog-title').textContent.toLowerCase();
                    const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });

            // Newsletter form submission
            const newsletterForm = document.querySelector('.newsletter-form');
            
            if(newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const subBtn = newsletterForm.querySelector('.newsletter-btn');
                    const originalSubBtnText = subBtn.innerHTML;
                    
                    subBtn.innerHTML = 'Subscribing...';
                    subBtn.disabled = true;

                    if (typeof emailjs !== 'undefined') {

                        emailjs.sendForm('service_2ybytvq', 'template_caknlqr', newsletterForm, 'wY5h9vNfls8yW4Sq8')
                        .then(() => {
                            alert('Thank you for subscribing! 🎉');
                            newsletterForm.reset();
                        }, (error) => {
                            alert('Ops! Something went wrong. Please try again.');
                            console.error('EmailJS Subscribe Error:', error);
                        })
                        .finally(() => {
                            subBtn.innerHTML = originalSubBtnText;
                            subBtn.disabled = false;
                        });
                    } else {
                        alert('EmailJS library is not loaded properly. Please refresh the page.');
                        subBtn.innerHTML = originalSubBtnText;
                        subBtn.disabled = false;
                    }
                });
            }
        });


        /*===== Resources =====*/

        document.addEventListener('DOMContentLoaded', function() {
            // Tab functionality
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const tabId = btn.getAttribute('data-tab');
                    
                    // Remove active class from all buttons and contents
                    tabBtns.forEach(b => b.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));
                    
                    // Add active class to clicked button and corresponding content
                    btn.classList.add('active');
                    document.getElementById(`${tabId}-resources`).classList.add('active');
                });
            });

            // Filter functionality for each tab
            const filterBtns = document.querySelectorAll('.filter-btn');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const filterContainer = this.closest('.category-filters');
                    const tabContent = filterContainer.closest('.tab-content');
                    const filterValue = this.getAttribute('data-filter');
                    
                    // Remove active class from all buttons in this filter group
                    filterContainer.querySelectorAll('.filter-btn').forEach(b => {
                        b.classList.remove('active');
                    });
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Filter cards
                    const cards = tabContent.querySelectorAll('.resource-card');
                    cards.forEach(card => {
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        });

        
        /*===== FOOTER =====*/
        document.addEventListener('DOMContentLoaded', function() {
            // Set current year in copyright
            document.querySelector('.copyright-year').textContent = new Date().getFullYear();

            // Back to top button functionality
            const backToTopBtn = document.getElementById('back-to-top');
            
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('active');
                } else {
                    backToTopBtn.classList.remove('active');
                }
            });

            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Smooth scrolling for footer links
            document.querySelectorAll('.footer-link[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });