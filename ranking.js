const xhttp = new XMLHttpRequest();
const method = "GET";

//ip 수정필요
xhttp.open("GET", `http://34.168.80.42:3000/user/info/:${user_id.value}`);
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhttp.send();