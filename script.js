function calculateBMI() {
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);

  if (height <= 0 || weight <= 0) {
    alert("Please enter valid height and weight values.");
    return;
  }

  const bmi = weight / (height / 100) ** 2;
  const resultElement = document.getElementById("result");

  // Display the BMI value
  resultElement.textContent = `Your BMI is ${bmi.toFixed(2)}`;

  // Add interpretation of the BMI value
  if (bmi < 18.5) {
    resultElement.textContent += " (Underweight)";
  } else if (bmi < 25) {
    resultElement.textContent += " (Normal weight)";
  } else if (bmi < 30) {
    resultElement.textContent += " (Overweight)";
  } else {
    resultElement.textContent += " (Obese)";
  }
}
