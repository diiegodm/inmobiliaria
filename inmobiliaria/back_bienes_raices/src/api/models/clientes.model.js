const pool = require('../../utils/db');

// Obtener todos los clientes
const getClientes = async () => {
    const [result] = await pool.query("SELECT * FROM cliente");
    return result;
};

// Crear un nuevo cliente
const createCliente = async ({ nombre, apellido, telefono, email, fecha, hora, mensaje, forma_de_contacto, presupuesto, operacion, vendedor_id }) => {
    try {
        const [result] = await pool.query(
            "INSERT INTO cliente (nombre, apellido, telefono, email, fecha, hora, mensaje, forma_de_contacto, presupuesto, operacion, vendedor_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            [nombre, apellido, telefono, email, fecha, hora, mensaje, forma_de_contacto, presupuesto, operacion, vendedor_id]
        );
        if (result.affectedRows === 0) {
            console.log("⚠️ No se insertó el cliente");
            return -1; // No se insertó el cliente
        }
        console.log("✅ Cliente insertado con ID:", result.insertId);
        return result.insertId; // Devuelve el ID del cliente insertado
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            console.error("❌ Error: Correo duplicado", email);
            throw new Error('El correo ya está registrado');
        }
        console.error("❌ Error en la base de datos:", error);
        throw error;
    }
};

// **Actualizar solo el vendedor de un cliente**
const updateVendedor = async (idcliente, vendedor_id) => {
    try {
        const [result] = await pool.query(
            `UPDATE cliente SET vendedor_id = ? WHERE idcliente = ?`,
            [vendedor_id, idcliente] 
        );
        return result;
    } catch (error) {
        console.error("Error al actualizar el vendedor:", error);
        throw error;
    }
};


// Verificar si el correo ya está registrado
const selectByEmail = async (email) => {
    const [rows] = await pool.query("SELECT * FROM cliente WHERE email = ?", [email]);
    return rows.length > 0 ? rows[0] : null;
};

// Obtener cliente por ID
const selectById = async (idcliente) => {
    const [rows] = await pool.query("SELECT * FROM cliente WHERE idcliente = ?", [idcliente]);
    return rows.length > 0 ? rows[0] : null;
};

const estadoCliente = async (estado, idcliente) => {
    try {
        const [result] = await pool.query(
            `UPDATE cliente SET estado = ?  WHERE idcliente = ?`, [estado, idcliente]
        );
        return result;
    }
    catch ( error){
        console.error("Error al actualizar el vendedor:", error);
        throw error;
    }
}



module.exports = { getClientes, createCliente, selectByEmail, selectById, updateVendedor,estadoCliente };
