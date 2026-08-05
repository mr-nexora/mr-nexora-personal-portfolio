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

/*===============About Count==================*/
// Animation for stats counter
        document.addEventListener('DOMContentLoaded', function() {
            const statItems = document.querySelectorAll('.stat-item');
            
            const animateStats = () => {
                statItems.forEach(item => {
                    const numberElement = item.querySelector('.stat-number');
                    const target = parseInt(numberElement.textContent);
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    
                    const updateCount = () => {
                        count += increment;
                        if (count < target) {
                            numberElement.textContent = Math.floor(count);
                            requestAnimationFrame(updateCount);
                        } else {
                            numberElement.textContent = target;
                        }
                    };
                    
                    updateCount();
                });
            };
            
            // Intersection Observer to trigger animation when section comes into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStats();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(document.querySelector('.stats-container'));
        });
        
/*=============== SKILLS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContent = document.querySelectorAll('[data-content]')

      tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = document.querySelector(tab.dataset.target)

            tabContent.forEach(tabContents => {
                tabContents.classList.remove("skills_active")
            })

            target.classList.add('skills_active')

            tabs.forEach(tab => {
                tab.classList.remove("skills_active")
            })

            tab.classList.add('skills_active')
        })
      })



/*=============== MIXITUP FILTER PORTFOLIO ===============*/
document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and work cards
    const filterButtons = document.querySelectorAll('.work_item');
    const workCards = document.querySelectorAll('.work_card');
    
    // Function to filter work items
    function filterWork(category) {
        workCards.forEach(card => {
            if (category === 'all' || card.classList.contains(category)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active-work'));
            
            // Add active class to clicked button
            this.classList.add('active-work');
            
            // Get the filter category from data-filter attribute
            const filterValue = this.getAttribute('data-filter');
            
            // Filter the work items
            filterWork(filterValue);
        });
    });
    
    // Initialize with 'all' filter active
    const defaultFilter = document.querySelector('.work_item[data-filter="all"]');
    if (defaultFilter) {
        defaultFilter.classList.add('active-work');
        filterWork('all');
    }
});


/*===== Work Popup =====*/
document.addEventListener('DOMContentLoaded', function() {
    // ... (your existing filter code remains the same)
    
    // Portfolio Popup
    const portfolioItems = document.querySelectorAll('.work_card');
    const portfolioPopup = document.querySelector('.portfolio_popup');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only open popup if demo button or its children are clicked
            if (e.target.closest('.work_button')) {
                const imgSrc = this.querySelector('.work_img').src;
                const title = this.querySelector('.work_title').textContent;
                const details = this.querySelector('.portfolio_item-details');
                
                // Set popup content
                portfolioPopup.querySelector('.portfolio_popup-img').src = imgSrc;
                portfolioPopup.querySelector('.portfolio_popup-category').textContent = title;
                portfolioPopup.querySelector('.details_title').textContent = details.querySelector('.details_title').textContent;
                portfolioPopup.querySelector('.details_description').textContent = details.querySelector('.details_description').textContent;
                
                // Set info items
                const infoItems = details.querySelectorAll('.details_info li span');
                portfolioPopup.querySelector('.details_info-date').textContent = infoItems[0].textContent;
                portfolioPopup.querySelector('.details_info-tech').textContent = infoItems[1].textContent;
                portfolioPopup.querySelector('.details_info-role').textContent = infoItems[2].textContent;
                portfolioPopup.querySelector('.details_info-link').textContent = infoItems[3].querySelector('a').textContent;
                portfolioPopup.querySelector('.details_info-link').href = infoItems[3].querySelector('a').href;
                
                // Open popup
                portfolioPopup.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close popup
    portfolioPopup.querySelector('.portfolio_popup-close').addEventListener('click', function() {
        portfolioPopup.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
    
    // Close popup when clicking outside content
    portfolioPopup.addEventListener('click', function(e) {
        if (e.target === this) {
            portfolioPopup.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    });
});


/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.services_modal'),
modalBtns = document.querySelectorAll('.services_button'),
modalCloses = document.querySelectorAll('.services_modal-close')

let model = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modelBtn, i) => {
    modelBtn.addEventListener('click', () => {
        model(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener("click", () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

/*=============== SWIPER TESTIMONIAL ===============*/
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const swiper = new Swiper('.testmonials_container', {
        loop: true,
        grabCursor: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // when window width is >= 576px
            576: {
                slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 2,
            },
            // when window width is >= 992px
            992: {
                slidesPerView: 3,
            }
        }
    });
});

// Contact Section
document.addEventListener('DOMContentLoaded', function() {
    // Form input animation
    const inputs = document.querySelectorAll('.input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            const label = this.nextElementSibling;
            const span = label.nextElementSibling;
            
            if(label && span) {
                label.classList.add('active');
                span.classList.add('active');
            }
        });
        
        input.addEventListener('blur', function() {
            const label = this.nextElementSibling;
            const span = label.nextElementSibling;
            
            if (label && span && !this.value) {
                label.classList.remove('active');
                span.classList.remove('active');
            }
        });
        
        if (input.value) {
            const label = input.nextElementSibling;
            const span = label.nextElementSibling;
            
            if(label && span) {
                label.classList.add('active');
                span.classList.add('active');
            }
        }
    });
    
    // Contact card click events
    const contactButtons = document.querySelectorAll('.contact_button');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.contact_card');
            const type = card.querySelector('.contact_card-title').textContent.toLowerCase().trim();
            let url;
            
            switch(type) {
                case 'email':
                    url = 'mailto:user@gmail.com';
                    break;
                case 'whatsapp':
                    url = 'https://wa.me/999888777';
                    break;
                case 'messenger':
                    url = 'https://m.me/user.fb123';
                    break;
                default:
                    return;
            }
            window.open(url, '_blank');
        });
    });
    
    const contactForm = document.getElementById('contact-form');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="uil uil-spinner-alt"></i> Sending...';
            submitBtn.disabled = true;

            emailjs.sendForm('service_2ybytvq', 'template_mr-nexora_port', '#contact-form', 'wY5h9vNfls8yW4Sq8')
            .then(() => {
                alert('Your message has been sent successfully! 👍');
                contactForm.reset();
                
                // Labels reset කිරීම
                const labels = this.querySelectorAll('label');
                labels.forEach(label => label.classList.remove('active'));
                
                const spans = this.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            }, (error) => {
                alert('Ops! Something went wrong. Please try again later.');
                console.error('EmailJS Error:', error);
            })
                .finally(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
//get all sections that have an id defind
const sections = document.querySelectorAll("section[id]");

//add an event listener listing for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter()
{
    //get current scroll position
    let scrollY = window.pageYOffset;
    //Now we loop through sections to get height, top and ID values for each
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50,
        sectionId = current.gerAttribute("id");
        /* - If our current scroll position enters the space where current section on screen is, add active class to corresponding navigation link, else remove it
        - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as on selector */
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
        {
            document.querySelector('.nv_menu a[href*=' + sectionId + ']').classList.add("active-link")
        }
        else
        {
            document.querySelector('.nv_menu a[href*=' + sectionId + ']').classList.remove("active-link")
        }
    })
}

/*=============== FOOTER ===============*/
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