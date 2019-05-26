class RuletaService {
    constructor(){
        this.URI = '/api/ruleta';
    }
    //get
    async jugar(colorRuleta){
        const res = await fetch(this.URI +"/jugar/"+ colorRuleta);
        const personas = await res.json();
        return personas;   
    }    
}
export default RuletaService;
