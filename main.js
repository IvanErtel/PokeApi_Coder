
// declaramos variables
const poke_container = document.getElementById('poke_container');
var pokeForm = document.getElementById('pokemon').value;
const pokeContent = document.getElementById('pokemonContent');
const anterior = document.getElementById('btnAnterior');
const siguiente = document.getElementById('btnSiguiente');
let pokemon_number=8;
let desde = 1;
let hasta = 8;

//botones anterior y despues para pasar de pagina.
anterior.addEventListener('click', () => {
        desde -= 9;
       paginado(desde, hasta);
})
siguiente.addEventListener('click', () => {
    desde += 9;
    paginado(desde, hasta)
    ;
})

function paginado(desde, hasta){
    document.getElementById("btnAnterior").hidden = ((desde < 2));
    pokeForm = document.getElementById('pokemon').value.toUpperCase();
    poke_container.innerHTML = ""
    for(let i = desde; i<= desde + hasta; i++){
        getPokemon(i)
    }
}
// consumimos pokeapi

const getPokemon = async (id) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id.toString() 
    const res = await fetch(url)
    const pokemon = await res.json()
    createPokemonCard(pokemon)
}
// recooremos los que nos trae la api

const fetchPokemons = async () => {
    pokeForm = document.getElementById('pokemon').value.toUpperCase();
    poke_container.innerHTML = ""
    
    for(let i = 1; i <= pokemon_number; i++){
        await getPokemon(i)
    }
   
}
fetchPokemons()
// creamos las cards que se mostraran en el DOM

const createPokemonCard = (pokemon) => {
    const { types, sprites} = pokemon
    const name = pokemon.name.toUpperCase();
    const type = `type: ${types[0].type.name} ${types[1] ? types[1].type.name : ""}`
    const stats = `</br>${pokemon.stats[0].stat.name}:  ${pokemon.stats[0].base_stat} `
    var classType = types[0].type.name;
    const id = pokemon.id;
    let basePokemon = [];
    const pokemonEl = document.createElement('div');
    basePokemon.push(pokemon.name)
    // creamos un if para que se pueda buscar mediante nombre o ID
    
    
    if (name == pokeForm || pokeForm == "" || id == pokeForm){

        pokemonEl.classList.add('pokemon');
        pokemonEl.classList.add('move');
        pokemonEl.classList.add(classType);
        const pokeInnerHtml = `
        <div class= 'img-container' class= '${type}'>
             <img src= '${sprites.front_default}'/>
             </div>
        <div class='info'>
         <span class='number'>${id}</span>
         <h3 class='name'>${name}</h3>
         <small class ="type">${type}</small>
         <small class='type'>${stats}</small>
        </div>  
        `
        pokemonEl.innerHTML = pokeInnerHtml
        poke_container.appendChild(pokemonEl)
        
        }
        if(pokemonEl.innerHTML == ""){
            Swal.fire({
                        title: 'Lo sentimos!',
                        text: 'El pokemon que buscas no esta en nuestra lista.',
                        imageUrl: 'https://sm.ign.com/t/ign_latam/screenshot/default/pikachu-triste_auuu.1280.jpg',
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                      })
        }
    }
    
    
    
       





