
//Variaveis
var pai = $('#addCadastro')
var cadastros = []


//Adicionar tarefa
function add(){
    
    var nome = $('#nomeAdd').val()
    var func = $('#funcAdd').val()
    var idade = Number($('#idadeAdd').val())


    if(nome == '' || func == '' || idade == ''){
        $('#btnAdd').attr('data-dismiss', 'false') //Não fechar aba
        $('#alertInputsAdd').removeClass('d-none') //remove class none
        $('#alertInputsAdd').addClass('d-block') //Add class block para mostrar aviso
    } else {
        cadastros.push({nome:nome, func:func, idade:idade}) //Add cadastro

        //Reseta valores dos campos inputs
        $('#nomeAdd').val('') 
        $('#funcAdd').val('')
        $('#idadeAdd').val('')

        $('#btnAdd').attr('data-dismiss', 'modal') //Fecha aba

        $('#alertInputsAdd').removeClass('d-block') //remove class para esconder alerta
        $('#alertInputsAdd').addClass('d-none') //add class para esconder alerta
    
        atualizarLista(); //Chama func que atualiza a lista na tela
        
        //Mostrando e exluindo alerta de cadastro adicionado
        $('#alertaAdd').addClass('d-block')
        $('#alertaAdd').removeClass('d-none')

        $('#alertaDelete').addClass('d-none')
        $('#alertaDelete').removeClass('d-block')
        $('#alertaEditar').removeClass('d-block')
        $('#alertaEditar').addClass('d-none')

        setTimeout(() => {
            $('#alertaAdd').removeClass('d-block')
            $('#alertaAdd').addClass('d-none')
        }, 3000);
    }
}



//Editar tarefa
function editar(){
       var nome =  $('#nomeEditar').val()
       var func = $('#funcEditar').val()
       var idade = $('#idadeEditar').val()

    if(nome == '' || func == '' || idade == ''){
        $('#btnEditar').attr('data-dismiss', 'false') //Não fechar aba
        $('#alertInputsEditar').removeClass('d-none') //remove class none
        $('#alertInputsEditar').addClass('d-block') //Add class block para mostrar aviso
    } else {
        cadastros.push({nome:nome, func:func, idade:idade}) //Add cadastro

        //Reseta valores dos campos inputs
        $('#nomeEditar').val('') 
        $('#funcEditar').val('')
        $('#idadeEditar').val('')

        $('#btnEditar').attr('data-dismiss', 'modal') //Fecha aba

        $('#alertInputsEditar').removeClass('d-block') //remove class para esconder alerta
        $('#alertInputsEditar').addClass('d-none') //add class para esconder alerta
    
        atualizarLista(); //Chama func que atualiza a lista na tela
        
        //Mostrando e exluindo alerta de cadastro editado
        $('#alertaEditado').addClass('d-block')
        $('#alertaEditado').removeClass('d-none')

        $('#alertaDelete').addClass('d-none')
        $('#alertaDelete').removeClass('d-block')
        $('#alertaAdd').removeClass('d-block')
        $('#alertaAdd').addClass('d-none')

        setTimeout(() => {
            $('#alertaEditado').removeClass('d-block')
            $('#alertaEditado').addClass('d-none')
        }, 3000);
    }
}



//Colocar Dados nos inputs editar
function chamadaEditar(i){
    
   //Pegando valores e colocando nos value dos inputs
   $('#nomeEditar').val($(`#nome${i}`).text())
   $('#funcEditar').val($(`#func${i}`).text())
   $('#idadeEditar').val($(`#idade${i}`).text())

    
   //Exluindo tarefa pra atualizar nova
    var nome = $(`#nome${i}`).text()

    cadastros.forEach((valor, indice)=>{
        if(valor.nome == nome){
            cadastros.splice( indice, 1)
        }
    })
}



//BTN PARA DECIDIR SE VAI SER DELETADO OU NÃO
function desejaExluir(i){
        var nomeDel = $(`#nome${i}`).text()
        $('#nomeExluir').text(`Tem certeza que deseja exluir o cadastro de ${nomeDel} ?`) //Mostrando nome de quem será excluido 
        
        $('#btnDeletar').attr('onclick', `deletar(${i})`) //add function passando o i por parâmetro
}



//Deletar cadastro
function deletar(i){
    
    //Deletando cadastro
    var nome = $(`#nome${i}`).text()

    cadastros.forEach((valor, indice)=>{
        if(valor.nome == nome){
            cadastros.splice( indice, 1)
        }
    })

    atualizarLista(); //Atualizado lista na tela

    //Mostrando e exluindo alertas
    $('#alertaDelete').addClass('d-block')
    $('#alertaDelete').removeClass('d-none')

    $('#alertaAdd').removeClass('d-block')
    $('#alertaAdd').addClass('d-none')
    $('#alertaEditar').removeClass('d-block')
    $('#alertaEditar').addClass('d-none')

    setTimeout(() => {
         $('#alertaDelete').removeClass('d-block')
         $('#alertaDelete').addClass('d-none')
    }, 3000);
}




//Atualizar lista a cada reload mostrando na tela todos os cadastros
function atualizarLista(){
         
       $('#addCadastro').html('') //Limpando listas existentes
       
       //Criando novas listas para cada valor
       cadastros.forEach((valor, indice)=>{

            var filho = document.createElement('div')
            filho.id = `pai${indice}`
            filho.classList.add('bg-light', 'text-secondary', 'p-1', 'mb-1', 'd-flex', 'justify-content-between')
     
            filho.innerHTML = `
                 <span id="nome${indice}" class="w-30 break-all">${valor.nome}</span>
                 <span id="func${indice}" class="w-40 break-all">${valor.func}</span>
                 <span id="idade${indice}" class="w-15 break-all">${valor.idade}</span>
                 <span class="d-flex justify-content-around w-15">
                    <span onclick="chamadaEditar(${indice})" data-toggle="modal" data-target="#ModalEdit" class="hover"><i class="fas fa-edit"></i></span>
                    <span onclick="desejaExluir(${indice})" data-toggle="modal" data-target="#ModalDeletar" class="hover"><i class="fas fa-trash-alt"></i></span>
                 </span>
            `
            $(pai).append(filho);
       })
}