const uri = "https://studentwebapi.buchwaldshave34.dk/api";

// Helper function to handle fetch API requests
async function fetchData(endpoint, method = "GET", data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (data) options.body = JSON.stringify(data);

    try {
        const response = await fetch(uri + endpoint, options);
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

// Functions to render data in lists
function renderList(data, listId) {
    const list = document.getElementById(listId);
    list.innerHTML = ""; // Clear previous list
    data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = JSON.stringify(item);
        list.appendChild(listItem);
    });
}

// Course API interaction
async function getCourses() {
    const courses = await fetchData("/Course/GetCourses");
    if (courses) renderList(courses, "courseList");
}

async function createCourse() {
    const courseName = document.getElementById('courseName').value;
    if (!courseName) {
        alert("Course name cannot be empty");
        return;
    }
    const courseData = { CourseName: courseName };
    const result = await fetchData("/Course/CreateCourse", "POST", courseData);
    console.log(result);
    getCourses(); // Refresh the list after creation
}

// Student API interaction
async function getStudents() {
    const students = await fetchData("/Student/GetStudents");
    if (students) renderList(students, "studentList");
}

async function createStudent() {
    const studentFirstName = document.getElementById('studentFirstName').value;
    const studentLastName = document.getElementById('studentLastName').value;
    const studentTeamId = document.getElementById('studentTeamId').value;

    if (!studentFirstName || !studentLastName || !studentTeamId) {
        alert("All fields are required");
        return;
    }

    const studentData = {
        StudentName: studentFirstName,
        StudentLastName: studentLastName,
        TeamID: parseInt(studentTeamId)
    };

    const result = await fetchData("/Student/CreateStudent", "POST", studentData);
    console.log(result);
    getStudents(); // Refresh the list after creation
}

// StudentCourse API interaction
async function getStudentCourses() {
    const studentCourses = await fetchData("/StudentCourse/GetStudentCourses");
    if (studentCourses) renderList(studentCourses, "studentCourseList");
}

async function createStudentCourse() {
    const studentId = document.getElementById('studentId').value;
    const courseId = document.getElementById('courseId').value;

    if (!studentId || !courseId) {
        alert("Both Student ID and Course ID are required");
        return;
    }

    const studentCourseData = {
        StudentID: parseInt(studentId),
        CourseID: parseInt(courseId)
    };

    const result = await fetchData("/StudentCourse/CreateStudentCourse", "POST", studentCourseData);
    console.log(result);
    getStudentCourses(); // Refresh the list after creation
}

// Team API interaction
async function getTeams() {
    const teams = await fetchData("/Team/GetTeams");
    if (teams) renderList(teams, "teamList");
}

async function createTeam() {
    const teamName = document.getElementById('teamName').value;
    if (!teamName) {
        alert("Team name cannot be empty");
        return;
    }
    const teamData = { TeamName: teamName };
    const result = await fetchData("/Team/CreateTeam", "POST", teamData);
    console.log(result);
    getTeams(); // Refresh the list after creation
}
