import { openDB } from "idb";
let db;

async function createDB() {
    try {
        db = await openDB('banco', 1, {
            upgrade(db, oldVersion, newVersion, transaction) {
                switch (oldVersion) {
                    case 0:
                    case 1:
                        const store = db.createObjectStore('pessoas', {
                            keyPath: 'nome'
                        });
                        store.createIndex('id', 'id');
                        showResult("Banco de dados Criado!");
                }
            }

        })
        showResult("Banco de dados aberto.")
    } catch (e) {
        showResult("Erro ao criar o banco de dados: " + e.message)
    }
}

window.addEventListener("DOMContentLoaded", async event => {
    createDB();
    document.getElementById("btnSalvar").addEventListener("click", addData)
    document.getElementById("btnListar").addEventListener("click", getData)
})

async function addData(){
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const tx = await db.transaction('pessoas', 'readwrite');
    const store = tx.objectStore('pessoas');
    await store.add({nome: nome, idade: idade});
    await tx.done;
    document.getElementById('nome').value = "";
    document.getElementById('idade').value = "";
}

function mostrarTabela(pessoa){
    return `
    <div>
      <h2>Nome: ${pessoa.nome}, Idade: ${pessoa.idade}</h2>
      <button onclick="editarPessoa('${pessoa.nome}')">Editar</button>
      <button onclick="deletarPessoa('${pessoa.nome}')">Remover</button>
    </div>
    `
}

async function getData(){
    if(db == undefined){
        showResult("O banco de dados está fechado");
        return;
    }
    const tx = await db.transaction('pessoas', 'readonly')
    const store = tx.objectStore('pessoas');
    const value = await store.getAll();
    if(value){
        showResult(value.map(mostrarTabela).join(""));
    } else{
        showResult("Não há nenhum dado no banco!")
    }
}

function showResult(text){
    document.querySelector("output").innerHTML = text;
}


window.editarPessoa = async function(nome) {
    const tx = await db.transaction('pessoas', 'readonly');
    const store = tx.objectStore('pessoas');
    const pessoa = await store.get(nome);

    if (!pessoa) {
        showResult("Pessoa não encontrada!");
        return;
    }

   
    document.getElementById('nome').value = pessoa.nome;
    document.getElementById('idade').value = pessoa.idade;

 
    const btn = document.getElementById("btnSalvar");
    btn.textContent = "Atualizar";
    btn.onclick = async function() {
        await updateData(pessoa.nome);
        btn.textContent = "Salvar"; 
        btn.onclick = addData;
    }
}


async function updateData(nomeAntigo) {
    const novoNome = document.getElementById('nome').value;
    const novaIdade = document.getElementById('idade').value;

    const tx = await db.transaction('pessoas', 'readwrite');
    const store = tx.objectStore('pessoas');

    // Primeiro apaga o antigo (caso o nome tenha mudado)
    if (novoNome !== nomeAntigo) {
        await store.delete(nomeAntigo);
    }

    await store.put({ nome: novoNome, idade: novaIdade });
    await tx.done;

    showResult("Registro atualizado!");
    document.getElementById('nome').value = "";
    document.getElementById('idade').value = "";
    getData();
}


window.deletarPessoa = async function(nome) {
    if (!confirm(`Deseja realmente remover ${nome}?`)) return;

    const tx = await db.transaction('pessoas', 'readwrite');
    const store = tx.objectStore('pessoas');
    await store.delete(nome);
    await tx.done;

    showResult(`Registro "${nome}" removido com sucesso!`);
    getData();
}
