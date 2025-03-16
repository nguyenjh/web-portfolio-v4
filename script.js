// Add a class to <html> to indicate JS is enabled
document.documentElement.classList.add("js-enabled");

// Contact Form
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const commentsInput = document.getElementById("comments");
    const formErrorsField = document.getElementById("form-errors");
    let form_errors = [];

    // MailToURL Submit
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const comments = document.getElementById("comments").value;

        const subject = `Contact Form Submission from ${name}`;
        const body = `${comments}`;
        const mailtoUrl = `mailto:jhn013@ucsd.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        const confirmSend = confirm("Your email client will open to send the message. Continue?");
        if (confirmSend) {
            window.location.href = mailtoUrl;
        }
    });

    // Allowed character regex for name & comments
    const allowedChars = /^[A-Za-z0-9\s.,!?'"-]*$/;

    function showError(input, message) {
        const errorOutput = document.getElementById(input.id + "-error");
        errorOutput.textContent = message;
        errorOutput.classList.remove("hidden");
        input.classList.add("flash");

        setTimeout(() => {
            errorOutput.classList.add("hidden");
            input.classList.remove("flash");
        }, 2000);
    }

    // Masking input for Name and Comments
    function enforceCharacterRules(event) {
        if (!allowedChars.test(event.target.value)) {
            showError(event.target, "Invalid character entered.");
            event.target.value = event.target.value.replace(/[^A-Za-z0-9\s.,!?'"-]/g, "");
            form_errors.push({});
        }
    }

    nameInput.addEventListener("input", enforceCharacterRules);
    commentsInput.addEventListener("input", enforceCharacterRules);

    // Character countdown for comments
    commentsInput.addEventListener("input", function () {
        const remaining = 300 - commentsInput.value.length;
        const infoOutput = document.getElementById("comments-info");

        infoOutput.textContent = `Characters left: ${remaining}`;
        infoOutput.classList.toggle("warning", remaining < 50);
        infoOutput.classList.toggle("error", remaining < 10);
    });

    nameInput.addEventListener("invalid", (e) => {
        showError(nameInput, "Please enter your name.");
        form_errors.push({ field: nameInput.value, message: "Invalid or missing name" });
    });

    emailInput.addEventListener("invalid", (e) => {
        showError(emailInput, "Please enter a valid email.");
        form_errors.push({ field: emailInput.value, message: "Invalid email format" });
    });

    commentsInput.addEventListener("invalid", (e) => {
        showError(commentsInput, "Comments must be between 10 and 300 characters.");
        form_errors.push({ field: commentsInput.value, message: "Invalid comments length" });
        console.log(form_errors);
    });

    // Custom Validation
    form.addEventListener("submit", function (event) {
        if (form_errors.length > 0) {
            formErrorsField.value = JSON.stringify(form_errors);
        }
    });
});

// Toggle Theme
document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    // Apply the saved theme
    if (currentTheme === "dark") {
        document.body.classList.add("light-theme");
        themeToggleBtn.textContent = "☀︎";
    } else {
        themeToggleBtn.textContent = "⏾";
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");

        if (document.body.classList.contains("light-theme")) {
            localStorage.setItem("theme", "dark");
            themeToggleBtn.textContent = "☀︎";
        } else {
            localStorage.setItem("theme", "light");
            themeToggleBtn.textContent = "⏾";
        }
    });
});

// CustomElement project-card
class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        console.log('Shadow root attached'); // Debug log
    }

    connectedCallback() {
        console.log('Project card connected'); // Check if this logs
        const title = this.getAttribute('title') || 'Project Title';
        const image = this.getAttribute('image') || 'default-image.jpg';
        const description = this.getAttribute('description') || 'Project description goes here.';
        const link1 = this.getAttribute('link1') || '#';
        const link2 = this.getAttribute('link2') || '#';
    
        this.shadowRoot.innerHTML = `
            <style>
                .projectItem {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                
                .projectItem:hover {
                    background: rgba(53, 53, 53, 0.3);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    transform: translateY(-2px);
                    transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
                }

                .projectItem img {
                    border-radius: 10px;
                    margin: 1rem 0;
                    width: 180px;
                    transition: transform 0.3s ease-in-out;
                }

                .projectItem img:hover {
                    transform: scale(1.1);
                }

                .projectItem hgroup {
                    flex-grow: 1;
                    font-size: 160%;
                }

                h2 {
                    color: var(--orange);
                }

                p {
                    font-size: 30px;
                }

                .projectItem hgroup a {
                    color: white;
                }

                .projectItem hgroup a:hover {
                    color: var(--orange);
                    transform: scale(1.1);
                }

                :host-context(.light-theme) h2 {
                    color: var(--accent-color);
                }

                :host-context(.light-theme) a {
                    color: var(--text-color);
                }

                :host-context(.light-theme) a:hover {
                    color: var(--accent-color);
                }
            </style>

            <article class="projectItem">
                <a rel="noopener" target="_blank" href="${link1}">
                    <picture>
                        <source media="(min-width:650px)" srcset="${image}">
                        <img src="${image}" alt="${title}" loading="lazy" width="100">
                    </picture>
                </a>
                <hgroup>
                    <h2>${title}</h2>
                    <p>${description}</p>
                    <a rel="noopener" target="_blank" href="${link1}">
                        Website
                    </a>
                    &nbsp;
                    <a rel="noopener" target="_blank" href="${link2}">
                        GitHub Repository
                    </a>
                </hgroup>
            </article>
            <hr>
        `;
    }
}

customElements.define('project-card', ProjectCard);

// Data Loading
// Default data to store in localStorage
const defaultData = [
    {
        "title": "Code Names - ACM",
        "image": "./media/codenames.png",
        "description": "A digital recreation of the card game, Codenames.",
        "link1": "https://codenames-acm.netlify.app/",
        "link2": "https://github.com/acmucsd-projects/sp23-hack-team-1"
    },
    {
        "title": "Plateful",
        "image": "./media/plateful.png",
        "description": "Social-Sharing Recipe Platform.",
        "link1": "https://github.com/nguyenjh/CSE-110-Group-11",
        "link2": "https://github.com/nguyenjh/CSE-110-Group-11"
    },
    {
        "title": "TaskRPG",
        "image": "./media/taskrpg.png",
        "description": "Gamified productivity website.",
        "link1": "https://taskrpg.netlify.app/",
        "link2": "https://github.com/nguyenjh/TaskRPG"
    },
    {
        "title": "The Lost Royal Cat",
        "image": "./media/lost_royal_cat.png",
        "description": "A simple 2D platformer game created using Unity.",
        "link1": "https://juwie-ly.itch.io/the-lost-royal-cat",
        "link2": "https://github.com/nguyenjh/The-Lost-Royal-Cat"
    },
    {
        "title": "Travel Serenity",
        "image": "./media/travel_serenity.png",
        "description": "MERN stack hotel booking website.",
        "link1": "https://github.com/nguyenjh/travel-serenity",
        "link2": "https://github.com/nguyenjh/travel-serenity"
    }
];

// Save default data to localStorage if it doesn't exist
if (!localStorage.getItem('projects')) {
    localStorage.setItem('projects', JSON.stringify(defaultData));
}

// Load local
document.getElementById('load-local').addEventListener('click', () => {
    const projects = JSON.parse(localStorage.getItem('projects'));
    populateProjects(projects);
});

// Load remote
document.getElementById('load-remote').addEventListener('click', () => {
    fetch('https://my-json-server.typicode.com/nguyenjh/web-portfolio-v4-My-JSON-Server/projects')
        .then(response => response.json())
        .then(data => {
            populateProjects(data);
        })
        .catch(error => console.error('Error fetching remote data:', error));
});

// Populate project-card's
function populateProjects(projects) {
    const projectsContainer = document.getElementById('projects');
    projectsContainer.innerHTML = ''; // Clear existing cards

    projects.forEach(project => {
        const card = document.createElement('project-card');
        card.setAttribute('title', project.title);
        card.setAttribute('image', project.image);
        card.setAttribute('description', project.description);
        card.setAttribute('link1', project.link1);
        card.setAttribute('link2', project.link2);
        projectsContainer.appendChild(card);
    });
}

// Function to create a blank project card
function createBlankCard() {
    const card = document.createElement('project-card');
    card.setAttribute('title', 'Project Title');
    card.setAttribute('image', './media/placeholder.png'); // Use a placeholder image
    card.setAttribute('description', 'Project description goes here.');
    card.setAttribute('link1', '#');
    card.setAttribute('link2', '#');
    return card;
}

// Function to populate blank cards
function populateBlankCards(count) {
    const projectsContainer = document.getElementById('projects');
    projectsContainer.innerHTML = ''; // Clear existing cards

    for (let i = 0; i < count; i++) {
        const card = createBlankCard();
        projectsContainer.appendChild(card);
    }
}

// Populate blank cards when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects');
    projectsContainer.innerHTML = ''; // Clear any existing content

    // Add the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.innerHTML = `
        <button id="load-local">Load Local</button>
        <button id="load-remote">Load Remote</button>
    `;
    projectsContainer.appendChild(buttonContainer);

    // Add blank cards
    populateBlankCards(5); // Create 5 blank cards
});

// // Fetch data from projects.json
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed'); // Check if this logs

//     fetch('projects.json')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Data fetched:', data); // Check if this logs the correct data
//             const projectsContainer = document.getElementById('projects');
//             if (!projectsContainer) {
//                 console.error('Projects container not found');
//                 return;
//             }
//             console.log('Projects container found:', projectsContainer); // Check if this logs
//             data.forEach(project => {
//                 const card = document.createElement('project-card');
//                 card.setAttribute('title', project.title);
//                 card.setAttribute('image', project.image);
//                 card.setAttribute('description', project.description);
//                 card.setAttribute('link1', project.link1);
//                 card.setAttribute('link2', project.link2);
//                 projectsContainer.appendChild(card);
//             });
//         })
//         .catch(error => console.error('Error fetching projects:', error));
// });