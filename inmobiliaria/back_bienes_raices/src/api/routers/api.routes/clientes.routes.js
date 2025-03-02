const router = require("express").Router();
const {checkToken,checkTokenAdmin} = require('../../midellware/middleware');
const { createNewClient, getAllClients,updateClientVendedor,updateEstado } = require('../../controllers/clientes.controllers');


router.post('/newClient', createNewClient);
router.get('/clients',checkTokenAdmin, getAllClients);
router.put('/cliente-vendedor/:idcliente',checkTokenAdmin, updateClientVendedor);
router.post('/updateestado/:idcliente', checkToken, updateEstado)


module.exports = router