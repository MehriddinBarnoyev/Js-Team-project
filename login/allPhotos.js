// Saqlangan barcha foydalanuvchilar ma'lumotini olish
const users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];

const container = document.getElementById("container");

if (users.length) {
  users.forEach((user) => {
    // Har bir foydalanuvchi uchun yangi quti (row) yaratish
    const row = document.createElement("div");
    row.className = "col mb-5 mt-3";

    // Foydalanuvchi ismi va familiyasi uchun sarlavha qo'shish
    const title = document.createElement("h5");
    title.textContent = `${user.firstname} ${user.lastname}`;
    row.appendChild(title);

    // Foydalanuvchining barcha fotosuratlarini chiroyli kartalar ichida ko'rsatish
    const photoContainer = document.createElement("div");
    photoContainer.className = "d-flex flex-wrap gap-3";

    user.photos.forEach((photo) => {
      const photoCard = document.createElement("div");
      photoCard.className = "card shadow";
      photoCard.style.width = "18rem";

      photoCard.innerHTML = `
        <img src="${photo.url.trim()}" class="card-img-top" alt="photo" />
      `;

      photoContainer.appendChild(photoCard);
    });

    // Foto qutisini qatorga qo'shish
    row.appendChild(photoContainer);

    // Bosh containerga qo'shish
    container.appendChild(row);
  });
} else {
  container.innerHTML = "<p>No photos available</p>";
}

  // Rasm ustiga bosilganda kattalashtirish funksiyasi
  const images = document.querySelectorAll('.card img');

  images.forEach(image => {
    image.addEventListener('click', function() {
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      overlay.style.display = 'flex';
      overlay.style.justifyContent = 'center';
      overlay.style.alignItems = 'center';
      overlay.style.zIndex = 1000;
      overlay.style.cursor = 'zoom-out';

      const enlargedImage = document.createElement('img');
      enlargedImage.src = image.src;
      enlargedImage.style.maxWidth = '90%';
      enlargedImage.style.maxHeight = '90%';
      enlargedImage.style.objectFit = 'contain'; // Kattalashtirishni saqlash

      overlay.appendChild(enlargedImage);
      document.body.appendChild(overlay);

      // Overlay ustiga bosilganda uni yopish
      overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
      });
    });
  });
