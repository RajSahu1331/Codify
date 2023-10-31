const Problem = require("../models/Problems");


const getProblem =  ('/getProblem',async (req,res)=>{
    const {slug} = req.body;
    try {
        const problem = await Problem.findOne({ slug });
        if (!problem) {
          return res.status(404).json({ error: "Problem not found" });
        }
        res.json(problem);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
})


module.exports = {
    getProblem
}