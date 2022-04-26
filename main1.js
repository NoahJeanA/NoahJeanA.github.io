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
        q="In einer Atombombe werden mindestens 2 Kritesche Massen benötigt"
        a=false
    }
    if (y==14){
        q="Lithium braucht keinen externen zünder zum zu explodiren"
        a=false
    }
    if (y==16){
        q="Die Sprengkraft einer Kernfussionsbombe ist auf 10567kt TNT begretnzt"
        a=false
    }
    if (y==18){
        q="Phase 1 einer Atombomben dauert nur 1ms"
        a=true
    }
    if (y==20){
        q="Der Lichtblitz hat so viel energie dass er alles in der Umgebung anzündet"
        a=true
    }
    if (y==22){
        q="Für die Druckwelle sind die meisten gebeude nicht ausgeleht"
        a=true
    }
    if (y==24){
        q="Die Stürme werden durch Radioaktive Stralung verursacht"
        a=false
    }
    if (y==26){
        q="Der Atompilz saugt Luft an gun facht so das Feier weiter an"
        a=true
    }
    if (y==28){
        q="Noch in 24km entfernung werden Fenster zu Tötlichen gefahren"
        a=false
    }
    if (y==30){
        q="Nach einer Atombombe ist die meiste infrastrucktur kaputt"
        a=true
    }
    if (y==32){
        q="Der Regen verbreitet die Radioaktive asche überall und viele werden Stralungskrank"
        a=true
    }
    if (y==34){
        q="Die Patikel in der Atmoswfaire können einen Nuklearen winter verursachen"
        a=true
    }
    if (y==36){
        q="Stralung misst man in mf (mikrofarat)"
        a=false
    }
    if (y>26){
        document.getElementById("question").innerHTML = "Ende";
    }
    
    document.getElementById("question").innerHTML = q;
           
}
