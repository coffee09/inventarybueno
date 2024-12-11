// Datos de ejemplo (puedes cambiarlos por datos reales)
let articulos = [];
let empleados = [];
let proveedores = [];

const agregarArticulo = (descripcion, precio, stock) => {
    const articulo = {
        id: articulos.length + 1,
        descripcion,
        precio,
        stock
    };
    articulos.push(articulo);
    mostrarArticulos();
};

const agregarEmpleado = (nombre, apellido) => {
    const empleado = {
        id: empleados.length + 1,
        nombre,
        apellido
    };
    empleados.push(empleado);
    mostrarEmpleados();
};

const agregarProveedor = (nombre, correo, numero) => {
    const proveedor = {
        id: proveedores.length + 1,
        nombre,
        correo,
        numero
    };
    proveedores.push(proveedor);
    mostrarProveedores();
};

// Mostrar Artículos
const mostrarArticulos = () => {
    const tbody = document.querySelector("#tablaArticulos tbody");
    tbody.innerHTML = '';
    articulos.forEach(articulo => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${articulo.id}</td>
            <td>${articulo.descripcion}</td>
            <td>${articulo.precio}</td>
            <td>${articulo.stock}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarArticulo(${articulo.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarArticulo(${articulo.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
};

// Mostrar Empleados
const mostrarEmpleados = () => {
    const tbody = document.querySelector("#tablaEmpleados tbody");
    tbody.innerHTML = '';
    empleados.forEach(empleado => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${empleado.id}</td>
            <td>${empleado.nombre}</td>
            <td>${empleado.apellido}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarEmpleado(${empleado.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarEmpleado(${empleado.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
};

// Mostrar Proveedores
const mostrarProveedores = () => {
    const tbody = document.querySelector("#tablaProveedores tbody");
    tbody.innerHTML = '';
    proveedores.forEach(proveedor => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${proveedor.id}</td>
            <td>${proveedor.nombre}</td>
            <td>${proveedor.correo}</td>
            <td>${proveedor.numero}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarProveedor(${proveedor.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarProveedor(${proveedor.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
};

// Eliminar Artículo
const eliminarArticulo = (id) => {
    articulos = articulos.filter(articulo => articulo.id !== id);
    mostrarArticulos();
};

// Eliminar Empleado
const eliminarEmpleado = (id) => {
    empleados = empleados.filter(empleado => empleado.id !== id);
    mostrarEmpleados();
};

// Eliminar Proveedor
const eliminarProveedor = (id) => {
    proveedores = proveedores.filter(proveedor => proveedor.id !== id);
    mostrarProveedores();
};

// Editar Artículo
const editarArticulo = (id) => {
    const articulo = articulos.find(a => a.id === id);
    if (articulo) {
        document.getElementById("descripcionArticulo").value = articulo.descripcion;
        document.getElementById("precioArticulo").value = articulo.precio;
        document.getElementById("stockArticulo").value = articulo.stock;
        // También puedes mostrar el botón para actualizar
        // Cambiar el evento de guardado a "Actualizar"
    }
};

// Editar Empleado
const editarEmpleado = (id) => {
    const empleado = empleados.find(e => e.id === id);
    if (empleado) {
        document.getElementById("nombreEmpleado").value = empleado.nombre;
        document.getElementById("apellidoEmpleado").value = empleado.apellido;
    }
};

// Editar Proveedor
const editarProveedor = (id) => {
    const proveedor = proveedores.find(p => p.id === id);
    if (proveedor) {
        document.getElementById("nombreProveedor").value = proveedor.nombre;
        document.getElementById("correoProveedor").value = proveedor.correo;
        document.getElementById("numeroProveedor").value = proveedor.numero;
    }
};

// Función de creación de Artículo
document.querySelector("#modalArticulo button[type='submit']").addEventListener('click', () => {
    const descripcion = document.getElementById("descripcionArticulo").value;
    const precio = parseFloat(document.getElementById("precioArticulo").value);
    const stock = parseInt(document.getElementById("stockArticulo").value);
    agregarArticulo(descripcion, precio, stock);
});

// Función de creación de Empleado
document.querySelector("#modalEmpleado button[type='submit']").addEventListener('click', () => {
    const nombre = document.getElementById("nombreEmpleado").value;
    const apellido = document.getElementById("apellidoEmpleado").value;
    agregarEmpleado(nombre, apellido);
});

// Función de creación de Proveedor
document.querySelector("#modalProveedor button[type='submit']").addEventListener('click', () => {
    const nombre = document.getElementById("nombreProveedor").value;
    const correo = document.getElementById("correoProveedor").value;
    const numero = document.getElementById("numeroProveedor").value;
    agregarProveedor(nombre, correo, numero);
});
