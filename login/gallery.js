// Saqlangan ob'ektni olish
const userData = localStorage.getItem("user");

if (userData) {
  const userObject = JSON.parse(userData);

  // Har bir rasm uchun <img> tegini yaratish
  const imagesHTML = userObject.photos
    .map((photo) => `<img src="${photo.url.trim()}" alt="photo" width="200px" class="img-thumbnail shadow m-3" />`)
    .join("");
  // Rasmni sahifaga joylash
  const container = document.getElementById("container");
  container.innerHTML = imagesHTML;
} else {
  console.log("Foydalanuvchi ma'lumotlari topilmadi!");
}
