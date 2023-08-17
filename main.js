function buscarPokemon(){
    var totalPokemon = parseInt(document.getElementById("quantidadePokemons").value);
    console.log(totalPokemon);

    recarregarTela(totalPokemon);
}



function getPokemon(quantidade) {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=" + quantidade + "&offset=0";
    axios.get(url)

        .then(function (response) {
            // manipula dados da requisição

            propriedadesPokemon(response.data.results, quantidade);
        })

        .catch(function (error) {
            // manipula erros da requisição
            console.error(error);
        })
}

function propriedadesPokemon(response, quantidade) {
    response.forEach((pokemon) => {

        conferePokemons(quantidade);

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

    });
}

function criaPokemon(response) {
    $("#RedenResults").addClass("d-block")
    $("#RedenResults").removeClass("d-none")
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

async function conferePokemons(quantidade){
    var pokemonsCarregados = 0;
    let interval = setInterval(async () => {

        pokemonsCarregados = document.querySelectorAll(".card").length;

        if (quantidade == pokemonsCarregados) {
            clearInterval(interval);

            document.getElementById("loading").style.opacity = "0";
            document.getElementById("loading").style.display = "none";


            console.log(pokemonsCarregados)
        }
        else{

            document.getElementById("loading").style.opacity = ".7";
            document.getElementById("loading").style.display = "block";


            console.log(pokemonsCarregados)
        }

    }, 2);
}

function recarregarTela(quantidade){
    if (quantidade > 0){
        document.getElementById("RedenResults").innerHTML = "";

        getPokemon(quantidade);
        console.log(quantidade);

    } else if(quantidade < 0){
        alert("Por favor, escolha um valor maior que zero!")

    } else {
        document.getElementById("RedenResults").innerHTML = "";

    }    
}