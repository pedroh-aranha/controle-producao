const ops = document.querySelectorAll(".op");
const resume = document.querySelector("#resumo");
const botaoTV = document.querySelector("#modo-tv")
let aguardando = 0, concluido = 0, producao = 0;
let ordens = [
  { numero: 101, produto: "Eixo de transmissão", quantidade: 200, maquina: "Torno CNC", status: "aguardando" },
  { numero: 102, produto: "Suporte de motor", quantidade: 500, maquina: "Prensa", status: "producao" },
  { numero: 103, produto: "Tampa plástica", quantidade: 1200, maquina: "Injetora", status: "concluida" },
  { numero: 104, produto: "Flange de aço", quantidade: 80, maquina: "Torno CNC", status: "aguardando" }
]

const NOMES = { aguardando: "Aguardando", producao: "Em produção", concluida: "Concluída" }

function criarOP(op) {
    const item = document.createElement("li")   // 1. cria (fora da tela)
    item.classList.add("op", "status-" + op.status)
    const titulo = document.createElement("h3")
    titulo.textContent = "OP-" + op.numero + " · " + op.produto   // 2. preenche
    item.append(titulo)                          // 3. monta o card
    lista.append(item)                           // 4. coloca na página
    return item;
}

function desenhar() {
    lista.textContent = ""
    aguardando = 0,
    concluido = 0,
    producao = 0;
    ordens.forEach((op) => {
        lista.append(criarOP(op))
        if(op.status === "aguardando") {
        aguardando++;
    }
    if (op.status === "producao") {
        producao++;
    }
    if (op.status === "concluida") {
        concluido++
    }

        const texto = ordens.length+" ordens no painel\n"+"aguardando: "+aguardando
+" - em producao: "+producao
+" - concluida: "+concluido;

resumo.textContent = texto;

    })

}

botaoTV.addEventListener("click", () => {
    const body = document.querySelector("body");
    body.classList.toggle("modo-tv");
    botaoTV.textContent = body.classList.contains("modo-tv") ? "sai do Modo TV" : "Modo TV"
})

desenhar();