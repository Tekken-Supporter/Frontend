const btnLogout = document.querySelector(".btnLogout");
const input_password = document.querySelector(".input_password");
const input_champion = document.querySelector(".input_champion");
const change_btn = document.querySelector(".change_btn");
const user_id = document.querySelector(".user_id");
const input_nowpassword = document.querySelector(".input_nowpassword");
const input_newpassword = document.querySelector(".input_newpassword");

var jwt = localStorage.getItem("jwt");

document.addEventListener("DOMContentLoaded", loadUser);

function loadUser() {
  const userId = localStorage.getItem("userId");
  jwt = localStorage.getItem("jwt");

  console.log("UserID from localStorage:", userId);
  console.log("JWT from localStorage:", jwt);

  if (!userId || !jwt) {
    console.error("No userID or JWT found in localStorage");
    return;
  }

  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://34.127.90.191:3000/user/info/${userId}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE) {
      if (this.status >= 200 && this.status < 300) {
        try {
          const objects = JSON.parse(this.responseText);
          console.log("Response from server:", objects);

          if (objects["status"] == "ok") {
            document.getElementById("name").textContent = objects["name"];
            document.getElementById("id").textContent = objects["id"];
            document.getElementById("tier").textContent = objects["tier"];
            document.getElementById("winrate").textContent = objects["winrate"];

            const championSelect = document.getElementById("champion");
            if (objects["champion"] && championSelect) {
              let found = false;
              for (let option of championSelect.options) {
                if (option.value === objects["champion"]) {
                  option.selected = true;
                  found = true;
                  break;
                }
              }
              if (!found) {
                console.error("Invalid champion value from server:", objects["champion"]);
              }
            } else {
              console.error("Champion select element missing or no champion value from server");
            }
          }
        } catch (e) {
          console.error("Error parsing response:", e);
        }
      } else {
        console.error("Server responded with status:", this.status);
      }
    }
  };
}

function modify(){
  const nowpassword = document.getElementById("nowpassword").value;
  const newpassword = document.getElementById("newpassword").value;
  const newchampion = document.getElementById("champion").value

  const userId = localStorage.getItem("userId");
  jwt = localStorage.getItem("jwt");

  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", `http://34.127.90.191:3000/user/updateinfo/${userId}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization", "Bearer " + jwt);

  xhttp.send(
    JSON.stringify({
      nowpassword: nowpassword,
      newpassword: newpassword,
      champion: newchampion
    })
  );

  xhttp.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE) {
      try {
        if (this.status >= 200 && this.status < 300) {
          const objects = JSON.parse(this.responseText); //서버로부터 받은 응답텍스트를 JSON 객체로 변환
          console.log(objects); //서버로부터 받은 응답 콘솔에 출력

          if (objects["status"] === "yes") { //서버로부터 받은 응답의 상태가 ok일 때
            localStorage.setItem("jwt", objects["token"]);
            Swal.fire({
              text: "수정 성공!",
              icon: "success",
              confirmButtonText: "OK", //성공 메시지를 사용자에게 보여줌
            }).then((result) => { //확인 버튼 누르면
              if (result.isConfirmed) {
                window.location.href = "./myinfo.html"; //해당 페이지로 리다이렉션
              }
            });
          } else {
            Swal.fire({
              text: "수정에 실패했습니다",
              icon: "error",
              confirmButtonText: "OK", 
            });
            console.error("Empty response received from the server");
          }
        } else {
          Swal.fire({
            text: "서버 오류 발생. 잠시 후 다시 시도해주세요.",
            icon: "error",
            confirmButtonText: "OK",
          });
          console.error("Server responded with status:", this.status);
        }
      } catch (e) {
        Swal.fire({
          text: "응답 처리 중 오류가 발생했습니다.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error parsing response:", e);
      }
    }
  };
  return false;
}


btnLogout.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "main.html";
  console.log("Redirecting to:", window.location.href);
  localStorage.removeItem("jwt");
});

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('click', function () {
    if (!this.value) {
      this.value = this.placeholder;
    }
  });
});

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('focus', function () {
    if (!this.value) {
      this.value = this.placeholder;
    }
  });
});

