import { PokemonComponent } from "../server/shared/pokemonComponent";
import { PokemonData } from "../server/shared/IPokemonData";


let pokemonDataArray: PokemonData[] = [];
class Module {

  getRandomPokemon() {
    pokemonsList.innerHTML = "";
    let randomNum = Math.floor(Math.random() * pokemonDataArray.length);
    this.createPokemoneElement(pokemonDataArray[randomNum]);
  }

  //search pokemon by name, if exist render it to the page.
  getPokemonByName(name: string) {
    pokemonDataArray.forEach((pokeData) => {
      if (pokeData.name === name) {
        this.createPokemoneElement(pokeData);
      }
    });
  }

  //render with the data into the html page.
  createPokemoneElement(pokemonData: PokemonData) {
    let pokemonComponent = new PokemonComponent(pokemonData, pokemonsList);
    pokemonComponent.render();
  }

  searchRandomPokemon() {
    this.getRandomPokemon();
  }
}

function filterPokemonsByInputValue() {
  let input = (<HTMLInputElement>document.getElementById("search-poke-input"))
    .value;
  if (input === "") {
    return;
  }

  if (!onlyLetters(input)) {
    return;
  }

  pokemonsList.innerHTML = "";
  let arr = pokemonDataArray.filter(pokemonData => pokemonData.name.startsWith(input));
  if (arr.length > 0) {
    arr.forEach((pokemonData) => { module.getPokemonByName(pokemonData.name) });
  } else {
    pokemonsList.innerHTML = "pokemon not discovered yet";
  }

}

function onlyLetters(str: string) {
  return /^[a-zA-Z]+$/.test(str);
}


//main page load
function onMainLoad() {
  pokemonsList = document.getElementById("pokemons-list") as HTMLElement;
  document.getElementById("search-poke-input")!.addEventListener("keyup", filterPokemonsByInputValue);
  for (let i = 0; i < 20; i++) {
    module.createPokemoneElement(pokemonDataArray[i]);
  }
}

async function onLoad() {
  await fetch('/pokemon')
    .then(res => res.json().then(data => {
      pokemonDataArray.push(...data);
     console.log(data[0].photoURL);
    }))

  onMainLoad();
}

window.addEventListener("load", onLoad);
window.onscroll = async function () {
  if ((window.innerHeight + window.scrollY + 2) >= document.body.scrollHeight) {
    await fetch('/pokemon')
      .then(res => res.json().then(data => {
        data.forEach((pokemonData: PokemonData) => {
          module.createPokemoneElement(pokemonData);
        })
        pokemonDataArray.push(...data);
      }))
  }
};

let pokemonsList: HTMLElement;
export const module = new Module();