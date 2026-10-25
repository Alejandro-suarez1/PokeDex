# Integrantes

- David Alejandro Jaramillo Suarez
- Juan Diego Delgado Osorio

# PokéDex Explorer

App hecha con Expo y React Native que consume la [PokéAPI](https://pokeapi.co). Lista Pokémon en una cuadrícula de 2 columnas con scroll infinito, permite buscarlos por nombre o número y muestra su ficha con imagen, tipos, altura, peso y estadísticas base.

## Estructura del proyecto

```
App.js
src/
  components/
    PokemonCard.js
    SearchBar.js
    StatBar.js
    StatusView.js
    TypeBadge.js
  config/
    api.js
  navigation/
    AppNavigator.js
  screens/
    DetailScreen.js
    ListScreen.js
  services/
    pokeapi.js
  theme/
    typeColors.js
  utils/
    format.js
```

## Qué hace cada archivo

`App.js` casi no tiene lógica. Envuelve la app en `SafeAreaProvider`, configura la barra de estado y monta `AppNavigator`. Todo lo demás vive dentro de `src/`.

En `components/` están las piezas que solo dibujan lo que reciben por props; no hacen peticiones ni guardan el estado de la app.
- `PokemonCard`: la tarjeta de la lista (imagen, número y nombre).
- `SearchBar`: el campo de texto con el botón "Buscar".
- `StatBar`: la barra de una estadística, con ancho proporcional a un máximo de 255.
- `StatusView`: los estados de cargando, error (con el botón "Reintentar") y sin resultados.
- `TypeBadge`: el distintivo de un tipo, con su color y su nombre en español.

`config/api.js` guarda la URL base de la PokéAPI y la del repositorio de sprites. Las dejamos aparte para tener un solo lugar donde cambiarlas.

`navigation/AppNavigator.js` hace de navegador sin librerías. Guarda con `useState` el id del Pokémon elegido (`selectedId`): si es `null` se ve la lista, y si tiene un valor se ve la ficha.

`screens/ListScreen.js` y `screens/DetailScreen.js` son las únicas que llaman al servicio y manejan los estados de carga y error. `ListScreen` se encarga de la lista, la búsqueda y el scroll infinito. `DetailScreen` pide la ficha según el `pokemonId` y la muestra.

`services/pokeapi.js` es el único archivo que sabe cómo es la API. Ahí están todos los `fetch`: arma las URLs, revisa `response.ok` antes de leer el JSON, saca el id del final de la URL en la lista y convierte la altura y el peso a metros y kilogramos. Cuando algo falla lanza un `ApiError` con un `status` (404 si no existe, 0 si no hay conexión y el código real en los demás casos).

`theme/typeColors.js` relaciona cada tipo con su color y su nombre en español. Lo separamos porque son decisiones de diseño y no lógica.

`utils/format.js` tiene funciones pequeñas que se usan en varios archivos: poner el id con tres dígitos (`#025`), poner la primera letra en mayúscula y limpiar el texto de búsqueda (minúsculas y sin espacios al inicio o al final).

## Qué devuelve el servicio

- **Lista (`getPokemonList`):** objetos con `id`, `name` e `imageUrl`, más un `hasMore` que indica si quedan páginas. El listado de la PokéAPI solo trae nombre y URL, por eso las tarjetas no pueden mostrar el tipo sin pedir cada ficha.
- **Detalle (`getPokemon`):** objeto con `id`, `name`, `imageUrl`, `heightM`, `weightKg`, `types` y `stats`.

## Por qué lo organizamos así

La regla principal fue que ningún componente ni pantalla sepa cómo es la API. Todo lo de `fetch` está en `services/pokeapi.js` y las pantallas solo reciben objetos limpios. Si la API cambiara, solo habría que tocar ese archivo.

El servicio clasifica los errores con `ApiError` y su `status`, y las pantallas deciden qué mostrar. `ListScreen` usa el `status` para diferenciar entre "no encontramos ese nombre" (404) y "hubo un problema, reintenta".

Separamos `config/`, `theme/` y `utils/` para que cada cosa tenga un solo lugar: las URLs en config, los colores en theme y las funciones puras en utils. Los componentes solo dibujan y las pantallas piden los datos y manejan el estado, así es fácil saber dónde buscar cuando algo falla.

Para pasar de la lista a la ficha decidimos no instalar una librería de navegación porque solo son dos pantallas. La lista se queda montada pero oculta mientras se ve la ficha, así que al volver desde una tarjeta no se recarga y se conserva el scroll.