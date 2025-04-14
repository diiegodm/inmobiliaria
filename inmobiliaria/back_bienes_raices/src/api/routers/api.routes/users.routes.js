const router = require("express").Router();

const { Allasignaciones, newAsignacion, updatedatos } = require('../../controllers/asignacion.controllers');
const {getUsers,login,createNewWorker,update,eliminado,getClientesPorVendedor, getVendedoresAll} = require('../../controllers/users.controllers');	
const {checkToken,checkTokenAdmin,authvendedor} = require('../../midellware/middleware');
const upload = require('../../midellware/upload.file');






router.post("/login", login);
router.get("/vendedores",checkTokenAdmin, getUsers);
router.post("/newOne",checkTokenAdmin, upload.single('img'), createNewWorker);
router.put("/update/:idvendedor", checkTokenAdmin,upload.single('img'), update);
router.post("/eliminacion/:idvendedor",checkTokenAdmin,eliminado);
router.get("/clientes/:idvendedor",authvendedor, getClientesPorVendedor)
router.get("/vendedorespropiedad", getUsers);
router.get("/vendedoresall", getVendedoresAll);


// Rutas de asignaciones
router.get("/asignaciones" , Allasignaciones);
router.post("/newAsignacion", checkToken, newAsignacion);
router.put("/updateAsignacion/:idasignacion",checkTokenAdmin, updatedatos);

  
module.exports = router