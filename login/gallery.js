// Saqlangan foydalanuvchi ma'lumotini olish
const userData = localStorage.getItem("user");

if (userData) {
  const userObject = JSON.parse(userData);

  console.log(userObject);
  
  // Har bir rasm uchun <img> va <button> yaratish
  const imagesHTML = userObject.photos
  .map(
    (photo, index) => `
      <div id="photo-${index}" class="card" style="width: 18rem;">
        <img src="${photo.url.trim()}" class="card-img-top" alt="photo" style="height: 200px; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Likes: <span id="like-count-${index}">${photo.numberOfLikes}</span></p>
          <button class="btn btn-danger mt-2" onclick="deletePhoto(${index})"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `
  )
  .join("");

  // Rasmni sahifaga joylash
  const container = document.getElementById("container");
  container.innerHTML = imagesHTML;
} else {
  console.log("Foydalanuvchi ma'lumotlari topilmadi!");
}


// Tugma bosilganda rasmni o‘chirish funksiyasi
function deletePhoto(index) {
  const userData = JSON.parse(localStorage.getItem("user")); // Foydalanuvchi ma'lumotini olish
  const photoElement = document.getElementById(`photo-${index}`);

  if (photoElement) {
    // HTML-dan olib tashlash
    photoElement.remove();

    // Foydalanuvchining rasmlarini yangilash
    userData.photos.splice(index, 1);
    localStorage.setItem("user", JSON.stringify(userData)); // Yangilangan user ma'lumotlarini saqlash

    // "users" massivini yangilash (faqat kirgan foydalanuvchiga tegishli rasmlar o‘zgartiriladi)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.username === userData.username
        ? { ...user, photos: userData.photos }
        : user
    ); 
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }
}


// Rasmga Like qo'shish yoki olib tashlash
function toggleLike(index) {
  const userData = JSON.parse(localStorage.getItem("user"));

  // Rasmga tegishli like sonini o'zgartirish
  const photo = userData.photos[index];
  photo.numberOfLikes = photo.numberOfLikes === 0 ? 1 : 0; // Like sonini teskari qilish

  // "users" massivini yangilash
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const updatedUsers = users.map((user) =>
    user.username === userData.username
      ? { ...user, photos: userData.photos }
      : user
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // Rasmga yangi like sonini ko'rsatish
  const likeCountElement = document.getElementById(`like-count-${index}`);
  likeCountElement.textContent = photo.numberOfLikes;
}


// Rasm URL kiritish funksiyasi
function addPhotoPrompt() {
  const photoURL = prompt("Please enter the URL of the photo:");
  if (photoURL) {
    const newPhoto = { url: photoURL.trim() }; // Yangi rasm obyekti

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
        <img src="${newPhoto.url}" class="card-img-top" alt="photo" onclick="toggleLike(${photoIndex})" alt="photo" style="height: 200px; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Likes: <span id="like-count-${photoIndex}">0</span></p>
          <button class="btn btn-danger mt-2" onclick="deletePhoto(${photoIndex})"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `;
    container.innerHTML += newPhotoHTML;
  }
}

// "All photos" sahifasiga o'tish funksiyasi
function allPhotoLink() {
  window.location.href = "allPhotos.html"; // Sahifani o'zgartirish
}


// Input fayl hodisasiga quloq solish
document.getElementById("fileInput").addEventListener("change", addPhoto);
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

function addPhotoPrompt() {
  const addPhotoSection = document.getElementById("addPhotoSection");
  addPhotoSection.style.display = "block";
}


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
      <p class="card-text">Likes: <span id="like-count-${photoIndex}">0</span></p>
      <button class="btn btn-danger mt-2" onclick="deletePhoto(${photoIndex})"><i class="fas fa-trash"></i></button>
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
