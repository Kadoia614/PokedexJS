let main = document.querySelector(".main");
let spiner = document.querySelector(".lds-dual-ring");

let totalPokemons = 20;
buscaPokemon();

function buscaPokemon() {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokemons} &offset=0`)
        .then(function (response) {
            // manipula o sucesso da requisição
            propriedadesPokemon(response.data.results);
        })
        .catch(function (error) {
            // manipula erros da requisição
            console.error(error);
        })
        .then(function () {
            // sempre será executado
        });
}

function propriedadesPokemon(response) {

    response.forEach((pokemon) => {

        axios.get(pokemon.url)
            .then(function (response) {
                criaPokemonNaTela(response);
            })
            .catch(function (error) {
                // manipula erros da requisição
                console.error(error);
            })
            .then(function () {
                // sempre será executado
            });

        if (response.length = totalPokemons) {

            // main.style.display = "block";
            // spiner.style.display = "none";
            verificaPokemonsCriadosnoDom();
        }
    })
}

function criaPokemonNaTela(response) {

    let nomePokemon = response.data.name;
    let imgPokemon = response.data.sprites.other.dream_world.front_default;
    let elementoPokemon = response.data.types;

    console.log(response);

    $(".main").append(`        
        <div class="card ${nomePokemon}" style="width: 18rem;">
        <h2>${nomePokemon}</h2>
        <hr>
        <img class="card-img-top"
            src="${imgPokemon}"
            alt="Card image cap">
        <div class="card-body">
            <hr>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's
                content.</p>
        </div>
        </div>`
    );


    elementoPokemon.forEach((element) => {

        $("." + nomePokemon + " .card-img-top").before(`
        <img class="elementoPokemon ${nomePokemon}" src="images/elementos/${element.type.name}.png">
    `)

    })
}

async function verificaPokemonsCriadosnoDom() {

    let pokemonsCarregadosNaTela = 0;

    let interval = setInterval(async () => {

        pokemonsCarregadosNaTela = document.querySelectorAll(".card-img-top").length;

        if (totalPokemons == pokemonsCarregadosNaTela) {
            clearInterval(interval);

            efeitoCarregandoPokemons();
        }

    }, 10);
}


async function efeitoCarregandoPokemons() {

    let opacity = 0;
    let hideOpacity = 100;

    let interval = setInterval(() => {
        opacity++;
        hideOpacity--;
        main.style.opacity = opacity + "%";
        spiner.style.opacity = hideOpacity + "%";

        if (interval == 100)
            clearInterval(interval);

    }, 1);

}