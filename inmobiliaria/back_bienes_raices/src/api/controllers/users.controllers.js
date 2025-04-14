const { getVendedores,
    selectByEmail,
    inserVendedor,
    selectById,
    selectByDni,
    updateVendedores,
    eliminarlogico,
    filtarporvendedor,
    vendedores} = require('../models/users.model');

const bcrypt = require("bcrypt");
const { createToken } = require('../../utils/jwt')
const path = require('path');




const createNewWorker = async (req, res) => {
try {
    const data = req.body;

    if (!data.password) {
        return res.status(400).json({ msg: "La contraseña es requerida" });
    }
    data.password = await bcrypt.hash(data.password, 10);

    if (req.file) {
        data.img = path.basename(req.file.path); // Guarda solo el nombre del archivo
    } else {
        data.img = null; 
    }
    
   
    const workerbyid = await selectByDni(data.dni);
     if(workerbyid){
        return res.status(400).json ({msg: "el DNI ya ha sido registrado"})
     }

     const selectedemail= await selectByEmail(data.correo);
     if(selectedemail){
        return res.status(400).json ({msg: "el email ya ha sido registrado"})
     }

    const newworker = await inserVendedor(data);
    if (newworker === -1) {
        return res.status(400).json({ msg: "no se pudo agregar el nuevo usuario" });
    };
    
  
    const workerCreated = await selectById(data.dni);
    if(workerCreated){
        return res.status(200).json({ msg: true, data: workerCreated });
    }
     
    

  return res.status(500).json({ msg: "Error desconocido al crear el trabajador" });

} catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "Error interno del servidor" });
}
    

}
const update = async (req, res) => {
    const { idvendedor } = req.params;
    const data = req.body;

    try {
        // Validar que se haya proporcionado una nueva contraseña si es necesario
        if (data.password && data.password !== '') {
            data.password = await bcrypt.hash(data.password, 10);
        }

        // Obtener los detalles del vendedor
        const vendedorActual = await selectById(idvendedor);

        if (!vendedorActual) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        // Verificar si se subió una nueva imagen
        if (req.file) {
            data.img = path.basename(req.file.path);
        } else {
            data.img = vendedorActual.img;
        }

        // Imprimir datos a actualizar para depuración
        console.log('Datos a actualizar:', data);

        // Llamar a la función para actualizar los datos del vendedor
        const result = await updateVendedores(idvendedor, data);

        if (result === 0) {
            return res.status(400).json({ msg: "No se pudo actualizar el usuario" });
        }

        return res.status(200).json({ msg: "Usuario actualizado correctamente" });

    } catch (error) {
        console.error('Error en la actualización:', error);
        return res.status(500).json({ msg: "Error en el servidor" });
    }
};
const login = async (req, res) => {
    try {
        const { correo, password } = req.body;
        if (!correo || !password) {
            return res.status(400).json({ msg: "Correo y contraseña son requeridos" });
        }
        const selectedUser = await selectByEmail(correo.trim()); // Elimina espacios en blanco
        // i no existe el usuario, devolver error
        if (!selectedUser) {
            return res.status(404).json({ msg: "El usuario no existe" });
        }
        // Verificar si la contraseña es correcta
        const passwordMatch = await bcrypt.compare(password, selectedUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ msg: "Contraseña incorrecta" });
        }
        // Crear token de autenticación con expiración
        const token = createToken({
            idvendedor: selectedUser.idvendedor,
            correo: selectedUser.correo,
            role: selectedUser.rol
        });
        return res.status(200).json({
            msg: "Inicio de sesión exitoso",
            token: token,
            role: selectedUser.rol,
            usuario: {
                id: selectedUser.idvendedor,
                nombre: selectedUser.nombre,
                correo: selectedUser.correo
            }
        });

    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
};
const getUsers = async (req, res) => {
    try {
        const result = await getVendedores(req.user);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los usuarios',
            error
        });
    }
};
const eliminado = async (req, res) => {
    try {
        const { idvendedor } = req.params;
        const { estado } = req.body;

        // Verificar si el usuario existe
        const user = await selectById(idvendedor);
        if (!user) {
            return res.status(404).json({ msg: "Vendedor no encontrado" });
        }

        // Actualizar estado del vendedor
        const result = await eliminarlogico(idvendedor, estado);

        if (result.affectedRows === 0) {
            return res.status(400).json({ msg: "No se pudo actualizar el estado del vendedor" });
        }

        return res.status(200).json({ success: true, msg: "Estado del vendedor actualizado correctamente" });

    } catch (error) {
        console.error("Error al actualizar el vendedor:", error);
        return res.status(500).json({ msg: "Error en el servidor", error: error.message });
    }
};

const getClientesPorVendedor = async (req, res) => {
    try {
       
        const { idvendedor } = req.params;
        const clientes = await filtarporvendedor(idvendedor);

        if (clientes.length === 0) {
            return res.status(404).json({ msg: "No hay clientes asignados a este vendedor" });
        }

        return res.status(200).json({ success: true, data: clientes });
    } catch (error) {
        console.error("Error en getClientesPorVendedor:", error);
        return res.status(500).json({ msg: "Error en el servidor" });
    }
};

const getVendedoresAll = async (req, res) => {
    try {
      const result = await vendedores();
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener los usuarios',
        error
      });
    }
  };

module.exports = { getUsers, login, createNewWorker, update,eliminado,getClientesPorVendedor, getVendedoresAll};