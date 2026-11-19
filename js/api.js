const BASE_URL = "http://localhost:3000";

export async function request(method, route, body) {
    try {
        const response = await fetch(BASE_URL + route, {
            method: method
        })
        if (!response.ok) {
            throw new Error("Erreur " + response.status);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        throw error;
    }
}

export async function getCreatures(type = "All", q = "") {

    let route = "/creatures";
    const params = [];

    if (type !== "All") {
        params.push("type=" + encodeURIComponent(type));
    }

    if (q !== "") {
        params.push("q=" + encodeURIComponent(q));
    }

    if (params.length > 0) {
        route = route + "?" + params.join("&");
    }

    const creatures = await request("GET", route);

    return creatures;
}

export async function getCreature(id) {
    const pokemon = await request ("GET", "/creatures/" + id);
    return pokemon;
}