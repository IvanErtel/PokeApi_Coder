const poke_container = document.getElementById('poke_container');
var pokeForm = document.getElementById('pokemon').value;
const pokeContent = document.getElementById('pokemonContent');
const pokemon_number=100


const fetchPokemons = async () => {
    pokeForm = document.getElementById('pokemon').value.toUpperCase();
    
    poke_container.innerHTML = ""
    for(let i = 1; i <= pokemon_number; i++){
        await getPokemon(i)

    }
    
}


const getPokemon = async (id) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id.toString() 
    const res = await fetch(url)
    const pokemon = await res.json()

    createPokemonCard(pokemon)
}

const createPokemonCard = (pokemon) => {
    const { types, sprites} = pokemon
    const name = pokemon.name.toUpperCase();
    const type = `tipo: ${types[0].type.name} ${types[1] ? types[1].type.name : ""}`
    const stats = `</br>${pokemon.stats[0].stat.name}:  ${pokemon.stats[0].base_stat} `
    const id = pokemon.id;
    const pokemonEl = document.createElement('div');
    // setCardColor(types)
    // console.log(pokemon.types[0].type.name);
   
    
    if (name == pokeForm || pokeForm == "" || id == pokeForm){
 
        pokemonEl.classList.add('pokemon')
        pokemonEl.classList.add('move')
    
        const pokeInnerHtml = `
        <div class= 'img-container'>
             <img src= '${sprites.front_default}'/>
             </div>
        <div class='info'>
         <span class='number'>${id}</span>
         <h3 class='name'>${name}</h3>
         <small class='type'>${type}</small>
         <small class='type'>${stats}</small>
        </div>  
        `
        
        pokemonEl.innerHTML = pokeInnerHtml
        poke_container.appendChild(pokemonEl)
        
    }
    
    
}

   
fetchPokemons()

