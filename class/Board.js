class Board {
  #name = "";

  get nameSelector() {
    return "." + this.#name;
  }

  get elementEvent() {
    return document.querySelector(this.nameSelector);
  }

  get cleanElement() {
    return this.elementEvent.querySelector(".clean");
  }

  get fieldFirst() {
    return this.elementEvent.querySelector(".field");
  }

  get fieldSecond() {
    return this.elementEvent.querySelector(".field-2");
  }

  get historyMath() {
    return this.elementEvent.querySelector(".history-math");
  }

  get historyMathContent() {
    return this.historyMath.querySelector(".history-math_content");
  }

  get refreshButton() {
    return this.elementEvent.querySelector(".refresh-button");
  }

  get historyMathButton() {
    return this.historyMath.querySelector(".history-math_button");
  }

  get historyMathContentText() {
    return this.historyMath.querySelector('.history-math_content__text')
  }

  constructor(name = "calculator") {
    this.#name = name;
  }

  init() {
    return `<div class="${this.#name}">
    <div class="history-math">
<span class="history-math_button"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></svg></span>
<div class="history-math_content">
<div class="history-math_content__text">Ваші обчислення й результати з’являються тут, тож їх можна використовувати повторно  </div>
</div>
</div>
        <div class="wrapper-window__sum">
        <div class="window__sum">
        <span class="refresh-button"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></svg></span>
          <span class="field-2"></span>
          <span class="field" data-value="0">0</span>
        </div>
        </div>
        <span class="boxs">
          <div class="box">
            <button class="brackets" data-value="(">(</button>
            <button class="brackets" data-value=")">)</button>
            <button class="interest" data-value="%">%</button>
            <button class="clean" data-value="AC">AC</button>
          </div>
          <div class="box">
            <button class="numbers" data-value="7">7</button>
            <button class="numbers" data-value="8">8</button>
            <button class="numbers" data-value="9">9</button>
            <button class="operators" data-value="÷">÷</button>
          </div>
          <div class="box">
            <button class="numbers" data-value="4">4</button>
            <button class="numbers" data-value="5">5</button>
            <button class="numbers" data-value="6">6</button>
            <button class="operators" data-value="×">×</button>
          </div>
          <div class="box">
            <button class="numbers" data-value="1">1</button>
            <button class="numbers" data-value="2">2</button>
            <button class="numbers" data-value="3">3</button>
            <button class="operators" data-value="-">-</button>
          </div>
          <div class="box"> 
            <button class="numbers" data-value="0">0</button>
            <button class="numbers" id="point" data-value=".">.</button>
            <button class="sum" data-value="=">=</button>
            <button class="operators" data-value="+">+</button>
          </div>
        </span>
      </div>`;
  }
}

export default Board;
