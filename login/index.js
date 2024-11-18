// Password visibility toggle
const passwordToggle = document.getElementById("password-toggle");
const passwordInput = document.getElementById("password");

passwordToggle.addEventListener("click", () => {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  passwordToggle.textContent = type === "password" ? "👁️" : "👁️‍🗨️";
});

// Form submission and button animation
const loginForm = document.getElementById("login-form");
const loginBtn = document.querySelector(".login-btn");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginBtn.classList.add("pulse");
  setTimeout(() => {
    loginBtn.classList.remove("pulse");
    alert("Login functionality would be implemented here.");
  }, 1500);
});

// Dynamic background
document.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  document.body.style.background = `
                linear-gradient(
                    ${45 + x * 90}deg,
                    hsl(${180 + y * 60}, 70%, 60%),
                    hsl(${360 + x * 60}, 70%, 60%)
                )
            `;
});
