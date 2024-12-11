class Modelarticulos {
    constructor(controllerDB) {
        this.controllerDB = controllerDB;
    }

    // Insertar un nuevo artículo
    async insert(datos) {
        const sql = 'INSERT INTO articulos (nombre, precio, cantidad) VALUES (?, ?, ?)';
        const result = this.controllerDB.run(sql, datos);
        return result;
    }

    // Actualizar un artículo existente
    async update(id, datos) {
        const sql = 'UPDATE articulos SET nombre = ?, precio = ?, cantidad = ? WHERE id = ?';
        const result = this.controllerDB.run(sql, [...datos, id]);
        return result;
    }

    // Eliminar un artículo
    async delete(id) {
        const sql = 'DELETE FROM articulos WHERE id = ?';
        const result = this.controllerDB.run(sql, [id]);
        return result;
    }
}

export default Modelarticulos;
