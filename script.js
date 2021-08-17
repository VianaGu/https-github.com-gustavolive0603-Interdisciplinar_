/* variaveis globais  */
const fields = document.querySelectorAll("[required]");
const calcular = document.getElementById("Calcular");
var materia ="";

//para escutar o botão
calcular.addEventListener('click', plus);

//função para somar notas 
function plus(){
    //variaveis locais 
    const Nome = document.getElementById("Nome").value;
    const val1 = document.getElementById("A1").value;
    const val2 = document.getElementById("A2").value;
    const resultado = document.getElementById("resultado");
    var notaMenor;
    var verificaAvaliacao = false;
    const result = parseFloat(val1)+parseFloat(val2);
    var avMenor = "";
   
    func();//Verificando qual materia 

    /*verificando qual nota menor*/
    if(val1 < val2){
        notaMenor = val1;
        verificaAvaliacao = false;
        
    }else if(val2<val1){
        notaMenor = val2;
        verificaAvaliacao = true;
    }
    if(verificaAvaliacao = true){
        avMenor = "A1";
    }else{
        avMenor = "A2";
    }
    /*mostrando no display e
     Verificando se aluno está aprovado */
    if(result >= '6.0'){
        resultado.textContent = "Na matéria de "+ materia+", " +Nome + " está aprovado com média: "+ result.toFixed(1);
    }else if(result<'6.0'){
        resultado.textContent = "Infelizmente Na matéria de "+ materia +"."+"\n"+Nome+" não atigiu média suficente, então terá que fazer AF.\n"+
        "Para que possa substituir a nota da "+ avMenor;
    }
}


/* Funçao para checar qual matéria foi escolhida */
function func(){
    var mat = document.getElementsByName("padrao");
    if(mat[0].checked){
        materia = "Sistema Operacional";
    }else if(mat[1].checked){
        materia  ="Modelagem de negócio";
    }else if(mat[2].checked){
        materia = "Programação de Computadores";
    }else if(mat[3].checked){
        materia = "Aplicações da Internet"
    }else if(mat[4].checked){
        materia = "Organização e arquitetura de Computadores"
    }
}

function ValidateField(field) {
    // logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false;

        for(let error in field.validity) {
            // se não for customError
            // então verifica se tem erro
            if (field.validity[error] && !field.validity.valid ) {
                foundError = error
            }
        }
        return foundError;
    }
    /* mensagens customizadas  */
    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: "Por favor, preencha este campo"
            },
            email: {
                valueMissing: "Email é obrigatório",
                typeMismatch: "Por favor, preencha um email válido"
            },
            number: {
                valueMissing: "Está faltando as notas "
            }
        }

        return messages[field.type][typeError]
    }

    /* setando mensagem que será mostrada  */
    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error")
        
        if (message) {
            spanError.classList.add("active")
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
    }

    return function() {

        const error = verifyErrors()

        if(error) {
            const message = customMessage(error)

            field.style.borderColor = "red"
            setCustomMessage(message)
        } else {
            field.style.borderColor = "green"
            setCustomMessage()
        }
    }
}


function customValidation(event) {

    const field = event.target
    const validation = ValidateField(field)

    validation()

}

for( field of fields ){
    field.addEventListener("invalid", event => { 
        // eliminar o bubble
        event.preventDefault()

        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}


document.querySelector("form")
.addEventListener("submit", event => {
    console.log("enviar o formulário")

    // não vai enviar o formulário
    event.preventDefault()
})