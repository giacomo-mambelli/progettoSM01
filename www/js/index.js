document.addEventListener("deviceready", init, false);
document.addEventListener("backbutton", backbutton, false);

var badgesArray;
var menu, badges, credits;
var totaleOpere = 6;
var results, Presults;

function backbutton(){
    if (confirm("Vuoi davvero uscire?") == true) {
        navigator.app.exitApp();
    }
}

function init() {
    badgesArray = ["trova la tua prima opera", "trova la meta' delle opere",  "trova tutte le opere"];

    menu = document.getElementById("menu");
    menu.style.visibility = "visible";

    Presults = document.getElementById("Presults");
    results = document.getElementById("results");

    document.getElementById("Bscan").onclick = startScan;

    badges = document.getElementById("badges");
    document.getElementById("Bbadges").onclick = showBadges;

    credits = document.getElementById("credits");
    document.getElementById("Bcredits").onclick = showCredits;

    document.getElementById("back1").onclick = hideAll;
    document.getElementById("back2").onclick = hideAll;
    document.getElementById("back3").onclick = hideAll;
}

function showBadges() {
    var s="", i, value="";
    for (i = 0; i < badgesArray.length; i++) {
        value = localStorage.getItem("b" + i);
        if (value == "true") {
            s += "-" + badgesArray[i] + ': <img class="box" src="img/box2.png" alt=""/><br>';
        }
        else {
            s += "-" + badgesArray[i] + ': <img class="box" src="img/box1.png" alt=""/><br>';
        }
    }
    document.getElementById("Pbadges").innerHTML = s;
    badges.style.display = "block";
}

function showCredits() {
    credits.style.display = "block";
}

function hideAll() {
    badges.style.display = "none";
    credits.style.display = "none";
    results.style.display = "none";
}

function startScan() {

    cordova.plugins.barcodeScanner.scan(
		function (result) {
		    var risultato = result.text;
		    var t = "";
		    //controllo codice gia usato
		    if (localStorage.getItem(risultato) == "true") {
		        t = "hai già usato questo codice";
		        alert(t);
		    }
		        //controllo codice valido
		    else {
                        var z=0;
		        t = "fin ora hai trovato " + localStorage.tot + " opere su " + totaleOpere + ".<br>";
		        if (risultato == "code001") { z++; t = '<img src="img/gioconda.png"/><br>Titolo: Gioconda<br><a href="http://it.wikipedia.org/wiki/Gioconda">maggiori info qui.</a>';}
		        if (risultato == "code002") { z++; t = '<img src="img/nike.jpg"/><br>Titolo: nike di samotracia<br><a href="http://it.wikipedia.org/wiki/Nike_di_Samotracia">maggiori info qui.</a>';}
		        if (risultato == "code003") { z++; t = '<img src="img/hammurabi.png"/><br>Titolo: codice di hammurabi<br><a href="http://it.wikipedia.org/wiki/Codice_di_Hammurabi">maggiori info qui.</a>';}
		        if (risultato == "code004") { z++; t = '<img src="img/liberta.png"/><br>Titolo: la libertà che guida il popolo<br><a href="http://it.wikipedia.org/wiki/La_Libertà_che_guida_il_popolo">maggiori info qui.</a>';}
		        if (risultato == "code005") { z++; t = '<img src="img/amore.png"/><br>Titolo: Amore e psiche<br><a href="http://it.wikipedia.org/wiki/Amore_e_Psiche">maggiori info qui.</a>';}
		        if (risultato == "code006") { z++; t = '<img src="img/nozze.png"/><br>Titolo: Nozze di cana<br><a href="http://it.wikipedia.org/wiki/Nozze_di_Cana_(Veronese)">maggiori info qui.</a>';}
		        
                        if (z>0){
                            localStorage.setItem(risultato, "true");
                            if(localStorage.getItem("tot")===null){
                                localStorage.tot=0;
                            }
                            localStorage.tot = parseInt(localStorage.tot) + 1;
                            t = "fin ora hai trovato " + localStorage.tot + " opere su " + totaleOpere + ".<br>"+t;
                        
                            Presults.innerHTML = t;
                            results.style.display = "block";
                            //controllo badges
                            if (localStorage.tot == 1 && localStorage.b0 != "true") { // badge 00
                                localStorage.b0 = "true";
                                alert("nuovo badge:\n"+badgesArray[0]);
                            }
                            if (localStorage.tot == totaleOpere / 2 && localStorage.b1 != "true") { // badge 01
                                localStorage.b1 = "true";
                                alert("nuovo badge:\n" + badgesArray[1]);
                            }
                            if (localStorage.tot == totaleOpere && localStorage.b2 != "true") {  // badge 02
                                localStorage.b2 = "true";
                                alert("nuovo badge:\n" + badgesArray[2]);
                            }
                            //controllo nuovi badges qui


                        }
		    }
                    if(z==0&&risultato!=""){
                        alert("qr code non valido");
                    }
		},
		function (error) {
		    alert("Scanning failed: " + error);
		}
	);

}
