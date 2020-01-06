# Test técnico fullstack

Queremos que desarrolles el backend y frontend de una pequeña aplicación para administrár una lista de tareas por hacer (`to-dos`).
En la app deberas poder como mínimo:

- Ver el listado de `to-dos`, ya sea estén pendientes o completados
- Agregar nuevo `to-do`, que deberá crearse con un estado pendiente. Un `to-do` está compuesto por un estado (pendiente o completado), un titulo y una descripción
- Marcar un `to-do` como completado
- Editar un `to-do`, permitiendo modificar el título o descripción
- Eliminar un `to-do`

Adicionalmente valoraremos si puedes implementar features opcionales como:

- Filtrar tareas por pendientes / completadas
- Búsqueda parcial por título / descripción
- Deshacer última acción

Este repositorio incluye archivos de configuración de docker y docker-compose para ser usados como punto de partida del proyecto.

## 1. Backend

Para el backend necesitamos que construyas un API rest, implementando un CRUD para los `to-dos` además de cualquier otro endpoint que necesario para los features que necesita el frontend.

El dockerfile para backend contiene instaladas dependencias comunes para poder implementar el api con `Django` y `Django Rest Framework`.

Se evaluará:
- Estructura API REST (nombres recursos, verbos)
- Modelo base de datos (ORM)
- Estructuración del proyecto
- Lógica aplicada

## 2. Frontend

Para el frontend necesitamos un Single Page Aplication en `React`, que utilize el API del backend, evaluaremos tu manejo en js y react, uso de buenas prácticas, orden y estructura de proyecto.

La implementación puede ser tan simple como desees, pero tendrás puntos a favor si nos muestras tu conocimiento con bibliotecas comunes de react como: `redux`, `saga`, `react-router`, etc y/o de frontend en general: `sass`, `styled-components` y frameworks de ui.

## Instalación

1. [Instalar docker](https://docs.docker.com/install/)
2. Instalar dependencias (desde la raiz del proyecto):
    - `docker-compose run api pip install -r requirement.txt`
    - `docker-compose run spa npm install`
3. Migraciones
    - `docker-compose run api python manage.py migrate`
4. Levantar proyecto: `docker-compose up`

Nota:
Puede que la db levante despues de la api, en ese caso utilizar
`docker-compose up -d db && docker-compose up`.

Ante cualquier consulta, puedes escribir un correo con copia a ernesto.olivares@klare.cl y eduardo.moraga@klare.cl.
