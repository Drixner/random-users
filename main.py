from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
from typing import List
from pydantic import BaseModel
from datetime import datetime

app = FastAPI(title="Random Users API", version="1.0.0")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Person(BaseModel):
    nombre: str
    genero: str
    ubicacion: str
    correo_electronico: str
    fecha_nacimiento: str
    fotografia: str

class PersonsResponse(BaseModel):
    data: List[Person]
    total: int
    timestamp: str

@app.get("/")
async def root():
    return {
        "message": "Random Users API",
        "version": "1.0.0",
        "endpoints": {
            "/users": "GET - Obtener lista de 10 usuarios aleatorios",
            "/docs": "Documentación de la API"
        }
    }

@app.get("/users", response_model=PersonsResponse)
async def get_random_users():
    """
    Obtiene una lista de 10 personas aleatorias desde randomuser.me
    
    Returns:
        PersonsResponse: Lista de 10 personas con sus datos completos
    """
    try:
        async with httpx.AsyncClient() as client:
            # Solicitar 10 usuarios aleatorios
            response = await client.get("https://randomuser.me/api/?results=10")
            response.raise_for_status()
            
            data = response.json()
            users = data.get("results", [])
            
            # Transformar los datos al formato requerido
            persons = []
            for user in users:
                person = Person(
                    nombre=f"{user['name']['first']} {user['name']['last']}",
                    genero=user['gender'],
                    ubicacion=f"{user['location']['city']}, {user['location']['country']}",
                    correo_electronico=user['email'],
                    fecha_nacimiento=user['dob']['date'][:10],  # Solo la fecha, sin hora
                    fotografia=user['picture']['large']
                )
                persons.append(person)
            
            return PersonsResponse(
                data=persons,
                total=len(persons),
                timestamp=datetime.now().isoformat()
            )
            
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=503,
            detail=f"Error al conectar con el servicio externo: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error interno del servidor: {str(e)}"
        )

@app.get("/health")
async def health_check():
    """Endpoint para verificar el estado del servicio"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)