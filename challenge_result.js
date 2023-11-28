const wrapper3 = document.querySelector('.wrapper_result')
const btnPopup3 = document.querySelector('.btnResult-popup');
const iconClose3 = document.querySelector('.icon-close3');

btnPopup3.addEventListener('click', () => { wrapper3.classList.add('active-popup'); });
iconClose3.addEventListener('click', () => { wrapper3.classList.remove('active-popup'); });

document.addEventListener("DOMContentLoaded", loadChallengeInfo);

function loadChallengeInfo() {
    const userId = localStorage.getItem("userId");
    jwt = localStorage.getItem("jwt");

    if (!userId || !jwt) {
        console.error("No userID or JWT found in localStorage");
        return;
    }

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://34.127.90.191:3000/challenge/check/${userId}`); // 신청 정보 띄우기
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status >= 200 && this.status < 300) {
                try {
                    const response = JSON.parse(this.responseText);
                    console.log("Response from challenge check:", response);

                    // challengelist가 존재하는지 확인
                    if (response.challengelist && Array.isArray(response.challengelist)) {
                        const listElement = document.querySelector(".board_list_ur");
                        response.challengelist.forEach((challenge, index) => {
                            const challengeRow = document.createElement("div");
                            challengeRow.innerHTML = `
                                <div class="num">${index + 1}</div>
                                <div class="name"><button class="btnAccept-popup">${challenge.challenger}</button></div>
                                <div class="date">${new Date(challenge.creationDate).toLocaleDateString()}</div>
                            `;
                            listElement.appendChild(challengeRow);
                        });
                    } else {
                        console.error("challengelist is not an array or undefined");
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
/*
function result() {
    const challenger = document.getElementById("challenger_result").value;
    const contender = document.getElementById("contender_result").value;
    const score_challenger = document.getElementById("result_challenger").value;
    const score_contender = document.getElementById("result_contender").value;

  
    const userId = localStorage.getItem("userId");
    jwt = localStorage.getItem("jwt");
  
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", `http://34.127.90.191:3000/challenge/result`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  
    xhttp.send(
      JSON.stringify({
        challenge_id: userId,
        challenger: challenger,
        contender: contender,
        score_challenger: score_challenger,
        score_contender: score_contender
      })
    );
  
    xhttp.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        try {
          if (this.status >= 200 && this.status < 300) {
            const objects = JSON.parse(this.responseText); //서버로부터 받은 응답텍스트를 JSON 객체로 변환
            console.log(objects); //서버로부터 받은 응답 콘솔에 출력
  
            if (objects["status"] === "ok") { //서버로부터 받은 응답의 상태가 ok일 때
              localStorage.setItem("jwt", objects["token"]);
              Swal.fire({
                text: "결과가 티어에 반영되었습니다!",
                icon: "success",
                confirmButtonText: "OK", //성공 메시지를 사용자에게 보여줌
              }).then((result) => { //확인 버튼 누르면
                if (result.isConfirmed) {
                  window.location.href = "./myinfo.html"; //해당 페이지로 리다이렉션
                }
              });
            } else {
              Swal.fire({
                text: "결과 반영에 실패했습니다.",
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

*/