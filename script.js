// ========== CORE LOGIC START ==========
let assignments = []; // Stores all assignments

function addAssignment(name, grade) {
  if (!name || isNaN(grade) || grade < 0 || grade > 5) {
    alert("Please enter a valid assignment name and a grade between 0 and 5.");
    return;
  }

  const entry = { name, grade };
  assignments.push(entry);
  updateGPA();
  renderAssignments(); // Minimal DOM helper to display
  saveToLocalStorage(); // Bonus feature
}

function updateGPA() {
  if (assignments.length === 0) {
    document.getElementById("gpa").textContent = "0.00";
    return;
  }

  const total = assignments.reduce((sum, a) => sum + a.grade, 0);
  const gpa = (total / assignments.length).toFixed(2);
  document.getElementById("gpa").textContent = gpa; // DOM helper to show GPA
}

// Optional bonus feature (localStorage)
function saveToLocalStorage() {
  localStorage.setItem("assignments", JSON.stringify(assignments));
}

function loadFromLocalStorage() {
  const stored = localStorage.getItem("assignments");
  if (stored) {
    assignments = JSON.parse(stored);
    updateGPA();
    renderAssignments();
  }
}
// ========== CORE LOGIC END ==========



// ========== MINIMAL DOM & EVENTS START ==========
document.addEventListener("DOMContentLoaded", loadFromLocalStorage); // Load saved data

document.getElementById("assignment-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("assignment-name").value.trim();
  const grade = parseFloat(document.getElementById("assignment-grade").value);

  addAssignment(name, grade);

  // Clear input fields
  document.getElementById("assignment-name").value = "";
  document.getElementById("assignment-grade").value = "";
});

// Display assignments on the page
function renderAssignments() {
  const list = document.getElementById("assignment-list");
  list.innerHTML = ""; // Clear list first

  assignments.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.name}: ${entry.grade}/5`;
    list.appendChild(li);
  });
}

// Log data to console when "S" is pressed
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "s") {
    console.log("All assignments:", assignments);
  }
});
// ========== MINIMAL DOM & EVENTS END ==========