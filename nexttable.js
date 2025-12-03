/** Main Algorithm **/
function nexttable(input) {
  // Clears the result area
  document.getElementById("result").innerHTML = "";

  // Split Input into an Array 
  var A = input.split("");
  // Removed addLine(A) here so we can show it in the table instead

  // Next table logic
  var B = new Array(A.length);

  if (A.length > 0) B[0] = -1; // Safety check for empty input
  if (A.length > 1) B[1] = (A[1] == A[0]) ? -1 : 0;

  for (var failPos = 2; failPos < A.length; failPos++) {
    var flag = false;

    for (var i = 1; i < failPos; i++) {
      var subA = A.slice(i, failPos);
      var subB = A.slice(0, subA.length);

      var same = compareStrArray(subA, subB);

      if (same) {
        if (A[failPos] !== A[subA.length]) {
          B[failPos] = subA.length;
          flag = true;
          break;
        } else if (subB.length === 1 && subB[0] !== A[failPos]) {
          B[failPos] = 0;
          flag = true;
          break;
        } else {
          continue;
        }
      } else {
        if (subB.length === 1 && subB[0] !== A[failPos]) {
          B[failPos] = 0;
          flag = true;
          break;
        } else {
          continue;
        }
      }
    }

    if (!flag) B[failPos] = -1;
  }

  // Instead of displayArray, we call the table generator
  generateTable(A, B);
}

/** Helper Functions **/
function compareStrArray(arrA, arrB) {
  if (arrA.length != arrB.length) {
    return false;
  } else {
    for (var i = 0; i < arrA.length; i++) {
      if (arrA[i] !== arrB[i]) {
        return false;
      }
    }
    return true;
  }
}

// New function to create the HTML table
function generateTable(patternArr, nextArr) {
  var resultDiv = document.getElementById("result");
  var table = document.createElement("table");

  // Row 1: Indices
  var trIndex = document.createElement("tr");
  var thIndex = document.createElement("th");
  thIndex.innerText = "Index";
  trIndex.appendChild(thIndex);
  
  for (var i = 0; i < patternArr.length; i++) {
    var td = document.createElement("td");
    td.innerText = i;
    td.style.color = "#888"; // Make index numbers slightly lighter
    trIndex.appendChild(td);
  }
  table.appendChild(trIndex);

  // Row 2: Pattern Char
  var trChar = document.createElement("tr");
  var thChar = document.createElement("th");
  thChar.innerText = "Pattern";
  trChar.appendChild(thChar);

  for (var i = 0; i < patternArr.length; i++) {
    var td = document.createElement("td");
    td.innerText = patternArr[i];
    td.style.fontWeight = "bold"; // Emphasize the pattern
    trChar.appendChild(td);
  }
  table.appendChild(trChar);

  // Row 3: Next Values
  var trNext = document.createElement("tr");
  var thNext = document.createElement("th");
  thNext.innerText = "Next";
  trNext.appendChild(thNext);

  for (var i = 0; i < nextArr.length; i++) {
    var td = document.createElement("td");
    td.innerText = nextArr[i];
    td.style.color = "#007bff"; // Blue color for the results
    trNext.appendChild(td);
  }
  table.appendChild(trNext);

  resultDiv.appendChild(table);
}
