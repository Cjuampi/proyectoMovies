<h1 align="center">Proyecto intermedio: Movie App</h1>
<div align="center">
  <h3><a href="https://app-movie-nhj.herokuapp.com/">Demo</a></h3>
</div>

### Movie App
Es un proyecto/ejercicio propuesto por [@TheBridge-FullStackDeveloper](https://github.com/TheBridge-FullStackDeveloper) y realizado por [@hug0alons0](https://github.com/hug0alons0), [@ignaciosein](https://github.com/ignaciosein) y [@Cjuampi](https://github.com/Cjuampi).

Repositorio original [ hug0alons0/proyectoMovies](https://github.com/hug0alons0/proyectoMovies.git)

### Desarrollado con:
- Nodejs
- Express
- Mongo
- MySQL
- Pug
- Puppeteer
- Passportjs
- Heroku

### Requisitos del proyecto

Se pide desarrollar una aplicación web de búsqueda y gestión de películas que contemple las siguientes funcionalidades y endpoints asociados. Trabajaremos sobre los conceptos vistos de Frontend y Backend en clase

**Aclaración inicial previa**: La app tendrá dos roles distintos: `Usuario y Administrador`. Las funcionalidades que aparecerán tanto en el panel de control como en el resto de endpoints variarán dependiendo del tipo de usuario, no pudiendo nunca acceder a aquellas zonas o contenidos que no le corresponden.

### Endpoints

Endpoints generales de la app:

- [GET] `/` Vista de inicio de la app
- [GET] `/dashboard` Panel de control
- [GET] `/search/:title` Vista detalle de la película
- [GET] `/search` Buscador de películas
- [GET] `/movies` Mis películas
- [POST] `/signup` Registrarse en la aplicación
- [POST] `/login` Hacer login en la aplicación
- [POST] `/logout` Salir
- [POST] `/createMovie` Crear película
- [PUT] `/editMovie/:id` Editar película
- [DELETE] `/removeMovie` Borrar película


### Formulario de acceso

Endpoints para formulario:

- [GET] `/` Vista de inicio de la app. Tendrá como mínimo un formulario de email y contraseña como credenciales de entrada a la app. Además, deberá ofrecer la alternativa de identificación mediante Google, Facebook u otro proveedor de autenticación.
- [GET] `/signup` Vista de formulario de registro de la app. Tendrá como mínimo un formulario de email y contraseña como credenciales de entrada a la app. Además, deberá ofrecer la alternativa de identificación mediante Google, Facebook u otro proveedor de autenticación.
- [POST] `/signup` Creación de nuevo usuario en base de datos (SQL), abrir sesión y redirección a /dashboard.
- [POST] `/login` Validación de credenciales, abrir sesión y redirección a /dashboard si es Usuario, o /movies si es Administrador.
- [POST] `/logout` Cierre de sesión y redirección a /.

### Menú

No asociado a ningún endpoint concreto, sino que estará presente una vez dentro de la app, pasada la identificación, en todas las vistas excepto el Panel de control.

Dicho menú se podrá representar como se desee, si bien se recomienda un efecto de persiana asociada a un icono de hamburguesa.

Endpoints para menú Usuario:

- [GET] `/dashboard` Panel de control
- [GET] `/search` Buscador de películas
- [GET] `/movies` Mis películas
- [POST] `/logout` Salir

Endpoints para menú Administrador:

- [POST] `/logout` Salir

### Panel de control (Usuario): /dashboard

Se mostrarán dos botones con iconos para acceder a las secciones `/search` y `/movies`.

(Como se mencionó antes, idealmente en esta vista no debería haber menú sino sencillamente un icono para Salir.)

### Buscar película (Usuario): /search

Aparecerá un buscador (una caja de texto y un botón o icono de enviar) que buscará una película por título y mostrará a continuación las posibles coincidencias.

Para cada película se mostrará la siguiente info:

- Título completo
- Imagen representativa
- Año
- Director
- Género
- Duración

Para cada película habrá un botón de `Añadir a Mis películas`, que asociará dicha película al Usuario en la BBDD.

### Vista detalle de la película (Usuario): /search/:title

Aparecerá la vista detalle de la película buscada, representando la información de dicha peli:

- Título completo
- Imagen representativa
- Año
- Director
- Género
- Duración
- Sinopsis
- Actores
- Rating
- Opiniones de espectadores reales (Estos datos se obtendrán a partir del scraping de [sensacine](https://www.sensacine.com/) o cualquier otra fuente a elección)
- Etc...

Habrá un botón de `Añadir a Mis películas`, que asociará dicha película al Usuario.

### Mis películas (Usuario): /movies

Aparecerá un listado de las películas que el Usuario añadió a la BBDD a través del buscador, con la misma información adicional de cada una de ellas (título completo, imagen representativa, año, director, género y duración), así como un botón de `Quitar de Mis películas`, que eliminará la asociación de película del Usuario.

### Gestionar películas (Administrador): /movies

Esta es la única vista que tendrá el Administrador en la aplicación, de manera que no podrá acceder a ninguna de las otras. De la misma manera, el Usuario no podrá acceder a esta vista tampoco.

Se mostrará un botón de `Crear nueva` y debajo del mismo, un listado de todas las películas almacenadas localmente, con botones de `Editar` y `Eliminar` para cada una de ellas.

El botón de `Crear nueva` llevará al endpoint `/createMovie` , que mostrará un formulario con los campos título completo, imagen representativa, año, director, género y duración, para dar de alta una nueva película en la base de datos local. Se valorará positivamente la realización de algún tipo de validación de dichos campos.

Para el botón de `Editar`, cuando el Administrador pinche sobre él, la aplicación irá al endpoint `/editMovie/:id` (donde :id tendrá el valor correspondiente), que mostrará un formulario idéntico al del párrafo anterior, pero con los campos autorrellenados con los datos almacenados localmente. Si se realizó la validación en la creación, debería también aplicarse en este caso al modificarlos el Administrador.

Para el botón de `Eliminar`, se solicitará algún tipo de confirmación y en caso afirmativo, se borrará de la base de datos local. Se lanzará una petición al endpoint `/removeMovie` Asimismo, se desasociarán todas las posibles relaciones entre dicha película eliminada y aquellos Usuarios que la tuvieran guardada en sus películas.
