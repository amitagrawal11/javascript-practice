/* 

      1 2 3 4 5
1.    * * * * * 
2.    * * * * *
3.    * * * * *
4.    * * * * *
5.    * * * * *

*/

/* 
      1 2 3 4 5
1.    *
2.    * *
3.    * * *
4.    * * * *
5.    * * * * *

Formula:
no of cols = no of rows

Rules: n - 5 

1. No of rows - n 
2. no of columns - n ()
3. no of star/number 

Algo:
1. rows - outer loop 

*/

function pattern1(n) {
  let str = "";
  for (let row = 1; row <= n; row++) {
    for (let col = 1; col <= n; col++) {
      str += "* ";
    }
    str += "\n";
  }
  console.log(str);
}

function pattern2(n) {
  let str = "";
  for (let row = 1; row <= n; row++) {
    for (let col = 1; col <= row; col++) {
      str += "* ";
    }
    str += "\n";
  }
  console.log(str);
}

/* N - 5, cols -> 2n-1 = 2*5-1 = 9

sp = n - row
r = (st + sp) + k 
1 1 4       *
2 3 3     * * *
3 5 2   * * * * *
4 7 1  *   *   *   *
5 9 0 *   *   *   *   *

Approach - 
1. different for loop for spaces and star
2. 

noOfCols = 

*/
// n2 ,- O(n2)
function pattern3(n) {
  let str = "";
  for (let row = 1; row <= n; row++) {
    // print star
    // row = 1, col =1, noOfSpaces = n -r
    for (let col = 1; col <= n; col++) {
      // space
      if (col <= n - row) {
        str += " ";
      } else {
        // star
        str += "* ";
      }
    }
    str += "\n";
  }
  console.log(str);
}

pattern3(5);

console.log();
