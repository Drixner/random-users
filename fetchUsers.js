const API_BASE = "http://localhost:8000";

async function loadUsers() {
  const loadBtn = document.getElementById("loadBtn");
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const stats = document.getElementById("stats");
  const container = document.getElementById("usersContainer");

  // Reset UI
  loadBtn.disabled = true;
  loading.style.display = "block";
  error.style.display = "none";
  stats.style.display = "none";
  container.innerHTML = "";

  try {
    const response = await fetch(`${API_BASE}/users`);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Mostrar estadísticas
    const statsText = document.getElementById("statsText");
    statsText.textContent = `✅ ${
      data.total
    } personas generadas exitosamente • Generado: ${new Date(
      data.timestamp
    ).toLocaleString()}`;
    stats.style.display = "block";

    // Mostrar usuarios
    displayUsers(data.data);
  } catch (err) {
    console.error("Error:", err);
    error.textContent = `❌ Error al cargar los datos: ${err.message}. Verifica que el servidor esté ejecutándose en ${API_BASE}`;
    error.style.display = "block";
  } finally {
    loading.style.display = "none";
    loadBtn.disabled = false;
  }
}

function displayUsers(users) {
  const container = document.getElementById("usersContainer");

  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "user-card";

    // Determinar el icono del género
    const genderIcon = user.genero === "male" ? "👨" : "👩";
    const genderText = user.genero === "male" ? "Masculino" : "Femenino";

    // Formatear fecha
    const birthDate = new Date(user.fecha_nacimiento);
    const formattedDate = birthDate.toLocaleDateString("es-ES");

    card.innerHTML = `
                    <img src="${user.fotografia}" alt="${user.nombre}" class="user-photo">
                    <div class="user-name">${user.nombre}</div>
                    <div class="user-info">
                        <div class="info-item">
                            <span class="info-icon">${genderIcon}</span>
                            <span class="info-label">Género:</span>
                            <span>${genderText}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-icon">📍</span>
                            <span class="info-label">Ubicación:</span>
                            <span>${user.ubicacion}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-icon">✉️</span>
                            <span class="info-label">Email:</span>
                            <span>${user.correo_electronico}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-icon">🎂</span>
                            <span class="info-label">Nacimiento:</span>
                            <span>${formattedDate}</span>
                        </div>
                    </div>
                `;

    container.appendChild(card);
  });
}

// Auto-cargar al iniciar
window.addEventListener("load", () => {
  loadUsers();
});
