let gameseq=[];
let userseq=[];

let started=false;
let level=0;
let highest=0;

let btns=["yellow","green","red","blue"];

let h3=document.querySelector("h3");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started=true;
    }
    levelUp();
});

function levelUp(){
    userseq=[];
    level++;
    h3.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn= document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    console.log(gameseq);
    btnflash(randBtn);
}

function btnflash(randBtn){
    randBtn.classList.add("flash");
    setTimeout(() => {
        randBtn.classList.remove("flash");
    }, 300);
}

function checkAns(idx){
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length==gameseq.length){
           setTimeout(levelUp,1000);
        }
    }
    else{
        highScore();
        h3.innerHTML=`Game Over! Your Score was <b>${level}</b>.<br>Highest Score: ${highest} <br> Press any key to start again.`
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },200);
        reset();
    }
}


function highScore(){
    highest=Math.max(highest,level);
}

function btnPress(){
    let button=this;
    btnflash(button);
    let userColor= button.getAttribute("id");
    userseq.push(userColor);
    
    checkAns(userseq.length-1);
}


let buttons= document.querySelectorAll(".btn");

buttons.forEach(function(button){
    button.addEventListener("click",btnPress);
});

function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
    
}
