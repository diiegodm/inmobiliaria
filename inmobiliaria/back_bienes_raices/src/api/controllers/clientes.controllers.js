const { getClientes, createCliente,
     selectByEmail, 
     selectById, 
     updateVendedor,
     estadoCliente } = require('../models/clientes.model');
const pool = require('../../utils/db');

const createNewClient = async (req, res) => {
    try {
        const data = req.body;

        // Verificar si el correo ya está registrado
        const emailexiste = await selectByEmail(data.email);
        if (emailexiste) {
            return res.status(400).json({ msg: "El correo ya está registrado" });
        }     

        // Insertar el cliente en la base de datos
        const insertedClient = await createCliente(data);
        if (insertedClient === -1) {
            return res.status(400).json({ msg: "No se realizó el insert" });
        }

        // Obtener el cliente recién creado desde la base de datos
        const clientCreated = await selectById(insertedClient);
        return res.status(200).json({ success: true, data: clientCreated });

    } catch (error) {
        console.error("Error en la creación del cliente:", error);
        return res.status(500).json({ msg: "Error en el servidor", error });
    }
};

// Obtener todos los clientes
const getAllClients = async (req, res) => {
    try {
        const clients = await getClientes();
        return res.status(200).json(clients);
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        return res.status(500).json({ msg: "Error en el servidor", error });
    }
};

// **Actualizar solo el vendedor de un cliente**
const updateClientVendedor = async (req, res) => {
    try {
        console.log("BODY RECIBIDO:", req.body)
        const { idcliente } = req.params;
        const { vendedor_id } = req.body; // 

        // 1️ Verificar si el cliente existe
        const cliente = await selectById(idcliente);
        if (!cliente) {
            return res.status(404).json({ msg: "Cliente no encontrado" });
        }

        // 2️ Verificar si el vendedor existe
        const [vendedorExiste] = await pool.query("SELECT * FROM users WHERE idvendedor = ?", [vendedor_id]);
        if (!vendedorExiste.length) {  // 
            return res.status(400).json({ msg: "El vendedor no existe" });
        }

        // 3️ Actualizar solo el vendedor_id
        const result = await updateVendedor(idcliente, vendedor_id); //  
        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "No se pudo actualizar el vendedor" });
        }

        return res.status(200).json({ success: true, msg: "Vendedor actualizado correctamente" });

    } catch (error) {
        console.error("Error al actualizar el vendedor:", error);
        return res.status(500).json({ msg: "Error en el servidor", error: error.message });
    }
};

const updateEstado = async (req, res) => {
    try {
        console.log("REQ.PARAMS:", req.params);
        console.log("REQ.BODY:", req.body);

        const { idcliente } = req.params;
        const { estado } = req.body;

        if (!idcliente || estado === undefined) {
            return res.status(400).json({ msg: "Faltan datos: idcliente o estado" });
        }

        console.log(`Actualizando cliente ${idcliente} a estado: ${estado}`);

        const result = await estadoCliente(estado, idcliente);

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "Cliente no encontrado o estado no modificado" });
        }

        return res.status(200).json({ success: true, msg: "Estado actualizado correctamente" });
    } catch (error) {
        console.error("Error en updateEstado:", error);
        return res.status(500).json({ msg: "Error en el servidor" });
    }
};





module.exports = { createNewClient, getAllClients, updateClientVendedor,updateEstado };
