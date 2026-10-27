const ops = document.querySelectorAll(".op");
const resume = document.querySelector("#resumo");
const botaoTV = document.querySelector("#modo-tv");
const formOp = document.querySelector("#form-op");
const botoes = document.querySelectorAll(".filtro");
const busca = document.querySelector("#busca");
const vazia = document.querySelector("#vazia");
let filtros = "todas";
let aguardando = 0,
  concluido = 0,
  producao = 0;
let ordens = [
  {
    numero: 101,
    produto: "Eixo de transmissão",
    quantidade: 200,
    maquina: "Torno CNC",
    status: "aguardando",
  },
  {
    numero: 102,
    produto: "Suporte de motor",
    quantidade: 500,
    maquina: "Prensa",
    status: "producao",
  },
  {
    numero: 103,
    produto: "Tampa plástica",
    quantidade: 1200,
    maquina: "Injetora",
    status: "concluida",
  },
  {
    numero: 104,
    produto: "Flange de aço",
    quantidade: 80,
    maquina: "Torno CNC",
    status: "aguardando",
  },
];

const NOMES = {
  aguardando: "Aguardando",
  producao: "Em produção",
  concluida: "Concluída",
};

function criarOP(op) {
  const item = document.createElement("li"); // 1. cria (fora da tela)
  item.classList.add("op", "status-" + op.status);
  const titulo = document.createElement("h3");
  titulo.textContent = "OP-" + op.numero + " · " + op.produto + " \nquantidade " + op.quantidade; // 2. preenche
  item.append(titulo); // 3. monta o card
  lista.append(item); // 4. coloca na página

  if (op.status !== "concluida") {
    const avancar = document.createElement("button");

    if (op.status === "aguardando") {
      avancar.textContent = "Iniciar produção";
    } else {
      avancar.textContent = "Concluir";
    }

    avancar.addEventListener("click", () => {
      if (op.status === "aguardando") {
        op.status = "producao";
      } else {
        op.status = "concluida";
      }
      desenhar();
    });

    item.append(avancar);
  }
  if (op.status === "aguardando") {
    const cancelar = document.createElement("button");
    cancelar.textContent = "Cancelar";

    cancelar.addEventListener("click", () => {
      if (confirm("cancelar a op " + op.numero + "?")) {
        ordens = ordens.filter((o) => o !== op);
        desenhar();
      }
    });
    item.append(cancelar);
  }

  return item;
}

botaoTV.addEventListener("click", () => {
  const body = document.querySelector("body");
  body.classList.toggle("modo-tv");
  botaoTV.textContent = body.classList.contains("modo-tv")
    ? "sai do Modo TV"
    : "Modo TV";
});

botoes.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    filtros = event.target.dataset.filtro;
    botoes.forEach((b) => b.classList.remove("selecionado"));
    btn.classList.add("selecionado");
    desenhar();
  });
});

formOp.addEventListener("submit", (event) => {
  event.preventDefault();
  const produto = document.querySelector("#produto");
  const qtd = Number(document.querySelector("#quantidade").value);
  const maquina = document.querySelector("#maquina");
  const mensagem = document.querySelector("#mensagem");
  if (produto.value.trim() === "" || qtd <= 0) {
    const texto = "Informe o produto e uma quantidade maior que zero.";
    mensagem.hidden = false;
    mensagem.textContent = texto;
  } else {
    mensagem.hidden = true;
    mensagem.textContent = "";
    ordens.push({
      numero: ordens[ordens.length - 1].numero + 1,
      produto:produto.value.trim(),
      quantidade: qtd,
      status: "aguardando",
      maquina: maquina.value,
    });
    
    mensagem.hidden = true;
    formOp.reset();
    produto.focus()
    desenhar();
  }
});

function desenhar() {
  lista.textContent = "";
  ((aguardando = 0), (concluido = 0), (producao = 0));

  ordensSelecionadas =
    filtros === "todas"
      ? ordens
      : ordens.filter((ordem) => ordem.status === filtros);

  ordensSelecionadas.forEach((op) => {
    lista.append(criarOP(op));
    if (op.status === "aguardando") {
      aguardando++;
    }
    if (op.status === "producao") {
      producao++;
    }
    if (op.status === "concluida") {
      concluido++;
    }

    let visiveis = ordens
    if (filtros !== "todas") {
      visiveis = ordens.filter((op) => op.status === filtros)
    }
    const textoBuscar = busca.value.trim().toLowerCase()
    visiveis = visiveis.filter((op) => op.produto.toLowerCase().includes(textoBuscar))
  
    lista.textContent = ""
    visiveis.forEach((op) => {
      lista.append(criarOP(op))
    })
    vazia.hidden = visiveis.length > 0
    atualizarResumo(visiveis.length)
    })

  };

  function atualizarResumo() {
    let aguardando = 0
    let producao = 0
    let concluido = 0
    ordens.forEach((op) => {
     if (op.status === "aguardando") {
      aguardando++;
    }
    if (op.status === "producao") {
      producao++;
    }
    if (op.status === "concluida") {
      concluido++;
    }
    });
    
    const texto =
    ordens.length +
    " ordens no painel\n" +
    "aguardando: " +
    aguardando +
    " - em producao: " +
    producao +
    " - concluida: " +
    concluido;

  resume.textContent = texto;
  }

busca.addEventListener("input", desenhar)

desenhar();
