let pedidos = [];

function agregarPedido() {
    const cliente = document.getElementById("cliente").value;
    const producto = document.getElementById("producto").value;
    const cantidadProducto = parseInt(document.getElementById("cantidadProducto").value, 10);
    const proteinas = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(el => el.value);
    const jamonQueso = document.getElementById("jamonQueso").checked ? 3000 : 0;

    // Cálculo de precio de la arepa según la cantidad de proteínas
    const precioBase = 10000;
    const precioProteinas = precioBase + (proteinas.length - 1) * 2000;

    const totalPedido = precioProteinas * cantidadProducto + jamonQueso;
    const pedido = {
        cliente,
        producto,
        cantidadProducto,
        proteinas,
        jamonQueso,
        totalPedido
    };

    pedidos.push(pedido);
    mostrarPedidos();
    resetForm();
}

function mostrarPedidos() {
    const listaPedidos = document.getElementById("listaPedidos");
    listaPedidos.innerHTML = ''; // Limpiar el resumen de pedidos

    pedidos.forEach(pedido => {
        listaPedidos.innerHTML += `<li>${pedido.cliente} pidió ${pedido.cantidadProducto} x ${pedido.producto} con ${pedido.proteinas.join(', ')}. Total: ${pedido.totalPedido} COP</li>`;
    });
}

function resetForm() {
    // Limpiar los campos del formulario después de un pedido
    document.getElementById("orderForm").reset();
}

window.onload = mostrarPedidos;
