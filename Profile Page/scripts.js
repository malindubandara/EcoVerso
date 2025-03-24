// Get references to the relevant elements
const skipBtns = document.querySelectorAll(".btn-skip");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const answersList = document.getElementById("answers-list");

// Initialize variables
let currentCategory = "personal-details";
let formStepsNum = 0;
let completedQuestions = 0;
let skippedQuestions = {};

// Define the order of categories
const categoriesOrder = [
  "personal-details",
  "volunteering-tasks",
  "qualifications",
  "availability",
];

// Display names for categories
const categoryDisplayNames = {
  "personal-details": "Personal Details",
  "volunteering-tasks": "Volunteering Tasks",
  "qualifications": "Qualifications",
  "availability": "Availability and Contact",
};

// Update form title with current category name
document.getElementById("form-title").textContent =
  categoryDisplayNames["personal-details"];

// Add event listeners for next buttons
nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!validateCurrentInput()) return;
    moveNext();
  });
});

// Add event listeners for skip buttons
skipBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    moveNext();
    trackSkippedQuestions();
  });
});

// Function to move to next form step or category
function moveNext() {
  const categoryFormSteps = document.querySelectorAll(
    `[data-category="${currentCategory}"]`
  );
  if (formStepsNum < categoryFormSteps.length - 1) {
    formStepsNum++;
  } else {
    completedQuestions++;
    const answers = captureInputValues();
    displayAnswers(answers);
    moveToNextCategory();
    return;
  }
  completedQuestions++;
  updateFormSteps();
  updateProgressBar();
}

// Function to move to next category
function moveToNextCategory() {
  const currentCategoryIndex = categoriesOrder.indexOf(currentCategory);
  if (
    currentCategoryIndex !== -1 &&
    currentCategoryIndex < categoriesOrder.length - 1
  ) {
    currentCategory = categoriesOrder[currentCategoryIndex + 1];
    formStepsNum = 0;
    updateFormSteps();
    updateProgressBar();
    document.getElementById("form-title").textContent =
      categoryDisplayNames[currentCategory];
  } else {
    const answers = captureInputValues();
    displayAnswers(answers);
  }
}

// Function to update form steps based on current category and step number
function updateFormSteps() {
  formSteps.forEach((formStep) => {
    const stepCategory = formStep.dataset.category;
    if (
      stepCategory === currentCategory &&
      formStep.dataset.index === formStepsNum.toString()
    ) {
      formStep.classList.add("form-step-active");
    } else {
      formStep.classList.remove("form-step-active");
    }
  });
}

// Function to update progress bar
function updateProgressBar() {
  const totalFormSteps = document.querySelectorAll(".form-step").length;
  const progressPercentage = (completedQuestions / totalFormSteps) * 100;
  progress.style.width = progressPercentage + "%";
  const completionRateElement = document.querySelector(".completion-rate");
  completionRateElement.textContent = `Completion Rate: ${progressPercentage.toFixed(
    0
  )}%`;
}

// Function to capture input values
function captureInputValues() {
  const inputs = document.querySelectorAll("input, select");
  let answers = {};
  inputs.forEach((input) => {
    answers[input.name] = input.type === "checkbox" ? input.checked : input.value;
  });
  return answers;
}

// Function to display answers
function displayAnswers(answers) {
  answersList.innerHTML = ''; // Clear previous answers
  for (const [key, value] of Object.entries(answers)) {
    let questionLabel = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim();
    let answerText = value;
    if (typeof value === 'boolean') {
      answerText = value ? 'Yes' : 'No';
    }
    answersList.innerHTML += `<p>${questionLabel}: ${answerText}</p>`;
  }
  document.querySelector('.answers-section').style.display = 'block';
}

// Function to track skipped questions
function trackSkippedQuestions() {
  const currentStep = formSteps[formStepsNum];
  const input = currentStep.querySelector("input");
  if (input) {
    skippedQuestions[input.name] = input.value || "Skipped";
  }
}

// Function to validate current input
function validateCurrentInput() {
  return true; // Skip validation for now
}

// Event listener for submit button
document.querySelector(".submit-btn-wrapper .btn").addEventListener("click", () => {
  const totalFormSteps = document.querySelectorAll(".form-step").length;
  progress.style.width = "100%";
  const completionRateElement = document.querySelector(".completion-rate");
  completionRateElement.textContent = `Completion Rate: 100%`;
  const answers = captureInputValues();
  displayAnswers(answers);
});