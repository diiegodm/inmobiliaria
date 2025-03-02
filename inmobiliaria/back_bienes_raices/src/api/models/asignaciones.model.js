const pool = require('../../utils/db');


const getAsignaciones = async () => {
    const result = await pool.query("SELECT * FROM asignaciones_clientes");
    return result[0];
}

const createAsignacion = async ({ idvendedor, idpropiedad, fecha_asignacion }) => {
    try {
        const [result] = await pool.query("INSERT INTO asignaciones_clientes (idvendedor, idpropiedad, fecha_asignacion) VALUES (?,?,?)", [idvendedor, idpropiedad, fecha_asignacion]);
        if (result.affectedRows === 0) {
            return -1;
        }
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}

const selectById = async (idasignacion) => {
    const result = await pool.query("SELECT * FROM asignaciones_clientes WHERE idasignacion = ?", [idasignacion]);
    return result[0];
}

const updateAsignacion = async (idasignacion,{idcliente,idvendedor,fecha_asignacion}) =>{
    try{
        const [result] = await pool.query("UPDATE asignaciones_clientes SET idcliente = ?, idvendedor = ?, fecha_asignacion = ? WHERE idasignacion = ?", [idcliente,idvendedor,fecha_asignacion,idasignacion]);

        if (result.affectedRows === 0) {
            throw new Error("No se encontró la asignacion con ese ID.");  
        }

        return result.affectedRows;
            
    }catch(error){
        console.error("Error al actualizar la asignacion:", error);
        throw error
    }
}
    






module.exports = { getAsignaciones, createAsignacion, selectById,updateAsignacion };