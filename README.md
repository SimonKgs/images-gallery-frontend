# Images Gallery Frontend

Este proyecto es una aplicación frontend desarrollada con React y TypeScript que incluye autenticación de usuarios, manejo de imágenes y rutas protegidas. Utiliza varios servicios para interactuar con una API RESTful en Node.js, para usarlo necesitaras descargar el backend, seguir el proceso de instalación que se indica y ejecutarlo, debe estar escuchando las peticiones de este cliente.

## Características

- Autenticación: Los usuarios pueden iniciar sesión, registrarse y cerrar sesión utilizando un contexto de autenticación (AuthContext).
- Protección de Rutas: Algunas rutas están protegidas y solo pueden ser accedidas por usuarios autenticados.
- Manejo de Imágenes: Los usuarios pueden subir, editar y eliminar imágenes.
- Consumo de API REST: Se conecta con una API en el backend para realizar operaciones CRUD sobre imágenes y usuarios.

---

## Instalaciones

1. Debes tener instalado Node.JS lo puedes descargar [aquí](https://nodejs.org/en/download/package-manager/current)

2. Descarga este proyecto en tu PC o clonalo si usas git con el comando:
```bash
git clone https://github.com/SimonKgs/node-ts-server.git
```

3. Descarga el backend  o clonarlo y sigue los pasos allí indicados, para su instalación y puesta en marcha, de lo contrario, no se podrán realizar la mayoría de acciones, lo puedes descargar [aquí](https://github.com/SimonKgs/node-ts-server).

4. Abre un terminal y posicionate en la carpeta donde hayas descargado y descomprimido este proyecto:

```bash
cd /ruta/Del/Proyecto
```

5. Instala las dependencias necesarias
```bash
npm install
```

6. Ejecuta el proyecto con el comando:
```bash
npm start
```

7. tras acabar de ejecutar ese comando, podrás ver la ruta en la que esta corriendo el cliente, verás algo así:

```
  ➜  Local:   http://localhost:4173/ // Esta línea
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Copia la dirección que se muestre en tu PC, en la línea indicada arriba, en tu navegador y entra en ella, estarás ya en la aplicación, ten en cuenta que tu dirección y la del ejemplo pueden ser diferentes, utiliza la tuya.

---

## Uso

A partir de este punto se da por hecho que ambos tanto el cliente como el servidor están instalados y corriendo.

He procurado hacer un frontend simple y directo para facil uso, cuando accedas entraras en la página principal.

### Home

Aquí encontraras una pequeña descripción de lo que es la aplicación y un botón que te llevará al login o a tu galería de imagenes si ya estás logueado.

### About

En esta página veras un breve texto sobre todo lo que puedes hacer en la aplición.

### Login (auth)

Aquí encontrarás un formulario para loguearte o registrarte en la aplicación si eres nuevo. En la esquina superior derecha podrás cambiar entre el formulario para el entrar en la app o el formulario para registrarte.

Rellena los datos que se piden y pulsa el botón de la parte inferior, será Login o Register en función del formulario que estes viendo.


### User

Cuando estés dentro de la aplicación, podrás navegar a la pantalla de usuario, en ella encontraras tu galería vacía por el momento.

En la parte superior hay un pequeño formulario para que puedas subir tus imagenes, busca la imagen en tu dispositivo, ponle un nombre y subela, al momento verás la nueva imagen en tu galería.

### ImageDetail

Puedes ver las imagenes en grande o editarlas si pulsas sobre la imagen que desees ver/editar, te llevará a una nueva pantalla con un formulario donde podrás cambiar el título de la imagen pulsando en el botón de change title, o borrarla pulsando el botón de Delete Image. Si no quieres hacer ninguna de las 2 cosas, puedes volver a tu galería con el botón que se encuentra en la parte inferior de la imagen, come back to user page.

---

## Explicación

Para este punto empezaré explicando sin entrar en detalle las dependencias del proyecto, para entender porqué están ahí, para más información visitar la página oficial de cada técnologia.

---

- Dependencias

1. formik: Maneja formularios y su estado en React de manera eficiente.
2. react: Biblioteca principal para construir interfaces de usuario.
3. react-dom: Se encarga de manipular el DOM en aplicaciones React.
4. react-router-dom: Maneja la navegación y las rutas en React.
5. yup: Validación de esquemas para formularios, a menudo usado junto a Formik.


- Dependencias de desarrollo

1. @types/react: Proporciona los tipos de TypeScript para React.
2. @types/react-dom: Añade los tipos de TypeScript para ReactDOM.
3. @typescript-eslint/eslint-plugin: Reglas de ESLint específicas para TypeScript.
4. @typescript-eslint/parser: Parser de ESLint que entiende TypeScript.
5. @vitejs/plugin-react-swc: Plugin para usar React con Vite y SWC (compilador más rápido).
6. eslint: Herramienta para detectar y arreglar errores de código.
7. eslint-plugin-react-hooks: Reglas de ESLint para garantizar el correcto uso de hooks.
8. eslint-plugin-react-refresh: Mejora la experiencia de desarrollo con recarga rápida en React.
9. typescript: Lenguaje que añade tipado estático a JavaScript.
10. vite: Herramienta de construcción y servidor de desarrollo rápido para aplicaciones web.

---


## Estructura del proyecto

La mayoría del proyecto está bajo la carpeta src, fuera de ella se encuentran los archivos de configuración, el index.html y los archivos de entrada de la apliación como son el main.tsx y el App.tsx.

### carpetas y contenido:

- assets: Contine los iconos que utilizo en la aplicación

- components: Componentes reutilizables.

- context: Aquí almaceno el contexto de la autenticación, lo que incluye el estado, autenticado o no, y varias funciones para modificarlo, login, register y logout.

- interfaces: Aquí he almacenado solo la interfaz de las imagenes, utilizo más interfaces en la aplicación pero más asociadas a los componentes donde están declaradas.

- pages: En esta carpeta se almacenan las distintas paginas

- routes: Utilizo 2 routers, uno para las rutas públicas y otro para las protegidas, ambos están en esta carpeta.

- services: En esta carpeta tengo los servicios, funciones que interactuan con algo fuera de la aplicación, como todas las que interactuan con la API.

---

## Detalles

### Autenticación

El contexto de autenticación (AuthContext) maneja el estado de autenticación de los usuarios. Aquí se define la lógica de login, registro y logout. Se apoya en localStorage para almacenar el token de autenticación y el ID del usuario.


- Uso del Contexto de Autenticación
Envuelve tu aplicación en el AuthProvider para proporcionar el estado de autenticación a toda la aplicación.

```TSX
<AuthProvider>
  <App />
</AuthProvider>
```

Todas las rutas del usuario están protegidas, para ello me valgo de la combinación del contexto y el componente ProtectedRoute, si el usuario no está autenticado es redirigido a la página de autenticación.

```TSX
<Route element={<ProtectedRoute />}>
  <Route path="user/*" element={<UserRoutes />} />
</Route>
```

- Rutas
La aplicación tiene las siguientes rutas principales:

- /home: Página principal.
- /about: Página de información.
- /auth: Página de autenticación (login y registro).
- /user: Rutas protegidas del usuario autenticado.
  - /: Página con la galería del usuario y el formulario para subir imagenes.
  - /imageDetail: Página para ver la imagen, cambiarle el nombre o elimnarla.


### Servicios

- Autenticación
  - loginAction: Realiza una solicitud POST para autenticar al usuario.
  - RegisterAction: Crea un nuevo usuario en la base de datos.
- Manejo de Imágenes
  - getUserImages: Obtiene las imágenes subidas por el usuario autenticado.
  - editImage: Edita el título de una imagen existente.
  - deleteImage: Elimina una imagen del servidor.
  - uploadImageService: Sube una nueva imagen al servidor.
- Usuario
  - getCurrentUser: Obtiene los datos del usuario autenticado.


## Consideraciones
- Asegúrate de que la API esté corriendo en http://localhost:5000 (o la URL que definas en .env).
- Las rutas protegidas solo pueden ser accedidas si el usuario ha iniciado sesión.