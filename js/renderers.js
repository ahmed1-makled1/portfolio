/**
 * Renderers Module
 * Contains all rendering functions for dynamic content
 */

const Renderers = (() => {
    /**
     * Render Hero Section
     * @param {Object} profile - Profile data
     * @param {Array} socialLinks - Social links data
     */
    function renderHero(profile, socialLinks) {
        if (!profile) return;

        // Update profile image
        const profileImg = document.querySelector('.profile-img');
        if (profileImg && profile.AvatarPath) {
            profileImg.src = profile.AvatarPath;
            profileImg.alt = profile.Name || 'Profile';
        }

        // Update name
        const nameElement = document.querySelector('.hero-content h1');
        if (nameElement && profile.Name) {
            nameElement.textContent = profile.Name;
        }

        // Update title
        const titleElement = document.querySelector('.hero-content h2');
        if (titleElement && profile.Title) {
            titleElement.textContent = profile.Title;
        }

        // Update description text in hero (uses Description field, not About)
        const aboutElement = document.querySelector('.hero-content p');
        if (aboutElement && profile.Description) {
            aboutElement.textContent = profile.Description;
        }

        // Update logo
        const logoElement = document.querySelector('.logo');
        if (logoElement && profile.Name) {
            const initials = profile.Name.split(' ').map(n => n[0]).join('').toUpperCase();
            logoElement.textContent = initials + '.';
        }

        // Add/Remove CV button in hero
        const heroButtons = document.querySelector('.hero-buttons');
        if (heroButtons) {
            const existingCVBtn = heroButtons.querySelector('.cv-btn');
            if (existingCVBtn) existingCVBtn.remove();

            if (profile.CVPath) {
                const cvBtn = document.createElement('a');
                cvBtn.href = profile.CVPath;
                cvBtn.className = 'btn btn-primary cv-btn';
                cvBtn.download = '';
                cvBtn.innerHTML = '<i class="fa-solid fa-download"></i> Download CV';
                heroButtons.insertBefore(cvBtn, heroButtons.firstChild);
            }
        }
    }

    /**
     * Render About Section
     * @param {Object} profile - Profile data
     */
    function renderAbout(profile) {
        if (!profile || !profile.About) return;

        const aboutText = document.querySelector('.about-text');
        if (aboutText) {
            aboutText.innerHTML = `<p>${profile.About}</p>`;
        }
    }

    /**
     * Render Skills Section
     * @param {Array} skills - Skills data
     */
    function renderSkills(skills) {
        if (!skills || skills.length === 0) return;

        const skillsContainer = document.querySelector('#skills .grid-3');
        if (!skillsContainer) return;

        // Group skills by category
        const groupedSkills = skills.reduce((acc, skill) => {
            const category = skill.Category || 'Other';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(skill.SkillName);
            return acc;
        }, {});

        // Clear existing content
        skillsContainer.innerHTML = '';

        // Render each category
        Object.entries(groupedSkills).forEach(([category, skillList]) => {
            const card = document.createElement('div');
            card.className = 'card';

            const iconClass = getIconForCategory(category);

            card.innerHTML = `
                <h3><i class="${iconClass}"></i> ${category}</h3>
                <ul class="skill-list">
                    ${skillList.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            `;

            skillsContainer.appendChild(card);
        });
    }

    /**
     * Get icon class for skill category
     * @param {string} category - Category name
     * @returns {string} - Icon class
     */
    function getIconForCategory(category) {
        const iconMap = {
            'Core Skills': 'fa-solid fa-code',
            'Tools': 'fa-solid fa-wrench',
            'Soft Skills': 'fa-solid fa-users',
            'Languages': 'fa-solid fa-language',
            'Frameworks': 'fa-solid fa-layer-group',
            'Databases': 'fa-solid fa-database'
        };
        return iconMap[category] || 'fa-solid fa-star';
    }

    /**
     * Render Experience Section
     * @param {Array} experience - Experience data
     */
    function renderExperience(experience) {
        if (!experience || experience.length === 0) return;

        const experienceContainer = document.querySelector('#experience .card');
        if (!experienceContainer) return;

        experienceContainer.innerHTML = experience.map(exp => `
            <div class="timeline-item">
                <div class="timeline-date">${exp.StartDate} ${exp.EndDate !== 'Present' ? '– ' + exp.EndDate : '– Present'}</div>
                <div class="timeline-title">${exp.Position}</div>
                <div class="timeline-subtitle">${exp.Company}</div>
                ${exp.Description ? `<p style="margin-top: 10px; color: var(--text-muted);">${exp.Description}</p>` : ''}
            </div>
        `).join('');
    }

    /**
     * Render Education Section
     * @param {Array} education - Education data
     */
    function renderEducation(education) {
        if (!education || education.length === 0) return;

        const educationContainer = document.querySelector('#education .card');
        if (!educationContainer) return;

        educationContainer.innerHTML = education.map(edu => `
            <div class="timeline-item">
                <div class="timeline-date">${edu.Dates}</div>
                <div class="timeline-title">${edu.Degree}</div>
                <div class="timeline-subtitle">${edu.Institution}</div>
                ${edu.Description ? `<p style="margin-top: 10px; color: var(--text-muted);">${edu.Description}</p>` : ''}
            </div>
        `).join('');
    }

    /**
     * Render Services Section
     * @param {Array} services - Services data
     */
    function renderServices(services) {
        if (!services || services.length === 0) return;

        const servicesContainer = document.querySelector('#services .grid-3');
        if (!servicesContainer) return;

        servicesContainer.innerHTML = services.map(service => `
            <div class="card service-card">
                <i class="${service.IconClass}"></i>
                <h3>${service.ServiceName}</h3>
                ${service.Description ? `<p style="margin-top: 15px; color: var(--text-muted);">${service.Description}</p>` : ''}
            </div>
        `).join('');
    }

    /**
     * Render Projects Section with 3D Flip Cards
     * @param {Array} projects - Projects data
     */
    function renderProjects(projects) {
        if (!projects || projects.length === 0) return;

        const projectsContainer = document.querySelector('#projects .grid-2');
        if (!projectsContainer) return;

        projectsContainer.innerHTML = projects.map(project => {
            const techStackBadges = project.TechStack ? project.TechStack.split(',').map(tech =>
                `<span class="tech-badge">${tech.trim()}</span>`
            ).join('') : '';

            const featuresList = project.Features ? project.Features.split(',').map(feature =>
                `<li>${feature.trim()}</li>`
            ).join('') : '';

            // Conditional buttons
            let buttonsHtml = '';
            if (project.GitHubURL) {
                buttonsHtml += `<a href="${project.GitHubURL}" target="_blank" class="btn btn-outline"><i class="fa-brands fa-github"></i> GitHub</a>`;
            }
            if (project.LiveURL) {
                buttonsHtml += `<a href="${project.LiveURL}" target="_blank" class="btn btn-outline"><i class="fa-solid fa-external-link-alt"></i> Live Demo</a>`;
            }
            if (project.PlayStoreURL) {
                buttonsHtml += `<a href="${project.PlayStoreURL}" target="_blank" class="btn btn-outline"><i class="fa-brands fa-google-play"></i> Play Store</a>`;
            }
            if (project.AppStoreURL) {
                buttonsHtml += `<a href="${project.AppStoreURL}" target="_blank" class="btn btn-outline"><i class="fa-brands fa-apple"></i> App Store</a>`;
            }
            if (project.DocPath) {
                buttonsHtml += `<a href="${project.DocPath}" target="_blank" class="btn btn-outline"><i class="fa-solid fa-file-alt"></i> Docs</a>`;
            }

            return `
                <div class="project-flip-card" role="button" tabindex="0" aria-label="View project details">
                    <div class="project-card-inner">
                        <!-- Front Side -->
                        <div class="project-card-front">
                            <div class="card project-card">
                                ${project.FrontImages ? `
                                    <div class="project-image-container" data-images="${project.FrontImages}" data-title="${project.Name}">
                                        <img src="${project.FrontImages.split(',')[0].trim()}" alt="${project.Name}" class="project-image">
                                        <div class="project-image-overlay">
                                            <i class="fa-solid fa-search-plus"></i>
                                            <span style="font-size: 1.2rem; font-weight: 600;">View Gallery</span>
                                        </div>
                                        <div class="gallery-badge">
                                            <i class="fa-solid fa-images"></i> Gallery
                                        </div>
                                    </div>
                                ` : ''}
                                <h3><i class="fa-solid fa-folder-open"></i> ${project.Name}</h3>
                                <p style="color: var(--text-muted); margin: 15px 0;">${project.ShortDesc}</p>
                                <div class="tech-stack-badges">${techStackBadges}</div>
                                <div class="flip-hint"><i class="fa-solid fa-hand-pointer"></i> Click for details</div>
                            </div>
                        </div>
                        <!-- Back Side -->
                        <div class="project-card-back">
                            <div class="card project-card">
                                <h3><i class="fa-solid fa-info-circle"></i> ${project.Name}</h3>
                                <p style="color: var(--text-muted); margin: 15px 0;">${project.LongDesc}</p>
                                <div class="features-section">
                                    <h4>Features:</h4>
                                    <ul>${featuresList}</ul>
                                </div>
                                <div class="project-buttons">
                                    ${buttonsHtml}
                                </div>
                                <div class="flip-hint"><i class="fa-solid fa-undo"></i> Click to flip back</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        // Add flip functionality
        initFlipCards();
        initProjectGallery();
    }

    /**
     * Initialize project gallery clicking
     */
    function initProjectGallery() {
        const containers = document.querySelectorAll('.project-image-container');
        containers.forEach(container => {
            container.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card flip
                const imagesStr = container.dataset.images;
                if (!imagesStr) return;
                const images = imagesStr.split(',').map(s => s.trim());
                const title = container.dataset.title || '';
                openLightboxGallery(images, 0, title);
            });
        });
    }



    /**
     * Initialize flip card functionality
     */
    function initFlipCards() {
        const flipCards = document.querySelectorAll('.project-flip-card');
        flipCards.forEach(card => {
            const toggleCard = () => {
                card.classList.toggle('flipped');
                card.setAttribute('aria-pressed', card.classList.contains('flipped') ? 'true' : 'false');
            };

            card.addEventListener('click', (event) => {
                if (event.target.closest('a')) return;
                toggleCard();
            });

            card.addEventListener('keydown', (event) => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                toggleCard();
            });
        });
    }

    /**
     * Render Certificates Section
     * @param {Array} certificates - Certificates data
     */
    function renderCertificates(certificates) {
        if (!certificates || certificates.length === 0) return;

        // Check if certificates section exists, if not create it
        let certificatesSection = document.getElementById('certificates');
        if (!certificatesSection) {
            const projectsSection = document.getElementById('projects');
            const newSection = document.createElement('section');
            newSection.id = 'certificates';
            newSection.className = 'container hidden';
            newSection.innerHTML = `
                <h2 class="section-title">Certificates</h2>
                <div class="grid-3 certificates-grid"></div>
            `;
            projectsSection.parentNode.insertBefore(newSection, projectsSection.nextSibling);
            certificatesSection = newSection;
        }

        const certificatesGrid = certificatesSection.querySelector('.certificates-grid');
        if (!certificatesGrid) return;

        certificatesGrid.innerHTML = certificates.map(cert => `
            <div class="card certificate-card" data-image="${cert.ImagePath}" data-title="${cert.Title}">
                ${cert.ImagePath ? `<img src="${cert.ImagePath}" alt="${cert.Title}" class="certificate-image">` : ''}
                <div class="certificate-info">
                    <h3>${cert.Title}</h3>
                    <p class="certificate-issuer">${cert.Issuer}</p>
                    <p class="certificate-date">${cert.Date}</p>
                    ${cert.Description ? `<p class="certificate-desc">${cert.Description}</p>` : ''}
                </div>
            </div>
        `).join('');

        // Initialize lightbox
        initLightbox();
    }

    let currentLightboxImages = [];
    let currentLightboxIndex = 0;

    /**
     * Initialize Lightbox for certificates and projects
     */
    function initLightbox() {
        // Create lightbox if it doesn't exist
        if (!document.getElementById('lightbox')) {
            const lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close">&times;</button>
                    <button class="lightbox-zoom-in"><i class="fa-solid fa-search-plus"></i></button>
                    <button class="lightbox-zoom-out"><i class="fa-solid fa-search-minus"></i></button>
                    <button class="lightbox-prev" style="display: none;"><i class="fa-solid fa-chevron-left"></i></button>
                    <button class="lightbox-next" style="display: none;"><i class="fa-solid fa-chevron-right"></i></button>
                    <img src="" alt="" class="lightbox-image">
                    <div class="lightbox-caption"></div>
                </div>
            `;
            document.body.appendChild(lightbox);

            // Close lightbox
            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });

            // Zoom controls
            let zoomLevel = 1;
            lightbox.querySelector('.lightbox-zoom-in').addEventListener('click', (e) => {
                e.stopPropagation();
                zoomLevel = Math.min(zoomLevel + 0.5, 3);
                updateZoom();
            });
            lightbox.querySelector('.lightbox-zoom-out').addEventListener('click', (e) => {
                e.stopPropagation();
                zoomLevel = Math.max(zoomLevel - 0.5, 0.5);
                updateZoom();
            });

            function updateZoom() {
                const img = lightbox.querySelector('.lightbox-image');
                img.style.transform = `scale(${zoomLevel})`;
            }

            // Gallery navigation
            lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
                e.stopPropagation();
                navigateLightbox(-1);
            });
            lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
                e.stopPropagation();
                navigateLightbox(1);
            });

            // Keyboard controls
            document.addEventListener('keydown', (e) => {
                if (lightbox.style.display === 'flex') {
                    if (e.key === 'Escape') closeLightbox();
                    if (e.key === 'ArrowLeft') navigateLightbox(-1);
                    if (e.key === 'ArrowRight') navigateLightbox(1);
                    if (e.key === '+') {
                        zoomLevel = Math.min(zoomLevel + 0.5, 3);
                        updateZoom();
                    }
                    if (e.key === '-') {
                        zoomLevel = Math.max(zoomLevel - 0.5, 0.5);
                        updateZoom();
                    }
                }
            });
        }

        // Add click handlers to certificate cards
        const certificateCards = document.querySelectorAll('.certificate-card');
        certificateCards.forEach(card => {
            card.addEventListener('click', () => {
                const imagePath = card.dataset.image;
                const title = card.dataset.title || '';
                if (imagePath) {
                    openLightboxGallery([imagePath], 0, title);
                }
            });
        });
    }

    function navigateLightbox(direction) {
        if (currentLightboxImages.length <= 1) return;
        currentLightboxIndex = (currentLightboxIndex + direction + currentLightboxImages.length) % currentLightboxImages.length;
        const lightbox = document.getElementById('lightbox');
        const img = lightbox.querySelector('.lightbox-image');
        img.src = currentLightboxImages[currentLightboxIndex];
        img.style.transform = 'scale(1)'; // reset zoom on navigation
        // Optional: update caption to show index e.g., "Image 2 of 3"
        // const caption = lightbox.querySelector('.lightbox-caption');
    }

    /**
     * Open lightbox with a gallery of images
     * @param {Array} images - Array of image URLs
     * @param {number} startIndex - Initial image index
     * @param {string} caption - Image caption
     */
    function openLightboxGallery(images, startIndex, caption) {
        if (!images || images.length === 0) return;
        currentLightboxImages = images;
        currentLightboxIndex = startIndex || 0;

        const lightbox = document.getElementById('lightbox');
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        lightboxImage.src = currentLightboxImages[currentLightboxIndex];
        lightboxCaption.textContent = caption;
        
        // Show/hide navigation buttons
        if (images.length > 1) {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }

        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Reset zoom
        lightboxImage.style.transform = 'scale(1)';
    }

    /**
     * Close lightbox
     */
    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    /**
     * Render Freelance Platforms Section
     * @param {Array} platforms - Freelance platforms data
     */
    function renderFreelancePlatforms(platforms) {
        if (!platforms || platforms.length === 0) return;

        // Check if freelance platforms section exists, if not create it
        let freelanceSection = document.getElementById('freelance');
        if (!freelanceSection) {
            const anchorSection = document.getElementById('services') || document.getElementById('certificates') || document.getElementById('projects');
            const newSection = document.createElement('section');
            newSection.id = 'freelance';
            newSection.className = 'container hidden';
            newSection.innerHTML = `
                <h2 class="section-title">Freelance Platforms</h2>
                <div class="grid-3 freelance-grid"></div>
            `;
            anchorSection.parentNode.insertBefore(newSection, anchorSection.nextSibling);
            freelanceSection = newSection;
        }

        const freelanceGrid = freelanceSection.querySelector('.freelance-grid');
        if (!freelanceGrid) return;

        freelanceGrid.innerHTML = platforms.map(platform => `
            <div class="card freelance-card">
                ${platform.LogoPath ? `<img src="${platform.LogoPath}" alt="${platform.PlatformName}" class="platform-logo">` : ''}
                <h3>${platform.PlatformName}</h3>
                ${platform.Description ? `<p style="color: var(--text-muted); margin: 15px 0;">${platform.Description}</p>` : ''}
                ${platform.ProfileURL ? `<a href="${platform.ProfileURL}" target="_blank" class="btn btn-outline">View Profile <i class="fa-solid fa-external-link-alt"></i></a>` : ''}
            </div>
        `).join('');
    }

    /**
     * Render Contact Section
     * @param {Object} profile - Profile data
     * @param {Array} socialLinks - Social links data
     */
    function renderContact(profile, socialLinks) {
        if (!profile) return;

        const contactInfo = document.querySelector('.contact-info');
        if (!contactInfo) return;

        // Update contact items
        const contactItems = contactInfo.querySelectorAll('.contact-item');

        // Phone
        if (profile.Phone) {
            const phoneItem = contactItems[0];
            if (phoneItem) {
                phoneItem.querySelector('span').textContent = profile.Phone;
            }
        }

        // Email
        if (profile.Email) {
            const emailItem = contactItems[1];
            if (emailItem) {
                const link = emailItem.querySelector('a');
                if (link) {
                    link.href = `mailto:${profile.Email}`;
                    link.textContent = profile.Email;
                }
            }
        }

        // WhatsApp
        if (profile.WhatsApp) {
            let whatsappItem = contactInfo.querySelector('.contact-item.whatsapp');
            if (!whatsappItem) {
                whatsappItem = document.createElement('div');
                whatsappItem.className = 'contact-item whatsapp';
                whatsappItem.innerHTML = '<i class="fa-brands fa-whatsapp"></i><span></span>';
                contactInfo.insertBefore(whatsappItem, contactInfo.querySelector('.social-links'));
            }
            const whatsapp = String(profile.WhatsApp || '');
            const whatsappNumber = whatsapp.replace(/\D/g, '');
            whatsappItem.querySelector('span').innerHTML = `<a href="https://wa.me/${whatsappNumber}" target="_blank">${whatsapp}</a>`;
        }

        // Location
        if (profile.Location) {
            let locationItem = contactInfo.querySelector('.contact-item.location');
            if (!locationItem) {
                locationItem = document.createElement('div');
                locationItem.className = 'contact-item location';
                locationItem.innerHTML = '<i class="fa-solid fa-location-dot"></i><span></span>';
                contactInfo.insertBefore(locationItem, contactInfo.querySelector('.social-links'));
            }
            locationItem.querySelector('span').textContent = profile.Location;
        }

        // Render social links
        const socialLinksContainer = contactInfo.querySelector('.social-links');
        if (socialLinksContainer && socialLinks) {
            socialLinksContainer.innerHTML = socialLinks.map(link => {
                let href = link.URL;
                let target = '_blank';

                // Special handling for WhatsApp
                if (link.PlatformName.toLowerCase() === 'whatsapp') {
                    const number = link.URL.replace(/\D/g, '');
                    href = `https://wa.me/${number}`;
                }
                // Special handling for Email
                if (link.PlatformName.toLowerCase() === 'email') {
                    href = `mailto:${link.URL}`;
                    target = '';
                }

                return `
                    <a href="${href}" ${target ? `target="${target}"` : ''} aria-label="${link.PlatformName}">
                        <i class="${link.IconClass}"></i>
                    </a>
                `;
            }).join('');
        }

        // Add CV button to contact section
        if (profile.CVPath) {
            let cvBtn = contactInfo.querySelector('.cv-download-btn');
            if (!cvBtn) {
                cvBtn = document.createElement('a');
                cvBtn.className = 'btn btn-primary cv-download-btn';
                cvBtn.style.marginTop = '20px';
                contactInfo.insertBefore(cvBtn, contactInfo.querySelector('.social-links'));
            }
            cvBtn.href = profile.CVPath;
            cvBtn.download = '';
            cvBtn.innerHTML = '<i class="fa-solid fa-download"></i> Download CV';
        }
    }

    /**
     * Render Navigation with dynamic links
     * @param {Array} socialLinks - Social links data
     */
    function renderNavigation(socialLinks) {
        const navLinks = document.querySelector('.nav-links');

        // Add certificates link after Projects if data exists
        if (navLinks && document.getElementById('certificates')) {
            const projectsLink = navLinks.querySelector('a[href="#projects"]');
            if (projectsLink && !navLinks.querySelector('a[href="#certificates"]')) {
                const certificatesLink = document.createElement('li');
                certificatesLink.innerHTML = '<a href="#certificates">Certificates</a>';
                navLinks.insertBefore(certificatesLink, projectsLink.parentElement.nextSibling);
            }
        }

        // Add freelance platforms link after Certificates if data exists
        if (navLinks && document.getElementById('freelance')) {
            const certificatesLink = navLinks.querySelector('a[href="#certificates"]');
            const target = certificatesLink || navLinks.querySelector('a[href="#projects"]');
            if (target && !navLinks.querySelector('a[href="#freelance"]')) {
                const freelanceLink = document.createElement('li');
                freelanceLink.innerHTML = '<a href="#freelance">Freelance</a>';
                navLinks.insertBefore(freelanceLink, target.parentElement.nextSibling);
            }
        }
    }

    /**
     * Render all sections
     * @param {Object} data - All data from DataLoader
     */
    function renderAll(data) {
        renderHero(data.profile, data.socialLinks);
        renderAbout(data.profile);
        renderSkills(data.skills);
        renderExperience(data.experience);
        renderEducation(data.education);
        renderServices(data.services);
        renderProjects(data.projects);
        renderCertificates(data.certificates);
        renderFreelancePlatforms(data.freelancePlatforms);
        renderContact(data.profile, data.socialLinks);
        renderNavigation(data.socialLinks);

        // Re-initialize scroll animations
        initScrollAnimations();
    }

    /**
     * Initialize scroll animations
     */
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((el) => observer.observe(el));
    }

    return {
        renderAll,
        renderHero,
        renderAbout,
        renderSkills,
        renderExperience,
        renderEducation,
        renderServices,
        renderProjects,
        renderCertificates,
        renderFreelancePlatforms,
        renderContact,
        initScrollAnimations
    };
})();
