// Nice Select JS
$("select").niceSelect();

// Menu Collapse
document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.getElementsByClassName("menu-collapse-button");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      // Loop through all buttons and their respective contents
      for (var j = 0; j < buttons.length; j++) {
        var content = buttons[j].nextElementSibling;
        // Close all sections except the clicked one
        if (buttons[j] !== this) {
          buttons[j].classList.remove("active");
          content.style.maxHeight = null;
        }
      }

      // Toggle the active class on the clicked button
      this.classList.toggle("active");

      // Toggle the max-height of the associated content
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
});
