let resault = [];
let funvalue = ["AC", "Del", "="];
function modfie(arg) {
  console.log(resault.length);
  console.log(resault);
  fontSizeDisplay(resault.length, resault);
  resault.push(arg);
  if (valueTest(resault)) {
    DispalyString(resault);
  }
}

function DispalyString() {
  document.getElementById("display").innerHTML = resault.join("").toString();
}
function valueTest(argument) {
  if (funvalue.some((V) => argument.includes(V))) {
    valueChecker(argument);
    return false;
  } else {
    return true;
  }
}
function valueChecker(argument) {
  if (argument.includes(funvalue[0])) {
    Allclear(argument);
  } else if (argument.includes(funvalue[1])) {
    delet(argument);
  } else if (argument.includes(funvalue[2])) {
    calculateArg(argument);
  }
}
//================================================================
function ArrayCorrection(arg) {
  for (var i = 0; i < arg.length; i++) {
    var test = parseInt(arg[i]);
    if (!isNaN(test)) {
      arg[i] = test;
    }
    if (arg[i] == "x") {
      arg[i] = "*";
    }
  }
}
function persentageControl(argument) {
  for (var i = 0; i < argument.length; i++){
    if(argument[i] == "%"){
      argument[i-1] = argument[i-1] * 0.01;
      if(typeof(argument[i+1]) == "number"){
        argument[i] = "*";
      }
      else{
        argument.splice(i,1);
      }
    }
  }
}
function calculaterlogic(OprationArr) {
  let OprationString = ["+", "-", "*", "/", "%", "."];
  let state = "";
  let i = 1;
  let pastOpration;
  if (typeof OprationArr[0] === "number") {
    state = "iscorrect";
    while (i < OprationArr.length || state == "iscoorrect") {
      if (OprationString.includes(OprationArr[i])) {
        if (
          OprationArr[i] == "%" &&
          typeof OprationArr[i - 1] === "number" &&
          OprationArr[i + 1] != "."
        ) {
          state = "iscorrect";
        } else if (
          OprationString.includes(OprationArr[i + 1]) ||
          OprationArr[i + 1] === undefined
        ) {
          state = "error";
        } else if (OprationArr[i] == "." && pastOpration == ".") {
          state = "error";
        } else {
          state = "iscorrect";
        }
        pastOpration = OprationArr[i];
      }
      i++;
    }
  } else {
    return "error";
  }
  return state;
}
function calculaterArryfliter(OprationArr) {
  let Oprand = "";
  let Newarry = [];
  let OprationString = ["+", "-", "*", "/", "%"];
  if (calculaterlogic(OprationArr) == "iscorrect") {
    for (var i = 0; i < OprationArr.length; i++) {
      console.log(Oprand);
      if (
        OprationString.includes(OprationArr[i]) ||
        OprationArr[i + 1] === undefined
      ) {
        if (OprationArr[i + 1] === undefined) {
          Oprand = Oprand + OprationArr[i].toString();
          Newarry.push(Oprand);
          Oprand = "";
        } else {
          Newarry.push(Oprand);
          Newarry.push(OprationArr[i]);
          Oprand = "";
        }
      } else if (typeof OprationArr[i] === "number" || OprationArr[i] == ".") {
        Oprand = Oprand + OprationArr[i].toString();
      }
    }
  }
  return Newarry;
}
function calculationingStatment(OprationArr, i) {
  switch (OprationArr[i]) {
    case "/":
      return Number(OprationArr[i - 1]) / Number(OprationArr[i + 1]);
      break;
    case "*":
      return Number(OprationArr[i - 1]) * Number(OprationArr[i + 1]);
      break;
    case "-":
      return Number(OprationArr[i - 1]) - Number(OprationArr[i + 1]);
      break;
    case "+":
      return Number(OprationArr[i - 1]) + Number(OprationArr[i + 1]);
    default:
      return false;
      break;
  }
}
function ResaultLogic(OprationArr) {
  console.log(OprationArr);
  for (var i = 0; i < OprationArr.length; i++) {
    if (OprationArr[i] == "/" || OprationArr[i] == "*") {
      OprationArr[i] = calculationingStatment(OprationArr, i);
      console.log(OprationArr);
      OprationArr.splice(i - 1, 1);
      OprationArr.splice(i, 1);
    }
  }
  for (var i = 0; i < OprationArr.length; i++) {
    if (OprationArr[i] == "-" || OprationArr[i] == "+") {
      OprationArr[i] = calculationingStatment(OprationArr, i);
      console.log(OprationArr);
      OprationArr.splice(i - 1, 1);
      OprationArr.splice(i, 1);
    }
  }
  return OprationArr;
}
//================================================================
function calculateArg(argument) {
  argument.pop();
  ArrayCorrection(argument);
  persentageControl(argument);
  let TheResault = ResaultLogic(calculaterArryfliter(argument));
  console.log(TheResault);
  resaultdisplay(TheResault[0].toString());
}
function resaultdisplay(argument) {
  document.getElementById("result").innerHTML = argument;
}
function delet() {
  resault.splice(-2, 2);
  DispalyString(resault);
}
function Allclear() {
  resault = [];
  DispalyString(resault);
  resaultdisplay(0)
}
function fontSizeDisplay(length, arg) {
  // if(length >= 15){
  //     console.log(length);
  //     let fontsizefactor =  40-(6+(length - 16));
  //     document.getElementById('display').style.fontSize = String(fontsizefactor)+"px";
  //     console.log(fontsizefactor);
  // }
  if (length >= 15) {
    resaultdisplay("overflow");
    arg.pop();
  }
}
