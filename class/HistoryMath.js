class HistoryMath {
  static arrayHistoryMath = [];
  static countItem = 0;

  static addMath(elem, str, sum) {
    const div = document.createElement("div");
    div.classList.add("history-math_content__item");
    div.dataset.index = HistoryMath.countItem;

    const pLeft = document.createElement("p");
    pLeft.textContent = str;
    pLeft.classList.add("content_item__button-left");
    pLeft.classList.add("content_item__button");

    const pCenter = document.createElement("p");
    pCenter.classList.add("content_item__center");
    pCenter.textContent = "=";

    const pRight = document.createElement("p");

    if (sum === undefined) {
      sum = "Error";
      pRight.classList.add("content_item__button-Error");
    }

    pRight.classList.add("content_item__button-right");
    pRight.classList.add("content_item__button");
    pRight.textContent = sum;

    div.append(pLeft, pCenter, pRight);

    elem.append(div);

    HistoryMath.arrayHistoryMath.push([str, sum]);

    HistoryMath.countItem += 1;
  }

  static getMathElement(elem) {
    const index = elem.parentElement.dataset.index;

    if (elem.classList.contains("content_item__button-left"))
      return HistoryMath.arrayHistoryMath[index][0];

    if (elem.classList.contains("content_item__button-right"))
      return HistoryMath.arrayHistoryMath[index][1];
  }

  static eventHistoryMath(board, calculator, result) {
    board.fieldSecond.textContent = "Ans = " + calculator.prevSum;

    const strResult = String(result);
    const arrayResult = strResult.split("");

    board.fieldFirst.textContent = result;
    calculator.mathStr = "";

    if (arrayResult.length !== 1) calculator.mathStr = strResult;

    board.historyMath.style.display = "none";
  }
}

export default HistoryMath;
