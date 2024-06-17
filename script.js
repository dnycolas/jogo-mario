// Seleciona elementos do DOM que serão manipulados
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const diaria = document.querySelector(".game");

// Função que faz o Mario pular
const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 750);
}

// Loop que verifica a posição do tubo e do Mario para determinar se houve colisão
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioposition = +window.getComputedStyle(mario).bottom.replace("px", "");

    if (pipePosition <= 400 && pipePosition > 295 && marioposition < 160) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioposition}px`;

        mario.src = "game-over.png";
        mario.style.width = '75px';
    }
}, 100);

// Função que faz a transição do dia para a noite e vice-versa
const dia = () => {
    // Cores RGB para o dia e a noite
    const corDia = [32, 240, 255, 255, 254, 197];
    const corNoite = [1, 11, 95, 19, 55, 255];

    // Cópia das cores do dia, para manipulação
    let corAtual = [...corDia];

    // Flag para determinar se está revertendo a transição
    let reverter = false;

    // Função que atualiza o background gradualmente
    const horario = () => {
        diaria.style.background = `linear-gradient(0deg, rgb(${corAtual[0]}, ${corAtual[1]}, ${corAtual[2]}), rgb(${corAtual[3]}, ${corAtual[4]}, ${corAtual[5]}))`;

        // Muda as cores para a noite ou para o dia
        if (!reverter) {
            if (corAtual[0] > corNoite[0]) corAtual[0]--;
            if (corAtual[1] > corNoite[1]) corAtual[1]--;
            if (corAtual[2] > corNoite[2]) corAtual[2]--;
            if (corAtual[3] > corNoite[3]) corAtual[3]--;
            if (corAtual[4] > corNoite[4]) corAtual[4]--;
            if (corAtual[5] > corNoite[5]) corAtual[5]--;
        } else {
            if (corAtual[0] < corDia[0]) corAtual[0]++;
            if (corAtual[1] < corDia[1]) corAtual[1]++;
            if (corAtual[2] < corDia[2]) corAtual[2]++;
            if (corAtual[3] < corDia[3]) corAtual[3]++;
            if (corAtual[4] < corDia[4]) corAtual[4]++;
            if (corAtual[5] < corDia[5]) corAtual[5]++;
        }

        // Define a próxima chamada de horario() se ainda não atingiu a cor alvo
        if ((!reverter && (corAtual[0] > corNoite[0] || corAtual[1] > corNoite[1] || corAtual[2] > corNoite[2] || corAtual[3] > corNoite[3] || corAtual[4] > corNoite[4] || corAtual[5] > corNoite[5])) ||
            (reverter && (corAtual[0] < corDia[0] || corAtual[1] < corDia[1] || corAtual[2] < corDia[2] || corAtual[3] < corDia[3] || corAtual[4] < corDia[4] || corAtual[5] < corDia[5]))) {
            setTimeout(horario, 100);
        } else {
            reverter = !reverter;
            setTimeout(horario, 500);
        }
    }

    // Inicia a função horario() pela primeira vez
    horario();
}




const pontuacao = () => {
    const elementos = diaria

    let num = 0
    const para = document.createElement("p");
    const node = document.createTextNode(`${num}`);
    para.appendChild(node);
    elementos.appendChild(para)

    setTimeout(() => {

        setTimeout(() => {
            elementos.classList.remove(para);
        }, 1000);

    }, 1000)


    pontuacao()


}

// Adiciona eventos de carregamento do DOM e tecla pressionada
document.addEventListener("DOMContentLoaded", dia);
document.addEventListener('DOMContentLoaded', pontuacao);
document.addEventListener('keydown', jump);


