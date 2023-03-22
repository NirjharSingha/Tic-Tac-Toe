let music = new Audio("resources/music.mp3");
let ting = new Audio("resources/ting.mp3");
let gameOverSound = new Audio("resources/gameover.mp3");
let isGameOver = false;
let turn = "X";
let ct = 0;

const checkWin = () => {
  let boxText = Array.from(document.getElementsByClassName("textBox"));
  let med = window.matchMedia("(max-width: 1000px)");
  let win;
  if (med.matches) {
    win = [
      [0, 1, 2, 0, 10.3, 0],
      [3, 4, 5, 0, 30.3, 0],
      [6, 7, 8, 0, 50.3, 0],
      [0, 3, 6, -20, 30.3, 90],
      [1, 4, 7, 0, 30.3, 90],
      [2, 5, 8, 20, 30.3, 90],
      [0, 4, 8, 0, 30.3, 45],
      [2, 4, 6, 0, 30.3, -45],
    ];
  } else {
    win = [
      [0, 1, 2, 0, 5.3, 0],
      [3, 4, 5, 0, 15.3, 0],
      [6, 7, 8, 0, 25.3, 0],
      [0, 3, 6, -10, 15.3, 90],
      [1, 4, 7, 0, 15.3, 90],
      [2, 5, 8, 20, 15.3, 90],
      [0, 4, 8, 0, 15.3, 45],
      [2, 4, 6, 0, 15.3, -45],
    ];
  }
  win.forEach((e) => {
    if (
      boxText[e[0]].innerText === boxText[e[1]].innerText &&
      boxText[e[2]].innerText === boxText[e[1]].innerText &&
      boxText[e[0]].innerText !== ""
    ) {
      gameOverSound.play();
      turn = changeTurn();
      document.querySelector(".turn").innerText = `${turn} has won`;
      let img = document.querySelector(".img");
      if (med.matches) {
        img.style.width = "40vw";
        img.style.height = "40vw";
      } else {
        img.style.width = "20vw";
        img.style.height = "20vw";
      }
      let line = document.querySelector(".line");
      line.style.display = "block";
      line.style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
      isGameOver = true;
    }
  });
};

const changeTurn = () => {
  if (isGameOver) return;
  ct++;
  return turn === "X" ? "0" : "X";
};

const isDraw = () => {
  if (ct == 9 && !isGameOver) {
    document.querySelector(".turn").innerText = "Game draw";
    isGameOver = true;
    ct = 0;
    return;
  }
};

// music.play();
let boxText = Array.from(document.getElementsByClassName("textBox"));
boxText.forEach((arg) => {
  arg.addEventListener("click", () => {
    if (arg.innerText === "") {
      if (isGameOver) return;
      ting.play();
      arg.innerText = turn;
      turn = changeTurn();
      document.querySelector(".turn").innerText = `Turn for ${turn}`;
      checkWin();
      isDraw();
    }
  });
});

let reset = document.querySelector(".reset");
let boxtext = Array.from(document.getElementsByClassName("textBox"));
reset.addEventListener("click", () => {
  boxtext.forEach((arg) => {
    arg.innerText = "";
    document.querySelector(".line").style.display = "none";
    document.querySelector(".turn").innerText = "Turn for X";
    document.querySelector(".img").style.width = "0";
    document.querySelector(".img").style.height = "0";
    ct = 0;
    isGameOver = false;
  });
});
