function getVector(a, b) {
  let retVal = []
  if (a.length!===b.length) {
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
  try {
    vecAB = getVector(a, b);
    vecAC = getVector(a, c);
  } catch (e) {
    console.log(e);
  }
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
        if (parseInt(item.val())==NaN) {
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
        retVal[i].push(parseInt(item.val()));
      });
    });
    console.log(retVal);
    return retVal;
  }
  $("#bt_calc").click(function() {
    if (!checkData()) {
      $("#err_field").html("Заполните все поля.");
      return;
    }
    let points_plain;
    points_plain = extractPoints(martix_inputs.slice(0, 3));
    point_vec_AD = extractPoints([martix_inputs[0], martix_inputs[3]]);
    getNormalOfPlain(points_plain[0], points_plain[1], points_plain[2]);
  });
});
