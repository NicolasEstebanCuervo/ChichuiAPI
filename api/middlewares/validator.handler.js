import boom from "@hapi/boom"

export function validatosHandler (schema, property){
  return (req,res,next)=>{
    const data = req[property]
    const {error} = schema.validate(data,{abortEarly:false})
    if(error){
      next(boom.badRequest(error))
    }
    next()
  }
}
