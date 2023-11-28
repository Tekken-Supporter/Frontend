const wrapper3 = document.querySelector('.wrapper_result')
const btnPopup3 = document.querySelector('.btnResult-popup');
const iconClose3 = document.querySelector('.icon-close3');

var jwt = localStorage.getItem("jwt");

// challengess 배열 초기화 (서버에서 불러온 데이터를 여기에 저장)
let challengess = [];

// 대결 전적 정보 연결
document.addEventListener("DOMContentLoaded", loadName);
document.addEventListener("DOMContentLoaded", loadChallengeInfo);

function loadName() {
    const userId = localStorage.getItem("userId");
    jwt = localStorage.getItem("jwt");

    console.log("UserID from localStorage:", userId);
    console.log("JWT from localStorage:", jwt);

    if (!userId || !jwt) {
        console.error("No userID or JWT found in localStorage");
        return;
    }

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://34.127.90.191:3000/user/info/${userId}`); // 본인 이름 띄우기
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status >= 200 && this.status < 300) {
                try {
                    const objects = JSON.parse(this.responseText);
                    console.log("Response about user:", objects);

                    if (objects["status"] == "ok") {
                        document.getElementById("contender_result").textContent = objects["name"];
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

function loadChallengeInfo() {
    const userId = localStorage.getItem("userId");
    jwt = localStorage.getItem("jwt");

    if (!userId || !jwt) {
        console.error("No userID or JWT found in localStorage");
        return;
    }

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://34.127.90.191:3000/user/match/${userId}`); // 신청 정보 띄우기
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status >= 200 && this.status < 300) {
                try {
                    const response = JSON.parse(this.responseText);
                    console.log("Response from challenge check:", response);

                    // matchlist가 존재하는지 확인
                    if (response.matchlist && Array.isArray(response.matchlist)) {
                        challengess = response.matchlist; // 서버로부터 받은 데이터를 challengess 배열에 저장
                        const listElement = document.querySelector(".board_list_p");
                        response.matchlist.forEach((challenge, index) => {
                            const challengeRow = document.createElement("div");
                            challengeRow.innerHTML = `
                                <div class="num">${index + 1}</div>
                                <div class="name"><button class="btnResult-popup">${challenge.challenger}</button></div>
                                <div class="result">${challenge.winner}</div>
                                <div class="date">${new Date(challenge.matchDate).toLocaleDateString()}</div>
                            `;
                            listElement.appendChild(challengeRow);
                        });
                    } else {
                        console.error("matchlist is not an array or undefined");
                    }

                } catch (e) {
                    console.error("Error parsing response", e);
                }
            } else {
                console.error("Server returned status code " + this.status);
            }
        }
    };
}

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (event) {
      // 클릭된 요소가 btnResult-popup 클래스를 가지고 있는지 확인
      if (event.target && event.target.classList.contains('btnResult-popup')) {
          // 해당 버튼과 관련된 challenge 객체 찾기
          const challenge = challengess.find(ch => ch.challenger === event.target.textContent);
          if (challenge) {
              // challenge 객체에서 정보 가져와서 설정하기
              document.getElementById("challenger_result").textContent = challenge.challenger;
              document.getElementById("date_result").textContent = new Date(challenge.matchDate).toLocaleDateString();
              document.getElementById("result_winner").textContent = challenge.winscore;
              document.getElementById("result_loser").textContent = challenge.losescore;
          }
          wrapper3.classList.add('active-popup');
          currentSelectedChallenge = challenge;
      }
  });

  const iconClose3 = document.querySelector('.icon-close3');
  iconClose3.addEventListener('click', () => {
      wrapper3.classList.remove('active-popup');
  });
});
