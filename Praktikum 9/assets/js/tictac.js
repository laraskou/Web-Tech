let output = "";

for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    output += "TicTac ";
  } else if (i % 3 === 0) {
    output += "Tic ";
  } else if (i % 5 === 0) {
    output += "Tac ";
  } else {
    output += i + " ";
  }
}

console.log(output.trim());
