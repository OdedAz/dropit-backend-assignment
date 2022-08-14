module.exports = (db) => {
    try{
        return async function (req, res) {
          const result = await db.getTodayDeliveries()
            
          result? res.status(200).json(result):res.status(400).json("error message");
        };
    }catch(error){
        console.error(error)
    }
    
  };