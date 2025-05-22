# Random Users Generator

Servicio web que genera una lista de 10 personas aleatorias utilizando la API de RandomUser.me

## 🏗️ Arquitectura

- **Backend**: FastAPI + Python (Puerto 8000)
- **Frontend**: HTML + JavaScript + CSS (Interfaz web moderna)
- **API Externa**: RandomUser.me para generar datos aleatorios

## 🚀 Instalación y Ejecución Rápida

### 1. Instalar dependencias

pip install -r requirements.txt

### 2. Ejecutar el servidor backend

python main.py

### 3. Abrir el frontend

Simplemente abre el archivo `index.html` en tu navegador web.

## 📋 Endpoints de la API

### `GET /users`

Obtiene 10 personas aleatorias con los siguientes datos:

- Nombre completo
- Género
- Ubicación (ciudad, país)
- Correo electrónico
- Fecha de nacimiento
- Fotografía

**Respuesta de ejemplo:**

```json
{
  "data": [
    {
      "nombre": "John Smith",
      "genero": "male",
      "ubicacion": "New York, United States",
      "correo_electronico": "john.smith@example.com",
      "fecha_nacimiento": "1985-06-15",
      "fotografia": "https://randomuser.me/api/portraits/men/1.jpg"
    }
  ],
  "total": 10,
  "timestamp": "2024-01-15T10:30:00"
}
```

### `GET /health`

Verifica el estado del servicio

### `GET /docs`

Documentación interactiva de la API (Swagger UI)

## 🧪 Pruebas de la API

### Con curl:

```bash
# Obtener usuarios
curl http://localhost:8000/users

# Verificar salud del servicio
curl http://localhost:8000/health
```

### Con navegador:

- Documentación: http://localhost:8000/docs
- Endpoint usuarios: http://localhost:8000/users
- Health check: http://localhost:8000/health

## 🌐 Uso del Frontend

1. Asegúrate de que el backend esté ejecutándose en `http://localhost:8000`
2. Abre `index.html` en tu navegador
3. Haz clic en "Generar 10 Personas Aleatorias"
4. Las personas se mostrarán en tarjetas con todos sus datos

## 📁 Estructura del Proyecto

```
proyecto/
├── main.py              # Servidor FastAPI
├── requirements.txt     # Dependencias Python
├── index.html          # Frontend web
├── fetchUser.js          # Script del Frontend
├── style.css             # Estilos
└── README.md           # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **Python 3.8+**
- **FastAPI**: Framework web moderno y rápido
- **Uvicorn**: Servidor ASGI
- **httpx**: Cliente HTTP asíncrono
- **Pydantic**: Validación de datos
- **HTML5 + CSS3 + JavaScript**: Frontend moderno y responsivo

## ⚡ Características

- ✅ API RESTful con documentación automática
- ✅ Interfaz web moderna y responsiva
- ✅ Manejo de errores robusto
- ✅ Validación de datos con Pydantic
- ✅ CORS habilitado para desarrollo
- ✅ Código limpio y bien documentado
- ✅ Fácil de desplegar y mantener

## 🔧 Posibles Mejoras

- Base de datos para persistir usuarios
- Division de Carpetas tanto para backend como Frontend (por tiempo se hizo de esta forma)
- Filtros de búsqueda
- Paginación para mas de 10 resultados.
