import MathOperation from "./MathOperation.js";
import HistoryMath from "./HistoryMath.js";

class Calculator {
  get lengthMathStr() {
    return this.#mathStr.length;
  }

  get mathStr() {
    return this.#mathStr;
  }

  get prevSum() {
    return this.#prevSum;
  }

  set mathStr(str) {
    this.#mathStr = str;
  }

  #mathStr = "";
  #prevSum = 0;
  #bracketsRightStr = "";
  #board = "";
  #mathOperation = "";

  constructor(options, board) {
    this.#mathOperation = new MathOperation(options);
    this.#board = board;
  }

  isAddRigthBrackets(elem) {
    if (this.#bracketsRightStr.length === 0) return;

    elem.insertAdjacentHTML(
      "beforeend",
      `<span class="bracketsRight">${this.#bracketsRightStr}</span>`
    );
  }

  preparationStr(str) {
    return str
      .split("")
      .map((elem, index) => {
        const symbolBeforElement = this.#mathStr[index - 1];
        const symbolAfterElement = this.#mathStr[index + 1];

        if (
          elem === "-" &&
          symbolAfterElement == "(" &&
          index !== this.lengthMathStr - 1
        )
          return elem + "1";

        if (
          elem === "(" &&
          symbolBeforElement !== " " &&
          index !== 0 &&
          symbolBeforElement !== ")" &&
          symbolBeforElement !== "("
        )
          return " × " + elem;
        if (
          elem === ")" &&
          symbolAfterElement !== " " &&
          index !== this.lengthMathStr - 1 &&
          symbolAfterElement !== ")" &&
          symbolAfterElement !== "%"
        )
          return elem + " × ";

        return elem;
      })
      .join("");
  }

  checkBracketsInStr(str) {
    if (!str) return "";

    return str.split("").includes("(")
      ? str
          .split("")
          .slice(str.lastIndexOf("(") + 1)
          .join("")
      : str;
  }

  isInterest(elem) {
    this.#board.fieldSecond.textContent = "Ans = " + this.#prevSum;

    const valueElement = elem.dataset.value;
    const lastSymbolMathStr = this.#mathStr[this.lengthMathStr - 1];
    const arrayMathStr = this.#mathStr.split(" ");
    const lastElementMathStr = this.#mathStr.split(" ").pop();
    const prevLastElementMathStr =
      arrayMathStr.length > 2
        ? arrayMathStr[arrayMathStr.length - 3]
        : arrayMathStr.pop();
    const countInterestLastElem = this.checkBracketsInStr(lastElementMathStr)
      .split("")
      .filter((elem) => elem === "%").length;
    const countInterestPrevLastElem = this.checkBracketsInStr(
      prevLastElementMathStr
    )
      .split("")
      .filter((elem) => elem === "%").length;

    if (countInterestLastElem > 5) return;

    if (countInterestPrevLastElem > 5 && lastSymbolMathStr === " ") return;

    if (lastSymbolMathStr === "(") return;

    if (this.lengthMathStr !== 0 && lastSymbolMathStr !== " ")
      this.#mathStr += valueElement;

    if (this.lengthMathStr === 0) this.#mathStr = "0" + valueElement;

    if (lastSymbolMathStr === " " && this.lengthMathStr !== 0)
      this.#mathStr =
        this.#mathStr.slice(0, this.#mathStr.length - 3) + valueElement;

    this.#board.fieldFirst.textContent = this.#mathStr;
    this.isAddRigthBrackets(this.#board.fieldFirst);
  }

  isBrackets(elem) {
    this.#board.fieldSecond.textContent = "Ans = " + this.#prevSum;

    const lastSymbolMathStr = this.#mathStr[this.lengthMathStr - 1];
    const valueElement = elem.dataset.value;
    const lengthBracketsLeft = this.#mathStr
      .split("")
      .filter((elem) => elem === "(").length;
    const lengthBracketsRight = this.#mathStr
      .split("")
      .filter((elem) => elem === ")").length;
    const booleanValueElementBrackets = valueElement === ")";

    if (lastSymbolMathStr === " " && booleanValueElementBrackets) return;

    if (lastSymbolMathStr === "-" && booleanValueElementBrackets) return;

    if (
      valueElement === "(" &&
      ((this.lengthMathStr === 1 && lastSymbolMathStr !== "0") ||
        this.lengthMathStr > 1)
    ) {
      this.#mathStr += valueElement;
      this.#bracketsRightStr += ")";
    }

    if (
      valueElement === "(" &&
      (this.lengthMathStr === 0 ||
        (this.lengthMathStr === 1 && lastSymbolMathStr === "0"))
    ) {
      this.#mathStr = valueElement;
      this.#bracketsRightStr += ")";
    }

    if (
      valueElement === ")" &&
      lengthBracketsLeft > lengthBracketsRight &&
      lastSymbolMathStr !== "("
    ) {
      this.removeElementBracketsRightStr();
      this.#mathStr += elem.dataset.value;
    }

    if (this.lengthMathStr === 0) this.#mathStr = "0";

    this.#board.fieldFirst.textContent = this.#mathStr;
    this.isAddRigthBrackets(this.#board.fieldFirst);
  }

  removeElementBracketsRightStr() {
    this.#bracketsRightStr = this.#bracketsRightStr.slice(
      0,
      this.#bracketsRightStr.length - 1
    );
  }

  animationFieldInSum() {
    this.#board.fieldSecond.style.fontSize = "30px";
    this.#board.fieldSecond.style.color = "#202124";
    this.#board.fieldFirst.style.top = "30px";

    setTimeout(() => {
      this.#board.fieldSecond.style.fontSize = "15px";
      this.#board.fieldSecond.style.color = "#858585";
      this.#board.fieldFirst.style.top = "0px";
    }, 70);
  }

  isSum() {
    const lastSymbolMathStr = this.#mathStr[this.lengthMathStr - 1];
    const mathStrFindLeftBracket = this.#mathStr.split("").includes("(");

    this.animationFieldInSum();

    if (lastSymbolMathStr === "(") return;

    if (lastSymbolMathStr === " ") return;

    if (lastSymbolMathStr === "-") return;

    this.#board.cleanElement.textContent = "AC";

    if (this.lengthMathStr === 0)
      return (this.#board.fieldFirst.textContent = this.#prevSum);

    this.#board.fieldSecond.textContent =
      this.#mathStr + this.#bracketsRightStr + " =";

    this.#mathStr += this.#bracketsRightStr;

    const strHistoryMath = this.#mathStr;

    if (mathStrFindLeftBracket)
      this.#mathStr = this.preparationStr(this.#mathStr);

    if (this.#mathStr.includes("%"))
      this.#mathStr = this.interestMath(this.#mathStr);

    if (this.#mathStr.split(" ").length > 1 || mathStrFindLeftBracket)
      this.#mathStr = String(this.#mathOperation.math(this.#mathStr));

    this.#prevSum = this.rounding(String(Number(this.#mathStr)));

    this.#board.fieldFirst.textContent = this.rounding(
      String(Number(this.#mathStr))
    );

    if (this.#board.historyMathContentText)
      this.#board.historyMathContentText.remove();
      HistoryMath.addMath(
      this.#board.historyMathContent,
      strHistoryMath,
      this.#prevSum
    );
    this.#bracketsRightStr = "";
    this.#mathStr = "";
  }

  interestMath(str) {
    return str
      .split(" ")
      .map((elem) => {
        const indexInterest = elem.indexOf("%");
        const booleanInterest = elem.includes("%");
        const booleanBracket = elem.includes(")");
        const countInterest = elem
          .split("")
          .filter((elem) => elem === "%").length;

        if (
          booleanInterest &&
          ((elem[indexInterest - 1] === ")" && indexInterest !== 0) ||
            !booleanBracket)
        ) {
          return elem.slice(0, indexInterest) + " ÷ " + 100 ** countInterest;
        }

        if (booleanInterest && booleanBracket) {
          return (
            elem.slice(0, indexInterest) +
            " ÷ " +
            100 ** countInterest +
            elem.slice(elem.indexOf(")"))
          );
        }

        return elem;
      })
      .join(" ");
  }

  rounding(str) {
    const arrayStr = str.split("");
    const indexSymbolE = arrayStr.indexOf("e");
    const findSymbolE = arrayStr.includes("e");
    const findSymbolPoint = arrayStr.includes(".");
    const findSymbolMinus = arrayStr.includes("-");

    if (
      arrayStr.length > 13 &&
      !findSymbolE &&
      findSymbolPoint &&
      findSymbolMinus
    ) {
      return str.slice(0, 14);
    }

    if (
      arrayStr.length > 13 &&
      !findSymbolE &&
      findSymbolPoint &&
      !findSymbolMinus
    )
      return str.slice(0, 13);

    if (findSymbolE && findSymbolPoint && arrayStr.length > 13)
      return (
        str.slice(0, 14 - (arrayStr.length - indexSymbolE + 1)) +
        str.slice(indexSymbolE)
      );

    return str;
  }

  isClean() {
    this.#board.fieldSecond.textContent = "Ans = " + this.#prevSum;

    const lastSymbolMathStr = this.#mathStr[this.lengthMathStr - 1];
    let countElement = 1;

    if (lastSymbolMathStr === "(") {
      this.removeElementBracketsRightStr();
    }

    if (lastSymbolMathStr === ")") {
      this.#bracketsRightStr += ")";
      this.#mathStr = this.#mathStr.slice(0, this.lengthMathStr - 1);
      this.#board.fieldFirst.textContent = this.#mathStr;
      this.isAddRigthBrackets(this.#board.fieldFirst);
      return;
    }

    if (lastSymbolMathStr === " ") countElement = 3;

    if (this.lengthMathStr <= 1) {
      this.#mathStr = "0";
    }

    if (this.lengthMathStr > 1)
      this.#mathStr = this.#mathStr.slice(0, this.lengthMathStr - countElement);

    this.#board.fieldFirst.textContent = this.#mathStr;
    this.isAddRigthBrackets(this.#board.fieldFirst);
  }

  isNumbers(elem) {
    this.#board.fieldSecond.textContent = "Ans = " + this.#prevSum;

    const lastElementMathStr = this.#mathStr.split(" ").pop();
    const elemWorking = lastElementMathStr.split("").includes("(")
      ? lastElementMathStr
          .split("")
          .slice(lastElementMathStr.split("").lastIndexOf("(") + 1)
          .join("")
      : lastElementMathStr;
    const lastSymbolMathStr = this.#mathStr[this.lengthMathStr - 1];
    const searchPoint = elemWorking.includes(".");
    const valueElement = elem.dataset.value;

    if (
      elemWorking.length > 12 &&
      valueElement !== "." &&
      !searchPoint &&
      lastSymbolMathStr &&
      lastSymbolMathStr !== "%"
    )
      return;

    if (
      elemWorking.length >
        12 + this.#mathStr.slice(0, elemWorking.indexOf(".")).length + 1 &&
      searchPoint &&
      lastSymbolMathStr &&
      lastSymbolMathStr !== "%"
    )
      return;

    if (valueElement === "." && searchPoint) return;

    if (valueElement === "." && this.#mathStr.split("").length === 0)
      this.#mathStr += 0;

    if (
      (lastSymbolMathStr === "0" ||
        (this.lengthMathStr === 0 && valueElement === "0")) &&
      !searchPoint &&
      valueElement !== "." &&
      elemWorking.length === 1
    ) {
      this.#mathStr =
        this.#mathStr.slice(0, this.#mathStr.length - 1) + valueElement;
      this.#board.fieldFirst.textContent = this.#mathStr;
      this.isAddRigthBrackets(this.#board.fieldFirst);
      return;
    }

    if (lastSymbolMathStr !== "%") this.#mathStr += valueElement;

    if (lastSymbolMathStr === "%") this.#mathStr += " × " + valueElement;

    this.#board.fieldFirst.textContent = this.#mathStr;
    this.isAddRigthBrackets(this.#board.fieldFirst);
  }

  isOperators(elem) {
    this.#board.fieldSecond.textContent = "Ans = " + this.#prevSum;

    const valueElement = elem.dataset.value;
    const lastSymbolMathStr = this.#mathStr[this.lengthMathStr - 1];

    if (lastSymbolMathStr === "(") {
      if (valueElement === "-") this.#mathStr += valueElement;
      this.#board.fieldFirst.textContent = this.#mathStr;
      this.isAddRigthBrackets(this.#board.fieldFirst);
      return;
    }

    if (
      ((this.lengthMathStr === 1 && lastSymbolMathStr === "0") ||
        this.lengthMathStr === 0) &&
      valueElement === "-" &&
      this.#prevSum === 0
    ) {
      this.#mathStr = valueElement;
      this.#board.fieldFirst.textContent = this.#mathStr;
      return;
    }

    if (this.lengthMathStr === 0) this.#mathStr += this.#prevSum;

    this.#mathStr += " " + valueElement + " ";

    this.#board.fieldFirst.textContent = this.#mathStr;
    this.isAddRigthBrackets(this.#board.fieldFirst);
  }

  substituteOperators(elem) {
    this.#board.fieldSecond.textContent = "Ans = " + this.#prevSum;

    const valueElement = elem.dataset.value;
    const secondLastElemMathStr = this.#mathStr[this.lengthMathStr - 2];

    if (
      valueElement === "-" &&
      secondLastElemMathStr !== "-" &&
      secondLastElemMathStr !== "+"
    )
      this.#mathStr += valueElement;

    if (this.#mathStr[this.#mathStr.length - 1] !== "-")
      this.#mathStr =
        this.#mathStr.slice(0, this.lengthMathStr - 3) +
        " " +
        valueElement +
        " ";

    this.#board.fieldFirst.textContent = this.#mathStr;
    this.isAddRigthBrackets(this.#board.fieldFirst);
  }
}

export default Calculator;
