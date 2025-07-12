async function getPokemonData(pokemonID){
    try {
        const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
        if (!response1.ok) throw new Error('Pokemon not found');
        const pokemon = await response1.json();
        

        const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`);
        if (!response2.ok) throw new Error('Species info not found');
        const species = await response2.json();

        
        const pokeTypes = pokemon.types.map(typeInfo => typeInfo.type.name);

        const flavorEntry = species.flavor_text_entries.find(entry => entry.language.name === 'en')
        const flavorText = flavorEntry ? flavorEntry.flavor_text.replace(/\n|\f/g, ' ') : 'No flavor text available';

        return {
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            types: pokeTypes,
            flavorText: flavorText,
            habitat: species.habitat ? species.habitat.name : 'Unknown',
            isLegendary: species.is_legendary
        };
    } catch (error){
        console.log('Oops, no pokemon found', error)
    }
};

async function assignmentTask() {
    const id = Math.floor(Math.random() * 151) + 1;
    const pokemonData = await getPokemonData(id);
    if (pokemonData) {
        console.log(pokemonData);
    } else {
        console.log("Couldn't fetch Pokemon Data :(")
    }
}

assignmentTask();