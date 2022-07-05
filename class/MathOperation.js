class MathOperation {
  #options = "";

  constructor(options) {
    this.#options = options;
  }

  findRightBracket(array) {
    let countBracketsRigth = 1;
    let indexBracketRigth = 0;

    for (let i = 0; i < array.length; i++) {
      if (array[i] === "(") countBracketsRigth++;

      if (array[i] === ")") countBracketsRigth--;

      if (countBracketsRigth === 0) {
        indexBracketRigth = i;
        break;
      }
    }

    return indexBracketRigth;
  }

  math(str) {
    let array = str.split("");

    while (array.includes("(")) {
      const indexLeftBracket = array.indexOf("(");
      const indexRightBracket = this.findRightBracket(
        array.slice(indexLeftBracket + 1)
      );

      array.splice(
        indexLeftBracket,
        indexRightBracket + 2,
        this.math(
          array
            .slice(
              indexLeftBracket + 1,
              indexRightBracket + 1 + indexLeftBracket
            )
            .join("")
        )
      );
    }

    array = array.join("").split(" ");

    this.#options.forEach((ar) => {
      if (!array.includes(ar[0])) return;
  
      for (let index = 1; index < array.length; index += 2) {
        if (array[index] !== ar[0]) continue;
        
        array.splice(index - 1, 3, ar[1](Number(array[index - 1]), Number(array[index + 1])));
        
        if (!array.includes(ar[0])) break;
  
        index -= 2;
      }
    });

    return parseFloat(array.join(""));
  }
}

export default MathOperation;
