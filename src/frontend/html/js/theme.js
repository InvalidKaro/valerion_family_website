
(
    function setThemeMode() {
      var x = localStorage.getItem("preferredmode");
      var y = localStorage.getItem("preferredpagemode");  
      if (x == "dark") {
        document.body.className += " darktheme";
      }
      if (y == "dark") {
        document.body.className += " darkpagetheme";
      }
    }
)();
    