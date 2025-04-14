const { insertPropiedades,updatepropiedades,getPropiedades,selectbyId,propiedadesByVendedor} = require('../models/propiedades.model');


const newPropiedades = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);

        if (req.files && req.files.length > 0) {
            // Guarda solo los nombres de archivo, sin la carpeta
            data.imagen = req.files.map(file => file.filename).join(",");
        } else {
            data.imagen = "https://ruta-default.com/imagen.png"; // Imagen por defecto
        }

        const newpropiedad = await insertPropiedades(data);
        if (newpropiedad === -1) {
            return res.status(400).json({ msg: "No se pudo agregar la propiedad" });
        }

        const propiedadcreated = await selectbyId(data.id);
        if (propiedadcreated) {
            return res.status(200).json({ data });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};
const getpropiedades = async (req, res) => {
    try {
        const propiedades = await getPropiedades();
        return res.status(200).json(propiedades);
    } catch (error) {
        console.error("Error al obtener las propiedades:", error);
        return res.status(500).json({ msg: "Error en el servidor", error });
    }
};
const editarPropiedad = async (req, res) => {
    const { idpropiedades } = req.params;
    const data = req.body;

    try {
        // Si hay imágenes subidas, agregar las imágenes al objeto de datos
        if (req.files) {
            const imagen = req.files.map(file => file.filename); // Array de nombres de archivos
            if (imagen.length > 0) {
                data.imagen = imagen.join(','); // Combina los nombres de las imágenes en una cadena separada por comas
            }
        }

        const result = await updatepropiedades(idpropiedades, data);

        if (result.affectedRows === 0) {
            return res.status(400).json({ msg: "No se realizó la actualización" });
        }

        return res.status(200).json({ msg: "Propiedad actualizada", data });
    } catch (error) {
        console.error("Error al actualizar la propiedad:", error);
        return res.status(500).json({ msg: "Error en el servidor", error });
    }
};
const propiedadByVendedor = async (req,res) => {
    try{
        const {idvendedor} = req.params;
        const propiedades = await propiedadesByVendedor(idvendedor);
        if (propiedades.length === 0) {
            return res.status(404).json({ msg: "No hay clientes asignados a este vendedor" });
        }
        return res.status(200).json({ success: true, data: propiedades });
    }catch (error){
        console.error("Error en propiedadByVendedor:", error);
        return res.status(500).json({ msg: "Error en el servidor" });
    }
}

getPropiedadesById = async (req, res) => {
    const { id } = req.params;
    try {
        const propiedad = await selectbyId(id);
        if (!propiedad) {
            return res.status(404).json({ msg: "Propiedad no encontrada" });
        }
        return res.status(200).json({ success: true, data: propiedad });
    } catch (error) {
        console.error("Error al obtener la propiedad:", error);
        return res.status(500).json({ msg: "Error en el servidor" });
    }
};

module.exports = {newPropiedades, getpropiedades, editarPropiedad, propiedadByVendedor, getPropiedadesById};