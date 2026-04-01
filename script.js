const input = document.getElementById("input-tarefa");
const btn = document.getElementById("btn-adicionar")
const lista = document.getElementById("lista-tarefas")

let tarefas = dados;
const dados = JSON.parse(localStorage.getItem('tarefas')) || [];
dados.forEach(tarefas => {
    const item = document.createElement('li');
    item.textContent = tarefas.nome
    lista.appendChild(item)
    
});

function adicionarTarefa() {
    const texto = input.value;
    if(!texto) return;
    const novoItem = { id: Date.now(), nome: texto }
    tarefas.push(novoItem);
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    const item = document.createElement('li');
    item.textContent = texto;
    lista.appendChild(item);
    input.value = ""

    const remove = document.createElement('button');
    remove.textContent = "x"
    remove.addEventListener('click', () => {
        item.remove()
    })
    item.appendChild(remove)
}

btn.addEventListener('click', adicionarTarefa)

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        adicionarTarefa()
    }
})

