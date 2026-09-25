// ==============================
// CHANGE PAGE
// ==============================

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.add("hidden");
    });

    document
        .getElementById(pageName)
        .classList.remove("hidden");
}


// ==============================
// CREATE ACCOUNT
// ==============================

function createAccount() {

    const name =
        document.getElementById("name").value;

    const school =
        document.getElementById("school").value;

    const district =
        document.getElementById("district").value;

    const level =
        document.getElementById("level").value;

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;


    if (
        name === "" ||
        school === "" ||
        district === "" ||
        level === "" ||
        username === "" ||
        password === ""
    ) {

        document.getElementById(
            "registerMessage"
        ).textContent =
            "Please fill in all fields.";

        return;
    }


    const student = {

        name: name,
        school: school,
        district: district,
        level: level,
        username: username,
        password: password

    };


    localStorage.setItem(
        "studentAccount",
        JSON.stringify(student)
    );


    document.getElementById(
        "registerMessage"
    ).textContent =
        "Account created successfully!";


    setTimeout(function() {

        showPage("login");

    }, 1000);
}


// ==============================
// LOGIN
// ==============================

function login() {

    const username =
        document.getElementById(
            "loginUsername"
        ).value;

    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    const student =
        JSON.parse(
            localStorage.getItem(
                "studentAccount"
            )
        );


    if (!student) {

        document.getElementById(
            "loginMessage"
        ).textContent =
            "Account not found. Create an account first.";

        return;
    }


    if (
        username === student.username &&
        password === student.password
    ) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );


        showPage("dashboard");

        displayStudent();

    }

    else {

        document.getElementById(
            "loginMessage"
        ).textContent =
            "Wrong username or password.";

    }
}


// ==============================
// DISPLAY STUDENT
// ==============================

function displayStudent() {

    const student =
        JSON.parse(
            localStorage.getItem(
                "studentAccount"
            )
        );


    document.getElementById(
        "studentInformation"
    ).innerHTML = `

        <h3>Hello, ${student.name}!</h3>

        <p>
            <strong>School:</strong>
            ${student.school}
        </p>

        <p>
            <strong>District:</strong>
            ${student.district}
        </p>

        <p>
            <strong>Level:</strong>
            ${student.level}
        </p>

        <p>
            <strong>Username:</strong>
            ${student.username}
        </p>

    `;
}


// ==============================
// LOGOUT
// ==============================

function logout() {

    localStorage.removeItem(
        "loggedIn"
    );

    showPage("home");
}


// ==============================
// COMMUNITY POST
// ==============================

function postMessage() {

    const text =
        document.getElementById(
            "postText"
        ).value;


    if (text.trim() === "") {

        alert(
            "Please write something first."
        );

        return;
    }


    const student =
        JSON.parse(
            localStorage.getItem(
                "studentAccount"
            )
        );


    let posts =
        JSON.parse(
            localStorage.getItem(
                "studentPosts"
            )
        ) || [];


    posts.push({

        name: student
            ? student.name
            : "Student",

        text: text

    });


    localStorage.setItem(
        "studentPosts",
        JSON.stringify(posts)
    );


    document.getElementById(
        "postText"
    ).value = "";


    displayPosts();
}


// ==============================
// DISPLAY POSTS
// ==============================

function displayPosts() {

    const container =
        document.getElementById(
            "posts"
        );


    let posts =
        JSON.parse(
            localStorage.getItem(
                "studentPosts"
            )
        ) || [];


    container.innerHTML = "";


    posts.forEach(function(post) {

        const div =
            document.createElement(
                "div"
            );


        div.className = "post";


        div.innerHTML = `

            <strong>
                ${post.name}
            </strong>

            <p>
                ${post.text}
            </p>

        `;


        container.appendChild(div);

    });
}


// ==============================
// START
// ==============================

showPage("home");

displayPosts();