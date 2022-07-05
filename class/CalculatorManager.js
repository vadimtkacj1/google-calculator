import Board from "./Board.js";
import Calculator from "./Calculator.js";
import HistoryMath from "./HistoryMath.js";

class CalculatorManager {
  #board = new Board();
  #calculator = "";
  #boardElement = ''

  constructor(options, boardElement = document.body) {
    this.#calculator = new Calculator(options, this.#board);
    this.#boardElement = boardElement;
  }

  #eventHistoryMathResult() {
    this.#board.historyMathContent.addEventListener("click", (event) => {
      const target = event.target;

      if (target.classList.contains('content_item__button-Error')) return;

      const result = HistoryMath.getMathElement(target);

      if (result)
        HistoryMath.eventHistoryMath(
          this.#board,
          this.#calculator,
          result
        );
    });
  }

  #eventHistoryMathHide() {
    document.addEventListener("click", (event) => {
      const target = event.target;

      if (
        (target.closest("." + this.#board.historyMathButton.className) ||
          !target.closest("." + this.#board.historyMath.className)) &&
        !target.closest("." + this.#board.refreshButton.className)
      )
        return (this.#board.historyMath.style.display = "none");
    });
  }

  #eventHistoryMathShow() {
    this.#board.elementEvent.addEventListener("click", (event) => {
      const target = event.target;

      if (target.closest("." + this.#board.refreshButton.className))
        this.#board.historyMath.style.display = "flex";
    });
  }

  #eventCalculator() {
    this.#board.elementEvent.addEventListener("click", (event) => {
      const target = event.target;

      if (!target.closest("button")) return;

      const lastSymbolMathStr =
        this.#calculator.mathStr[this.#calculator.lengthMathStr - 1];

      this.#board.cleanElement.textContent = "CE";

      if (target.className === "clean") {
        this.#calculator.isClean();
      }

      if (
        this.#calculator.lengthMathStr > 2 &&
        lastSymbolMathStr === " " &&
        isNaN(
          Number(this.#calculator.mathStr[this.#calculator.lengthMathStr - 2])
        ) &&
        target.className === "operators"
      ) {
        this.#calculator.substituteOperators(target);
      }

      if (target.className === "numbers") {
        this.#calculator.isNumbers(target);
      }

      if (target.className === "interest") {
        this.#calculator.isInterest(target);
      }

      if (
        target.className === "operators" &&
        lastSymbolMathStr !== "-" &&
        lastSymbolMathStr !== " "
      ) {
        this.#calculator.isOperators(target);
      }

      if (target.className === "brackets") {
        this.#calculator.isBrackets(target);
      }

      if (target.className === "sum") {
        this.#calculator.isSum();
      }
    });
  }

  init() {
    this.#boardElement.insertAdjacentHTML("beforeend", this.#board.init());

    this.#eventHistoryMathResult();

    this.#eventHistoryMathHide();

    this.#eventHistoryMathShow();

    this.#eventCalculator();
  }
}

export default CalculatorManager;
