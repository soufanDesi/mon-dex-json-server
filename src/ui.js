

import { getFavoris, } from "./storage.js";
const grid = document.querySelector("#grid")
// const filters = document.querySelector("#filters");
// let typeActif = "All";



export function afficherPokemon(liste) {
    grid.replaceChildren();

    const creatureCount = document.querySelector("#creature-count");
    creatureCount.textContent = liste.length;

    const favoris = getFavoris();

    liste.forEach(function (pokemon) {
        const card = document.createElement("article");
        card.dataset.id = pokemon.id;
        card.className = "flex flex-col gap-3 rounded-xl bg-white p-3 pb-4 hover:-translate-y-1 transition-transform duration-500";

        const total = pokemon.stats.hp + pokemon.stats.attack + pokemon.stats.defence;
        const numero = "#" + String(pokemon.id).padStart(3, "0");
        const estFavori = favoris.includes(String(pokemon.id));

        const imageBox = document.createElement("div");
        imageBox.className = "relative flex h-36 items-center justify-center rounded-xl bg-brand-light";

        const image = document.createElement("img");
        image.src = pokemon.image;
        image.alt = pokemon.name;
        image.className = "h-32 w-32";

        const number = document.createElement("span");
        number.className = "absolute left-3 top-2 font-mono text-sm text-muted";
        number.textContent = numero;

        imageBox.appendChild(image);
        imageBox.appendChild(number);

        const info = document.createElement("div");
        info.className = "flex items-center justify-between gap-2";

        const name = document.createElement("h2");
        name.className = "font-display text-xl font-semibold";
        name.textContent = pokemon.name;

        const type = document.createElement("span");
        type.className = "rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-ink";
        type.textContent = pokemon.type;

        info.appendChild(name);
        info.appendChild(type);

        const stats = document.createElement("p");
        stats.className = "text-sm text-muted";
        stats.textContent = "Total " + total;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "favori-btn btn-outline";

        if (estFavori) {
            button.textContent = "★ Favoris";
        } else {
            button.textContent = "☆ Favoris";
        }

        card.appendChild(imageBox);
        card.appendChild(info);
        card.appendChild(stats);
        card.appendChild(button);

        grid.appendChild(card);
    });
}


export function afficherErreurRecherche() {
    grid.replaceChildren();
    const message = document.createElement("p");
    message.textContent = "Aucun Pokémon trouvé";
    grid.appendChild(message);
}

export function afficherDetail(pokemon) {

    const detail = document.querySelector("#detail");

    detail.classList.remove("hidden");
    detail.classList.add("flex");

    // id
    const detailNumber = document.querySelector("#detail-number");
    detailNumber.textContent = `${pokemon.id} · Détail`;

    // name
    const detailName = document.querySelector("#detail-name");
    detailName.textContent = pokemon.name;

    // image
    const detailImage = document.querySelector("#detail-image");
    detailImage.src = pokemon.image;
    detailImage.alt = pokemon.name;
    detailImage.classList.remove("invisible");

    // description
    const detaildesc = document.querySelector("#detail-description");
    detaildesc.textContent = pokemon.description

    // type
    const detailType = document.querySelector("#detail-type");
    detailType.textContent = pokemon.type;

    const detailHp = document.querySelector("#detail-hp");
    detailHp.textContent = pokemon.stats.hp;
    const hpBar = document.querySelector("#detail-hp-bar");
    hpBar.style.width = pokemon.stats.hp + "%";

    const detailAttq = document.querySelector("#detail-attack");
    detailAttq.textContent = pokemon.stats.attack;
    const attackBar = document.querySelector("#detail-attack-bar");
    attackBar.style.width = pokemon.stats.attack + "%";

    const detaildefence = document.querySelector("#detail-defence");
    detaildefence.textContent = pokemon.stats.defence;
    const defenceBar = document.querySelector("#detail-defence-bar");
    defenceBar.style.width = pokemon.stats.defence + "%";

}




export function afficherTypes(type) {
    const filters = document.querySelector("#filters");
    filters.replaceChildren();

    const buttonAll = document.createElement("button");

    buttonAll.type = "button";
    buttonAll.className = "chip";
    buttonAll.textContent = "All";

    filters.appendChild(buttonAll);
    const buttonFavoris = document.createElement("button");
    buttonFavoris.type = "button";
    buttonFavoris.className = "chip";
    buttonFavoris.textContent = "Favoris";

    filters.appendChild(buttonFavoris);

    type.forEach(function (type) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "chip";
        button.textContent = type;

        filters.appendChild(button);
    })

}

export function activerType(typeActif) {

    const buttons = document.querySelectorAll("#filters button");

    buttons.forEach(function (button) {
        button.classList.remove("bg-ink", "text-white", "border-ink");

        if (button.textContent === typeActif) {
            button.classList.add("bg-ink", "text-white", "border-ink");
        }
    })

}


export function afficherChargement() {
    grid.replaceChildren();

    const message = document.createElement("p");
    message.textContent = "Chargement...";
    message.className = "font-semibold text-ink";

    grid.appendChild(message);
}


export function afficherChargementDetail() {
    const retryBtn = document.querySelector("#retry-detail");
    retryBtn.classList.add("hidden");

    const detail = document.querySelector("#detail");

    detail.classList.remove("hidden");
    detail.classList.add("flex");

    const name = document.querySelector("#detail-name");
    name.textContent = "Chargement...";

    const description = document.querySelector("#detail-description");
    description.textContent = "Chargement...";

    const image = document.querySelector("#detail-image");
    image.classList.add("invisible");

    const type = document.querySelector("#detail-type");
    type.textContent = "...";
}


export function afficherErreurDetail() {
    const retryBtn = document.querySelector("#retry-detail");
    retryBtn.classList.remove("hidden");
    const name = document.querySelector("#detail-name");
    name.textContent = "Erreur de chargement";

    const description = document.querySelector("#detail-description");
    description.textContent = "Impossible de charger les détails.";

    const image = document.querySelector("#detail-image");
    image.classList.add("invisible");

    const type = document.querySelector("#detail-type");
    type.textContent = "...";
}

export function afficherErreurListe() {
    grid.replaceChildren();

    const div = document.createElement("div");

    const message = document.createElement("p");
    message.textContent = "Impossible de charger les Pokémon.";

    const button = document.createElement("button");
    button.id = "retry-list";
    button.type = "button";
    button.className = "btn-outline";
    button.textContent = "Réessayer";

    div.appendChild(message);
    div.appendChild(button);

    grid.appendChild(div);
}

export function afficherErreurConnexion() {
    grid.replaceChildren();

    const div = document.createElement("div");

    const message = document.createElement("p");
    message.textContent = "Erreur de connexion.";

    const button = document.createElement("button");
    button.id = "retry-search";
    button.type = "button";
    button.className = "btn-outline";
    button.textContent = "Réessayer";

    div.appendChild(message);
    div.appendChild(button);

    grid.appendChild(div);
};
