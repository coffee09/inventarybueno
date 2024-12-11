import Modelarticulos from './model/modelarticulos.js';
import Modelempleados from './model/modelempleados.js';
import Modelproveedores from './model/modelproveedores.js';
import betterSqlite3 from 'better-sqlite3';

// Clase para gestionar operaciones de la base de datos
class AppDaoBetterSQLite {
    constructor(dbFile) {
        this.db = betterSqlite3(dbFile);
        console.log('Base de datos inicializada:', dbFile);
    }

    run(sql, params = []) {
        try {
            const stmt = this.db.prepare(sql);
            const result = stmt.run(params);
            return result;
        } catch (error) {
            console.error('Error ejecutando SQL:', sql, error.message);
            throw error;
        }
    }

    close() {
        this.db.close();
        console.log('Conexión a la base de datos cerrada');
    }
}

// Crea una instancia del controlador de base de datos
const controllerDB = new AppDaoBetterSQLite('app.db');

// Crear tablas en la base de datos
function crearTablas() {
    // Crear tabla de artículos
    controllerDB.run(`
        CREATE TABLE IF NOT EXISTS articulos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            precio REAL NOT NULL,
            cantidad INTEGER NOT NULL
        );
    `);
    console.log('Tabla "articulos" creada');

    // Crear tabla de empleados
    controllerDB.run(`
        CREATE TABLE IF NOT EXISTS empleados (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            apellido TEXT NOT NULL
        );
    `);
    console.log('Tabla "empleados" creada');

    // Crear tabla de proveedores
    controllerDB.run(`
        CREATE TABLE IF NOT EXISTS proveedores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            email TEXT NOT NULL,
            telefono TEXT NOT NULL
        );
    `);
    console.log('Tabla "proveedores" creada');
}

// Llama a la función para crear las tablas
crearTablas();

// Crear instancias de los modelos
const articulo = new Modelarticulos(controllerDB);
const empleado = new Modelempleados(controllerDB);
const proveedor = new Modelproveedores(controllerDB);

// Insertar datos de ejemplo
async function crearDatos() {
    try {
        // Insertar un artículo
        const datosArticulo = ['Artículo 1', 100, 50];
        const resultadoArticulo = await articulo.insert(datosArticulo);
        console.log('Artículo insertado:', resultadoArticulo);

        // Insertar un empleado
        const datosEmpleado = ['Juan', 'Pérez'];
        const resultadoEmpleado = await empleado.insert(datosEmpleado);
        console.log('Empleado insertado:', resultadoEmpleado);

        // Insertar un proveedor
        const datosProveedor = ['Proveedor A', 'proveedor@example.com', '123456789'];
        const resultadoProveedor = await proveedor.insert(datosProveedor);
        console.log('Proveedor insertado:', resultadoProveedor);
    } catch (error) {
        console.error('Error al insertar datos:', error.message);
    } finally {
        // Cierra la conexión a la base de datos
        controllerDB.close();
    }
}

// Llama a la función para insertar los datos
crearDatos();
