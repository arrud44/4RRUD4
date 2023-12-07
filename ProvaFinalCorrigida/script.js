    
const menu = document.querySelectorAll('nav a li');
const btnLogin = document.getElementById('btnLogin');
const btnFechar = document.getElementById('btnFechar');
const formOrcamento = document.querySelector('#orcamento form');
const login = document.getElementById('login');
const nome = document.getElementById('nome'); 
const email = document.getElementById('email');
const telefone = document.getElementById('telefone');
const duracao = document.getElementById('duracao');
const local = document.getElementById('local');
const tipo = document.getElementById('tipo'); 
const impressoes = document.getElementById('impressoes'); 
const qtdeFotos = document.getElementById('qtdeFotos');
const detalhes = document.getElementById('detalhes');

var dadosUsuarios = JSON.parse(localStorage.getItem('dadosUsuarios')) || [];
var dadosOrcamentos = JSON.parse(localStorage.getItem('dadosOrcamentos')) || [];

if(dadosUsuarios == ""){
    let novosUsuarios = [
        { nome: "user", email: "email@email.com", senha: "123" },
        { nome: "aluno", email: "aluno@email.com", senha: "aluno" },
        { nome: "root", email: "root@email.com", senha: "root" },
    ];

    localStorage.setItem('dadosUsuarios', JSON.stringify(novosUsuarios));
}

document.querySelectorAll('nav ul a').forEach(link => {
    
    link.addEventListener('click', evento => {
        evento.preventDefault();
        const href = link.getAttribute('href');
        const alvo = document.querySelector(href);

        if (alvo) {
            window.scroll({
                top: alvo.offsetTop -40,
                behavior: 'smooth'
            });
        }
   })
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        menu.forEach( m =>{
            m.classList.add('shrink');
        });
    } else {
        menu.forEach( m =>{
            m.classList.remove('shrink');
        });
    }
});

btnLogin.onclick = function(){
    login.showModal();
}

btnFechar.onclick = function(){
    login.close();
}

function enviarOrcamento(){
    let novoNome = nome.value;
    let novoEmail = email.value;
    let novoTelefone = telefone.value;
    let novoDuracao = duracao.value;
    let novoLocal = local.value;
    let novoTipo = tipo.value;
    let novoImpressoes = impressoes.value;
    let novoQtdeFotos = qtdeFotos.value;
    let novoDetalhes = detalhes.value;

    dadosOrcamentos.push({
        nome: novoNome,
        email: novoEmail,
        telefone: novoTelefone,
        duracao: novoDuracao,
        local: novoLocal,
        tipo: novoTipo,
        impressoes: novoImpressoes,
        fotos: novoQtdeFotos,
        detalhes: novoDetalhes
    });

    localStorage.setItem('dadosOrcamentos', JSON.stringify(dadosOrcamentos));
    window.location.href= "./index.html";    
}

function logar(){
    let usuario = document.getElementById('usuario').value;
    let senha = document.getElementById('senha').value;
    let msgErro = document.querySelector('.erro');

    if(msgErro){
        login.removeChild(msgErro);
    }

    dadosUsuarios.forEach(item =>{
        if(usuario == item.nome && senha == item.senha){
            sessionStorage.setItem('usuarioLogado', 'true');
            sessionStorage.setItem('nomeUsuario', usuario);
            window.location.href="./admin/index.html";
        }
    });
    
    var usuarioLogado = sessionStorage.getItem('usuarioLogado');

    if(!usuarioLogado){        
        erro = document.createElement('label');
        erro.classList.add('erro');
        erro.innerText = 'Login ou senha inválido';
        login.insertBefore(erro, login.firstChild.nextSibling);
        document.querySelector('#login form').reset();
    }
}