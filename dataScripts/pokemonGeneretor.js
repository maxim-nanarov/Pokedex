const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, "../data/data.json");
const newPokemonsFilePath = path.join(__dirname, "../data/newPokemons.json");
const readFileData = JSON.parse(fs.readFileSync(filePath, "utf8"));

let generetePokemons = [];

for (let i = 0; i < 1000; i++) {
    let rnd1 = Math.floor(Math.random() * readFileData.length);
    let rnd2 = Math.floor(Math.random() * readFileData.length);
    let rnd3 = Math.floor(Math.random() * 3);

    let pokemonData1 = readFileData[rnd1];
    let pokemonData2 = readFileData[rnd2];

    let newPokemon = {
        photoURL: pokemonData1.photoURL,
        name: pokemonData1.name + " " + pokemonData2.name,
        type: pokemonData1.type + " " + pokemonData2.type,
        height: pokemonData1.height + pokemonData2.height,
        weight: pokemonData1.weight + pokemonData2.weight
    }

    if (rnd3 === 0) {
        newPokemon.type = pokemonData1.type;
    }

    if (rnd3 === 1) {
        newPokemon.height = pokemonData1.height ^ pokemonData2.height
    }

    if (rnd3 === 2) {
        newPokemon.weight = pokemonData1.weight ^ pokemonData2.weight
    }

    generetePokemons.push(newPokemon);
}

fs.writeFileSync(newPokemonsFilePath, JSON.stringify(generetePokemons));