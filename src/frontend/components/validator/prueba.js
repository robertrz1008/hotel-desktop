class Persona{
    constructor(persona){
        this.persona = persona
        this.viewName()
    }
    viewName(){
        console.log(this.persona)
    }
}

const per = new Persona("Roberto")

per