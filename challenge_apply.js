const wrapper = document.querySelector('.wrapper');
const btnPopup = document.querySelector('.btnQuest-popup');
const iconClose = document.querySelector('.icon-close');

btnPopup.addEventListener('click', () => { wrapper.classList.add('active-popup'); });
iconClose.addEventListener('click', () => { wrapper.classList.remove('active-popup'); });

var jwt = localStorage.getItem("jwt");

/* 대결 신청에 본인 이름 뜨기*/
document.addEventListener("DOMContentLoaded", loadUser);
document.addEventListener("DOMContentLoaded", loadContenders);

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
            document.getElementById("challenger_apply").textContent = objects["name"];
            document.getElementById("contender_accept").textContent = objects["name"];
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

function loadContenders() {
  const userId = localStorage.getItem("userId"); // 현재 사용자 ID 가져오기
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://34.127.90.191:3000/challenge/name/${userId}`);
  xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      const response = JSON.parse(this.responseText); // 전체 응답 파싱
      console.log("Response from server:", response); // 파싱된 응답 출력

      if (response.status === "ok" && Array.isArray(response.namelist)) {
        const namelist = response.namelist; // 'namelist'에서 이름 배열을 가져옵니다.

        const selectElement = document.getElementById("contender_apply");
        namelist.forEach(function (contenderName) {
          const option = document.createElement("option");
          option.value = contenderName; // 옵션의 값 설정
          option.text = contenderName; // 옵션의 텍스트 설정
          selectElement.appendChild(option);
        });
      } else {
        console.error("No namelist found in the response or response format is incorrect");
      }
    }
  };
}

/* 대결 신청 */
function quest() {
  const challenger = document.getElementById("challenger_apply").value;
  const contender = document.getElementById("contender_apply").value;
  const date = document.getElementById("date_apply").value;
  const message = document.getElementById("message_apply").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://34.127.90.191:3000/challenge/apply");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization", "Bearer " + jwt);

  xhttp.send(
    JSON.stringify({
      challenger: challenger,
      contender: contender,
      date: date,
      applymessage: message,
    })
  );

  xhttp.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE) {
      try {
        if (this.status >= 200 && this.status < 300) {
          const objects = JSON.parse(this.responseText);
          console.log(objects);

          if (objects["status"] === "ok") {
            localStorage.setItem("jwt", objects["token"]);
            Swal.fire({
              text: "대결을 신청했습니다!",
              icon: "success",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "./challenge.html";
              }
            });
          } else {
            Swal.fire({
              text: "신청에 실패했습니다.",
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