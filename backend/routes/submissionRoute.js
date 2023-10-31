const {Router} = require('express')
const router = Router();
const {submitProblem,getSubmissions} = require("../controller/Submission")


router.post('/submitProblem',submitProblem)
router.get('/getSubmissions',getSubmissions)

module.exports = router;