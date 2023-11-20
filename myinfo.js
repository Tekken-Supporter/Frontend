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
   



  const update_user = (event) => {
    event.preventDefault();
    if (!input_champion.value || !input_password.value) {
      alert('챔피언 값, 현재 비밀번호, 그리고 새 비밀번호가 모두 필요합니다!');
      return;
    }

    const validChampions = ['AKUMA', 'ALISA', 'ARMOR KING', 'ASUKA', 'BOB', 'BRYAN', 'CLAUDIO', 'DEVIL JIN', 'DRAGUNOV', 'EDDY', 'FENG', 'GIGAS', 'HEIHACHI', 'HWARANG', 'JACK-7', 'JIN', 'JOSIE', 'KATARINA', 'KAZUMI', 'KAZUYA', 'KING', 'KUMA', 'LARS', 'LAW', 'LEE', 'LEO', 'LILI', 'LUCKY CHLOE', 'MASTER RAVEN', 'MIGUEL', 'NINA', 'PANDA', 'PAUL', 'SHAHEEN', 'STEVE', 'XIAOYU', 'YOSHIMITSU'];
    if (!validChampions.includes(input_champion.value)) {
      alert('Please enter a valid champion!');
      return;
    }

    const userUpdateData = {
      nowpassword: input_nowpassword.value,
      newpassword: input_newpassword.value,
      champion: input_champion.value
    };

    const userId = localStorage.getItem("userId");
    jwt = localStorage.getItem("jwt");

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `http://34.127.90.191:3000/user/update/${userId}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
    xhttp.send(JSON.stringify(userUpdateData));

    xhttp.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE) {
        if (this.status >= 200 && this.status < 300) {
          try {
            const objects = JSON.parse(this.responseText);
            console.log(objects);
            if (objects["response"] == "yes") {
              alert('비밀번호가 변경되었습니다!');
              loadUser(); // 사용자 정보를 다시 로드합니다.
            } else if (objects["response"] == "no") {
              alert('현재 비밀번호가 틀렸습니다. 다시 시도해주세요.');
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

  change_btn.addEventListener("click", update_user);
