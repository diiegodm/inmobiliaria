const router = require("express").Router();
const { checkToken, checkTokenAdmin } = require('../../midellware/middleware');
const uploadImage = require("../../midellware/uploadstorage");
const uploaded= require('../../midellware/uploadstorage');

const { newPropiedades,
  getpropiedades,
  editarPropiedad,
  propiedadByVendedor
} = require('../../controllers/propiedades.controllers');


router.post('/newPropiedades', uploadImage.array('imagenes',5), newPropiedades);
router.get('/sitios', getpropiedades);
router.put('/update/:idpropiedades', uploadImage.array('imagenes',5), editarPropiedad);
router.get('/propiedadesBy/:idvendedor',checkToken, propiedadByVendedor)

module.exports = router