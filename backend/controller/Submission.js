const submissionModel = require('../models/submissionModel')



const submitProblem = ('/submitProblem' , async (req,res) =>{
    var data;
         try {
            const {jobOutput, trueOutput, slug, title,language} = req.body;
            if(jobOutput===undefined)
            {
                let status = "Error"
                data = await new submissionModel({ language,slug,title,status}).save();
            }
            else if(jobOutput===trueOutput)
            {
                let status = "Accepted"
                data = await new submissionModel({ language,slug,title,status}).save();
            } 
            else
            {
                let status = "Wrong"
                data = await new submissionModel({ language,slug,title,status}).save();
            } 

            res.status(200).json({success:true,data});
            
         } catch (error) {
            res.status(410).json(error);
         }
})


const getSubmissions = ('/getSubmissions' , async (req,res) =>{
      try {
        const slug = req.params;
        const data = await submissionModel.find( slug );
        console.log("all",data);
        if (!data || data.length === 0) {
            res.status(200).json("No Submissions");
          } else {
            res.status(200).json(data);
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });


module .exports = {
    submitProblem,
    getSubmissions
}