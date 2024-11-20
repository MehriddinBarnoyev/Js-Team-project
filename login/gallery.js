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
  container.innerHTML = userData.photos
    .map(
      (photo, index) => `
      <div id="photo-${index}" class="card" style="width: 18rem;">
        <img src="${photo.url.trim()}" class="card-img-top" alt="...">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <p class="card-text">Likes: <span id="like-count-${index}">${
        photo.numberOfLikes || 0
      }</span></p>
            <button class="btn like-btn" onclick="toggleLike(${index})" style="color: ${
        photo.isLiked ? "red" : "gray"
      };"><i class="fas fa-heart"></i></button>
          </div>
          <button class="btn btn-danger mt-2" onclick="deletePhoto(${index})"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `
    )
    .join("");
};

// Like tugmasi bosilganda yurak rangini o'zgartirish va like sonini yangilash
function toggleLike(index) {
  const userData = getUserData();
  const photo = userData.photos[index];

  // Like holatini teskari qilish
  photo.isLiked = !photo.isLiked;
  photo.numberOfLikes += photo.isLiked ? 1 : -1;

  // Yangilangan ma'lumotlarni saqlash
  setUserData(userData);
  updateAllUsers(userData);

  // UI yangilash
  const likeButton = document.querySelector(`#photo-${index} .like-btn`);
  const likeCount = document.getElementById(`like-count-${index}`);

  likeButton.style.color = photo.isLiked ? "red" : "gray";
  likeCount.textContent = photo.numberOfLikes;
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
  userData.photos.push({ url: photoURL.trim(), numberOfLikes: 0, isLiked: false });

  setUserData(userData);
  updateAllUsers(userData);

  renderPhotos();
}

// Sahifa yuklanganda rasmlarni render qilish
document.addEventListener("DOMContentLoaded", renderPhotos);
