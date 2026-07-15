const API = "http://localhost:5000";

function showResponse(data){
    document.getElementById("response")
        .innerText =
        JSON.stringify(data,null,2);
}

async function register(){

    const body = {
        username:
        document.getElementById("regUsername").value,

        email:
        document.getElementById("regEmail").value,

        password:
        document.getElementById("regPassword").value,

        roleId:
        document.getElementById("roleId").value
    };

    const response = await fetch(
        `${API}/auth/register`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        }
    );

    const data = await response.json();

    showResponse(data);
}

async function login(){

    const body = {

        email:
        document.getElementById("loginEmail").value,

        password:
        document.getElementById("loginPassword").value
    };

    const response = await fetch(
        `${API}/auth/login`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        }
    );

    const data = await response.json();

    if(data.token){

        localStorage.setItem(
            "token",
            data.token
        );

        document.getElementById(
            "tokenBox"
        ).value = data.token;
    }

    showResponse(data);
}

async function createEmployee(){

    const token =
    localStorage.getItem("token");

    const body = {

        first_name:
        document.getElementById("fname").value,

        last_name:
        document.getElementById("lname").value,

        department:
        document.getElementById("dept").value,

        salary:
        document.getElementById("salary").value
    };

    const response = await fetch(
        `${API}/employees`,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json",
                "Authorization":
                `Bearer ${token}`
            },

            body:JSON.stringify(body)
        }
    );

    const data = await response.json();

    showResponse(data);
}

async function getEmployees(){

    const token =
    localStorage.getItem("token");

    const response = await fetch(
        `${API}/employees`,
        {
            headers:{
                "Authorization":
                `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    document.getElementById(
        "employeeList"
    ).innerText =
    JSON.stringify(data,null,2);

    showResponse(data);
}

async function logout(){

    const token =
    localStorage.getItem("token");

    const response = await fetch(
        `${API}/auth/logout`,
        {
            method:"POST",

            headers:{
                "Authorization":
                `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    localStorage.removeItem("token");

    document.getElementById(
        "tokenBox"
    ).value = "";

    showResponse(data);

    setTimeout(() => {
        location.reload();
    }, 1000);
}