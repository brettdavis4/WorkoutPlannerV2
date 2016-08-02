function retrieveExercises(){
    //get exercises from localstorage
    var ex0 = localStorage.getItem("ex0");
    var ex1 = localStorage.getItem("ex1");
    var ex2 = localStorage.getItem("ex2");
    var ex3 = localStorage.getItem("ex3");
    var ex4 = localStorage.getItem("ex4");
    var ex5 = localStorage.getItem("ex5");
    var ex6 = localStorage.getItem("ex6");
    var ex7 = localStorage.getItem("ex7");

    //populate exercise list & hidden form fields on workout tab
    var cardiodiv = document.getElementById("cardiolistdiv");
    var strengthdiv = document.getElementById("strengthlistdiv");
    var corediv = document.getElementById("corelistdiv");
    var hiitdiv = document.getElementById("hiitlistdiv");

    var hcardio = document.getElementById("hcardio");
    var hstength = document.getElementById("hstrength");
    var hcore = document.getElementById("hcore");
    var hhiit = document.getElementById("hhiit");

    var noexercises = document.getElementById("noexercises");

    if (ex0 == null & ex1 == null & ex2 == null & ex3 == null & ex4 == null & ex5 == null & ex6 == null & ex7 == null){
        noexercises.className = "alert alert-danger";
        noexercises.innerHTML = "You do not have any exercises entered.  Please click the Select Your Exercises tab and enter your exercises.";
    } else {
        noexercises.style.display = "none";
    }

    var cardioexs = generatelist(ex0,ex1);
    var strengthexs = generatelist(ex2,ex3);
    var coreexs = generatelist(ex4,ex5);
    var hiitexs = generatelist(ex6,ex7);

    cardiodiv.innerHTML = "Cardio Activities: " + cardioexs;
    hcardio.value =  cardioexs;

    strengthdiv.innerHTML = "Strength Activities: " + strengthexs;
    hstength.value = strengthexs;

    corediv.innerHTML = "Core Activities: " + coreexs;
    hcore.value = coreexs;

    hiitdiv.innerHTML = "Hiit Activities: " + hiitexs;
    hhiit.value = hiitexs;

    //add the edit values to the exercise form
    var tbcardio = document.getElementById("tbcardio");
    var tbstength = document.getElementById("tbstength");
    var tbcore = document.getElementById("tbcore");
    var tbhiit = document.getElementById("tbhiit");

    tbcardio.value = ex1;
    tbstength.value = ex3;
    tbcore.value = ex5;
    tbhiit.value = ex7;

    getCheckBoxValue("cbCardio",ex0);
    getCheckBoxValue("cbStrength",ex2);
    getCheckBoxValue("cbCore",ex4);
    getCheckBoxValue("cbHiit",ex6);
}

function saveExercises(){
    if (localStorage) {
        for (var i = 0; i < arguments.length; i++) {
            var key = "ex"+i;
            var item = arguments[i];
            localStorage.setItem(key, item);
        }
    }
    else {
        console.log("Error: you don't have localStorage!");
    }
}