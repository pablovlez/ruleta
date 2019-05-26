class RuletaService {
    constructor(){
        this.URI = 'http://localhost:3000/api/ruleta';
    }
    //get
    async jugar(colorRuleta){
        const res = await fetch(this.URI +"/jugar/"+ colorRuleta);
        const personas = await res.json();
        return personas;   
    }    
}
export default RuletaService;
