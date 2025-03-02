const router = require("express").Router();

router.use("/users", require("./api.routes/users.routes"));
router.use("/propiedades", require("./api.routes/propiedades.routes"));
router.use("/clientes", require("./api.routes/clientes.routes"));

module.exports = router;