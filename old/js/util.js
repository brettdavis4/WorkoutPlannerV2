//Utility functions
function generatelist(list1,list2){
    var values = "";
    if (list1 != null & list2 != null){
        if (list1 != ""){
            if (list2 != ""){
                values = list1 + "," + list2;
            } else {
                values = list1;
            }
        } else {
            values = list2;
        }
    } else{
        values = "";
    }
    return values;
}

function popCheckBox(ediv,earray,ecb){
    var div = document.getElementById(ediv);

    for (var i=0;i< earray.length;i++){
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.id = ecb;
        checkbox.name = ecb;
        checkbox.value = earray[i];
        checkbox.text = earray[i];

        var label = document.createElement('label')
        label.htmlFor = ecb;
        label.appendChild(document.createTextNode(earray[i]));

        var cbdiv = document.createElement('div');

        cbdiv.appendChild(checkbox);
        cbdiv.appendChild(label);
        div.appendChild(cbdiv);
    }
}

function cbValues(cbname){
    var values = "";
    var cb = document.getElementsByName(cbname);

    for (var i = 0;i<cb.length; i++){
        if(cb[i].checked){
            values += ","+ cb[i].value;
        }
    }
    if (values) values = values.substring(1);

    return values;
}

function getCheckBoxValue(ecb, exercises){
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
}
