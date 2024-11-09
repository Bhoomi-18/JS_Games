let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#new");
let result = document.querySelector(".result");
let message = document.querySelector("#message");

//playerX, playerO
let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () =>{
    turnO = true;
    enableBoxes();
    result.classList.add("hide");
    count = 0;
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.remove("colorX");
            box.classList.add("colorO");
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.remove("colorO");
            box.classList.add("colorX");
            turnO = true;
        }
        box.disabled = true;
        count += 1;

        let gameWin = checkWinner();

        if (count === 9 && !gameWin){
            draw();
        };

        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const draw = () => {
    message.innerText = "It's a draw!";
    result.classList.remove("hide");
};

const showWinner = (winner) => {
    message.innerText = `Winner is ${winner}!`;
    result.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if(val1 != "" && val2 != "" && val3 != ""){
            if(val1 === val2 && val2 === val3){
                showWinner(val1);
            }
        }
    }
};

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);