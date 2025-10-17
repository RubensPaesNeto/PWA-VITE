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
                            // A propriedade nome será o campo chave
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
        store.add({nome: nome, idade: idade});
        await tx.done;
        document.getElementById('nome').value = "";
        document.getElementById('idade').value = "";

    }
    function mostrarTabela(pessoa){
        return `
        <div>
        <h2>Nome: ${pessoa.nome}, Idade: ${pessoa.idade}</h2>
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
            showResult(value.map(mostrarTabela).join(''))
        } else{
            showResult("Não há nenhum dado no banco!")
        }
    }
    function showResult(text){
        document.querySelector("output").innerHTML = text;
    }