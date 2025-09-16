

class Example{
    constructor(){
        this.message = ""
        this.statustool = 200
    }

    responseM( ){
        let response = {"M":this.message, "S":this.statustool}
        return response
    }

    setMessage(mensaje){
        this.message = mensaje
    }

    setStatustool(status){
        this.statustool = status
    }


}


export default Example;