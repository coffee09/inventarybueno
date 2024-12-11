import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import AppDaoBetterSQLite from './db/DaoBetterSqlite3.js';
import Modelarticulos from './model/modelarticulos.js';
import ModelEmpleados from './model/modelEmpleados.js';
import ModelProveedores from './model/modelProveedores.js';

// Configurar dotenv
dotenv.config();

const controllerDB = new AppDaoBetterSQLite('app.db');
const articulo = new Modelarticulos(controllerDB);
const empleado = new ModelEmpleados(controllerDB);
const proveedor = new ModelProveedores(controllerDB);

const app = express();

app.use(express.json());
app.use(cors());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Ruta principal
app.get('/', (req, res) => {
    res.send('INICIO');
});

// ============================ ARTÍCULOS ============================

// Mostrar todos los artículos
app.get('/api/articulos', async (req, res) => {
    try {
        const filas = await articulo.getAll();
        res.send(filas);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al obtener los artículos.' });
    }
});

// Mostrar un artículo por ID
app.get('/api/articulos/:id', async (req, res) => {
    try {
        const fila = await articulo.get(req.params.id);
        res.send(fila);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al obtener el artículo.' });
    }
});

// Insertar un artículo
app.post('/api/articulos', async (req, res) => {
    const data = req.body;

    try {
        const result = await articulo.insert(data);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al insertar el artículo.' });
    }
});

// Actualizar un artículo
app.put('/api/articulos/:id', async (req, res) => {
    const data = { id: req.params.id, ...req.body };

    try {
        const result = await articulo.update(data);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al actualizar el artículo.' });
    }
});

// Eliminar un artículo
app.delete('/api/articulos/:id', async (req, res) => {
    try {
        const result = await articulo.delete(req.params.id);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al eliminar el artículo.' });
    }
});

// ============================ EMPLEADOS ============================

// Mostrar todos los empleados
app.get('/api/empleados', async (req, res) => {
    try {
        const filas = await empleado.getAll();
        res.send(filas);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al obtener los empleados.' });
    }
});

// Insertar un empleado
app.post('/api/empleados', async (req, res) => {
    const data = req.body;

    try {
        const result = await empleado.insert(data);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al insertar el empleado.' });
    }
});

// ============================ PROVEEDORES ============================

// Mostrar todos los proveedores
app.get('/api/proveedores', async (req, res) => {
    try {
        const filas = await proveedor.getAll();
        res.send(filas);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al obtener los proveedores.' });
    }
});

// Insertar un proveedor
app.post('/api/proveedores', async (req, res) => {
    const data = req.body;

    try {
        const result = await proveedor.insert(data);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al insertar el proveedor.' });
    }
});

// ============================ CONFIGURACIÓN DEL SERVIDOR ============================

const puerto = process.env.PUERTO || 3000;
app.listen(puerto, () => {
    console.log(`Servidor OK en el puerto ${puerto}`);
});
