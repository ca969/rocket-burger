class UI {
  constructor() {
    this.reserveForm = document.querySelector(".reserve-main-form");
    this.reserveButton = document.querySelector(".reserve-button");
    this.name = document.getElementById("name");
    this.surname = document.getElementById("surname");
    this.phone = document.getElementById("phone");
    this.email = document.getElementById("email");
  }

  showMessage(message) {
    this.reserveButton.disabled = true;
    let outer = this;
    
    const div = document.createElement("div");

    console.log(message);

    div.className = "display-message";

    div.className = "reserve-message";
    div.style.fontSize = "3vmin";
    div.style.width = "90%";
    div.style.fontWeight = "bold";
    div.style.marginLeft = "auto";
    div.style.marginRight = "auto";
    div.style.fontFamily = "Hind", "sans-serif";
    div.classList.add("animated", "flipInX");

    if (message === "Reservation Successful") {
      div.innerHTML = `<i class="fas fa-check"></i> ${message}`;
      div.style.color = "#22ef0b";
      this.name.value = "";
      this.surname.value = "";
      this.phone.value = "";
      this.email.value = "";

    } else if (
      message === "Please try a different phone number" ||
      message === "Please try a different email"
    ) {
      div.innerHTML = `<i class="far fa-times-circle"></i> ${message}`;
      div.style.color = "#ff0015";
    } else {
      div.innerHTML = `<i class="far fa-times-circle"></i> ${message}`;
      div.style.color = "#ff0015";
    }

    this.reserveForm.appendChild(div);

    setTimeout(function() {
      div.remove();
      outer.reserveButton.disabled = false;
    }, 3000)
  }
}
