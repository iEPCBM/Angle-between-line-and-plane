/*
 * Copyright 2021 Rishat Kagirov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/

function getVector(a, b) {
  let retVal = [];
  if (a.length!==b.length) {
    throw "getVector: точки a и b имеют разные размерности.";
  }
  for (var i = 0; i < a.length; i++) {
    retVal.push(b[i]-a[i]);
  }
  return retVal;
}

function getNormalOfPlain(a, b, c) {
  let matrixPart = [];
  let vecAB, vecAC;
  let normal = [];
  vecAB = getVector(a, b);
  vecAC = getVector(a, c);

  matrixPart.push(vecAB);
  matrixPart.push(vecAC);
  // i  j k
  // 0  1 2 - 0
  // 0  1 2 - 1
  normal.push(matrixPart[0][1]*matrixPart[1][2]-matrixPart[1][1]*matrixPart[0][2]); //i
  normal.push(matrixPart[0][2]*matrixPart[1][0]-matrixPart[0][0]*matrixPart[1][2]); //j
  normal.push(matrixPart[0][0]*matrixPart[1][1]-matrixPart[1][0]*matrixPart[0][1]); //k
  return normal;
}

function getScalarProduct(vecA, vecB) {
  if (vecA.length!==vecB.length) {
    throw "getScalarProduct: векторы a и b имеют разные размерности.";
  }
  let product = 0;
  for (var i = 0; i < vecA.length; i++) {
    product+=vecA[i]*vecB[i];
  }
  return product;
}

function getVectorLength(vec) {
  let vLen = 0;
  for (var i = 0; i < vec.length; i++) {
    vLen += Math.pow(vec[i], 2);
  }
  return Math.sqrt(vLen);
}
$(document).ready(function() {
  var martix_inputs = [
    [$("#A_X"), $("#A_Y"), $("#A_Z")],
    [$("#B_X"), $("#B_Y"), $("#B_Z")],
    [$("#C_X"), $("#C_Y"), $("#C_Z")],
    [$("#D_X"), $("#D_Y"), $("#D_Z")]
  ];
  function checkData () {
    martix_inputs.forEach((point, i) => {
      point.forEach((item, j) => {
        if (isNaN(parseFloat(item.val()))) {
          return false;
        }
      });
    });
    return true;
  };
  function extractPoints(inputs) {
    let retVal = [];
    inputs.forEach((point, i) => {
      retVal.push([]);
      point.forEach((item, j) => {
        if (isNaN(parseFloat(item.val()))||isNaN(item.val())) {
          throw "Заполните все поля.";
        }
        retVal[i].push(parseFloat(item.val()));
      });
    });
    return retVal;
  }
  $("#bt_calc").click(function() {
    try {
      $("#err_wrapper").html("");
      let points_plain, point_vec_AD, normal, direction_vector, angle;
      points_plain = extractPoints(martix_inputs.slice(0, 3));
      point_vec_AD = extractPoints([martix_inputs[0], martix_inputs[3]]);
      normal = getNormalOfPlain(points_plain[0], points_plain[1], points_plain[2]);
      direction_vector = getVector(point_vec_AD[0], point_vec_AD[1]);
      if (normal.every(item => item === 0)) throw "Модуль нормали плоскости (ABC) равен нулю.";
      if (direction_vector.every(item => item === 0)) throw "Модуль направляющего вектора прямой AD равен нулю. Возможно, координаты точек A и D совпадают.";
      angle = Math.asin(Math.abs(getScalarProduct(normal, direction_vector))
                /(getVectorLength(normal)*getVectorLength(direction_vector)));
      $("#answer_rad_wrapper").html(angle.toString());
      $("#answer_deg_wrapper").html((angle*180/Math.PI).toString());
    } catch (e) {
      $("#err_wrapper").html(e);
    }
  });
});
