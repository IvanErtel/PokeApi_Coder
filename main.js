// Declaración de variables
const poke_container = document.getElementById('poke_container');
const pokeForm = document.getElementById('pokemon');
const pokeContent = document.getElementById('pokemonContent');
const anterior = document.getElementById('btnAnterior');
const siguiente = document.getElementById('btnSiguiente');
const btnFavorites = document.getElementById('btnFavorites');
let pokemon_number = 8;
let desde = 1;
let hasta = 8;
let favorites = [];

// Cargar los pokemons iniciales al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  cargarPokemons();
  actualizarBotonFavorites();
});

// Función para cargar los pokemons iniciales
const cargarPokemons = () => {
  poke_container.innerHTML = ""; // Limpiamos el contenedor
  
  for (let i = desde; i <= hasta; i++) {
    getPokemon(i);
  }
};

// Event listeners para los botones anterior y siguiente
anterior.addEventListener('click', () => {
  desde -= 9;
  paginado(desde, hasta);
});

siguiente.addEventListener('click', () => {
  desde += 9;
  paginado(desde, hasta);
});

// Función para paginar los pokemons
function paginado(desde, hasta) {
  document.getElementById("btnAnterior").hidden = desde < 2;
  pokeForm.value = ""; // Limpiamos el campo de búsqueda
  poke_container.innerHTML = "";
  
  for (let i = desde; i <= desde + hasta; i++) {
    getPokemon(i);
  }
}

// Función para obtener los datos de un pokemon
const getPokemon = async (pokemonIdentifier) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonIdentifier}`;
  const res = await fetch(url);

  if (res.ok) {
    const pokemon = await res.json();
    createPokemonCard(pokemon);
  } else {
    // Mostrar mensaje de error
    Swal.fire({
      title: 'Lo sentimos!',
      text: 'El pokemon que buscas no está en nuestra lista.',
      imageUrl: 'https://sm.ign.com/t/ign_latam/screenshot/default/pikachu-triste_auuu.1280.jpg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    });
  }
};

// Función para buscar un pokemon
const searchPokemon = async () => {
  const pokeFormValue = pokeForm.value.trim().toLowerCase();
  poke_container.innerHTML = "";

  if (pokeFormValue !== "") {
    await getPokemon(pokeFormValue);
  } else {
    // Mostrar mensaje de error
    Swal.fire({
      title: 'Lo sentimos!',
      text: 'Por favor, ingresa un nombre o ID de pokemon válido.',
      imageUrl: 'https://pbs.twimg.com/media/C0Eq4JJVIAESqyo.jpg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    });
  }
};

// Función para crear la tarjeta de un pokemon
const createPokemonCard = (pokemon) => {
  const { types, sprites } = pokemon;
  const name = pokemon.name.toUpperCase();
  const type = `type: ${types[0].type.name} ${types[1] ? types[1].type.name : ""}`;
  const stats = `<br>${pokemon.stats[0].stat.name}: ${pokemon.stats[0].base_stat}`;
  const classType = types[0].type.name;
  const id = pokemon.id;
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');
  pokemonEl.classList.add('move');
  pokemonEl.classList.add(classType);
  const pokeInnerHtml = `
    <div class='img-container ${type}'>
      <img src='${sprites.front_default}'/>
      <button class="favorite-button" onclick="toggleFavorite(${id})">
        <img src="https://cdn.pixabay.com/photo/2017/09/23/16/33/pixel-heart-2779422_1280.png" alt="Favorite" />
      </button>
    </div>
    <div class='info'>
      <span class='number'>${id}</span>
      <h3 class='name'>${name}</h3>
      <small class="type">${type}</small>
      <small class='type'>${stats}</small>
    </div>  
  `;
  pokemonEl.innerHTML = pokeInnerHtml;
  poke_container.appendChild(pokemonEl);
};

// Función para agregar o quitar un pokemon de favoritos
const toggleFavorite = (pokemonId) => {
  if (favorites.includes(pokemonId)) {
    favorites = favorites.filter(id => id !== pokemonId);
  } else {
    favorites.push(pokemonId);
  }

  actualizarBotonFavorites();
};

// Función para actualizar el botón de favoritos
const actualizarBotonFavorites = () => {
  btnFavorites.textContent = `Favorites (${favorites.length})`;
};

// Event listener para el botón de favoritos
btnFavorites.addEventListener('click', () => {
  console.log(favorites);
});
