const langSelect = document.getElementById("lang-select");
const formInputs = document.querySelectorAll("#student-form input");

// Define the placeholder texts for each language
const placeholders = {
  az: {
    name: "Ad",
    surname: "Soyad",
    date: "Doğum tarixi",
    education: "Təhsil Mərkəzi",
    faculity: "İxtisas",
    phone: "Mobil Nömrə",
    submit: "Göndər",
    first: "I Qrup",
    second: "II Qrup",
    third: "III Qrup",
    fourth: "IV Qrup",
    fiveth: "V Qrup",
    choose: "Seç",
    promokod: "Promokod",
    chooseMessage: "Zəhmət olmasa, ixtisas seçin",
    errorMessage: "Mobil nömrə yalnız 70,77, 50, 55, 10, 51 ilə başlamalıdır.",
    messages: "Zəhmət olmasa, mobil nömrəni düzgün daxil edin",
  },
  ru: {
    name: "Имя",
    surname: "Фамилия",
    date: "Дата рождения",
    education: "Учреждение среднего образования (школа)",
    faculity: "Группа для поступления в ВУЗ",
    submit: "Отправить",
    phone: "Мобильный номер",
    first: "I Группа",
    second: "II Группа",
    third: "III Группа",
    fourth: "IV Группа",
    fiveth: "V Группа",
    choose: "Выбрать",
    promokod: "Промокод",
    chooseMessage: "Пожалуйста, выберите группу",
    errorMessage:
      "Номер мобильного телефона должен начинаться только с цифр 70,77, 50, 55, 10, 51.",
    messages: "Пожалуйста, введите правильный номер мобильного телефона",
  },
};

// Function to update placeholders based on selected language
function updatePlaceholders(selectedLang) {
  const placeholdersForLang = placeholders[selectedLang];
  if (placeholdersForLang) {
    document.querySelector(".name").textContent = placeholdersForLang.name;
    document.querySelector(".surname").textContent =
      placeholdersForLang.surname;
    document.querySelector(".date").textContent = placeholdersForLang.date;
    document.querySelector(".education").textContent =
      placeholdersForLang.education;
    document.querySelector(".faculity").textContent =
      placeholdersForLang.faculity;
    document.querySelector(".phone").textContent = placeholdersForLang.phone;
    document.querySelector(".promokod").textContent =
      placeholdersForLang.promokod;
    document.querySelector(".submit").value = placeholdersForLang.submit;

    document.querySelector(".opt1").textContent = placeholdersForLang.first;
    document.querySelector(".opt2").textContent = placeholdersForLang.second;
    document.querySelector(".opt3").textContent = placeholdersForLang.third;
    document.querySelector(".opt4").textContent = placeholdersForLang.fourth;
    document.querySelector(".opt5").textContent = placeholdersForLang.fiveth;

    document.querySelector(".choose").textContent = placeholdersForLang.choose;

    document.querySelector(".choose-message").textContent =
      placeholdersForLang.chooseMessage;

    document.querySelector(".error-message").textContent =
      placeholdersForLang.errorMessage;
    document.querySelector(".message").textContent =
      placeholdersForLang.messages;
  }
}

// Event listener for language selection change
langSelect.addEventListener("change", function () {
  const selectedLang = langSelect.value;
  localStorage.setItem("lang", selectedLang);
  updatePlaceholders(selectedLang);
});

// Initialize placeholders based on stored language
const storedLang = localStorage.getItem("lang");
if (storedLang) {
  langSelect.value = storedLang;
  updatePlaceholders(storedLang);
}

document
  .getElementById("student-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Remove any existing error messages
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((element) => element.remove());

    // Fetch form inputs
    const firstName = document.getElementById("name").value.trim();
    const lastName = document.getElementById("surname").value.trim();
    const dateOfBirth = document.getElementById("date").value;
    const educationCenter = document.getElementById("education").value.trim();
    const specialty = document.getElementById("faculity").value.trim();
    const phoneNumber = document.getElementById("phone").value.trim();

    // Validation
    const nameRegex = /^[A-Za-z]+$/;
    const phoneRegex = /^(70|77|50|55|51)\d{7}$/;

    if (!nameRegex.test(firstName)) {
      displayErrorMessage("name", "First name should contain only letters.");
      return;
    }

    if (!nameRegex.test(lastName)) {
      displayErrorMessage("surname", "Last name should contain only letters.");
      return;
    }

    if (phoneNumber.length !== 9 || !phoneRegex.test(phoneNumber)) {
      displayErrorMessage(
        "phone",
        "Phone number should be 9 digits and start with 70, 77, 50, 55, or 51."
      );
      return;
    }

    // Form data is valid, proceed with appending to Excel file
    // const formData = {
    //   firstName,
    //   lastName,
    //   dateOfBirth,
    //   educationCenter,
    //   specialty,
    //   phoneNumber,
    // };

    const formData = new FormData(document.getElementById("student-form"));

    console.log(formData);

    fetch("append_excel.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status);
        }
        // Başarılı yanıt
        console.log("Form data appended to Excel file successfully.");
        // Formu sıfırla
        document.getElementById("student-form").reset();
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });

    //   // Send form data to server
    //   const xhr = new XMLHttpRequest();
    //   xhr.open("POST", "append_excel.php", true);
    //   //xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //   xhr.onload = function () {
    //     if (xhr.status === 200) {
    //       console.log("Form data appended to Excel file successfully.");
    //     } else {
    //       console.error("Failed to append form data to Excel file.");
    //     }
    //   };
    //   xhr.send(JSON.stringify(formData));
    // });
  });

function displayErrorMessage(inputId, message) {
  const inputElement = document.getElementById(inputId);
  const errorMessage = document.createElement("span");
  errorMessage.classList.add("error-message");
  errorMessage.classList.add("red-text"); // Apply red text color
  errorMessage.textContent = message;
  inputElement.insertAdjacentElement("afterend", errorMessage); // Insert after the input field
}

// --------------inputs-----------------
function wordControl(event) {
  let karakter = String.fromCharCode(event.which);
  if (/[0-9]/.test(karakter)) {
    event.preventDefault();
  }
}
function numberControl(event) {
  let karakter = String.fromCharCode(event.which);
  if (!/[0-9]/.test(karakter)) {
    event.preventDefault();
  }
}
function prefixCheck(input) {
  const prefixes = ["70", "77", "50", "55", "10", "51"];
  const value = input.value;
  const prefixValid = prefixes.some((prefix) => value.startsWith(prefix));
  const span = document.querySelector(".error-message");
  if (value.length >= 2 && !prefixValid) {
    span.style.display = "block";
  } else {
    span.style.display = "none";
  }
}

function validateForm() {
  const phoneInput = document.getElementById("phone");
  const faculitySelect = document.getElementById("faculity");
  const spanMessage = document.querySelector(".message");
  const chooseMessage = document.querySelector(".choose-message");
  const form = document.getElementById("student-form");
  const popup = document.getElementById("popup");

  if (phoneInput.value.length !== 9) {
    spanMessage.style.display = "block";
    return false;
  } else {
    spanMessage.style.display = "none";
  }

  if (faculitySelect.value === "choose") {
    chooseMessage.style.display = "block";
    return false;
  } else {
    chooseMessage.style.display = "none";
  }

  if (form !== null) {
    popup.style.display = "flex";
  }
  form.reset();
  return true;
}
document.querySelector("#closePopup").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});
