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
  $("#bt_calc").click(function() {
    if (!checkData()) {
      $("#err_field").html("Заполните все поля.")
    }
  });
});
