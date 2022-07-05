class HistoryMath {
  static arrayHistoryMath = [];
  static countItem = 0;

  static addMath(elem, str, sum) {
    elem.insertAdjacentHTML(
      "beforeend",
      `<div class="history-math_content__item" data-index="${HistoryMath.countItem}">
      <p class="content_item__button-left content_item__button">${str}</p>
      <p class="content_item__center">=</p>
      <p class="content_item__button-right content_item__button">${sum}</p>
    </div>`
    );

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
