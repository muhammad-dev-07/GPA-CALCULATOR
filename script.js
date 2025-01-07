let courses = [];

document.getElementById("calculateSGPA").addEventListener("click", function () {
    document.getElementById("sgpaSection").classList.remove("hidden");
    document.getElementById("cgpaSection").classList.add("hidden");
});

document.getElementById("calculateCGPA").addEventListener("click", function () {
    document.getElementById("cgpaSection").classList.remove("hidden");
    document.getElementById("sgpaSection").classList.add("hidden");
});

document.getElementById("addCourse").addEventListener("click", function () {
    const courseName = document.getElementById("course").value;
    const grade = parseFloat(document.getElementById("grade").value);
    const credit = parseInt(document.getElementById("credit").value);

    if (!courseName || isNaN(grade) || isNaN(credit)) {
        alert("Please fill out all fields correctly!");
        return;
    }

    const pointsEarned = grade * credit;
    const pointsOutOf = 4 * credit;

    courses.push({ courseName, grade, credit, pointsEarned, pointsOutOf });
    updateTable();
    clearInputs();
});

function updateTable() {
    const tableBody = document.querySelector("#courseTable tbody");
    tableBody.innerHTML = "";

    courses.forEach((course, index) => {
        const row = `<tr>
            <td>${course.courseName}</td>
            <td>${course.grade.toFixed(2)}</td>
            <td>${course.credit}</td>
            <td>${course.pointsEarned.toFixed(2)} / ${course.pointsOutOf.toFixed(2)}</td>
            <td><button class="deleteButton" data-index="${index}">Delete</button></td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    document.querySelectorAll(".deleteButton").forEach((button) => {
        button.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            courses.splice(index, 1);
            updateTable();
        });
    });
}

document.getElementById("calculateSGPAButton").addEventListener("click", function () {
    if (courses.length === 0) {
        alert("Please add at least one course!");
        return;
    }

    const sgpa = calculateSGPA();
    document.getElementById("gpaResult").textContent = `Your SGPA is: ${sgpa.toFixed(2)}`;
});

function calculateSGPA() {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
        totalPoints += course.pointsEarned;
        totalCredits += course.credit;
    });

    return totalCredits ? totalPoints / totalCredits : 0;
}

function clearInputs() {
    document.getElementById("course").value = "";
    document.getElementById("grade").value = "4.00";
    document.getElementById("credit").value = "";
}
