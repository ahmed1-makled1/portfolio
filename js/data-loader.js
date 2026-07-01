/**
 * Data Loader Module
 * Handles loading and parsing Excel/CSV files using SheetJS
 */

const DataLoader = (() => {
    // Store loaded data
    const dataStore = {
        profile: null,
        skills: null,
        experience: null,
        education: null,
        services: null,
        freelancePlatforms: null,
        certificates: null,
        socialLinks: null,
        projects: null
    };

    /**
     * Load and parse a single file
     * @param {string} filename - Name of the file in /data directory
     * @returns {Promise<Array>} - Parsed data as array of objects
     */
    async function loadFile(filename) {
        try {
            const response = await fetch(`data/${filename}`);
            if (!response.ok) {
                console.warn(`File not found: ${filename}`);
                return null;
            }
            const arrayBuffer = await response.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false, defval: '' });
            return jsonData;
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            return null;
        }
    }

    /**
     * Load all data files
     * @returns {Promise<Object>} - Object containing all loaded data
     */
    async function loadAllData() {
        showLoadingState();

        try {
            // Load all files in parallel
            const [
                profileData,
                skillsData,
                experienceData,
                educationData,
                servicesData,
                freelancePlatformsData,
                certificatesData,
                socialLinksData,
                projectsData
            ] = await Promise.all([
                loadFile('profile.csv'),
                loadFile('skills.csv'),
                loadFile('experience.csv'),
                loadFile('education.csv'),
                loadFile('services.csv'),
                loadFile('freelance-platforms.csv'),
                loadFile('certificates.csv'),
                loadFile('social-links.csv'),
                loadFile('projects.csv')
            ]);

            // Store data
            dataStore.profile = profileData ? profileData[0] : null;
            dataStore.skills = skillsData || [];
            dataStore.experience = experienceData || [];
            dataStore.education = educationData || [];
            dataStore.services = servicesData || [];
            dataStore.freelancePlatforms = freelancePlatformsData || [];
            dataStore.certificates = certificatesData || [];
            dataStore.socialLinks = socialLinksData || [];
            dataStore.projects = projectsData || [];

            hideLoadingState();
            return dataStore;
        } catch (error) {
            console.error('Error loading data:', error);
            hideLoadingState();
            showErrorState();
            return dataStore;
        }
    }

    /**
     * Get specific data
     * @param {string} key - Data key
     * @returns {any} - Requested data
     */
    function getData(key) {
        return dataStore[key];
    }

    /**
     * Get all data
     * @returns {Object} - All stored data
     */
    function getAllData() {
        return dataStore;
    }

    /**
     * Show loading state
     */
    function showLoadingState() {
        document.body.classList.add('loading');
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'flex';
    }

    /**
     * Hide loading state
     */
    function hideLoadingState() {
        document.body.classList.remove('loading');
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
    }

    /**
     * Show error state
     */
    function showErrorState() {
        const errorBanner = document.getElementById('error-banner');
        if (errorBanner) {
            errorBanner.style.display = 'block';
            errorBanner.innerHTML = `
                <div class="error-content">
                    <i class="fa-solid fa-exclamation-triangle"></i>
                    <p>Error loading data. Please check that all data files exist in the /data directory.</p>
                </div>
            `;
        }
    }

    return {
        loadAllData,
        getData,
        getAllData
    };
})();
