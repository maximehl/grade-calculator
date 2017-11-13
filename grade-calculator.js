var categoryGrades = [5, 4, 3, 2, 1];
var categoryWeights = [5, 4, 3, 2, 1];
var finalWeight;
var currentGrade;
var gradeWanted;
var errorCode;
var errorMessages = ["Weights of grade categories must have a numerical value.",
    "Grade categories cannot have negative weights.",
    "The weights of the grade categories must add up to 100%.",
    "Grades must have a numerical value.",
    "You cannot have a negative grade.",
    "This calculator does not work with grades over 110%.",
    "Your desired grade must have a numerical value.",
    "I certainly hope you have higher goals than a negative grade in a class.",
    "If your final has zero weight, you already know your grade."];

function calculateCurrentGrade(){
    currentGrade = 0;
    for(var i = 0; i<5; i++){
        currentGrade+=(categoryGrades[i]*categoryWeights[i])/(100-finalWeight);
    }
    return currentGrade;
}

function displayCurrentGrade(){
    grabCheckData();
    if(errorCode===true||errorCode===8){
        document.getElementById("warning-image").style.display = "none";
        document.getElementById("error-div").innerHTML = "";
        document.getElementById("results").innerHTML = "<tr><th>Your Current Grade</th></tr>" +
            "<tr><td>" + calculateCurrentGrade().toString() + "</td></tr>";
    }
}

function calculateGradeNeeded(){
    grabCheckData();
    var gradeNeeded =  (((gradeWanted*100) - (calculateCurrentGrade()*(100-finalWeight)))/finalWeight).toString();
    var messages = ["Why are you even here? There&#8217s no possible way for you to not get a " + gradeWanted + ".",
        "OK, you can probably guess at random on the test and still get a " + gradeWanted + ".",
        "You can really just relax and coast through this. That " + gradeWanted + " is completely within reach.",
        "You don&#8217t need to worry about it. Just get a good night&#8217s rest before the test and you can easily get a " +
        gradeWanted + "in the class.",
        "You can totally get that " + gradeWanted + "! Just study for an hour or two and you&#8217ll be fine.",
        "OK, it&#8217s definitely possible for you to get a " + gradeWanted + "if you&#8217re on top of your game." +
        "Study hard, and good luck!",
        "Well... it&#8217s technically possible to get a " + gradeWanted + ", at least. Best of luck, you&#8217ll need it.",
        "You had better BEG your teacher for extra credit."];
    var cutoffs = [0, 25, 50, 70, 90, 98, 100];
    var encouragement = 0;
    while(gradeNeeded>cutoffs[encouragement]&&encouragement<7){
        encouragement++;
    }
    if(errorCode===true){
        document.getElementById("results").innerHTML = "<tr><th>The Final Grade You Need <br> (to keep a " +
            gradeWanted.toString() + ")</th></tr>" + "<tr><td><span title='" + messages[encouragement] + "'>" +
            gradeNeeded + " or higher</span></td></tr>";
    }
}

function grabCheckData(){
    var i;
    errorCode = true;

    for(i = 0; i<5; i++){
        categoryGrades[i] = parseInt(document.getElementById("grade-" + i).value);
        if(categoryGrades[i].toString()==="NaN"){
            errorCode = 3;
        }else if(categoryGrades[i]<0){
            errorCode = 4;
        }else if(categoryGrades[i]>110){
            errorCode = 5;
        }
    }

    finalWeight = parseInt(document.getElementById("weight-5").value);
    if(finalWeight.toString()==="NaN"){
        errorCode = 0;
    }else if(finalWeight<0){
        errorCode = 1;
    }else if(finalWeight===0){
        errorCode = 8;
    }
    var sumWeights = finalWeight;
    for(i = 0; i<5; i++){
        categoryWeights[i] = parseInt(document.getElementById("weight-" + i).value);
        if(categoryWeights[i].toString()==="NaN"){
            errorCode = 0;
        }else if(sumWeights+categoryWeights[i]>=sumWeights){
            sumWeights += categoryWeights[i];
        }else{
            errorCode = 1;
        }
    }
    if(sumWeights!==100){
        errorCode = 2;
    }

    gradeWanted = parseInt(document.getElementById("desired-grade").value);
    if(gradeWanted.toString()==="NaN"){
        errorCode = 6;
    }else if(gradeWanted<0){
        errorCode = 7;
    }

    if(errorCode!==true){
        document.getElementById("warning-image").style.display = "inline";
        document.getElementById("results").innerHTML = "";
        document.getElementById("error-div").innerHTML = "<h4>We're sorry, the grade calculator encountered an error:" +
            "</h4>" + errorMessages[errorCode];
    }else{
        document.getElementById("warning-image").style.display = "none";
        document.getElementById("error-div").innerHTML = "";
    }
    document.getElementById("results-div").style.display = "inline-block";
}

function colorRow(rowID, hover){
    var gradeValue = parseInt(document.getElementById(rowID.substring(0,7)).value);
    var cutoffs = [50, 70, 85, 100];
    var colors = ["rgba(255, 0, 0, " + hover + ")", "rgba(255, 255, 0, " + hover + ")",
        "rgba(0, 204, 0, " + hover + ")", "rgba(153, 51, 255, " + hover + ")"];
    var item = 3;
    while(gradeValue<cutoffs[item] && item>0){
        item--;
    }
    document.getElementById(rowID).style.backgroundColor = colors[item];
}

function startupColor(){
    for(var i = 0; i<5; i++){
        colorRow("grade-" + i + "-row", 0.4);
    }
}