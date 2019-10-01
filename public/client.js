const ui = new UI();

let name = document.getElementById("name");
let surname = document.getElementById("surname");
let phone = document.getElementById("phone");
let email = document.getElementById("email");

$(".reserve-main-form").on("submit", function() {
  $.ajax({
    type: "POST",
    url: "/check-availability",
    data: $(".reserve-main-form").serialize(),
    success: function(res) {
      ui.showMessage(res.message);
      console.log(res.message);
    }
  });

  return false;

  
});
