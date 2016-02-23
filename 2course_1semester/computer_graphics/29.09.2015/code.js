//11.142

function makeAllStuff() {
    var strArray = document.getElementById("arrayBox").value.split(" ");
    var intArray = new Array(strArray.length);
    
    for (var i = 0; i < strArray.length; ++i)
        intArray[i] = parseFloat(strArray[i]);
    
    var maxModule = -99999999;
    var flag = -1;
    
    for (var i = 0; i < intArray.length; ++i) {
        if (Math.abs(intArray[i]) > maxModule) {
            maxModule = Math.abs(intArray[i]);
            flag = i;
        }
    }
    
    alert("Maximal absolute element: " + intArray[flag]);
}

function differentElements() {
    var size = document.getElementById("sizeBox").value.split(" ");
    
    var output = document.getElementById("output");
    output.innerHTML = "";
    
    for (var i = 0; i < parseInt(size[0]); ++i) {
        for (var j = 0; j < parseInt(size[1]); ++j) {
            output.innerHTML += "<input id=\"" + i + "," + j + "\" type=\"text\" size=\"5\">";
        }
        
        output.innerHTML += "<br />";
    }
    
    output.innerHTML += "<input type=\"button\" onclick=\"countDifferentElements(" + size[0] + "," + size[1] + ");\" value=\"Count\" />";
}

function countDifferentElements(size0, size1) {
    var different = new Array();
    
    for (var i = 0; i < parseInt(size0); ++i) {
        for (var j = 0; j < parseInt(size1); ++j) {
            var element = document.getElementById(i + "," + j).value;
            
            if (different.indexOf(element) < 0) {
                different.push(element);
            }
        } 
    }
    
    alert(different.length);
}
                
