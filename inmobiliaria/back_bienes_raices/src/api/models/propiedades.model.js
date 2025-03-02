const pool = require('../../utils/db');





const insertPropiedades = async ({titulo, precio, imagen, descripcion, habitaciones, wc, parqueadero, creado, vendedor_idvendedor, ciudad, direccion}) => {
    try {
        const [result] = await pool.query(
            "INSERT INTO propiedades (titulo, precio, imagen, descripcion, habitaciones, wc, parqueadero, creado, vendedor_idvendedor, ciudad, direccion) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            [titulo, precio, imagen, descripcion, habitaciones, wc, parqueadero, creado, vendedor_idvendedor, ciudad, direccion]
        );

        if (result.affectedRows === 0) {
            return -1;
        }
        return result.insertId;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


getPropiedades = async () => {
    const result = await pool.query('SELECT * FROM propiedades');
    return result[0];
};

const updatepropiedades = async (idpropiedades, data) => {
    const { 
        titulo, 
        precio, 
        imagen,   
        descripcion, 
        habitaciones, 
        wc, 
        parqueadero, 
        creado, 
        vendedor_idvendedor 
        
    } = data;

    try {
        // Verificar que 'creado' sea una fecha válida, si está presente
        let validCreado = null;
        if (creado) {
            validCreado = new Date(creado);
            if (isNaN(validCreado.getTime())) {
                throw new Error("La fecha 'creado' no es válida.");
            }
            validCreado = validCreado.toISOString().slice(0, 19).replace('T', ' '); 
        }

        const [result] = await pool.query(`
            UPDATE propiedades
            SET 
                titulo = IFNULL(?, titulo),
                precio = IFNULL(?, precio),
                imagen = IFNULL(?, imagen), 
                descripcion = IFNULL(?, descripcion),
                habitaciones = IFNULL(?, habitaciones),
                wc = IFNULL(?, wc),
                parqueadero = IFNULL(?, parqueadero),
                creado = IFNULL(?, creado),
                vendedor_idvendedor = IFNULL(?, vendedor_idvendedor)
            WHERE idpropiedades = ?`,
            [titulo, precio, imagen, descripcion, habitaciones, wc, parqueadero, validCreado, vendedor_idvendedor, idpropiedades]
        );

        return result;
    } catch (error) {
        console.error("Error al actualizar la propiedad:", error);
        throw error;
    }
};

const  selectbyId = async (idpropiedades)=>{
    const result =await pool.query("select * FROM propiedades WHERE idpropiedades = ?",[idpropiedades]);
    return result[0];
}

const propiedadesByVendedor = async (idvendedor) =>{
try{
 const [propiedades] = await pool.query (
        " SELECT * FROM propiedades WHERE vendedor_idvendedor = ?",[idvendedor]
    );
    return propiedades
}catch (error) {
    console.error("filtrar por vendedor:", error);
    throw error;
}
}


module.exports = {insertPropiedades,updatepropiedades,getPropiedades,selectbyId,propiedadesByVendedor};
