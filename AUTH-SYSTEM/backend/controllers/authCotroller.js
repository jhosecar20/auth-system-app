const login  = async (req,res)=>{
    try{
        res.json({
            message: "login exitoso",
            status: "success"

        });

    } catch (error){
        res 
        .status(500)
        .json({message: " error interno", status: "error", error: error});
    }
};
module.exports ={
    login,
}