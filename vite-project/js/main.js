window.onload = () => {
    "use strict";
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js")
    }
};
function mostrar(msg) {
  document.getElementById("resultado").innerText = msg;
}


function exercicio1() {
  mostrar("Disciplina: PDM2");
}


function exercicio2() {
  let n1 = parseFloat(prompt("Digite o primeiro número:"));
  let n2 = parseFloat(prompt("Digite o segundo número:"));
  mostrar("Soma = " + (n1 + n2));
}


function exercicio3() {
  let notas = [];
  for (let i = 0; i < 4; i++) {
    notas.push(parseFloat(prompt(`Digite a nota ${i + 1}:`)));
  }
  let media = notas.reduce((a, b) => a + b, 0) / 4;
  let status = media >= 7 ? "Aprovado" : "Reprovado";
  mostrar(`Média: ${media.toFixed(2)} - ${status}`);
}


function exercicio5() {
  let num = parseInt(prompt("Digite um número inteiro:"));
  let tabuada = "";
  for (let i = 0; i <= 10; i++) {
    tabuada += `${num} x ${i} = ${num * i}\n`;
  }
  alert(tabuada);
}


function exercicio6() {
  let valores = [];
  for (let i = 0; i < 3; i++) {
    let v = parseFloat(prompt(`Digite o valor ${i + 1} (ou -1 para parar):`));
    if (v === -1) break;
    valores.push(v);
  }
  if (valores.length > 0) {
    let maior = Math.max(...valores);
    mostrar("Maior valor: " + maior);
  } else {
    mostrar("Nenhum valor válido foi inserido.");
  }
}


function exercicio7() {
  let vetor = [1,2,3,4,5,6,7,8,9,10];
  let impares = vetor.filter(n => n % 2 !== 0);
  mostrar("Ímpares: " + impares.join(", "));
}


function exercicio8() {
  let nome = prompt("Digite seu nome:");
  let invertido = nome.split("").reverse().join("");
  mostrar("Nome invertido: " + invertido);
}

function exercicio9() {
  let funcionarios = [];
  let salarioMinimo = 1412; 

  for (let i = 0; i < 5; i++) {
    let nome = prompt("Digite o nome do funcionário:");
    let idade = parseInt(prompt("Digite a idade:"));
    let sexo = prompt("Digite o sexo (M/F):");
    let salario = parseFloat(prompt("Digite o salário:"));

    funcionarios.push({ nome, idade, sexo, salario });
  }

  let acimaMinimo = funcionarios.filter(f => f.salario > salarioMinimo);
  let resultado = acimaMinimo.map(f => `${f.nome} - R$ ${f.salario}`).join("\n");

  if (resultado) {
    alert("Funcionários com salário acima do mínimo:\n" + resultado);
  } else {
    alert("Nenhum funcionário ganha acima do salário mínimo.");
  }
}


function exercicio10() {
  function soma(a, b) { return a + b; }
  function sub(a, b) { return a - b; }
  function mult(a, b) { return a * b; }
  function div(a, b) { return b !== 0 ? a / b : "Erro (divisão por zero)"; }

  let n1 = parseFloat(prompt("Digite o primeiro número:"));
  let n2 = parseFloat(prompt("Digite o segundo número:"));

  let msg = `
Soma: ${soma(n1, n2)}
Subtração: ${sub(n1, n2)}
Multiplicação: ${mult(n1, n2)}
Divisão: ${div(n1, n2)}
  `;
  alert(msg);
}