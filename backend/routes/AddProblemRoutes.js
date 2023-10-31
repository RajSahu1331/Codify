const {Router} = require('express')
const {AddProblems} = require("../controller/AddProblem");
const { getProblem } = require("../controller/getProblem")
const router = Router();

router.post('/add',AddProblems);
router.post('/problem',getProblem)

module.exports = router;