
// declaramos variables
const poke_container = document.getElementById('poke_container');
var pokeForm = document.getElementById('pokemon').value;
const pokeContent = document.getElementById('pokemonContent');
const pokemon_number=30


// recooremos los que nos trae la api

const fetchPokemons = async () => {
    pokeForm = document.getElementById('pokemon').value.toUpperCase();
    
    poke_container.innerHTML = ""
    
    for(let i = 1; i <= pokemon_number; i++){
        await getPokemon(i)
    }
}

// consumimos pokeapi

const getPokemon = async (id) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id.toString() 
    const res = await fetch(url)
    const pokemon = await res.json()

    createPokemonCard(pokemon)
}

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
         <button type="button" onclick="infoPokemon()" class="btn">Info</button>
        </div>  
        `
        
        
        
        
        pokemonEl.innerHTML = pokeInnerHtml
        poke_container.appendChild(pokemonEl)
        
        }
        if(basePokemon.includes("pikachu")){
            console.log("estoy en la lista");
            console.log(basePokemon);
        }
        // else{
        //     Swal.fire({
        //                 title: 'Lo sentimos!',
        //                 text: 'El pokemon que buscas no esta en nuestra lista.',
        //                 imageUrl: 'https://sm.ign.com/t/ign_latam/screenshot/default/pikachu-triste_auuu.1280.jpg',
        //                 imageWidth: 400,
        //                 imageHeight: 200,
        //                 imageAlt: 'Custom image',
        //               })
        // }
    }
    
    
        // if(pokeForm == 0){
        //     Swal.fire('Any fool can use a computer')
        //     console.log(pokeForm);}
        
        
    // }else{
    //     Swal.fire('Any fool can use a computer')
    // }
    // function infoPokemon(){
    //     const pokeInnerHtml2 = document.createElement('div');
    //     pokeInnerHtml2.classList.add('pokemon');
    //     pokeInnerHtml2.classList.add('move');
    //     pokeInnerHtml2.classList.add(classType);
    //     const pokeInfo = `
    //     <div class= 'img-container2'>
    //      <span class='card2'>${id}</span>
    //      <h3 class='card2'>${name}</h3>
    //      <small class ="card2">${type}</small>
    //      <small class='card2'>${stats}</small>
    //      </br>
    //      <small class='card2'>${pokemon.stats[1].stat.name} ${pokemon.stats[1].base_stat}</small>
    //      </br>
    //      <small class='card2'>${pokemon.stats[2].stat.name} ${pokemon.stats[2].base_stat}</small>
    //      <p class='card2'>Ataques</p>
    //      <small class='card2'>${pokemon.abilities[0].ability.name},</small>
    //      <small class='card2'>${pokemon.abilities[1].ability.name}</small>
    //      </br>
    //      </div>  
    //      `
    //     pokeInnerHtml2.innerHTML = pokeInfo
    //     poke_container.appendChild(pokeInnerHtml2)

    // }
    // infoPokemon()
    
        
    
    // let colorPKMN = types.map(pkmnCOLOR)
    //     function pkmnCOLOR(types){
    //         return types.type
    //     }
       

    // console.log(type);



fetchPokemons()

