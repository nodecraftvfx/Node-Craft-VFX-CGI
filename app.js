// Node Craft VFX & CGI - Premium Cinematic Website JavaScript - FIXED

class NodeCraftVFX {
    constructor() {
        this.init();
        this.isLoaded = false;
        this.currentFilter = 'all';
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.cursor = {
            element: null,
            dot: null,
            ring: null
        };
    }

    init() {
        // Wait for DOM content to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        console.log('🎬 Initializing Node Craft VFX website...');
        
        // Initialize all components
        this.initLoadingScreen();
        this.initCustomCursor();
        this.initNavigation();
        this.initParticleBackground();
        this.initScrollAnimations();
        this.initHeroAnimations();
        this.initShowreel();
        this.initServices();
        this.initPortfolio();
        this.initContactForm();
        this.initMobileMenu();
        this.initPerformanceOptimizations();
        
        console.log('✨ Node Craft VFX website ready!');
    }

    // Loading Screen with Cinematic Animation
    initLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const loadingProgress = document.querySelector('.loading-progress');
        
        if (!loadingScreen) return;

        // Simulate loading progress
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            if (loadingProgress) {
                loadingProgress.style.width = `${progress}%`;
            }
            
            if (progress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    this.hideLoadingScreen();
                }, 500);
            }
        }, 100);

        // Auto-hide after 3 seconds as fallback
        setTimeout(() => {
            if (!this.isLoaded) {
                this.hideLoadingScreen();
            }
        }, 3000);
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen && !this.isLoaded) {
            this.isLoaded = true;
            loadingScreen.classList.add('fade-out');
            
            // Start hero animations after loading
            setTimeout(() => {
                this.startHeroAnimations();
                this.startStatsCounter();
            }, 500);
            
            // Remove loading screen from DOM
            setTimeout(() => {
                loadingScreen.remove();
            }, 1000);
        }
    }

    // Custom Cursor System
    initCustomCursor() {
        if (window.innerWidth <= 768) return; // Skip on mobile
        
        this.cursor.element = document.getElementById('cursor');
        this.cursor.dot = this.cursor.element?.querySelector('.cursor-dot');
        this.cursor.ring = this.cursor.element?.querySelector('.cursor-ring');
        
        if (!this.cursor.element) return;

        // Mouse move handler
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.updateCursor();
        });

        // Interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, .video-container, .play-button');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => this.scaleCursor(1.5));
            element.addEventListener('mouseleave', () => this.scaleCursor(1));
        });

        // Start cursor animation loop
        this.updateCursor();
    }

    updateCursor() {
        if (this.cursor.dot && this.cursor.ring) {
            this.cursor.dot.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px)`;
            this.cursor.ring.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px)`;
        }
        requestAnimationFrame(() => this.updateCursor());
    }

    scaleCursor(scale) {
        if (this.cursor.ring) {
            this.cursor.ring.style.transform += ` scale(${scale})`;
        }
    }

    // FIXED Navigation System
    initNavigation() {
        const header = document.getElementById('header');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // FIXED: Smooth scrolling for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    console.log('Navigating to:', targetId);
                    this.smoothScrollToSection(targetId);
                }
            });
        });

        // Header scroll effects
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (header) {
                if (currentScrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                // Hide header on scroll down, show on scroll up
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });

        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop <= 200 && sectionTop >= -200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        }, { passive: true });
    }

    // FIXED smooth scroll function
    smoothScrollToSection(sectionId) {
        console.log('Attempting to scroll to section:', sectionId);
        const section = document.getElementById(sectionId);
        const header = document.getElementById('header');
        
        if (section) {
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            console.log('Scrolling to position:', targetPosition);
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else {
            console.warn('Section not found:', sectionId);
        }
    }

    // Particle Background System
    initParticleBackground() {
        const particleContainer = document.getElementById('particles');
        if (!particleContainer) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        particleContainer.appendChild(canvas);

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create particles
        const particleCount = window.innerWidth > 768 ? 50 : 25;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        // Animate particles
        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            this.particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 217, 255, ${particle.opacity})`;
                ctx.fill();
                
                // Add glow effect
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#00d9ff';
                ctx.fill();
                ctx.shadowBlur = 0;
            });
            
            requestAnimationFrame(animateParticles);
        };

        animateParticles();
    }

    // FIXED Hero Section Animations
    initHeroAnimations() {
        // FIXED: Hero buttons functionality
        const heroButtons = document.querySelectorAll('.hero-cta, .btn[data-target]');
        
        heroButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const target = button.getAttribute('data-target');
                console.log('Hero button clicked, target:', target);
                if (target) {
                    this.smoothScrollToSection(target);
                }
            });
        });

        // Also handle buttons without data-target that should go to showreel
        const viewShowreelButtons = document.querySelectorAll('.hero-cta');
        viewShowreelButtons.forEach(button => {
            if (!button.getAttribute('data-target')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('View showreel button clicked');
                    this.smoothScrollToSection('showreel');
                });
            }
        });
    }

    startHeroAnimations() {
        // Animate hero elements in sequence
        const heroElements = [
            '.hero-badge',
            '.hero-title .title-line:first-child',
            '.hero-title .title-line:last-child',
            '.hero-tagline',
            '.hero-description',
            '.hero-actions',
            '.hero-stats'
        ];

        heroElements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                setTimeout(() => {
                    element.classList.add('fade-in-up');
                }, index * 200);
            }
        });
    }

    startStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }
                stat.textContent = Math.floor(current) + '+';
            }, 16);
        });
    }

    // Scroll Animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .section-header, .about-content, .contact-content');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // FIXED Showreel Functionality
    initShowreel() {
        const playButton = document.getElementById('playButton');
        const videoContainer = document.querySelector('.video-container');
        const categoryItems = document.querySelectorAll('.category-item');
        
        // FIXED: Play button functionality
        if (playButton) {
            playButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Play button clicked');
                this.playShowreel();
            });
        }
        
        if (videoContainer) {
            videoContainer.addEventListener('click', (e) => {
                console.log('Video container clicked');
                this.playShowreel();
            });
        }

        // Category filter functionality
        categoryItems.forEach(item => {
            item.addEventListener('click', () => {
                categoryItems.forEach(cat => cat.classList.remove('active'));
                item.classList.add('active');
                
                const category = item.getAttribute('data-category');
                this.filterProjects(category);
            });
        });
    }

    // FIXED playShowreel function
    playShowreel() {
        console.log('Playing showreel...');
        
        // Create modal overlay for video
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="modal-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
                backdrop-filter: blur(10px);
            ">
                <div class="modal-content" style="
                    position: relative;
                    width: 90%;
                    max-width: 1200px;
                    aspect-ratio: 16/9;
                    background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
                    border-radius: 16px;
                    overflow: hidden;
                    transform: scale(0.9);
                    transition: transform 0.3s ease;
                    border: 1px solid rgba(0, 217, 255, 0.3);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                ">
                    <div class="video-content" style="
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        text-align: center;
                        padding: 3rem;
                        position: relative;
                    ">
                        <div style="
                            font-size: 4rem; 
                            margin-bottom: 1.5rem;
                            animation: pulse 2s infinite;
                        ">🎬</div>
                        <h2 style="
                            font-family: 'Orbitron', monospace;
                            font-size: 2.5rem; 
                            margin-bottom: 1rem; 
                            color: #00d9ff;
                            text-shadow: 0 0 20px rgba(0, 217, 255, 0.5);
                            font-weight: 900;
                        ">Node Craft VFX Showreel</h2>
                        <p style="
                            font-size: 1.3rem; 
                            margin-bottom: 2rem; 
                            opacity: 0.9;
                            max-width: 600px;
                            line-height: 1.6;
                        ">Experience our award-winning visual effects work across film, television, and digital media</p>
                        <div style="
                            display: flex; 
                            gap: 1rem; 
                            flex-wrap: wrap; 
                            justify-content: center;
                            margin-bottom: 2rem;
                        ">
                            <span style="padding: 0.7rem 1.2rem; background: rgba(0, 217, 255, 0.2); border-radius: 25px; font-size: 0.95rem; border: 1px solid rgba(0, 217, 255, 0.3);">🎭 Character Animation</span>
                            <span style="padding: 0.7rem 1.2rem; background: rgba(0, 217, 255, 0.2); border-radius: 25px; font-size: 0.95rem; border: 1px solid rgba(0, 217, 255, 0.3);">🌍 Digital Environments</span>
                            <span style="padding: 0.7rem 1.2rem; background: rgba(0, 217, 255, 0.2); border-radius: 25px; font-size: 0.95rem; border: 1px solid rgba(0, 217, 255, 0.3);">⚡ Particle Effects</span>
                        </div>
                        <div style="
                            background: rgba(0, 217, 255, 0.1);
                            border: 1px solid rgba(0, 217, 255, 0.3);
                            border-radius: 12px;
                            padding: 1.5rem;
                            max-width: 500px;
                        ">
                            <p style="margin: 0; font-size: 1rem; opacity: 0.8;">
                                🚀 This is a demo version. In the full implementation, our cinematic showreel would play here, featuring:
                            </p>
                            <ul style="text-align: left; margin: 1rem 0 0 0; padding-left: 1.5rem; opacity: 0.8;">
                                <li>Hollywood blockbuster sequences</li>
                                <li>Award-winning commercial work</li>
                                <li>Behind-the-scenes breakdowns</li>
                                <li>Real-time VFX demonstrations</li>
                            </ul>
                        </div>
                    </div>
                    <button class="close-btn" style="
                        position: absolute;
                        top: 1.5rem;
                        right: 1.5rem;
                        background: rgba(0, 0, 0, 0.7);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: white;
                        font-size: 1.5rem;
                        cursor: pointer;
                        z-index: 10001;
                        width: 45px;
                        height: 45px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s ease;
                        backdrop-filter: blur(10px);
                    " onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.transform='scale(1.1)'" onmouseout="this.style.background='rgba(0,0,0,0.7)'; this.style.transform='scale(1)'">×</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Animate modal in
        setTimeout(() => {
            const overlay = modal.querySelector('.modal-overlay');
            const content = modal.querySelector('.modal-content');
            if (overlay && content) {
                overlay.style.opacity = '1';
                content.style.transform = 'scale(1)';
            }
        }, 10);
        
        // Close functionality
        const closeModal = () => {
            const overlay = modal.querySelector('.modal-overlay');
            const content = modal.querySelector('.modal-content');
            if (overlay && content) {
                overlay.style.opacity = '0';
                content.style.transform = 'scale(0.9)';
            }
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.remove();
                }
                document.body.style.overflow = '';
            }, 300);
        };
        
        const closeBtn = modal.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        const modalOverlay = modal.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === e.currentTarget) closeModal();
            });
        }
        
        // Close on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
        
        // Show success notification
        setTimeout(() => {
            this.showNotification('🎬 Showreel Demo Loaded\n\nThis premium showreel would showcase our latest VFX work including blockbuster films, commercial projects, and cutting-edge visual effects demonstrations.', 'success');
        }, 500);
    }

    filterProjects(category) {
        console.log(`Filtering projects by: ${category}`);
        this.showNotification(`🎯 Filtering showreel by: ${category.toUpperCase()}\n\nShowing projects from our ${category === 'all' ? 'complete portfolio' : category + ' portfolio'}.`, 'info');
    }

    // FIXED Services Section
    initServices() {
        const serviceCards = document.querySelectorAll('.service-card[data-service]');
        
        console.log('Found service cards:', serviceCards.length);
        
        serviceCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const service = card.getAttribute('data-service');
                console.log('Service card clicked:', service);
                this.showServiceDetails(service);
            });
            
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                this.animateServiceCard(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateServiceCard(card, false);
            });
        });
    }

    animateServiceCard(card, isHover) {
        const icon = card.querySelector('.service-icon');
        const glow = card.querySelector('.service-glow');
        
        if (isHover) {
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
            if (glow) {
                glow.style.opacity = '0.6';
            }
        } else {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            if (glow) {
                glow.style.opacity = '0';
            }
        }
    }

    showServiceDetails(service) {
        const serviceDetails = {
            compositing: {
                title: 'VFX Compositing',
                description: 'Industry-leading compositing techniques for seamless integration of multiple visual elements including live-action footage, CGI, and practical effects.',
                features: [
                    'Multi-layer compositing and blending',
                    'Color correction and grading integration',
                    'Digital matte painting compositing',
                    'Atmospheric and lighting effects',
                    'Final shot assembly and delivery'
                ]
            },
            environments: {
                title: 'Digital Environments',
                description: 'Breathtaking digital worlds and set extensions that transport audiences to impossible locations.',
                features: [
                    'Photorealistic environment creation',
                    'Set extension and augmentation',
                    'Matte paintings and digital backdrops',
                    '3D environment modeling and lighting',
                    'Weather and atmospheric effects'
                ]
            },
            characters: {
                title: 'Character Animation',
                description: 'Lifelike digital characters and creatures that deliver compelling performances.',
                features: [
                    'Motion capture and facial animation',
                    'Keyframe character animation',
                    'Creature design and rigging',
                    'Performance capture integration',
                    'Digital double creation'
                ]
            },
            virtual: {
                title: 'Virtual Production',
                description: 'Next-generation filmmaking technology for real-time rendering and LED wall integration.',
                features: [
                    'Real-time rendering pipelines',
                    'LED wall content creation',
                    'Virtual camera systems',
                    'Live compositing workflows',
                    'On-set visualization tools'
                ]
            },
            particles: {
                title: 'Particle Effects',
                description: 'Dynamic simulations for fire, water, destruction, and magical effects.',
                features: [
                    'Fluid simulation (water, smoke, fire)',
                    'Destruction and debris systems',
                    'Magical and supernatural effects',
                    'Weather simulation systems',
                    'Custom particle behaviors'
                ]
            },
            grading: {
                title: 'Color Grading',
                description: 'Professional color correction and creative grading for enhanced visual storytelling.',
                features: [
                    'Technical color correction',
                    'Creative look development',
                    'HDR and wide gamut workflows',
                    'Match grading and consistency',
                    'Final delivery formatting'
                ]
            }
        };

        const details = serviceDetails[service];
        if (details) {
            const featuresText = details.features.map(feature => `• ${feature}`).join('\n');
            const message = `🎬 ${details.title}\n\n${details.description}\n\n✨ Key Features:\n${featuresText}\n\n🚀 Ready to bring your vision to life? Contact us to discuss your ${details.title.toLowerCase()} needs!`;
            this.showNotification(message, 'info');
        }
    }

    // Portfolio Section
    initPortfolio() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterPortfolio(filter);
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

        // Portfolio item click handlers
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                this.showProjectDetails(item);
            });
        });
    }

    filterPortfolio(filter) {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    showProjectDetails(item) {
        const title = item.querySelector('.portfolio-content h3')?.textContent || 'Project';
        const client = item.querySelector('.portfolio-content p')?.textContent || 'Client';
        const category = item.querySelector('.portfolio-category')?.textContent || 'Category';
        
        const message = `🎬 ${title}\n\n${client}\nCategory: ${category}\n\n✨ Project Highlights:\n• Award-winning visual effects work\n• Collaboration with industry leaders\n• Cutting-edge VFX techniques\n• Photorealistic results\n• Seamless integration with live-action\n\n🚀 Interested in similar work? Contact us to discuss your project vision!`;
        this.showNotification(message, 'info');
    }

    // Contact Form
    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmission(form);
        });

        // Enhanced form validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    isValid = false;
                    message = 'Email is required';
                } else if (!emailRegex.test(value)) {
                    isValid = false;
                    message = 'Please enter a valid email address';
                }
                break;
            case 'text':
                if (!value) {
                    isValid = false;
                    message = 'This field is required';
                } else if (value.length < 2) {
                    isValid = false;
                    message = 'Please enter at least 2 characters';
                }
                break;
            case 'select-one':
                if (!value) {
                    isValid = false;
                    message = 'Please select an option';
                }
                break;
            default:
                if (field.tagName === 'TEXTAREA') {
                    if (!value) {
                        isValid = false;
                        message = 'Please enter your message';
                    } else if (value.length < 10) {
                        isValid = false;
                        message = 'Please enter at least 10 characters';
                    }
                }
        }

        if (!isValid) {
            this.showFieldError(field, message);
        }

        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.style.borderColor = '#ff4444';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ff4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        `;
        
        field.parentNode.appendChild(errorElement);
        
        setTimeout(() => {
            errorElement.style.opacity = '1';
            errorElement.style.transform = 'translateY(0)';
        }, 10);
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    handleContactSubmission(form) {
        const formData = new FormData(form);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            projectType: formData.get('projectType'),
            message: formData.get('message')
        };

        // Validate all fields
        const fields = form.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Please correct the errors in the form', 'error');
            return;
        }

        // Submit form
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<span>Sending...</span>';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            this.showNotification(`🚀 Thank you, ${data.firstName}!\n\nYour ${data.projectType} project inquiry has been sent successfully. Our VFX team will review your requirements and get back to you within 24 hours.\n\n✨ We're excited to bring your vision to life with cutting-edge visual effects!`, 'success');
            
            form.reset();
            
            // Clear all field errors
            fields.forEach(field => this.clearFieldError(field));
            
        }, 2000);
    }

    // FIXED Mobile Menu
    initMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
            
            // Close menu when clicking on links
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
    }

    // Performance Optimizations
    initPerformanceOptimizations() {
        // Throttle scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
            }, 16);
        }, { passive: true });

        // Optimize particle count based on device performance
        if (navigator.hardwareConcurrency < 4) {
            this.particles = this.particles.slice(0, Math.floor(this.particles.length / 2));
        }

        // Reduce animations on low-performance devices
        if (navigator.connection && navigator.connection.effectiveType && 
            (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g')) {
            document.documentElement.style.setProperty('--duration-normal', '200ms');
            document.documentElement.style.setProperty('--duration-slow', '400ms');
        }

        // Preload critical images
        const criticalImages = [
            'https://pplx-res.cloudinary.com/image/upload/v1756097209/pplx_project_search_images/bf0c24e73b648f4bdfbb5b82101dbaa2ed9702bd.png'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Notification System
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            this.removeNotification(notification);
        });

        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        const colors = {
            success: '#00d9ff',
            error: '#ff4444',
            info: '#333333',
            warning: '#ff9800'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 420px;
            padding: 1.5rem;
            background: ${colors[type]};
            color: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            white-space: pre-line;
            font-size: 14px;
            line-height: 1.6;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            cursor: pointer;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        const autoRemoveTime = message.length > 100 ? 8000 : 5000;
        setTimeout(() => {
            this.removeNotification(notification);
        }, autoRemoveTime);
        
        // Click to dismiss
        notification.addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        if (notification && notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }
    }
}

// Initialize the website
const nodeCraftVFX = new NodeCraftVFX();

// Global utility functions for backwards compatibility
window.scrollToSection = (sectionId) => {
    nodeCraftVFX.smoothScrollToSection(sectionId);
};

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Remove notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            nodeCraftVFX.removeNotification(notification);
        });
    }
});

console.log('🎬 Node Craft VFX & CGI - Premium website loaded successfully!');