const pool = require('../../utils/db');




const inserVendedor = async ({ nombre, apellido, direccion, telefono, dni, correo, password, rol, img }) => {
    console.log('intentando insertar:', { nombre, apellido, direccion, telefono, dni, correo, password, rol, img });
    const DEFAULT_IMAGE_PATH = 'ejemplo.jpg';
    
    // Usar la imagen por defecto si img es null o undefined
    if (!img || img.trim() === "") {
        img = DEFAULT_IMAGE_PATH;
    }
    
    try {
        const [result] = await pool.query("INSERT INTO users (nombre, apellido, direccion, telefono, dni, correo, password, rol, img) VALUES (?,?,?,?,?,?,?,?,?)", [nombre, apellido, direccion, telefono, dni, correo, password, rol, img]);
        if (result.affectedRows === 0) {
            return -1;
        }
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
};


const selectByEmail = async (correo) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE correo = ?", [correo]);
    return rows.length > 0 ? rows[0] : null;
};

const selectByDni = async (correo) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE dni = ?", [correo]);
    return rows.length > 0 ? rows[0] : null;  

};

const selectById = async (idvendedor) => {
    const result = await pool.query("SELECT * FROM users WHERE idvendedor = ?", [idvendedor]);
    return result[0];
};

const getVendedores = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result[0];
};

const updateVendedores = async (idvendedor, { nombre, apellido, direccion, telefono, dni, correo, password, rol, img }) => {
    try {
        let query = "UPDATE users SET nombre = ?, apellido = ?, direccion = ?, telefono = ?, dni = ?, correo = ?, password = ?, rol = ?";
        let params = [nombre, apellido, direccion, telefono, dni, correo, password, rol];

        // Solo añadir 'img' si no es null ni undefined
        if (img !== null && img !== undefined) {
            query += ", img = ?";
            params.push(img);
        }

        query += " WHERE idvendedor = ?";
        params.push(idvendedor);

        const [result] = await pool.query(query, params);

        if (result.affectedRows === 0) {
            throw new Error("No se encontró el vendedor con ese ID.");
        }

        return result.affectedRows;
    } catch (error) {
        console.error("Error al actualizar el vendedor:", error);
        throw error;
    }
};

const eliminarlogico = async (idvendedor, estado) => {
    const [result] = await pool.query(
        "UPDATE users SET estado = ? WHERE idvendedor = ?", 
        [estado, idvendedor]
    );
    return result; // Devuelve el resultado de la consulta
};

const filtarporvendedor = async (idvendedor) => {
    try {
        const [clientes] = await pool.query(
            "SELECT * FROM cliente WHERE vendedor_id = ?", [idvendedor]
        );
        return clientes;
    } catch (error) {
        console.error("Error al filtrar por vendedor:", error);
        throw error;
    }
};

const vendedores = async () => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE rol = 1 AND estado = 0");
      return result[0]; 
    } catch (error) {
      console.error("Error al filtrar por vendedor:", error);
      throw error;
    }
  };






module.exports = {getVendedores, selectByEmail,inserVendedor,selectById,selectByDni,updateVendedores,eliminarlogico , filtarporvendedor, vendedores };