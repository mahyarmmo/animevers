// سند جاوااسکریپت
let resendTimer = 60;
let countdownInterval = null;

function showSection(sectionId) {
  var sections = document.querySelectorAll('.content-section');
  sections.forEach(function(section) {
    section.classList.remove('active');
  });

  setTimeout(function() {
    document.getElementById(sectionId).classList.add('active');
  }, 100);
}

function toggleDropdown() {
  document.getElementById("genreDropdown").classList.toggle("show");
}

function scrollSlider(direction, sliderId) {
  const slider = document.getElementById(sliderId);
  const scrollAmount = 300;
  
  if (slider) {
    if (direction === 'right') {
      slider.scrollLeft += scrollAmount;
    } else {
      slider.scrollLeft -= scrollAmount;
    }
  }
}

// لیست انیمه‌ها
const animeList = [
  { name: "ناروتو", url: "Naruto.html", hidden: false },
  { name: "حمله به تایتان", url: "Attack on Titanhtml.html", hidden: false },
  { name: "وان پیس", url: "one piece.html", hidden: false },
  { name: "شیطان‌کش", url: "demon slayer.html", hidden: false },
  { name: "جوجوتسو کایسن", url: "Jujutsu Kaisen.html", hidden: false },
  { name: "کیمیاگر تمام فلزی:برادری", url: "#", hidden: true },
  { name: "شب‌در سیاه", url: "#", hidden: true }
];

function searchAnime() {
  let query = document.getElementById("searchBox").value.toLowerCase().trim();
  let resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  let filteredResults;

  if (query === "") {
    filteredResults = animeList.filter(anime => !anime.hidden);
  } else {
    filteredResults = animeList.filter(anime =>
      anime.name.toLowerCase().includes(query)
    );
  }

  if (filteredResults.length > 0) {
    resultsDiv.style.display = "block";
    filteredResults.forEach(anime => {
      let link = document.createElement("a");
      link.href = anime.url;
      link.innerText = anime.name;
      resultsDiv.appendChild(link);
    });
  } else {
    resultsDiv.style.display = "block";
    resultsDiv.innerText = "انیمه‌ای پیدا نشد!";
  }
}

function filterAnime(genre) {
  const allGenreSections = document.querySelectorAll('.genre-section');

  allGenreSections.forEach(section => {
    const sectionGenre = section.getAttribute('data-genre');
    if (sectionGenre === genre) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  });

  document.getElementById("showAllBtn").style.display = "inline-block";
}

function showAllGenres() {
  const allGenreSections = document.querySelectorAll('.genre-section');
  allGenreSections.forEach(section => {
    section.style.display = 'block';
  });

  document.getElementById("showAllBtn").style.display = "none";
}

function toggleDarkMode() {
  const body = document.body;
  const checkbox = document.getElementById("themeToggle");
  const themeLabel = document.getElementById("themeLabel");
  const themeIcon = document.querySelector(".theme-icon");

  if (checkbox.checked) {
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    themeLabel.textContent = "حالت شب";
    themeIcon.textContent = "🌙";
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
    themeLabel.textContent = "حالت روز";
    themeIcon.textContent = "🌞";
  }
}

function startResendCountdown() {
  const resendBtn = document.getElementById("resendCodeBtn");
  if (!resendBtn) return;

  clearInterval(countdownInterval);
  resendBtn.disabled = true;
  resendBtn.classList.remove("enabled");
  resendBtn.textContent = `ارسال مجدد کد (${resendTimer})`;

  countdownInterval = setInterval(() => {
    resendTimer--;
    resendBtn.textContent = `ارسال مجدد کد (${resendTimer})`;

    if (resendTimer <= 0) {
      clearInterval(countdownInterval);
      resendBtn.disabled = false;
      resendBtn.classList.add("enabled");
      resendBtn.textContent = "ارسال مجدد کد";
    }
  }, 1000);
}

function openSignupModal() {
  document.getElementById("phoneStep").style.display = "block";
}

function closeSignupModal() {
  document.getElementById("signupModal").style.display = "none";
}

function closephoneStep() {
  document.getElementById("phoneStep").style.display = "none";
}

function closeCodeStep() {
  document.getElementById("codeStep").style.display = "none";
}

function switchToLogin() {
  document.getElementById("signupModal").style.display = "none";
  document.getElementById("loginModal").style.display = "block";
}

// تابع برای بستن مودال با کلیک بیرون
function setupModalCloseOnOutsideClick() {
  document.addEventListener("click", function(event) {
    // مودال شماره تلفن
    const phoneStep = document.getElementById("phoneStep");
    if (phoneStep && phoneStep.style.display === "block") {
      const phoneContent = phoneStep.querySelector(".modal-content");
      if (phoneContent && !phoneContent.contains(event.target)) {
        phoneStep.style.display = "none";
      }
    }

    // مودال کد تأیید
    const codeStep = document.getElementById("codeStep");
    if (codeStep && codeStep.style.display === "block") {
      const codeContent = codeStep.querySelector(".modal-content");
      if (codeContent && !codeContent.contains(event.target)) {
        codeStep.style.display = "none";
      }
    }

    // مودال ثبت‌نام
    const signupModal = document.getElementById("signupModal");
    if (signupModal && signupModal.style.display === "block") {
      const signupContent = signupModal.querySelector(".modal-content");
      if (signupContent && !signupContent.contains(event.target)) {
        signupModal.style.display = "none";
      }
    }
  });
}

// هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', function() {
  showSection('home');
  
  // مخفی کردن مودال‌ها در ابتدا
  document.getElementById("signupModal").style.display = "none";
  document.getElementById("phoneStep").style.display = "none";
  document.getElementById("codeStep").style.display = "none";

  // راه‌اندازی بستن مودال با کلیک بیرون
  setupModalCloseOnOutsideClick();

  // کنترل نمایش منو
  window.toggleDropdown = toggleDropdown;

  // بستن منو در کلیک بیرون
  document.addEventListener("click", function(event) {
    if (!event.target.matches('.dropdown-button')) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  });

  // پنهان کردن نتایج جستجو
  document.addEventListener("click", function(event) {
    if (!event.target.closest(".search-bar")) {
      document.getElementById("results").style.display = "none";
    }
  });

  // حالت شب/روز
  const savedTheme = localStorage.getItem("theme");
  const checkbox = document.getElementById("themeToggle");
  const themeLabel = document.getElementById("themeLabel");
  const themeIcon = document.querySelector(".theme-icon");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (checkbox) checkbox.checked = true;
    if (themeLabel) themeLabel.textContent = "حالت شب";
    if (themeIcon) themeIcon.textContent = "🌙";
  } else {
    if (checkbox) checkbox.checked = false;
    if (themeLabel) themeLabel.textContent = "حالت روز";
    if (themeIcon) themeIcon.textContent = "🌞";
  }

  // فرم شماره تلفن
  const phoneForm = document.getElementById("phoneForm");
  if (phoneForm) {
    phoneForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const phone = document.getElementById("userPhone").value;

      if (phone.trim() !== "") {
        alert(`کد به ${phone} ارسال شد`);
        document.getElementById("phoneStep").style.display = "none";
        document.getElementById("codeStep").style.display = "block";
        resendTimer = 60;
        startResendCountdown();
      } else {
        alert("لطفاً شماره معتبر وارد کنید");
      }
    });
  }

  // فرم کد تأیید
  const codeForm = document.getElementById("codeForm");
  if (codeForm) {
    codeForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const enteredCode = document.getElementById("confirmCode").value;

      if (enteredCode === "1234") {
        alert("کد تأیید شد!");
        document.getElementById("codeStep").style.display = "none";
        document.getElementById("signupModal").style.display = "block";
      } else {
        alert("کد اشتباهه، دوباره امتحان کن!");
      }
    });
  }

  // دکمه ارسال مجدد کد
  const resendBtn = document.getElementById("resendCodeBtn");
  if (resendBtn) {
    resendBtn.addEventListener("click", function() {
      if (!resendBtn.disabled) {
        resendTimer = 60;
        alert("کد جدید ارسال شد!");
        startResendCountdown();
      }
    });
  }

  // فرم ثبت‌نام
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const username = signupForm.elements[0].value;
      const password = signupForm.elements[1].value;
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      alert("ثبت‌نام با موفقیت انجام شد!");
      document.getElementById("signupModal").style.display = "none";
    });
  }

  // بستن مودال با کلیک روی دکمه بستن
  const closeBtn = document.querySelector(".close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", function() {
      document.getElementById("signupModal").style.display = "none";
    });
  }
});

// توابع عمومی که باید در scope全局 باشند
window.showSection = showSection;
window.scrollSlider = scrollSlider;
window.searchAnime = searchAnime;
window.filterAnime = filterAnime;
window.showAllGenres = showAllGenres;
window.toggleDarkMode = toggleDarkMode;
window.openSignupModal = openSignupModal;
window.closeSignupModal = closeSignupModal;
window.closephoneStep = closephoneStep;
window.closeCodeStep = closeCodeStep;
window.switchToLogin = switchToLogin;