class Modelproveedores {
    constructor(dbController) {
        this.dbController = dbController;
    }

    get(id) {
        const sql = 'SELECT * FROM proveedores WHERE id=?';
        this.dbController.open();
        const data = this.dbController.get(sql, [id]);
        this.dbController.close();
        return data;
    }

    getAll() {
        const sql = 'SELECT * FROM proveedores';
        this.dbController.open();
        const data = this.dbController.all(sql, []);
        this.dbController.close();
        return data;
    }

    insert(datos) {
        const sql = `INSERT INTO proveedores (nombre, email, telefono) VALUES (?, ?, ?)`;
        try {
            const result = this.dbController.run(sql, datos);
            return result;
        } catch (error) {
            console.error('Error en insert proveedores:', error.message);
            throw error;
        }
    }

    update(datos) {
        const sql = 'UPDATE proveedores SET nombre = ?, correo = ?, numero = ? WHERE id = ?';
        this.dbController.open();
        const result = this.dbController.run(sql, [datos.nombre, datos.correo, datos.numero, datos.id]);
        this.dbController.close();
        return result;
    }

    delete(id) {
        const sql = 'DELETE FROM proveedores WHERE id = ?';
        this.dbController.open();
        const data = this.dbController.run(sql, [id]);
        this.dbController.close();
        return data;
    }
}

export default Modelproveedores;
