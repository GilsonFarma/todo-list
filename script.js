// Seleciona os elementos do HTML pelo id
const input = document.getElementById("input-tarefa");
const btn = document.getElementById("btn-adicionar")
const lista = document.getElementById("lista-tarefas")
const clear = document.getElementById("btn-clear")

// Lê as tarefas salvas no localStorage — se não tiver nada, começa com array vazio
const dados = JSON.parse(localStorage.getItem('tarefas')) || [];

// Array em memória que usamos pra manipular as tarefas
let tarefas = dados;

// Quando a página carrega, renderiza todas as tarefas salvas na tela
dados.forEach(tarefa => criarItemLista(tarefa))

//quando clicar, vai apagar tudo.
clear.addEventListener('click', () => {
    localStorage.clear()
    lista.innerHTML = ""
    tarefas = []
})
// Cria um item <li> na lista com o texto e o botão de remover
function criarItemLista(tarefa) {
    const item = document.createElement('li')
    item.textContent = tarefa.nome

    // Cria o botão de remover
    const remove = document.createElement('button');
    remove.textContent = "x"
    remove.classList.add('btn-remover')

    // Quando clicar no x: remove do array, salva no localStorage e remove da tela
    remove.addEventListener('click', () => {
        tarefas = tarefas.filter(t => t.id !== tarefa.id)
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
        item.remove()
    })

    item.appendChild(remove)  // coloca o botão dentro do <li>
    lista.appendChild(item)   // coloca o <li> dentro da <ul>
}

// Lê o input, cria a tarefa, salva e renderiza na tela
function adicionarTarefa() {
    const texto = input.value;
    if (!texto) return; // impede tarefa vazia

    const novoItem = { id: Date.now(), nome: texto } // cria objeto com id único e nome
    tarefas.push(novoItem);  // adiciona no array
    localStorage.setItem('tarefas', JSON.stringify(tarefas)) // salva no localStorage
    criarItemLista(novoItem) // renderiza na tela
    input.value = ""  // limpa o campo
}

// Escuta o clique no botão adicionar
btn.addEventListener('click', adicionarTarefa)

// Escuta o Enter no campo de texto
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        adicionarTarefa()
    }
})
