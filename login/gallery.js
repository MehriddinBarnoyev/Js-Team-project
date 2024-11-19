// Saqlangan foydalanuvchi ma'lumotini olish
const userData = localStorage.getItem("user");

if (userData) {
  const userObject = JSON.parse(userData);

  // Har bir rasm uchun <img> va <button> yaratish
  const imagesHTML = userObject.photos
    .map(
      (photo, index) => `
        <div id="photo-${index}" class="m-3 text-center">
          <img src="${photo.url.trim()}" alt="photo" width="200px" class="img-thumbnail shadow" />
          <button class="btn btn-danger mt-2" onclick="deletePhoto(${index})">Delete</button>
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
      user.username === userData.username ? { ...user, photos: userData.photos } : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }
}

// "All photos" sahifasiga o'tish funksiyasi
function allPhotoLink() {
  window.location.href = "allPhotos.html"; // Sahifani o'zgartirish
}
