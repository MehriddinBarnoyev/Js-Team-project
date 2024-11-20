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
        <img src="${photo.url.trim()}" class="card-img-top" alt="..." style="height: 200px; object-fit: cover;">
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
  const numberOfLike = document.getElementById("numberOfLike").value;
  console.log(numberOfLike);
  
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
  // Lokal user ma'lumotlarini olish
  const userData = getUserData();

  // Rasmni ma'lumotlar massividan o'chirish
  userData.photos.splice(index, 1);

  // Yangilangan ma'lumotlarni saqlash
  setUserData(userData);
  updateAllUsers(userData);

  // Rasmlar ro'yxatini qayta chizish
  renderPhotos();
}


// Yangi rasm qo'shish
function addPhoto(photoURL) {
  const userData = getUserData();
  document.querySelector("#addPhotoSection").style.display = "block";
  
  // Yangi rasmni massivga qo'shish
  userData.photos.push({ 
    url: photoURL.trim(), 
    numberOfLikes: 0, 
    isLiked: false 
  });

  // Yangilangan ma'lumotlarni saqlash
  setUserData(userData);
  updateAllUsers(userData);

  // Rasmlarni qayta render qilish
  renderPhotos();
}


const allPhotoLink = () =>{
  window.location.href = "allPhotos.html";
}


// Sahifa yuklanganda rasmlarni render qilish
document.addEventListener("DOMContentLoaded", renderPhotos);

function addPhotoFromInput() {
  const photoInput = document.getElementById("photoInput");
  const photoURL = photoInput.value.trim();

  if (photoURL) {
    const newPhoto = { url: photoURL };

    // Foydalanuvchi ma'lumotlarini yangilash
    const userData = JSON.parse(localStorage.getItem("user"));
    userData.photos.push(newPhoto);
    localStorage.setItem("user", JSON.stringify(userData)); // Yangilangan user ma'lumotlarini saqlash

    // "users" massivini yangilash
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.username === userData.username
        ? { ...user, photos: userData.photos }
        : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // HTML-ga yangi rasm qo'shish
    const container = document.getElementById("container");
    const photoIndex = userData.photos.length - 1; // Yangi rasmning indeksi
    const newPhotoHTML = `
      <div id="photo-${photoIndex}" class="card" style="width: 18rem;">
    <img src="${newPhoto.url}" class="card-img-top" alt="photo" onclick="toggleLike(${photoIndex})" style="height: 200px; object-fit: cover;>
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
 <div class="d-flex justify-content-between align-items-center">
            <p class="card-text">Likes: <span id="like-count-${index}">${
        photo.numberOfLikes || 0
      }</span></p>
            <button class="btn like-btn" onclick="toggleLike(${index})" style="color: ${
        photo.isLiked ? "red" : "gray"
      };"><i class="fas fa-heart"></i></button>
          </div>          <button class="btn btn-danger mt-2" onclick="deletePhoto(${index})"><i class="fas fa-trash"></i></button>
    </div>
  </div>
    `;
    container.innerHTML += newPhotoHTML;

    // Inputni tozalash va yashirish
    photoInput.value = "";
    document.getElementById("addPhotoSection").style.display = "none";
  } else {
    alert("Please enter a valid photo URL.");
  }
}

