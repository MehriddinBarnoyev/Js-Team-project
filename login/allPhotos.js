const users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];
// Saqlangan ob'ektni olish
const container = document.getElementById("container");
console.log(container);
users.forEach((user) => {
  // Har bir foydalanuvchi uchun yangi quti (row) yaratish
  const row = document.createElement("div");
  row.className = "col mb-5 mt-3";

  // Foydalanuvchi ismi va familiyasi uchun sarlavha qo'shish
  const title = document.createElement("h5");
  title.textContent = `${user.firstname} ${user.lastname}`;
  row.appendChild(title);

  // Foydalanuvchining barcha fotosuratlarini bitta qator ichida ko'rsatish
  const photoContainer = document.createElement("div");
  user.photos.forEach((photo) => {
    const photoBox = document.createElement("div");
    photoBox.className = "d-flex align-items-center me-3";

    photoBox.innerHTML = `
        <img src="${photo.url.trim()}" alt="photo" class="img-thumbnail shadow" style="width: 200px;" />
      `;

    photoContainer.appendChild(photoBox);
  });

  // Foto qutisini qatorga qo'shish
  row.appendChild(photoContainer);

  // Bosh containerga qo'shish
  container.appendChild(row);
});
