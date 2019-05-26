class PersonaService {
    constructor(){
        this.URI = '/api/personas';
    }

    async getPersonas(){
        const res = await fetch(this.URI);
        const personas = await res.json();
        return personas;
    }

    async postPersona(persona){
        const res = await fetch(this.URI,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: persona
        });
        const data = await res.json();
        console.log(data);       
        
        
    }

    async deletePersona(personaId){        
        const res = await fetch(this.URI +"/"+ personaId, {
            headers: {
                'Content-Type': 'application/json'
            },
            method:'DELETE'            
        });
        const data = await res.json();
        console.log(data);
        return data;
    }

    async updatePersona(personaId,persona){        
        const res = await fetch(this.URI +"/"+ personaId, {            
            method:'PUT', 
            body: persona           
        });
        const data = await res.json();
        console.log(data);
    }

    async getPersonaById(personaId){
        const res = await fetch(this.URI + "/"+ personaId);
        const persona = await res.json();
        return persona;
    }
}

export default PersonaService;