const users = [
  {
    firstname: "John",
    lastname: "Doe",
    username: "johndoe",
    password: "password123",
    photos: [
      {
        url: " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKtKkuCjVMZ09HHU7OxCs0h7421BzTwVWGjA&s",
        numberOfLikes: 150,
      },
      {
        url: " https://media.licdn.com/dms/image/D4E12AQG0hyhZmq0AyQ/article-cover_image-shrink_600_2000/0/1700488940348?e=2147483647&v=beta&t=eZtDe_xSbm65L-mR1tnM8vnfMpM3aWcSe8rw8o7sjSs",
        numberOfLikes: 230,
      },
      {
        url: " https://images.squarespace-cdn.com/content/v1/61c4da8eb1b30a201b9669f2/e2e0e62f-0064-4f86-b9d8-5a55cb7110ca/Korembi-January-2024.jpg",
        numberOfLikes: 180,
      },
    ],
  },
  {
    firstname: "Jane",
    lastname: "Smith",
    username: "janesmith",
    password: "securePass456",
    photos: [
      {
        url: " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDCsqRYLAFDdL4Ix_AHai7kNVyoPV9Ssv1xg&s",
        numberOfLikes: 120,
      },
      {
        url: " https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_1280.jpg",
        numberOfLikes: 300,
      },
      {
        url: " https://d2zp5xs5cp8zlg.cloudfront.net/image-53920-800.jpg",
        numberOfLikes: 450,
      },
      {
        url: " https://www.rossmorevethospital.com.au/wp-content/uploads/2022/08/golden-baby-cat.jpeg",
        numberOfLikes: 210,
      },
    ],
  },
  {
    firstname: "Ali",
    lastname: "Hassan",
    username: "alihassan",
    password: "pass789",
    photos: [
      {
        url: " https://dogsinc.org/wp-content/uploads/2021/08/extraordinary-dog.png",
        numberOfLikes: 95,
      },
      {
        url: " https://www.petfinder.com/static/aaea4f00d379aabd5d64bb1b8981894d/542a1/shelter-dog-cropped-1.jpg",
        numberOfLikes: 220,
      },
      {
        url: " https://images.squarespace-cdn.com/content/v1/54822a56e4b0b30bd821480c/45ed8ecf-0bb2-4e34-8fcf-624db47c43c8/Golden+Retrievers+dans+pet+care.jpeg",
        numberOfLikes: 180,
      },
      {
        url: " https://media.post.rvohealth.io/wp-content/uploads/sites/3/2020/02/322868_1100-732x549.jpg",
        numberOfLikes: 145,
      },
      {
        url: " https://www.dogsforgood.org/wp-content/uploads/2020/06/Dogs-For-Good-October-22-2019-308.jpg",
        numberOfLikes: 175,
      },
    ],
  },
  {
    firstname: "Emily",
    lastname: "Clark",
    username: "emilyclark",
    password: "myPass1234",
    photos: [
      {
        url: " https://images.newscientist.com/wp-content/uploads/2024/06/27123853/SEI_2104945131.jpg?crop=16:9,smart&width=1200&height=675&upscale=true",
        numberOfLikes: 330,
      },
      {
        url: " https://c02.purpledshub.com/uploads/sites/48/2020/04/Things-never-knew-astronomy-e454e5d.jpg",
        numberOfLikes: 280,
      },
      {
        url: " https://www.pioneeringminds.com/wp-content/uploads/2019/10/Space-Exploration-102719-1074x636.jpg",
        numberOfLikes: 310,
      },
    ],
  },
  {
    firstname: "Omar",
    lastname: "Khan",
    username: "omarkhan",
    password: "khanPassword",
    photos: [
      {
        url: " https://cdn.dribbble.com/users/1667496/screenshots/6884356/brid.png",
        numberOfLikes: 150,
      },
      {
        url: " https://cdn.britannica.com/10/250610-050-BC5CCDAF/Zebra-finch-Taeniopygia-guttata-bird.jpg",
        numberOfLikes: 200,
      },
      {
        url: " https://rukminim2.flixcart.com/image/720/864/kjuby4w0/poster/8/i/g/medium-44501-birds-poster-zebra-finch-bird-wall-poster-poster-original-imafzbj6kdqkjam8.jpeg?q=60&crop=false",
        numberOfLikes: 250,
      },
      {
        url: " https://preview.redd.it/vgnvpxvd5y261.jpg?auto=webp&s=bfdb40278f80154f7a291cc1605fcfabb99aab23",
        numberOfLikes: 100,
      },
    ],
  },
];
const usernameGroup = document.getElementById("username-group");
const passwordGroup = document.getElementById("password-group");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const nextBtn = document.getElementById("next-btn");
const passwordToggle = document.getElementById("password-toggle");
const progressSteps = document.querySelectorAll(".progress-step");
const errorMessage = document.getElementById("error-message");

let currentStep = 1;

nextBtn.addEventListener("click", () => {
  if (currentStep === 1) {
    // Foydalanuvchining username-ni tekshirish
    if (usernameInput.value.trim() === "") {
      showError("Please enter a username");
      return;
    }
    const user = users.find((u) => u.username === usernameInput.value.trim());
    if (user) {
      usernameGroup.style.display = "none";
      passwordGroup.style.display = "block";
      nextBtn.textContent = "Login";
      currentStep = 2;
      updateProgress();
    } else {
      showError("Username not found");
    }
  } else if (currentStep === 2) {
    // Foydalanuvchining password-ni tekshirish
    if (passwordInput.value.trim() === "") {
      showError("Please enter a password");
      return;
    }

    const user = users.find(
      (u) =>
        u.username === usernameInput.value.trim() &&
        u.password === passwordInput.value.trim()
    );

    if (user) {
      console.log("Login successful for:", user.username);
      nextBtn.classList.add("pulse");
      currentStep = 3;
      updateProgress();
      simulateLogin();
    } else {
      showError("Invalid password");
    }
  }
});

passwordToggle.addEventListener("click", () => {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  passwordToggle.textContent = type === "password" ? "👁️" : "👁️‍🗨️";
});
function updateProgress() {
  progressSteps.forEach((step, index) => {
    if (index < currentStep) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
}

function showError(message) {
  errorMessage.textContent = message;
  setTimeout(() => {
    errorMessage.textContent = "";
  }, 300);
}
function simulateLogin() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();  
  setTimeout(() => {
    nextBtn.classList.remove("pulse");

    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      // localStorage.setItem("username", username);
      localStorage.setItem("user", JSON.stringify(user));

      // Ob'ektni qaytarish
      console.log("Login successful! User data:", user);

      // Sahifa keyin yuklanadi
      setTimeout(() => (window.location.href = "gallery.html"), 1);
    } else {
      showError("Invalid username or password");
    }
  }, 10);
}

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

const keyUp = (e) => {
  if (e.key === "Enter") {
    console.log(e.key);
    
  }
}