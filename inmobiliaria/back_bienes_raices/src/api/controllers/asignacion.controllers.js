const { getAsignaciones, createAsignacion, selectById, updateAsignacion } = require('../models/asignaciones.model');


const Allasignaciones = async (req, res) => {
    try {
        const asignaciones = await getAsignaciones();
        return res.status(200).json({ success: true, data: asignaciones });
    } catch (error) {
        console.error("Error al obtener las asignaciones:", error);
        return res.status(500).json({ msg: "Error en el servidor", error });
    }
}

const newAsignacion = async (req, res) => {
    try {
        const { data } = req.body;

        const insertedAsignacion = await createAsignacion(data );

        if (insertedAsignacion === -1) {
            return res.status(400).json({ msg: "No se pudo asignar " });
        }
        return res.status(200).json({ success: true, data: insertedAsignacion });
    } catch (error) {
        console.error("Error en la creación de la asignación:", error);
        return res.status(500).json({ msg: "Error en el servidor", error });
    }
}

const updatedatos = async (req, res) => {
    const { idcleinte } = req.params;
    const { data } = req.body;
    try {
        const result = await updateAsignacion(idasignacion, data);
        if (result === 0) {
            return res.status(404).json({ msg: "No se encontró la asignación con ese ID." });
        }
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error("Error al actualizar la asignación:", error);
        return res.status(500).json({ msg: "Error en el servidor", error });
    }

}


module.exports = { Allasignaciones, newAsignacion, updatedatos };