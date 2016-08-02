var Planner;
Planner = (function () {
    return {
        init: function () {
            //default exercises
            var appCardio = ["BodyAttack", "BodyCombat", "BodyJam", "BodyStep", "BodyVive 3.1", "RPM", "Sh'Bam"];
            var appStength = ["BodyPump", "BodyVive 3.1", "Les Mills Grit Strength"];
            var appCoreFlex = ["CxWorx", "BodyBalance", "BodyVive 3.1"];
            var appHiit = ["Les Mills Grit Cardio", "Les Mills Grit Plyo"];

            //populate checkboxes
            popCheckBox("cardiodiv", appCardio, "cbCardio");
            popCheckBox("strengthdiv", appStength, "cbStrength");
            popCheckBox("corediv", appCoreFlex, "cbCore");
            popCheckBox("hiitdiv", appHiit, "cbHiit");

            //populate page
            retrieveExercises();
            retrieveWorkout();

            var errorlist = "";

            //add onclick events
            var exbut = document.getElementById("exbut");
            exbut.onclick = function () {
                var dcardio = cbValues("cbCardio");
                var dstrength = cbValues("cbStrength");
                var dcore = cbValues("cbCore");
                var dhiit = cbValues("cbHiit");

                var tbcardio = document.getElementById("tbcardio");
                var tbstrength = document.getElementById("tbstength");
                var tbcore = document.getElementById("tbcore");
                var tbhiit = document.getElementById("tbhiit");

                if (dcardio == "" & tbcardio.value == "") {
                    errorlist = errorlist + "Please select/enter at least one cardio exercise.</br>";
                }

                if (dstrength == "" & tbstrength.value == "") {
                    errorlist = errorlist + "Please select/enter at least one strength exercise.</br>";
                }

                if (dcore == "" & tbcore.value == "") {
                    errorlist = errorlist + "Please select/enter at least one core exercise.</br>";
                }

                var exerciseconfim = document.getElementById("exerciseconfim");

                if (errorlist != "") {
                    exerciseconfim.className = "alert alert-danger";
                    exerciseconfim.innerHTML = errorlist;
                    return false;
                } else {
                    exerciseconfim.className = "alert alert-success";
                    exerciseconfim.innerHTML = "Your exercises have been saved. Please click the Build Your Workout tab to continue.";
                    saveExercises(dcardio, tbcardio.value, dstrength, tbstrength.value, dcore, tbcore.value, dhiit, tbhiit.value);
                    retrieveExercises();
                    return false;
                }
            };

            var deletebtn = document.getElementById("deletebtn");
            deletebtn.onclick = function () {
                var workoutconfim = document.getElementById("workoutconfim");
                workoutconfim.className = "alert alert-success";
                workoutconfim.innerHTML = "You have successfully cleared your exercises and workout.";

                localStorage.clear();
                //return false
                //This is commented out.  The page will refresh and it takes care or clear form fields and divs.
            }

            var tblworkout = document.getElementById("tblWorkout");

            tblworkout.addEventListener('click', function (e) {
                if (e.target.tagName !== 'TD') {
                    return;
                }
                var cell = e.target;
                var cells = [].slice.call(cell.parentNode.children);
                var column = cells.indexOf(cell);

                var rows = [].slice.call(cell.parentNode.parentNode.children);
                var row = rows.indexOf(cell.parentNode);

                //a slight hack to get rid of the th row
                if (rows.length > 1) {
                    if (column != 0) {
                        var week = row;
                        cval = column - 1;

                        var htd = document.getElementById("htd");
                        htd.value = week + "-" + cval;

                        var td = document.getElementById(htd.value);
                        var count = td.getElementsByTagName('div').length;

                        //display modal
                        //limit to 4 items in day
                        if (count <= 6) {
                            $('#myModal').modal('show');
                        } else {
                            alert('You can only have up to 4 exercises in a day.');
                        }
                    }
                }

            }, false);

            var etype = document.getElementById("etype");
            etype.onclick = function () {
                var exercise = document.getElementById("exercise");

                //clear existing options
                while (exercise.length > 0) {
                    exercise.remove(0);
                }

                var exerciselist;

                if (etype.value != "") {
                    if (etype.value === "Cardio") {
                        exerciselist = document.getElementById("hcardio").value;
                    } else if (etype.value === "Strength") {
                        exerciselist = document.getElementById("hstrength").value;
                    } else if (etype.value === "Core") {
                        exerciselist = document.getElementById("hcore").value;
                    } else if (etype.value === "Hiit") {
                        exerciselist = document.getElementById("hhiit").value;
                    }

                    var exercisearray = exerciselist.split(',');

                    //add blank option
                    var option = document.createElement("option");
                    option.text = "";
                    exercise.add(option);

                    //add exercises
                    for (i = 0; i < exercisearray.length; i++) {
                        var option = document.createElement("option");
                        option.text = exercisearray[i];
                        exercise.add(option);
                    }
                }
            }

            var saveex = document.getElementById("saveex");
            saveex.onclick = function () {
                var htd = document.getElementById("htd");
                var etype = document.getElementById("etype");
                var exercise = document.getElementById("exercise");

                if (exercise.value == "") {
                    alert("Please select an exercise.");
                } else {
                    var td = document.getElementById(htd.value);
                    closediv = document.createElement("div");
                    closediv.className = "closediv";
                    closediv.innerHTML = "x";

                    var d = new Date();
                    var m = d.getTime();

                    exdiv = document.createElement("div");
                    exdiv.id = m;
                    exdiv.className = etype.value;
                    exdiv.innerHTML = exercise.value;
                    exdiv.appendChild(closediv);

                    var week = htd.value.substring(0, 1);
                    var day = htd.value.substring(3,1).replace("-","");

                    closediv.onclick = function () {
                        var exdiv = document.getElementById(m);
                        exdiv.parentNode.removeChild(exdiv);
                    };

                    td.appendChild(exdiv);
                    etype.value = '';
                    exercise.value = '';
                    //hide modal
                    $('#myModal').modal('hide');
                }
            }

            var saveworkout = document.getElementById("workoutbtn");
            saveworkout.onclick = function () {
                var errorlist = "";

                var tbname = document.getElementById("tbname");
                var tbemail = document.getElementById("tbemail");
                var swtype = document.getElementById("swtype");
                var hcardio = document.getElementById("hcardio");
                var hstrength = document.getElementById("hstrength");
                var hcore = document.getElementById("hcore");
                var hhiit = document.getElementById("hhiit");

                if (tbname.value === "") {
                    errorlist = errorlist + "Please enter your name.</br>";
                }

                var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                if (re.test(tbemail.value) == false) {
                    errorlist = errorlist + "Please enter a valid email address.</br>";
                }

                if (swtype.value === "") {
                    errorlist = errorlist + "Please select the fitness level of your workout.</br>";
                }

                var workoutconfim = document.getElementById("workoutconfim");

                //Create workout array
                var workout = Array();

                //start out one to factor out day names
                for (i=1;i<tblworkout.rows.length;i++){
                    workout[i] = Array();
                    for (j=1;j<tblworkout.rows[i].cells.length; j++){
                        workout[i][j] = Array();

                        var td = tblworkout.rows[i].cells[j];
                        var divs = td.getElementsByTagName("div");

                        for (var k = 0; k < divs.length; k++) {
                            if(divs[k].innerHTML != "x"){
                              workout[i][j].push({exercise: divs[k].innerHTML.replace("<div class=\"closediv\">x</div>",""), extype:  divs[k].className, id: divs[k].id});
                            }
                        }
                    }
                }

                /* - fixing validation...*/
                var workoutissues = verifyWorkout(workout, swtype.value);

                if (workoutissues != ""){
                    errorlist = errorlist + workoutissues;
                }


                if (errorlist != "") {
                    workoutconfim.className = "alert alert-danger";
                    workoutconfim.innerHTML = errorlist;
                    return false;
                } else {
                    workoutconfim.className = "alert alert-success";
                    workoutconfim.innerHTML = "Your workout has been saved.";

                    var userworkout = new Workout(hcardio.value,hstrength.value,hcore.value,hhiit.value,tbname.value,tbemail.value,swtype.value,workout);
                    saveWorkout(userworkout);

                    return false;
                }

            }
        }
    };
})();





