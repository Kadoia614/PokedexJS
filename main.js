var limit = 52;
const url = "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=0";

getPokemon();

function getPokemon() {
    axios.get(url)

        .then(function (response) {
            // manipula dados da requisição

            propriedadesPokemon(response.data.results);
        })

        .catch(function (error) {
            // manipula erros da requisição
            console.error(error);
        })
}

function propriedadesPokemon(response) {
    response.forEach((pokemon) => {

        axios.get(pokemon.url)
            .then(function (response) {
                // manipula dados da requisição

                console.log(response.data.name)

                criaPokemon(response)
            })

            .catch(function (error) {
                // manipula erros da requisição

                console.error(error);
            })

        conferePokemons();

    });
}

function criaPokemon(response) {
    let name = response.data.name;
    let pokemonimg = response.data.sprites.front_default;
    let type = response.data.types;

    $("#RedenResults").append(`
    <div class="card p-3 d-flex">
        <h3>${name}</h3>
        <div>
            <div class="${name}"> </div>
            <div class="img d-flex justify-content-center">
                <img class="pokemon" src="${pokemonimg}" alt="pokemon">
            </div>
            <div class="descricao">
                descricao qualquer do pokemon
            </div>
        </div>
    </div>
        `)
    type.forEach((element) => {
        $("." + name).append(`
        <img class="elementoPokemon ${type}" src="images/elementos/${element.type.name}.png">
    `)
    })

}

async function conferePokemons(){
    var pokemonsCarregados = 0;
    let interval = setInterval(async () => {

        pokemonsCarregados = document.querySelectorAll(".card").length;

        if (limit == pokemonsCarregados) {
            clearInterval(interval);

            document.getElementById("loading").style.opacity = "0";

            console.log(pokemonsCarregados)
        }
        else{

            document.getElementById("loading").style.opacity = "100";

            console.log(pokemonsCarregados)
        }

    }, 100);
}