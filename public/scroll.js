// JQuery for Smooth Scroll
$("nav ul li a, .buttons-parent a, .logo-link").on("click", function(e) {
  if(this.hash !== "") {
      e.preventDefault();

      const hash = this.hash;

      $("html, body").animate({
          scrollTop: $(hash).offset().top
      }, 800);
  }
});