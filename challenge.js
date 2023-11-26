const btnLogout = document.querySelector(".btnLogout");

btnLogout.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "main.html";
    console.log("Redirecting to:", window.location.href);
    localStorage.removeItem("jwt");
  });