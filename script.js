// script.js

// Ekran alanını seçelim
const display = document.getElementById("display");

// Hesaplama için değişkenler
let currentInput = "";  // Şu anki girilen değer
let previousInput = ""; // Önceki girilen değer
let operator = null;    // Seçilen işlem operatörü

// Tüm butonları seçelim
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
  button.addEventListener("click", function() {
    const value = this.getAttribute("data-value");

    // Eğer butona tıklanırsa rakamlar ya da operatörler kontrol edilsin
    if (value === "C") {
      // C'ye basıldığında ekran ve değişkenler sıfırlanır
      clearDisplay();
    } else if (value === "=") {
      // "=" butonuna basıldığında sonuç hesaplanır
      calculateResult();
    } else if (value === "+" || value === "-" || value === "*" || value === "/") {
      // Operatör girildiğinde önceki değer kaydedilir ve yeni işlem başlar
      handleOperator(value);
    } else {
      // Rakam ya da sayı basılırsa ekranda gösterilsin
      appendNumber(value);
    }
  });
});

// Rakamları ekrana ekleme fonksiyonu
function appendNumber(number) {
  currentInput += number;
  display.value = currentInput;
}

// Operatörü işleme alma fonksiyonu
function handleOperator(selectedOperator) {
  if (currentInput === "") return; // Eğer giriş boşsa işlem yapma

  if (previousInput !== "") {
    calculateResult(); // Eğer önceki işlem varsa önce sonucu hesapla
  }

  operator = selectedOperator;
  previousInput = currentInput;
  currentInput = "";
}

// Hesaplama işlemi
function calculateResult() {
  let result;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = "";
  display.value = currentInput;
}

// Ekranı temizleme fonksiyonu
function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operator = null;
  display.value = "";
}
