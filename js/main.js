import { afficherPokemon, afficherTypes, activerType, afficherErreurRecherche, afficherDetail, afficherChargement, afficherChargementDetail, afficherErreurDetail, afficherErreurListe, afficherErreurConnexion } from "./ui.js"
import { getCreatures, getCreature } from "./api.js";
import { getFavoris, toggleFavori, saveType, getType } from "./storage.js";


let dernierPokemonId = null;
const nouveaux = [];


function getTypes() {
    const types = nouveaux.map(function (pokemon) {
        return pokemon.type
    })

    const sansDoublons = new Set(types);
    const typesUniques = [...sansDoublons];

    // console.log(typesUniques);
    afficherTypes(typesUniques);
    activerType(typeActif);
}

async function star() {
    afficherChargement();

    try {
        const creatures = await getCreatures();

        nouveaux.length = 0;
        nouveaux.push(...creatures);

        filtrerPokemon();
        getTypes();

    } catch (error) {
        afficherErreurListe();
    }
}




const filters = document.querySelector("#filters");
let typeActif = getType();

async function filtrerPokemon() {
    const recherche = searchInput.value.trim();

    afficherChargement();

    try {
        let creatures;

        if (typeActif === "Favoris") {
            creatures = await getCreatures("All", recherche);

            const favoris = getFavoris();

            creatures = creatures.filter(function (pokemon) {
                return favoris.includes(String(pokemon.id));
            });

        } else {
            creatures = await getCreatures(typeActif, recherche);
        }

        if (creatures.length === 0) {
            afficherErreurRecherche();
        } else {
            afficherPokemon(creatures);
        }

    } catch (error) {
        afficherErreurListe();
    }
}


filters.addEventListener("click", function (event) {
    if (event.target.tagName !== "BUTTON") return;

    typeActif = event.target.textContent;

    if (typeActif !== "Favoris") {
        saveType(typeActif);
    }
    filtrerPokemon();
    activerType(typeActif);
})

const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#search-btn");
const clearSearch = document.querySelector("#clear-search");


searchBtn.addEventListener("click", async function () {
    searchBtn.disabled = true;

    try {
        await filtrerPokemon();
    } finally {
        searchBtn.disabled = false;
    }
});


clearSearch.addEventListener("click", function () {
    searchInput.value = "";

    filtrerPokemon();
})

const grid = document.querySelector("#grid");

// detail
// grid.addEventListener("click", async function (event) {
//     const card = event.target.closest("article")

//     if (!card) return;

//     const id = card.dataset.id
//     const pokemonId = Number(id.replace("#", ""));

//     afficherChargementDetail();

//     try {
//         const pokemon = await getPokemonByName(pokemonId);
//         pokemon.description = await getPokemonDescription(pokemonId);
//         afficherDetail(pokemon);
//     } catch (error) {
//         afficherErreurDetail();
//     }

// })

async function chargerDetail(pokemonId) {
    dernierPokemonId = pokemonId;
    afficherChargementDetail();

    try {
        const pokemon = await getCreature(pokemonId);
        afficherDetail(pokemon);

    } catch (error) {
        afficherErreurDetail();
    }
}

const retryDetail = document.querySelector("#retry-detail");

retryDetail.addEventListener("click", function () {
    if (dernierPokemonId === null) return;

    chargerDetail(dernierPokemonId);
});

grid.addEventListener("click", function (event) {

    if (event.target.classList.contains("favori-btn")) {
        const card = event.target.closest("article");

        if (!card) return;

        toggleFavori(card.dataset.id);

        if (typeActif === "Favoris") {
            filtrerPokemon();
            return;
        }
        event.target.textContent =
            event.target.textContent.includes("☆") ? "★ Favoris" : "☆ Favoris";

        return;
    }
    const card = event.target.closest("article");


    if (!card) return;

    const id = card.dataset.id;
    const pokemonId = Number(id.replace("#", ""));

    chargerDetail(pokemonId);
});

const detail = document.querySelector("#detail");
const closeDetail = document.querySelector("#close-detail");

closeDetail.addEventListener("click", function () {
    detail.classList.add("hidden");
    detail.classList.remove("flex");
});

grid.addEventListener("click", function (event) {
    if (event.target.id === "retry-list") {
        star();
    }
    if (event.target.id === "retry-search") {
        searchBtn.click();
    }
});

star();