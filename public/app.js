const API = "http://localhost:5000";

// ========================
// RESPONSE DISPLAY
// ========================
function showResponse(data) {
    const responseEl = document.getElementById("response");
    if (!responseEl) return;

    if (data.error || data.message) {
        const isError = !!data.error;
        const alertClass = isError ? "alert-error" : "alert-success";
        const message = data.error || data.message;
        
        responseEl.innerHTML = `
            <div class="alert ${alertClass}">
                <span>${isError ? "⚠️" : "✅"}</span>
                <span>${message}</span>
            </div>
        `;
    } else {
        responseEl.innerHTML = `
            <div class="alert alert-info">
                <span>ℹ️</span>
                <pre style="margin: 0;">${JSON.stringify(data, null, 2)}</pre>
            </div>
        `;
    }

    // Auto-hide success messages after 5 seconds
    if (!data.error) {
        setTimeout(() => {
            responseEl.innerHTML = "";
        }, 5000);
    }
}

// ========================
// AUTHENTICATION FUNCTIONS
// ========================
async function register() {
    const body = {
        username: document.getElementById("regUsername").value,
        email: document.getElementById("regEmail").value,
        password: document.getElementById("regPassword").value,
        roleId: document.getElementById("roleId").value
    };

    if (!body.username || !body.email || !body.password || !body.roleId) {
        showResponse({ error: "All fields are required" });
        return;
    }

    try {
        const response = await fetch(`${API}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        showResponse(data);

        if (response.ok) {
            document.getElementById("registerForm").reset();
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        }
    } catch (error) {
        showResponse({ error: error.message });
    }
}

async function login() {
    const body = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
    };

    if (!body.email || !body.password) {
        showResponse({ error: "Email and password are required" });
        return;
    }

    try {
        const response = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        showResponse(data);

        if (data.token) {
            localStorage.setItem("token", data.token);
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1500);
        }
    } catch (error) {
        showResponse({ error: error.message });
    }
}

async function logout() {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API}/auth/logout`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();
        localStorage.removeItem("token");
        
        // Show feedback before redirect
        setTimeout(() => {
            window.location.href = "login.html";
        }, 500);
    } catch (error) {
        console.error("Logout error:", error);
        localStorage.removeItem("token");
        window.location.href = "login.html";
    }
}

// ========================
// EMPLOYEE FUNCTIONS
// ========================
async function createEmployee() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const body = {
        first_name: document.getElementById("fname").value,
        last_name: document.getElementById("lname").value,
        department: document.getElementById("dept").value,
        salary: document.getElementById("salary").value
    };

    if (!body.first_name || !body.last_name || !body.department || !body.salary) {
        showResponse({ error: "All fields are required" });
        return;
    }

    try {
        const response = await fetch(`${API}/employees`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        showResponse(data);

        if (response.ok) {
            document.getElementById("employeeForm").reset();
            closeAddEmployeeModal();
            
            // Reload employees list if on employees page
            if (window.loadEmployees) {
                setTimeout(() => loadEmployees(), 500);
            }
        }
    } catch (error) {
        showResponse({ error: error.message });
    }
}

async function getEmployees() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(`${API}/employees`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch employees");
        }

        const employees = await response.json();
        
        // If we have a display function, use it
        if (window.displayEmployees) {
            window.displayEmployees(employees);
        }
        
        return employees;
    } catch (error) {
        showResponse({ error: error.message });
        return [];
    }
}

// ========================
// MODAL FUNCTIONS
// ========================
function showAddEmployeeModal() {
    const modal = document.getElementById("addEmployeeModal");
    if (modal) {
        modal.classList.add("show");
        document.getElementById("employeeForm").reset();
    }
}

function closeAddEmployeeModal() {
    const modal = document.getElementById("addEmployeeModal");
    if (modal) {
        modal.classList.remove("show");
    }
}

// Close modal when clicking outside
document.addEventListener("click", function(event) {
    const modal = document.getElementById("addEmployeeModal");
    if (modal && event.target === modal) {
        closeAddEmployeeModal();
    }
});

// Close modal with Escape key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeAddEmployeeModal();
    }
});

// ========================
// UTILITY FUNCTIONS
// ========================
function checkAuth() {
    const token = localStorage.getItem("token");
    const currentPage = window.location.pathname;

    // If no token and trying to access protected page
    if (!token && (currentPage.includes("dashboard") || currentPage.includes("employees"))) {
        window.location.href = "login.html";
    }

    // If token and trying to access auth page
    if (token && (currentPage.includes("login") || currentPage.includes("register"))) {
        window.location.href = "dashboard.html";
    }
}

// Run auth check on page load
document.addEventListener("DOMContentLoaded", checkAuth);
