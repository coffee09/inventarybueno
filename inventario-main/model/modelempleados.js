class Modelempleados {
    constructor(dbController) {
        this.dbController = dbController;
    }

    get(id) {
        const sql = 'SELECT * FROM empleados WHERE id=?';
        this.dbController.open();
        const data = this.dbController.get(sql, [id]);
        this.dbController.close();
        return data;
    }

    getAll() {
        const sql = 'SELECT * FROM empleados';
        this.dbController.open();
        const data = this.dbController.all(sql, []);
        this.dbController.close();
        return data;
    }

    insert(datos) {
        const sql = `INSERT INTO empleados (nombre, apellido) VALUES (?, ?)`;
        try {
            const result = this.dbController.run(sql, datos);
            return result;
        } catch (error) {
            console.error('Error en insert empleados:', error.message);
            throw error;
        }
    }

    update(datos) {
        const sql = 'UPDATE empleados SET nombre = ?, apellido = ? WHERE id = ?';
        this.dbController.open();
        const result = this.dbController.run(sql, [datos.nombre, datos.apellido, datos.id]);
        this.dbController.close();
        return result;
    }

    delete(id) {
        const sql = 'DELETE FROM empleados WHERE id = ?';
        this.dbController.open();
        const data = this.dbController.run(sql, [id]);
        this.dbController.close();
        return data;
    }
}

export default Modelempleados;
