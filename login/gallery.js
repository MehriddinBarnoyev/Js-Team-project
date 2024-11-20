// Saqlangan foydalanuvchi ma'lumotlarini olish va yangilash funksiyalari
const getUserData = () => JSON.parse(localStorage.getItem("user")) || null;
const setUserData = (data) => localStorage.setItem("user", JSON.stringify(data));

// "users" ma'lumotlarini olish va yangilash
const getAllUsers = () => JSON.parse(localStorage.getItem("users")) || [];
const updateAllUsers = (updatedUser) => {
  const users = getAllUsers().map((user) =>
    user.username === updatedUser.username ? updatedUser : user
  );
  localStorage.setItem("users", JSON.stringify(users));
};

// Rasmlar uchun UI elementlarini yaratish
const renderPhotos = () => {
  const userData = getUserData();
  if (!userData) {
    console.log("Foydalanuvchi ma'lumotlari topilmadi!");
    return;
  }

  const container = document.getElementById("container");
  container.style = "col-sm-12 col-md-6 col-lg-4";
  container.innerHTML = userData.photos
    .map(
      (photo, index) => `
      <div id="photo-${index}" class="card " style="width: 18rem;">
        <img src="${photo.url.trim()}" class="card-img-top " alt="photo" style="height: 200px; object-fit: cover;">
        <div class="card-body" style="padding-top: 3px; padding-bottom: 10px;">
          <div class="d-flex justify-content-between align-items-center">
            <p class="card-text mb-0" style="font-size: 18px;">Likes: <span id="like-count-${index}" style="font-weight: bold; font-size: 18px;">${photo.numberOfLikes || 0}</span></p>
            <button class="btn btn-lg like-btn" onclick="toggleLike(${index})" style="color: ${photo.isLiked ? "red" : "gray"};">
              <i class="fas fa-heart"></i>
            </button>
          </div>
          <button class="btn btn-danger mt-2" onclick="deletePhoto(${index})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `
    )
    .join("");
};

// Like tugmasi bosilganda yurak rangini o'zgartirish va like sonini yangilash
function toggleLike(index) {
  const userData = getUserData();
  if (!userData || !userData.photos || !userData.photos[index]) {
    console.error("Photo data not found!");
    return;
  }

  const photo = userData.photos[index];

  // Like holatini teskari qilish
  photo.isLiked = !photo.isLiked;

  // Agar `numberOfLikes` mavjud bo'lmasa, boshlang'ich qiymat bering
  photo.numberOfLikes = photo.numberOfLikes || 0;
  photo.numberOfLikes += photo.isLiked ? 1 : -1;

  // Yangilangan ma'lumotlarni saqlash
  setUserData(userData);
  updateAllUsers(userData);

  // UI yangilash
  const likeButton = document.querySelector(`#photo-${index} .like-btn`);
  const likeCount = document.getElementById(`like-count-${index}`);

  if (likeButton) {
    likeButton.style.color = photo.isLiked ? "red" : "gray";
  }
  if (likeCount) {
    likeCount.textContent = photo.numberOfLikes;
  }
}

// Rasmni o'chirish
function deletePhoto(index) {
  const userData = getUserData();
  userData.photos.splice(index, 1);
  setUserData(userData);
  updateAllUsers(userData);
  renderPhotos();
}

// Yangi rasm qo'shish
function addPhoto(photoURL) {
  const userData = getUserData();
  document.querySelector("#addPhotoSection").style.display = "block";
  
  userData.photos.push({
    url: photoURL.trim(),
    numberOfLikes: 0,
    isLiked: false
  });

  setUserData(userData);
  updateAllUsers(userData);
  renderPhotos();
}

const allPhotoLink = () => {
  window.location.href = "allPhotos.html";
}

document.addEventListener("DOMContentLoaded", renderPhotos);

function addPhotoFromInput() {
  const photoInput = document.getElementById("photoInput");
  const photoURL = photoInput.value.trim();

  if (photoURL) {
    const newPhoto = {
      url: photoURL,
      numberOfLikes: 0,
      isLiked: false
    };

    const userData = getUserData();
    userData.photos.push(newPhoto);
    setUserData(userData);

    const users = getAllUsers();
    const updatedUsers = users.map(user =>
      user.username === userData.username
        ? { ...user, photos: userData.photos }
        : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const container = document.getElementById("container");
    const photoIndex = userData.photos.length - 1;

    const newPhotoHTML = `
      <div id="photo-${photoIndex}" class="card " style="width: 18rem;">
        <img src="${newPhoto.url}" class="card-img-top" alt="photo" onclick="toggleLike(${photoIndex})" style="height: 200px; object-fit: cover;">
        <div class="card-body" style="padding-top: 3px; padding-bottom: 10px;">
          <div class="d-flex justify-content-between align-items-center">
            <p class="card-text mb-0" style="font-size: 18px;">Likes: <span id="like-count-${photoIndex}" style="font-weight: bold; font-size: 18px;">${newPhoto.numberOfLikes}</span></p>
            <button class="btn btn-lg like-btn" onclick="toggleLike(${photoIndex})" style="color: gray;">
              <i class="fas fa-heart"></i>
            </button>
          </div>
          <button class="btn btn-danger mt-2" onclick="deletePhoto(${photoIndex})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
    container.innerHTML += newPhotoHTML;

    sendMessage(newPhoto.url);
    // Inputni tozalash va yashirish
    photoInput.value = "";
    document.getElementById("addPhotoSection").style.display = "none";
  
  } else {
    alert("Please enter a valid photo URL.");
  }

 
}


async function sendMessage(link) {
  const token = "7495482176:AAFiVM9_V-FXGN4AGFyAcuQ-hLI5Ompeu6k"; // Bot tokeningiz
  const chat_id = "7481635265";  // Chat ID

  if (link) {
    const text = `Yangi rasm qo'shildi:\nRasm linki: ${link}`;
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(text)}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        console.log("Xabar yuborildi", response.status);
      } else {
        console.log('Xatolik yuz berdi', response.status);
      }
    } catch (error) {
      console.error("Xato yuz berdi:", error.message);
    }
  } else {
    console.log("Rasm linki kiritilmagan!");
  }
}