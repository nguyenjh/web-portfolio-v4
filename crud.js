// CRUD Actions
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("crudForm");
    const tableBody = document.querySelector("#dataTable tbody");

    let data = JSON.parse(localStorage.getItem("crudData")) || [];

    function renderTable() {
        tableBody.innerHTML = "";
        data.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.description}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Create: Add new data
    document.getElementById("createBtn").addEventListener("click", function () {
        const id = document.getElementById("id").value;
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;

        if (id && name && description) {
            data.push({ id, name, description });
            localStorage.setItem("crudData", JSON.stringify(data));
            renderTable();
            form.reset();
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Read: Display all data
    document.getElementById("readBtn").addEventListener("click", function () {
        renderTable();
    });

    // Update: Modify existing data
    document.getElementById("updateBtn").addEventListener("click", function () {
        const id = document.getElementById("id").value;
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;

        if (id && name && description) {
            const index = data.findIndex(item => item.id === id);
            if (index !== -1) {
                data[index] = { id, name, description };
                localStorage.setItem("crudData", JSON.stringify(data));
                renderTable();
                form.reset();
            } else {
                alert("ID not found.");
            }
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Delete: Remove data by ID
    document.getElementById("deleteBtn").addEventListener("click", function () {
        const id = document.getElementById("id").value;

        if (id) {
            const index = data.findIndex(item => item.id === id);
            if (index !== -1) {
                data.splice(index, 1);
                localStorage.setItem("crudData", JSON.stringify(data));
                renderTable();
                form.reset();
            } else {
                alert("ID not found.");
            }
        } else {
            alert("Please enter an ID.");
        }
    });

    // Initial render
    renderTable();
});