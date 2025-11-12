const {User}= require("../shared/models")
const {generateToken}= require  ("../shared/utils/jwt")


const register    = async (req,res)=>{
    try{
        const {username, email, password, documentNumber} = req.cody;

        const existingUser = await User.findOne ({where:(email)});
        if (existingUser){
            return res.status(400).json ({
                messege:"el ususario ya existe",
                timestamp: new Date ().toISOString(),
                status: "error"
            });
        }
    } catch(error){
        
    }
}