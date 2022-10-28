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
        q="Albert Einstein hat die Atombombe erfunden"
        a=false
    }
    if (y==4){
        q="Isotope sind normale Elemente"
        a=false
    }
    if (y==6){
        q="In Atombomben wird das Element Uran -235 verwendet "
        a=true
    }
    if (y==8){
        q="Die erste Atombombe wurde in China gezündet"
        a=false
    }
    if (y==10){
        q="In Atombomben werden schwere Kerne benötigt"
        a=true
    }
    if (y==12){
        q="In einer Atombombe werden mindestens 2 kritesche Massen benötigt"
        a=false
    }
    if (y==14){
        q="Lithium braucht keinen externen Zünder um zu explodieren"
        a=false
    }
    if (y==16){
        q="Die Sprengkraft einer Kernfussionsbombe ist auf 10567kt TNT begrentzt"
        a=false
    }
    if (y==18){
        q="Phase 1 einer Atombombe dauert nur 1ms"
        a=true
    }
    if (y==20){
        q="Der Lichtblitz hat so viel Energie dass er alles in der Umgebung anzündet"
        a=true
    }
    if (y==22){
        q="Für die Druckwelle sind die meisten Gebäude nicht ausgeleht"
        a=true
    }
    if (y==24){
        q="Die Stürme werden durch Radioaktive Strahlung verursacht"
        a=false
    }
    if (y==26){
        q="Der Atompilz saugt Luft an und facht so das Feuer weiter an"
        a=true
    }
    if (y==28){
        q="Noch in 30km Entfernung werden Fenster zu tötlichen Gefahren"
        a=false
    }
    if (y==30){
        q="Nach einer Atombombe ist die meiste Infrastrucktur kaputt"
        a=true
    }
    if (y==32){
        q="Der Regen verbreitet die radioaktive Asche überall und viele werden stralungskrank"
        a=true
    }
    if (y==34){
        q="Die Partikel in der Atmosphäre können einen nuklearen Winter verursachen"
        a=true
    }
    if (y==36){
        q="Stralung misst man in mf (mikrofarat)"
        a=false
    }
    if (y>26){
        q="Ende"
    }
    
    document.getElementById("question").innerHTML = q;
           
}
