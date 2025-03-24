function validateForm() {
  let nameInput = document.getElementById("name");
  let emailInput = document.getElementById("email");

  if (!isInputElementWithValue(nameInput)) {
      alert("Please enter your name.");
      return false;
  }

  if (!isInputElementWithValue(emailInput)) {
      alert("Please enter your email.");
      return false;
  }

  return true; 
}

function isInputElementWithValue(element) {
  return element instanceof HTMLInputElement && element.value.trim() !== "";
}

document.getElementById("theForm").addEventListener("submit", function(event) {
  event.preventDefault(); 

  if (!validateForm()) {
      return false;
  }

  this.submit();
});

