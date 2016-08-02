function Workout(cardioex, strengthex,coreex,hiitex,name,email,workouttype,workout){
    this.cardioex = cardioex;
    this.strengthex = strengthex;
    this.coreex = coreex;
    this.hiitex = hiitex;
    this.name = name;
    this.email = email;
    this.workouttype = workouttype;
    this.workout = workout;
}

function verifyWorkout(workout, wtype){
    var errorlist = "";
    try{
        for(i=1;i<workout.length;i++){
            var cardiocount = 0;
            var strengthcount = 0;
            var corecount = 0;
            var hiitcount = 0;

            for(j=1;j<workout[i].length;j++){
                for(k=0;k<workout[i][j].length;k++){
                    if (workout[i][j][k].extype == "Cardio"){
                        cardiocount += cardiocount + 1;
                    }else if (workout[i][j][k].extype == "Strength"){
                        strengthcount += strengthcount + 1;
                    }else if (workout[i][j][k].extype == "Core"){
                        corecount += corecount + 1;
                    }else if (workout[i][j][k].extype == "Hiit"){
                        hiitcount += hiitcount + 1;
                    }
                }
            }

            if (wtype === "Beginner"){
                if (i === 1){
                    if (cardiocount < 1){
                        errorlist = errorlist + "Week 1 requires at least 1 cardio exercise.</br>";
                    }
                    if (strengthcount < 1){
                        errorlist = errorlist + "Week 1 requires at least 1 strength exercise.</br>";
                    }
                    if (corecount < 1){
                        errorlist = errorlist + "Week " + i + " requires at least 1 core exercise.</br>";
                    }
                } else if (i === 2){
                    if (cardiocount < 2){
                        errorlist = errorlist + "Week 2 requires at least 2 cardio exercises.</br>";
                    }
                    if (strengthcount < 1){
                        errorlist = errorlist + "Week 2 requires at least 1 strength exercise.</br>";
                    }
                    if (corecount < 1){
                        errorlist = errorlist + "Week " + i + " requires at least 1 core exercise.</br>";
                    }
                } else {
                    if (cardiocount < 3){
                        errorlist = errorlist + "Week " + i + " requires at least 3 cardio exercises.</br>";
                    }
                    if (strengthcount < 2){
                        errorlist = errorlist + "Week " + i + " requires at least 2 strength exercises.</br>";
                    }
                    if (corecount < 1){
                        errorlist = errorlist + "Week " + i + " requires at least 1 core exercise.</br>";
                    }
                }
            }else if (wtype === "Intermediate"){
                if (cardiocount < 3){
                    errorlist = errorlist + "Week " + i + " requires at least 3 cardio exercises.</br>";
                }
                if (strengthcount < 2){
                    errorlist = errorlist + "Week " + i + " requires at least 2 strength exercises.</br>";
                }
                if (corecount < 1){
                    errorlist = errorlist + "Week " + i + " requires at least 1 core exercise.</br>";
                }
            }else if (wtype === "Advanced"){
                if (cardiocount < 2){
                    errorlist = errorlist + "Week " + i + " requires at least 2 cardio exercises.</br>";
                }
                if (strengthcount < 2){
                    errorlist = errorlist + "Week " + i + " requires at least 2 strength exercises.</br>";
                }
                if (hiitcount < 2){
                    errorlist = errorlist + "Week " + i + " requires at least 2 hiit exercises.</br>";
                }
                if (corecount < 1){
                    errorlist = errorlist + "Week " + i + " requires at least 1 core exercise.</br>";
                }
            }

        }

        return errorlist;

    } catch(err) {
        console.log("error retrieving validation....");
        console.log(errorlist);
        console.log(err);
    }

}
/*
function retrieveWorkout(){
    try{
        var tbname = document.getElementById("tbname");
        var tbemail = document.getElementById("tbemail");
        var swtype = document.getElementById("swtype");

        var retrievedData = localStorage.getItem("Workout");
        //console.log("data: " + retrievedData);
        var wo = JSON.parse(retrievedData);
        console.log(wo);

        tbname.value = wo["name"];
        tbemail.value = wo["email"];
        swtype.value = wo["workouttype"];

        var workout = wo["workout"];

        for(i=1;i<workout.length;i++){
            for(j=1;j<workout[i].length;j++){
                for(k=0;k<workout[i][j].length;k++){
                    var rowid = i-1;
                    var tdid = j-1;

                    var td = document.getElementById(rowid+"-"+tdid);

                    var closediv = document.createElement("div");
                    closediv.className = "closediv";
                    closediv.innerHTML = "x";

                    closediv.onclick = function () {
                        var exdiv = document.getElementById(this.parentNode.id);
                        exdiv.parentNode.removeChild(exdiv);
                    };

                    var exdiv = document.createElement("div");

                    exdiv.id = workout[i][j][k].id;
                    exdiv.className = workout[i][j][k].extype;
                    exdiv.innerHTML = workout[i][j][k].exercise;
                    exdiv.appendChild(closediv);

                    td.appendChild(exdiv);
                }
            }
        }

    } catch(err) {
        console.log(err);
    }

}
*/
                        /*console.log(this.parentNode.id);*/

function retrieveWorkout(){}


function saveWorkout(Workout){
    var key = "Workout";
    var item = JSON.stringify(Workout);
    localStorage.setItem(key, item);
}
