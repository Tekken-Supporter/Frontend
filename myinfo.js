var jwt = localStorage.getItem("jwt");
if (jwt == null) {
  window.location.href = "./myinfo.html";
}

function loadUser() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://34.168.80.42:3000/user/info");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      if (objects["status"] == "ok") {
        const user = objects["user"];
        document.getElementById("name").innerHTML = user["name"];
        document.getElementById("password").src = user["password"];
        document.getElementById("id").innerHTML = user["id"];
      }
    }
  };
}

loadUser();

function logout() {
  localStorage.removeItem("jwt");
  window.location.href = "./main.html";
}
