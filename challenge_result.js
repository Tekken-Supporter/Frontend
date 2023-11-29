const wrapper3 = document.querySelector('.wrapper_result')
const btnPopup3 = document.querySelector('.btnResult-popup');
const iconClose3 = document.querySelector('.icon-close3');
const wrapper4 = document.querySelector('.wrapper_record')
const iconClose4 = document.querySelector('.icon-close4');

var jwt = localStorage.getItem("jwt");

// challengess 배열 초기화 (서버에서 불러온 데이터를 여기에 저장)
let challengess = [];

// 현재 선택된 challengess 객체를 저장할 변수
let currentSelectedChallenges = null;

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

// 대결 결과 전송
function result() {
  if (!currentSelectedChallenges) {
    console.error("No challenge selected");
    return;
  }
  const challengeId = currentSelectedChallenges.match_id;
  const challengerName = document.getElementById("challenger_result").textContent;
  const contenderName = document.getElementById("contender_result").textContent;
  const scoreChallenger = parseInt(document.getElementById("score_challenger").value, 10);
  const scoreContender = parseInt(document.getElementById("score_contender").value, 10);

  if (!challengeId || !challengerName || !contenderName || isNaN(scoreChallenger) || isNaN(scoreContender)) {
    alert("모든 필드를 올바르게 입력해주세요.");
    return false;
  }

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://34.127.90.191:3000/challenge/result");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
  xhttp.send(
    JSON.stringify({
      challenge_id: challengeId,
      challenger: challengerName,
      contender: contenderName,
      score_challenger: scoreChallenger,
      score_contender: scoreContender
    }));

  xhttp.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE) {
      if (this.status >= 200 && this.status < 300) {
        // 요청이 성공적으로 처리되었을 때의 로직
        console.log("대결 결과가 성공적으로 제출되었습니다.");
        if (scoreContender > scoreChallenger) {
          Swal.fire({
            text: "대결에서 승리했습니다!",
            icon: "success",
            confirmButtonText: "OK"
          }).then((result) => { //확인 버튼 누르면
            if (result.isConfirmed) {
              window.location.href = "./challenge.html"; //해당 페이지로 리다이렉션
            }
          });
        } else if (scoreContender == scoreChallenger) {
          Swal.fire({
            text: "대결에서 비겼습니다!",
            icon: "success",
            confirmButtonText: "OK"
          }).then((result) => { //확인 버튼 누르면
            if (result.isConfirmed) {
              window.location.href = "./challenge.html"; //해당 페이지로 리다이렉션
            }
          });
        } else {
          Swal.fire({
            text: "대결에서 패배했습니다!",
            icon: "success",
            confirmButtonText: "OK"
          }).then((result) => { //확인 버튼 누르면
            if (result.isConfirmed) {
              window.location.href = "./challenge.html"; //해당 페이지로 리다이렉션
            }
          });
        }
      } else {
        // 요청 처리 중 오류가 발생했을 때의 로직
        console.error("오류 발생:", this.status, this.responseText);
      }
    }
  };

  return false;
}


document.addEventListener('click', function (event) {
  // 클릭된 요소가 btnResult-popup 클래스를 가지고 있는지 확인
  if (event.target && event.target.classList.contains('btnResult-popup')) {
    // 해당 버튼과 관련된 challenge 객체 찾기
    const challenge = challengess.find(ch => ch.challenger === event.target.textContent);
    if (challenge) {
      // winscore와 losescore 값 확인
      if (challenge.winscore === undefined && challenge.losescore === undefined) {
        // challenge 객체에서 정보 가져와서 설정하기 (result 팝업)
        document.getElementById("challenger_result").textContent = challenge.challenger;
        document.getElementById("contender_result").textContent = challenge.contender;
        document.getElementById("date_result").textContent = new Date(challenge.matchDate).toLocaleDateString();
        wrapper3.classList.add('active-popup');
      } else {
        // challenge 객체에서 정보 가져와서 설정하기 (record 팝업)
        document.getElementById("winner_record").textContent = challenge.winscore > challenge.losescore ? challenge.winner : challenge.loser;
        document.getElementById("loser_record").textContent = challenge.winscore < challenge.losescore ? challenge.winner : challenge.loser;
        document.getElementById("winscore").textContent = Math.max(challenge.winscore, challenge.losescore);
        document.getElementById("losescore").textContent = Math.min(challenge.winscore, challenge.losescore);
        wrapper4.classList.add('active-popup');
      }
      currentSelectedChallenges = challenge;
    }
  }
  const iconClose3 = document.querySelector('.icon-close3');
  iconClose3.addEventListener('click', () => {
    wrapper3.classList.remove('active-popup');
  });
  const iconClose4 = document.querySelector('.icon-close4');
  iconClose4.addEventListener('click', () => {
    wrapper4.classList.remove('active-popup');
  });

});

