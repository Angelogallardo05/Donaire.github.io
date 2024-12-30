let pedidos = [];
let inventario = {
    arepa: 50,
    hamburguesa: 30,
    patacón: 20,
    papas: 100,
    doritos: 50,
    perro: 25
};

function agregarPedido() {
    const cliente = document.getElementById("cliente").value;
    const producto = document.getElementById("producto").value;
    const proteinas = parseInt(document.getElementById("proteinas").value, 10);
    const cantidadProducto = parseInt(document.getElementById("cantidadProducto").value, 10);
    const cantidadGaseosa = parseInt(document.getElementById("cantidadGaseosa").value, 10);
    const cantidadCigarrillos = parseInt(document.getElementById("cantidadCigarrillos").value, 10);

    const adicionales = [
        document.getElementById("ensaladaFrutas").checked ? 3000 : 0,
        document.getElementById("salpicon").checked ? 5000 : 0,
        document.getElementById("yogurt").checked ? 4000 : 0
    ].reduce((a, b) => a + b, 0);

    const precioProteinas = 10000 + (proteinas - 1) * 2000;
    const precioProducto = cantidadProducto * (precioProteinas + adicionales);
    const total = precioProducto + (cantidadGaseosa * 2000) + (cantidadCigarrillos * 7000);

    if (inventario[producto] >= cantidadProducto) {
        pedidos.push({ cliente, producto, cantidadProducto, total });
        inventario[producto] -= cantidadProducto;
        mostrarPedidos();
        mostrarInventario();
    } else {
        alert("Producto agotado: " + producto);
    }
}

function mostrarPedidos() {
    const listaPedidos = document.getElementById("listaPedidos");
    listaPedidos.innerHTML = "";
    pedidos.forEach((pedido, index) => {
        listaPedidos.innerHTML += `<li>
            ${pedido.cliente} pidió ${pedido.cantidadProducto} x ${pedido.producto}. Total: ${pedido.total} COP.
            <button onclick="eliminarPedido(${index})">Eliminar</button>
        </li>`;
    });
}

function eliminarPedido(index) {
    const producto = pedidos[index].producto;
    inventario[producto] += pedidos[index].cantidadProducto;
    pedidos.splice(index, 1);
    mostrarPedidos();
    mostrarInventario();
}

function mostrarInventario() {
    const listaInventario = document.getElementById("listaInventario");
    listaInventario.innerHTML = "";
    for (const [producto, cantidad] of Object.entries(inventario)) {
        listaInventario.innerHTML += `<li>${producto}: ${cantidad} unidades</li>`;
    }
}

window.onload = () => {
    mostrarPedidos();
    mostrarInventario();
};
