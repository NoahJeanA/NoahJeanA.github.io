var min = 1;
var max = 24;
var z = 0;
var y = 1; 


function truee(){
    if (a==true){
        console.log("richtig")
        animationtrue();
    }
    if (a==false){
        console.log("falsch")
        animationfalse();
    }
    
}

function falsee(){
    if (a==false){
        console.log("richtig")
        animationtrue();
    }
    if (a==true){
        console.log("falsch")
        animationfalse();
    }
}



function animationtrue(){
    document.getElementById("question").className = "grün";
    document.getElementById("question").innerHTML = "Richtige Antwort.";
    timeoutID = window.setTimeout(normaltrue, 1000);
}
function animationfalse(){
    document.getElementById("question").className = "rot";
    document.getElementById("question").innerHTML = "Falsche Antwort.";
    timeoutID = window.setTimeout(normaltrue, 1000);
   
}
function normalfalse(){
    document.getElementById("question").className = "normal"; 
    zufall();
}

function normaltrue(){
    document.getElementById("question").className = "normal"; 
    zufall();
}


window.addEventListener("load", function() {
    zufall();
    document.getElementById("t").addEventListener("click", truee);
    document.getElementById("f").addEventListener("click", falsee);
})

function zufall(){
    y=y+1;
    if (y==2){
        q="Albert Einstein hat die Atombombe Erfunden"
        a=false
    }
    if (y==4){
        q="Isotope sind normale Elemente"
        a=false
    }
    if (y==6){
        q=""
        a=true
    }
    if (y==8){
        q=""
        a=false
    }
    if (y==10){
        q=""
        a=true
    }
    if (y==12){
        q=""
        a=false
    }
    if (y==14){
        q=""
        a=false
    }
    if (y==816){
        q=""
        a=false
    }
    if (y==18){
        q=""
        a=false
    }
    if (y==20){
        q=""
        a=false
    }
    if (y==22){
        q=""
        a=true
    }
    if (y==24){
        q=""
        a=false
    }
    if (y==26){
        q=""
        a=true
    }
    if (y==28){
        q=""
        a=false
    }
    if (y==30){
        q=""
        a=true
    }
    if (y==32){
        q=""
        a=true
    }
    if (y==34){
        q=""
        a=true
    }
    if (y==36){
        q=""
        a=true
    }
    if (y==38){
        q=""
        a=true
    }
    if (y==40){
        q=""
        a=false
    }
    if (y==42){
        q=""
        a=true
    }
    if (y==44){
        q=""
        a=true
    }
    if (y==46){
        q=""
        a=true
    }
    document.getElementById("question").innerHTML = q;
           
}
