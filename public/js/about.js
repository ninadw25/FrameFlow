class AboutPageManager {
    constructor(data) {
        this.data = data;
    }

    static async load() {
        try {
            // Use the global data attached to the window object
            const jsonData = window.aboutPageData;
            return new AboutPageManager(jsonData);
        } catch (error) {
            console.error('Error loading data:', error);
            return null;
        }
    }

    renderAboutUsSection() {
        const aboutSection = document.querySelector('.about-us');
        if (!aboutSection) return;

        // Update the title and description
        const titleElement = aboutSection.querySelector('h2');
        const descriptionElement = aboutSection.querySelector('p');

        if (titleElement) titleElement.textContent = this.data.aboutUs.title;
        if (descriptionElement) descriptionElement.textContent = this.data.aboutUs.description;
    }

    renderVisionSection() {
        const visionSection = document.querySelector('.vision');
        if (!visionSection) return;

        const visionContent = visionSection.querySelector('.vision-text');
        if (!visionContent) return;

        // Update vision section content
        const visionTitleElement = visionContent.querySelector('h2');
        const visionDescriptionElement = visionContent.querySelectorAll('p')[0];
        const workflowTitleElement = visionContent.querySelector('h3');
        const workflowDescriptionElement = visionContent.querySelectorAll('p')[1];
        const valuesTitleElement = visionContent.querySelector('h4');
        const valuesDescriptionElement = visionContent.querySelectorAll('p')[2];

        if (visionTitleElement) visionTitleElement.textContent = this.data.vision.title;
        if (visionDescriptionElement) visionDescriptionElement.textContent = this.data.vision.visionDescription;
        if (workflowTitleElement) workflowTitleElement.textContent = this.data.vision.workflow.title;
        if (workflowDescriptionElement) workflowDescriptionElement.textContent = this.data.vision.workflow.description;
        if (valuesTitleElement) valuesTitleElement.textContent = this.data.vision.values.title;
        if (valuesDescriptionElement) valuesDescriptionElement.textContent = this.data.vision.values.description;
    }

    renderConnectSection() {
        const connectSection = document.querySelector('.connect-section');
        if (!connectSection) return;

        const titleElement = connectSection.querySelector('h2');
        const descriptionElement = connectSection.querySelector('.connect-text p');
        const brandNameElement = connectSection.querySelector('.connect-text p2');
        const socialIconsContainer = connectSection.querySelector('.social-icons');

        if (titleElement) titleElement.textContent = this.data.connect.title;
        if (descriptionElement) descriptionElement.textContent = this.data.connect.description;
        if (brandNameElement) brandNameElement.textContent = this.data.connect.brandName;

        // Render social icons
        if (socialIconsContainer) {
            socialIconsContainer.innerHTML = this.data.connect.socialLinks.map(link => `
                <a href="${link.url}" target="_blank">
                    <img src="${link.iconPath}" alt="${link.platform}" class="circle-icon">
                </a>
            `).join('');
        }
    }

    initialize() {
        this.renderAboutUsSection();
        this.renderVisionSection();
        this.renderConnectSection();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    const aboutPageManager = await AboutPageManager.load();
    if (aboutPageManager) {
        aboutPageManager.initialize();
    }
});