var planner = (function () {
    'use strict';
    //default exercises and the daily limit of exercises
    var appCardio = ["BodyAttack", "BodyCombat", "BodyJam", "BodyStep", "BodyVive 3.1", "RPM", "Sh'Bam"],
        appStength = ["BodyPump", "BodyVive 3.1", "Les Mills Grit Strength"],
        appCoreFlex = ["CxWorx", "BodyBalance", "BodyVive 3.1"],
        appHiit = ["Les Mills Grit Cardio", "Les Mills Grit Plyo"],
        appExLimit = 4,
        model,
        view,
        controller,
        util;
        
    /* ======= Model ======= */
    model = {
        workout: 
            {
                name: '',
                email: '',
                workouttype: '',
                workoutplan: [],
                excardio: '',
                exstrength: '',
                excore: '',
                exhiit: '',
                excardiotb: '',
                exstrengthtb: '',
                excoretb: '',
                exhiittb: '',
                validworkout: false,
                hasexercises: false
            }
        
    };
    
    /* ======= View ======= */
    view = {
        init: function () {
            //populate checkboxes
            util.popCheckBox('cardiodiv', appCardio, 'cbCardio');
            util.popCheckBox('strengthdiv', appStength, 'cbStrength');
            util.popCheckBox('corediv', appCoreFlex, 'cbCore');
            util.popCheckBox('hiitdiv', appHiit, 'cbHiit');
            
            var exbut = document.getElementById('exbut');
            exbut.addEventListener('click',  function (e) {
                controller.saveex();
                e.preventDefault();
            });
            
            //add events
            controller.retrieveWorkout();
            controller.tblclick();
            controller.exercisetypeclick();
            controller.saveexclick();
            controller.savewoclick();
            controller.deletewoclick();
        }
    };
    
    /* ======= Controller ======= */
    controller = {
        init: function () {
            view.init();
        },
        
        saveex: function () {
            var cbcardio = util.cbValues('cbCardio'),
                cbstrength = util.cbValues('cbStrength'),
                cbcore = util.cbValues('cbCore'),
                cbhiit = util.cbValues('cbHiit'),
                cardiolistdiv = document.getElementById('cardiolistdiv'),
                strengthlistdiv = document.getElementById('strengthlistdiv'),
                corelistdiv = document.getElementById('corelistdiv'),
                hiitlistdiv = document.getElementById('hiitlistdiv'),
                noexercises = document.getElementById('noexercises'),
                workoutplanner = document.getElementById('workoutplanner'),
                hcardio = document.getElementById('hcardio'),
                hstrength = document.getElementById('hstrength'),
                hcore = document.getElementById('hcore'),
                hhiit = document.getElementById('hhiit'),
                
                tbcardio = util.replaceAll(document.getElementById('tbcardio').value, ', ', ','),
                tbstrength = util.replaceAll(document.getElementById('tbstength').value, ', ', ','),
                tbcore = util.replaceAll(document.getElementById('tbcore').value, ', ', ','),
                tbhiit = util.replaceAll(document.getElementById('tbhiit').value, ', ', ','),
                
                cardioexs = util.generatelist(cbcardio, tbcardio),
                strengthexs = util.generatelist(cbstrength, tbstrength),
                coreexs = util.generatelist(cbcore, tbcore),
                hiitexs = util.generatelist(cbhiit, tbhiit),
                                            
                errorlist = '',
                
                exerciseconfim = document.getElementById('exerciseconfim');
            
            hcardio.value = cardioexs;
            hstrength.value = strengthexs;
            hcore.value = coreexs;
            hhiit.value = hiitexs;
                                    
            if (cbcardio === '' && tbcardio === '') {
                errorlist = errorlist + 'Please select/enter at least one cardio exercise.</br>';
            }

            if (cbstrength === '' && tbstrength === '') {
                errorlist = errorlist + 'Please select/enter at least one strength exercise.</br>';
            }

            if (cbcore === '' && tbcore === '') {
                errorlist = errorlist + 'Please select/enter at least one core exercise.</br>';
            }

            if (errorlist !== '') {
                exerciseconfim.className = 'alert alert-danger';
                exerciseconfim.innerHTML = errorlist;
            } else {                            
                cardioexs = util.generatelist(cbcardio, tbcardio);
                strengthexs = util.generatelist(cbstrength, tbstrength);
                coreexs = util.generatelist(cbcore, tbcore);
                hiitexs = util.generatelist(cbhiit, tbhiit);
                
                model.workout.excardiotb = tbcardio;
                model.workout.exstrengthtb = tbstrength;
                model.workout.excoretb = tbcore;
                model.workout.exhiittb = tbhiit;
                
                model.workout.excardio = cardioexs;
                model.workout.exstrength = strengthexs;
                model.workout.excore = coreexs;
                model.workout.exhiit = hiitexs;
                model.workout.hasexercises = true;
                
                controller.saveWorkout();

                cardiolistdiv.innerHTML = 'Cardio Activities: ' + util.replaceAll(cardioexs, ',', ', ');

                strengthlistdiv.innerHTML = 'Strength Activities: ' + util.replaceAll(strengthexs, ',', ', ');

                corelistdiv.innerHTML = 'Core Activities: ' + util.replaceAll(coreexs, ',', ', ');

                hiitlistdiv.innerHTML = 'Hiit Activities: ' + util.replaceAll(hiitexs, ',', ', ');
                
                noexercises.style.display = 'none';
                workoutplanner.style.display = 'inline';
                            
                exerciseconfim.className = 'alert alert-success';
                exerciseconfim.innerHTML = 'Your exercises have been saved. Please click the Build Your Workout tab to continue.';
                
            }
            
            
            $('#modalexercise').modal('show');
            return false;
        },
        
        tblclick: function () {
            var tblworkout = document.getElementById("tblWorkout"),
                exercise = document.getElementById("exercise");
                                   
            tblworkout.addEventListener('click', function (e) {
                if (e.target.tagName !== 'TD') {
                    return;
                }
                
                 //clear existing options
                while (exercise.length > 0) {
                    exercise.remove(0);
                }

                //add blank option
                var option2 = document.createElement("option");
                option2.text = "";
                exercise.add(option2);
                                
                var cell = e.target;
                var cells = [].slice.call(cell.parentNode.children);
                var column = cells.indexOf(cell);

                var rows = [].slice.call(cell.parentNode.parentNode.children);
                var row = rows.indexOf(cell.parentNode);

                //console.log('cell - ' + cell + ' cells - ' + cells + ' column - ' + column + ' rows - ' + rows + ' row - ' + row);
                //a slight hack to get rid of the th row
                if (rows.length > 1) {
                    if (column !== 0) {
                        var week = row;
                        var cval = column - 1;

                        var htd = document.getElementById("htd");
                        htd.value = week + "-" + cval;

                        var td = document.getElementById(htd.value);
                        var count = td.getElementsByTagName('div').length;
                        
                        count = count / 2;

                        //console.log('rows - ' + rows + ' week - ' + week + ' htd - ' + htd + ' td - ' + td + ' count - ' + count);
                                        
                        if (count < appExLimit) {
                            $('#modalworkout').modal('show');
                        } else {
                            window.alert('You can only have up to 4 exercises in a day.');
                        }
                    }
                }

            }, false);
        },
        
        exercisetypeclick: function () {
            var etype = document.getElementById('etype'),
                hcardio = document.getElementById('hcardio'),
                hstrength = document.getElementById('hstrength'),
                hcore = document.getElementById('hcore'),
                hhiit = document.getElementById('hhiit'),
                option,
                option2,
                i;
            
            etype.onclick = function () {
                var exercise = document.getElementById('exercise'),
                    exerciselist;
                //clear existing options
                while (exercise.length > 0) {
                    exercise.remove(0);
                }
        
                if (etype.value !== '') {
                    if (etype.value === 'Cardio') {
                        exerciselist = hcardio.value;
                    } else if (etype.value === 'Strength') {
                        exerciselist = hstrength.value;
                    } else if (etype.value === 'Core') {
                        exerciselist = hcore.value;
                    } else if (etype.value === 'Hiit') {
                        exerciselist = hhiit.value;
                    }

                    var exercisearray = exerciselist.split(',');

                    //add blank option
                    var option2 = document.createElement("option");
                    option2.text = "";
                    exercise.add(option2);

                    //add exercises
                    for (i = 0; i < exercisearray.length; i++) {
                        var option = document.createElement("option");
                        option.text = exercisearray[i];
                        exercise.add(option);
                    }
                }
            };
        },
        
        saveexclick: function () {
            var saveex = document.getElementById('saveex');
            saveex.onclick = function () {
                var htd = document.getElementById('htd'),
                    etype = document.getElementById('etype'),
                    exercise = document.getElementById('exercise'),
                    closediv,
                    exdiv,
                    td,
                    d,
                    m,
                    week,
                    day;
                

                if (exercise.value === '') {
                    window.alert('Please select an exercise.');
                } else {
                    td = document.getElementById(htd.value);
                    closediv = document.createElement('div');
                    closediv.className = 'closediv';
                    closediv.innerHTML = 'x';

                    d = new Date();
                    m = d.getTime();
                    week = htd.value.substring(0, 1);
                    day = htd.value.substring(3, 1).replace('-', '');
                    
                    exdiv = document.createElement('div');
                    
                    exdiv.id = m;
                    exdiv.className = etype.value;
                    exdiv.innerHTML = exercise.value;
                    exdiv.appendChild(closediv);

                    

                    closediv.onclick = function () {
                        var exdiv = document.getElementById(m);
                        exdiv.parentNode.removeChild(exdiv);
                        controller.saveexercises();
                    };

                    td.appendChild(exdiv);
                    etype.value = '';
                    exercise.value = '';
                    //hide modal
                    
                    controller.saveexercises();
                     
                    $('#modalworkout').modal('hide');
                }
            };
        },
        
        saveexercises: function () {
            var tblworkout = document.getElementById('tblWorkout');
            var workplan = [];
            
            for (var i = 1; i < tblworkout.rows.length;  i = i + 1) {
                    workplan[i] = new Array();
                    for (var j = 1; j < tblworkout.rows[i].cells.length;  j = j + 1) {
                        workplan[i][j] = new Array();

                        var td = tblworkout.rows[i].cells[j];
                        var divs = td.getElementsByTagName('div');

                        for (var k = 0; k < divs.length; k = k + 1) {
                            if (divs[k].innerHTML !== 'x') {
                                workplan[i][j].push({exercise: divs[k].innerHTML.replace("<div class=\"closediv\">x</div>", ""), extype:  divs[k].className, id: divs[k].id});
                            
                                model.workout.workoutplan = workplan;
                                //console.log(model.workout.workoutplan);
                                controller.saveWorkout();
                            }
                        }
                    }
            }
        },
        
        savewoclick: function () {
            var tblworkout = document.getElementById('tblWorkout'),
                saveworkout = document.getElementById('workoutbtn');
            
            saveworkout.onclick = function () {
                var errorlist = '',
                    tbname = document.getElementById('tbname'),
                    tbemail = document.getElementById('tbemail'),
                    swtype = document.getElementById('swtype'),                    
                    re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
                    workoutconfim = document.getElementById('workoutconfim'),
                    i,
                    j,
                    k,
                    workout = model.workout.workoutplan;

                if (tbname.value === '') {
                    errorlist = errorlist + 'Please enter your name.</br>';
                }
                 
                if (re.test(tbemail.value) === false) {
                    errorlist = errorlist + 'Please enter a valid email address.</br>';
                }

                if (swtype.value === '') {
                    errorlist = errorlist + 'Please select the fitness level of your workout.</br>';
                }
                
                /* - fixing validation...*/
                var workoutissues = controller.verifyWorkout(workout, swtype.value),
                    tblworkout = document.getElementById('tblWorkout'),
                    dverified = document.getElementById('dverified');
                
                errorlist = errorlist + workoutissues;
                
                if (errorlist !== '') {                    
                    model.workout.validworkout = false;
                    dverified.innerHTML = 'No';
                } else {
                    model.workout.validworkout = true;
                    dverified.innerHTML = 'Yes';
                }
                
                model.workout.name = tbname.value;
                model.workout.email = tbemail.value;
                model.workout.workouttype = swtype.value;
                model.workout.excardiotb = model.workout.excardiotb;
                model.workout.exstrengthtb = model.workout.exstrengthtb;
                model.workout.excoretb = model.workout.excoretb;
                model.workout.exhiittb = model.workout.exhiittb;
                
                model.workout.excardio = model.workout.excardio;
                model.workout.exstrength = model.workout.exstrength;
                model.workout.excore = model.workout.excore;
                model.workout.exhiit = model.workout.exhiit;
                model.workout.hasexercises = model.workout.hasexercises;
                
                controller.saveWorkout();

                if (errorlist !== '') {
                    $('#modalworkoutconfirm').modal('show');
                    workoutconfim.className = 'alert alert-danger';
                    workoutconfim.innerHTML = errorlist;
                    return false;
                } else {
                    $('#modalworkoutconfirm').modal('show');
                    workoutconfim.className = 'alert alert-success';
                    workoutconfim.innerHTML = 'There are no issues with your workout.  Please print this out and share it with your fitness professional.';
                    return false;
                }

            };
        },
        
        deletewoclick: function () {
            var deletebtn = document.getElementById('deletebtn');
            
            deletebtn.onclick = function () {
                $('#modalworkoutconfirm').modal('show');
                var workoutconfim = document.getElementById("workoutconfim");
                workoutconfim.className = "alert alert-success";
                workoutconfim.innerHTML = "You have successfully cleared your exercises and workout.";

                localStorage.clear();
            };
        },
        
        saveWorkout: function () {
            var key = "Workout",
                item = JSON.stringify(model.workout);
            //console.log(model.workout);
            //console.log(item);
            localStorage.setItem(key, item);
        },
        
        verifyWorkout: function (workout, wtype) {
            var errorlist = '',
                i,
                j,
                k,
                cardiocount,
                strengthcount,
                corecount,
                hiitcount;
            
            if(workout.length == 0){   
                errorlist = errorlist + 'Please enter exercises into your planner.</br>';
            }
            
            try {
                for (i = 1; i < workout.length; i = i + 1) {
                    cardiocount = 0;
                    strengthcount = 0;
                    corecount = 0;
                    hiitcount = 0;

                    for (j = 1; j < workout[i].length; j = j + 1) {
                        for (k = 0; k < workout[i][j].length; k = k + 1) {
                            if (workout[i][j][k].extype === 'Cardio') {
                                cardiocount += cardiocount + 1;
                            } else if (workout[i][j][k].extype === 'Strength') {
                                strengthcount += strengthcount + 1;
                            } else if (workout[i][j][k].extype === 'Core') {
                                corecount += corecount + 1;
                            } else if (workout[i][j][k].extype === 'Hiit') {
                                hiitcount += hiitcount + 1;
                            }
                        }
                    }

                    if (wtype === 'Beginner') {
                        if (i === 1) {
                            if (cardiocount < 1) {
                                errorlist = errorlist + 'Week 1 requires at least 1 cardio exercise.</br>';
                                console.log('week - 1 cardiocount - ' + cardiocount);
                            }
                            if (strengthcount < 1) {
                                errorlist = errorlist + 'Week 1 requires at least 1 strength exercise.</br>';
                                console.log('week - 1 strengthcount - ' + strengthcount);
                            }
                            if (corecount < 1) {
                                errorlist = errorlist + 'Week ' + i + ' requires at least 1 core exercise.</br>';
                                console.log('week - 1 corecount - ' + corecount);
                            }
                        } else if (i === 2) {
                            if (cardiocount < 2) {
                                errorlist = errorlist + 'Week 2 requires at least 2 cardio exercises.</br>';
                                console.log('week - 2 cardiocount - ' + cardiocount);
                            }
                            if (strengthcount < 1) {
                                errorlist = errorlist + 'Week 2 requires at least 1 strength exercise.</br>';
                                console.log('week - 2 strengthcount - ' + strengthcount);
                            }
                            if (corecount < 1) {
                                errorlist = errorlist + 'Week ' + i + ' requires at least 1 core exercise.</br>';
                                console.log('week - 2 corecount - ' + corecount);
                            }
                        } else {
                            if (cardiocount < 3) {
                                errorlist = errorlist + 'Week ' + i + ' requires at least 3 cardio exercises.</br>';
                                console.log('week - ' + i + ' cardiocount - ' + cardiocount);
                            }
                            if (strengthcount < 2) {
                                errorlist = errorlist + 'Week ' + i + ' requires at least 2 strength exercises.</br>';
                                console.log('week - ' + i + ' strengthcount - ' + strengthcount);
                            }
                            if (corecount < 1) {
                                errorlist = errorlist + 'Week ' + i + ' requires at least 1 core exercise.</br>';
                                console.log('week - ' + i + ' corecount - ' + corecount);
                            }
                        }
                    } else if (wtype === 'Intermediate') {
                        if (cardiocount < 3) {
                            errorlist = errorlist + 'Week ' + i + ' requires at least 3 cardio exercises.</br>';
                        }
                        if (strengthcount < 2) {
                            errorlist = errorlist + 'Week ' + i + ' requires at least 2 strength exercises.</br>';
                        }
                        if (corecount < 1) {
                            errorlist = errorlist + 'Week ' + i + ' requires at least 1 core exercise.</br>';
                        }
                    } else if (wtype === 'Advanced') {
                        if (cardiocount < 2) {
                            errorlist = errorlist + 'Week ' + i + ' requires at least 2 cardio exercises.</br>';
                        }
                        if (strengthcount < 2) {
                            errorlist = errorlist + 'Week ' + i + ' requires at least 2 strength exercises.</br>';
                        }
                        if (hiitcount < 2) {
                            errorlist = errorlist + 'Week ' + i + ' requires at least 2 hiit exercises.</br>';
                        }
                        if (corecount < 1) {
                            errorlist = errorlist + 'Week ' + i + ' requires at least 1 core exercise.</br>';
                        }
                    }

                }

                return errorlist;

            } catch (err) {
                console.log('error retrieving validation....');
                console.log(errorlist);
                console.log(err);
            }

        },
        
        retrieveWorkout: function () {
            var retrievedData = localStorage.getItem('Workout'),
                wo = JSON.parse(retrievedData);
            
            try {
                var tbname = document.getElementById('tbname'),
                    tbemail = document.getElementById('tbemail'),
                    swtype = document.getElementById('swtype'),
                    hcardio = document.getElementById('hcardio'),
                    hstrength = document.getElementById('hstrength'),
                    hcore = document.getElementById('hcore'),
                    hhiit = document.getElementById('hhiit'),
                    workout,
                    i,
                    j,
                    k,
                    rowid,
                    tdid,
                    td,
                    closediv,
                    exdiv;
                
                model.workout.name = wo['name'];
                model.workout.email = wo['email'];
                model.workout.workouttype = wo['workouttype'];
                model.workout.workoutplan = wo['workoutplan'];
                
                model.workout.excardio = wo['excardio'];
                model.workout.exstrength = wo['exstrength'];
                model.workout.excore = wo['excore'];
                model.workout.exhiit = wo['exhiit'];
                                
                model.workout.excardiotb = wo['excardiotb'];
                model.workout.exstrengthtb = wo['exstrengthtb'];
                model.workout.excoretb = wo['excoretb'];
                model.workout.exhiittb = wo['exhiittb'];
                                
                model.workout.hasexercises = wo['hasexercises'];
                model.workout.validworkout = wo['validworkout'];
                
                
                hcardio.value = wo['excardio'];
                hstrength.value = wo['exstrength'];
                hcore.value = wo['excore'];
                hhiit.value = wo['exhiit'];
               
                tbname.value = wo['name'];
                tbemail.value = wo['email'];
                swtype.value = wo['workouttype'];
                
                var tblworkout = document.getElementById('tblWorkout'),
                    dverified = document.getElementById('dverified');
                
                if (wo['validworkout'] === false) {
                    dverified.innerHTML = 'No';
                } else {
                    dverified.innerHTML = 'Yes';
                }
                
                var cardiolistdiv = document.getElementById('cardiolistdiv'),
                    strengthlistdiv = document.getElementById('strengthlistdiv'),
                    corelistdiv = document.getElementById('corelistdiv'),
                    hiitlistdiv = document.getElementById('hiitlistdiv');
                
                
                cardiolistdiv.innerHTML = 'Cardio Activities: ' + util.replaceAll(wo['excardio'], ',', ', ');

                strengthlistdiv.innerHTML = 'Strength Activities: ' + util.replaceAll(wo['exstrength'], ',', ', ');

                corelistdiv.innerHTML = 'Core Activities: ' + util.replaceAll(wo['excore'], ',', ', ');

                hiitlistdiv.innerHTML = 'Hiit Activities: ' + util.replaceAll(wo['exhiit'], ',', ', ');
                
                var noexercises = document.getElementById('noexercises'),
                    workoutplanner = document.getElementById('workoutplanner');
                
                if (wo['hasexercises'] === false){
                    noexercises.style.display = 'inline';
                    workoutplanner.style.display = 'none';
                } else {
                    noexercises.style.display = 'none';
                    workoutplanner.style.display = 'inline';
                }
                
                var tbcardio = document.getElementById('tbcardio'),
                    tbstrength = document.getElementById('tbstength'),
                    tbcore = document.getElementById('tbcore'),
                    tbhiit = document.getElementById('tbhiit');
                
                
                tbcardio.value = wo['excardiotb'];
                tbstrength.value = wo['exstrengthtb'];
                tbcore.value = wo['excoretb'];
                tbhiit.value = wo['exhiittb'];
                
                util.getCheckBoxValue("cbCardio",wo['excardio']);
                util.getCheckBoxValue("cbStrength",wo['exstrength']);
                util.getCheckBoxValue("cbCore",wo['excore']);
                util.getCheckBoxValue("cbHiit",wo['exhiit']);                
                                
                
            } catch (err) {
                //console.log(err);
            }

            try {
                
                    workout = wo['workoutplan'];
                
                    for (i = 1; i < workout.length; i = i + 1) {
                        for (j = 1; j < workout[i].length; j = j + 1) {
                            for (k = 0; k < workout[i][j].length; k = k + 1) {
                                rowid = i - 1;
                                tdid = j - 1;

                                td = document.getElementById(rowid + '-' + tdid);

                                closediv = document.createElement('div');
                                closediv.className = 'closediv';
                                closediv.innerHTML = 'x';

                                closediv.onclick = function () {
                                    var exdiv = document.getElementById(this.parentNode.id);
                                    exdiv.parentNode.removeChild(exdiv);
                                    controller.saveexercises();
                                };

                                exdiv = document.createElement('div');

                                exdiv.id = workout[i][j][k].id;
                                exdiv.className = workout[i][j][k].extype;
                                exdiv.innerHTML = workout[i][j][k].exercise;
                                exdiv.appendChild(closediv);

                                td.appendChild(exdiv);
                            }
                        }
                    }
                } catch (err) {
                    
                }
        }
    };
    
    /* ======= Utility functions ======= */
    util = {
        //Populate checkbox values
        popCheckBox: function (ediv, earray, ecb) {
            var div = document.getElementById(ediv),
                i;

            for (i = 0; i < earray.length; i = i + 1) {
                var checkbox = document.createElement('input'),
                    label = document.createElement('label'),
                    cbdiv = document.createElement('div');
                
                checkbox.type = 'checkbox';
                checkbox.id = ecb;
                checkbox.name = ecb;
                checkbox.value = earray[i];
                checkbox.text = earray[i];

                label.htmlFor = ecb;
                label.appendChild(document.createTextNode(earray[i]));

                cbdiv.appendChild(checkbox);
                cbdiv.appendChild(label);
                div.appendChild(cbdiv);
            }
        },
        
        //Get selected checkbox values
        cbValues: function (cbname) {
            var values = '',
                cb = document.getElementsByName(cbname),
                i;

            for (i = 0; i < cb.length; i = i + 1) {
                if (cb[i].checked) {
                    values += ',' + cb[i].value;
                }
            }
            
            if (values) {
                values = values.substring(1);
            }

            return values;
        },
        
        generatelist: function (list1, list2) {
            var values = '';
            if (list1 !== null && list2 !== null) {
                if (list1 !== '') {
                    if (list2 !== '') {
                        values = list1 + ',' + list2;
                    } else {
                        values = list1;
                    }
                } else {
                    values = list2;
                }
            } else {
                values = '';
            }
            return values;
        },
        
        getCheckBoxValue: function (ecb, exercises){
            var cb = document.getElementsByName(ecb);

            if(exercises != null){
                for (var i = 0;i<cb.length;i++){
                    if (exercises.indexOf(cb[i].value) > -1){
                        cb[i].checked = true;
                    } else {
                        cb[i].checked = false;
                    }
                }
            }
        },
        
        replaceAll: function (str, find, replace) {
            return str.replace(new RegExp(find, 'g'), replace);
        }
    };

    /* ======= public functions ======= */
    return {
        launch: function () {
            controller.init();
        }
    };
}());

planner.launch();
