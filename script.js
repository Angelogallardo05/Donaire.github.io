
let pedidos = [];
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
        cafe: 50,
        panela: 50,
        cocacola: 50,
        cocacolaZero: 50,
        agua: 50
    }
};

function agregarPedido() {
    const cliente = document.getElementById("cliente").value;
    const producto = document.getElementById("producto").value;
    const proteinas = parseInt(document.getElementById("proteinas").value, 10);
    const cantidadProducto = parseInt(document.getElementById("cantidadProducto").value, 10);
    const cantidadBebidas = {
        postabon: parseInt(document.getElementById("cantidadPostabon").value, 10),
        tinto: parseInt(document.getElementById("cantidadTinto").value, 10),
        cafe: parseInt(document.getElementById("cantidadCafe").value, 10),
        panela: parseInt(document.getElementById("cantidadPanela").value, 10),
        cocacola: parseInt(document.getElementById("cantidadCocacola").value, 10),
        cocacolaZero: parseInt(document.getElementById("cantidadCocacolaZero").value, 10),
        agua: parseInt(document.getElementById("cantidadAgua").value, 10)
    };

    const adicional = [
        document.getElementById("ensaladaFrutas").checked ? 3000 : 0,
        document.getElementById("salpicon").checked ? 5000 : 0,
        document.getElementById("yogurt").checked ? 4000 : 0
    ].reduce((a, b) => a + b, 0);

    const precioProteinas = 10000 + (proteinas - 1) * 2000;
    const gramajeTotal = 50 + (cantidadProducto - 1) * 25;
    const precioProducto = cantidadProducto * (precioProteinas + adicional);
    const totalBebidas = Object.values(cantidadBebidas).reduce((a, b) => a + (b * 2000), 0);
    const totalCigarrillos = parseInt(document.getElementById("cantidadCigarrillos").value, 10) * 7000;
    const totalPedido = precioProducto + totalBebidas + totalCigarrillos;

    if (inventario[producto] >= cantidadProducto) {
        pedidos.push({ cliente, producto, cantidadProducto, totalPedido, gramajeTotal, bebidas: cantidadBebidas });
        inventario[producto] -= cantidadProducto;
        for (const bebida in cantidadBebidas) {
            inventario.bebidas[bebida] -= cantidadBebidas[bebida];
        }
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
            ${pedido.cliente} pidió ${pedido.cantidadProducto} x ${pedido.producto}. Total: ${pedido.totalPedido} COP, Gramaje: ${pedido.gramajeTotal}g.
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
        if (typeof cantidad === 'object') {
            for (const bebida in cantidad) {
                listaInventario.innerHTML += `<li>${bebida}: ${cantidad[bebida]} unidades</li>`;
            }
        } else {
            listaInventario.innerHTML += `<li>${producto}: ${cantidad} unidades</li>`;
        }
    }
}

function guardarExcel() {
    const pedidosExcel = pedidos.map(pedido => ({
        Cliente: pedido.cliente,
        Producto: pedido.producto,
        Cantidad: pedido.cantidadProducto,
        Total: pedido.totalPedido,
        Gramaje: pedido.gramajeTotal
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(pedidosExcel);
    XLSX.utils.book_append_sheet(wb, ws, "Pedidos");
    XLSX.writeFile(wb, "pedidos.xlsx");
}

window.onload = () => {
    mostrarPedidos();
    mostrarInventario();
};
