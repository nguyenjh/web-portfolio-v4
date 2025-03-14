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