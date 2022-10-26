const baseURL = "http://127.0.0.1:5500"
/*
@param {String} email 
@param {String} senha 
@return {Object} 
*/
function loginFirebase(email, senha){
    firebase
    .auth()
    .signInWithEmailAndPassword(email, senha)
    .then(result => {
        alert(`Bem vindo, ${JSON.stringify(result.user.email)}`)
        window.location.href = `${baseURL}/home.html`
    })
    .catch(error => {
        let mensagemErro = ''
        switch(error.code){
            case 'auth/invalid-email':
            mensagemErro = 'O e-mail informado é invalido!'
            break;
        case 'auth/email-already-exists':
            mensagemErro = 'O e-mail informado ja esta sendo utilizado!'
            break;
            default:
                mensagemErro = error.message
        }
        alert(`Erro ao efetuar o login: ${error.code}`)
    })
}
/**
 * novoUsuario.
 * Cria um novo usuário no Firebase
 * @param {string} email - email do usário
 * @param {string} senha - senha do usuário
 * @return {object} - O usuário criado
 */

function novoUsuario(email, senha){
    firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then((result)=> {
        alert(`Bem vindo, ${JSON.stringify(result.user.email)}`)
        window.location.href= `${baseURL}/home.html`
    })
    .catch(error => {
        alert(`Não foi possivel cadastrar o usuário. Erro: ${error.message}`)
    })
}

/**
 * verificaLogado
 * Verifica se o usuário esta logado no sistema
 * @return {null}
 */
function verificaLogado(){
    firebase.auth().onAuthStateChanged(user => {
        if(!user){
            console.log('Acesso inválido. Redirecionando...')
            window.location.href = baseURL
        }
    })
}
