const btnLogout = document.querySelector(".btnLogout");
const wrapper = document.querySelector('.wrapper');
const btnPopup = document.querySelector('.btnQuest-popup');
const iconClose = document.querySelector('.icon-close');

btnPopup.addEventListener('click', () => { wrapper.classList.add('active-popup'); });
iconClose.addEventListener('click', () => { wrapper.classList.remove('active-popup'); });

var jwt = localStorage.getItem("jwt");

/* 대결 신청 이름 뜨기*/
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
              document.getElementById("challenger").textContent = objects["name"];
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

/* 대결 신청 */
function quest() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://34.127.90.191:3000/challenge/apply");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(
        JSON.stringify({
            challenger: challenger,
            contender: contender,
            date: date,
            message: message,
        })
    );

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                const objects = JSON.parse(this.responseText);
                console.log(objects);
                if (objects["status"] == "yes") {
                    localStorage.setItem("jwt", objects["token"]);
                    Swal.fire({
                        text: '대결 신청 성공!',
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "./main.html";
                        }
                    });
                } else {
                    Swal.fire({
                        text: '동일한 신청이 존재합니다',
                        icon: "error",
                        confirmButtonText: "Retry",
                    });
                }
            } else {
                Swal.fire({
                    text: '알 수 없는 오류가 발생했습니다',
                    icon: "error",
                    confirmButtonText: "Retry",
                })
            }
        }
    };
    return false;
}