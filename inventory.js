let inventario = {
    arepa: 50,
    hamburguesa: 30,
    patacon: 20,
    papas: 100,
    doritos: 50,
    perro: 25,
    bebidas: {
        postabon: 50,
        tinto: 50,
        cafe: 50
    }
};

function mostrarInventario() {
    const inventarioDiv = document.getElementById("inventario");
    inventarioDiv.innerHTML = `<h3>Arepas: ${inventario.arepa}</h3>
        <h3>Hamburguesas: ${inventario.hamburguesa}</h3>
        <h3>Patacón: ${inventario.patacon}</h3>
        <h3>Papas: ${inventario.papas}</h3>
        <h3>Doritos: ${inventario.doritos}</h3>
        <h3>Perros: ${inventario.perro}</h3>
        <h3>Bebidas:</h3>
        <ul>
            <li>Postabon: ${inventario.bebidas.postabon}</li>
            <li>Tinto: ${inventario.bebidas.tinto}</li>
            <li>Café: ${inventario.bebidas.cafe}</li>
        </ul>`;
}

window.onload = mostrarInventario;
