const wrapper2 = document.querySelector('.wrapper_unread')
const btnPopup2 = document.querySelector('.btnAccept-popup');
const iconClose2 = document.querySelector('.icon-close2');

var jwt = localStorage.getItem("jwt");

// challenges 배열 초기화 (서버에서 불러온 데이터를 여기에 저장)
let challenges = [];

// 현재 선택된 challenge 객체를 저장할 변수
let currentSelectedChallenge = null;

// 대결 수락/거절 응답을 서버에 보내는 함수
function sendChallengeResponse(challenge_id, responseType) {

    const parsedChallengeId = parseInt(challenge_id, 10);

    console.log("Sending request with challenge_id:", parsedChallengeId, "and message:", responseType);

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://34.127.90.191:3000/challenge/accept");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
    xhttp.send(
        JSON.stringify({
            challenge_id: parsedChallengeId,
            message: responseType
        })
    );

    xhttp.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status >= 200 && this.status < 300) {
                console.log("Response from server:", this.responseText);
                if (responseType === 'accept') {
                    Swal.fire({
                        text: "대결이 성사되었습니다!",
                        icon: "success",
                        confirmButtonText: "OK"
                    }).then((result) => { //확인 버튼 누르면
                        if (result.isConfirmed) {
                            window.location.href = "./challenge.html"; //해당 페이지로 리다이렉션
                        }
                    });
                } else if (responseType === 'deny') {
                    Swal.fire({
                        text: "대결을 거부했습니다!",
                        icon: "success",
                        confirmButtonText: "OK"
                    }).then((result) => { //확인 버튼 누르면
                        if (result.isConfirmed) {
                            window.location.href = "./challenge.html"; //해당 페이지로 리다이렉션
                        }
                    });
                }
            } else {
                console.error("Server returned status code " + this.status);
                Swal.fire({
                    text: "정보 전송에 실패했습니다",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        }
    };
}

// 대결 수락 정보 연결
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

                    // challengeList가 존재하는지 확인
                    if (response.challengeList && Array.isArray(response.challengeList)) {
                        challenges = response.challengeList; // 서버로부터 받은 데이터를 challenges 배열에 저장
                        const listElement = document.querySelector(".board_list_ur");
                        response.challengeList.forEach((challenge, index) => {
                            const challengeRow = document.createElement("div");
                            challengeRow.innerHTML = `
                                <div class="num">${index + 1}</div>
                                <div class="name"><button class="btnAccept-popup" data-challenge-id="${challenge.challenge_id}">${challenge.challenger}</button></div>
                                <div class="date">${new Date(challenge.creationDate).toLocaleDateString()}</div>
                            `;
                            listElement.appendChild(challengeRow);
                        });
                    } else {
                        console.error("challengeList is not an array or undefined");
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

// 대결 수락 함수
function accept() {
    if (!currentSelectedChallenge) {
        console.error("No challenge selected");
        return;
    }
    sendChallengeResponse(currentSelectedChallenge.challenge_id, 'accept');
    console.log("대결 수락");
}

// 대결 거절 함수
function deny() {
    if (!currentSelectedChallenge) {
        console.error("No challenge selected");
        return;
    }
    sendChallengeResponse(currentSelectedChallenge.challenge_id, 'deny');
    console.log("대결 거절");
}


document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        // 클릭된 요소가 btnAccept-popup 클래스를 가지고 있는지 확인
        if (event.target && event.target.classList.contains('btnAccept-popup')) {
            // 해당 버튼과 관련된 challenge 객체 찾기
            const matchId = event.target.getAttribute('data-challenge-id');
            // 문자열로 가져온 matchId를 숫자로 변환 (타입 불일치 방지)
            const numericChallengeId = parseInt(matchId, 10);
            // 타입 변환된 ID를 사용하여 객체 찾기
            const challenge = challenges.find(ch => ch.challenge_id === numericChallengeId);
            console.log(challenge);
            if (challenge) {
                // challenge 객체에서 정보 가져와서 설정하기
                document.getElementById("challenger_accept").textContent = challenge.challenger;
                document.getElementById("date_accept").textContent = new Date(challenge.matchDate).toLocaleDateString();
                document.getElementById("message_accept").textContent = challenge.applymessage; // applymessage를 message_accept에 설정
            }
            wrapper2.classList.add('active-popup');
            currentSelectedChallenge = challenge;
        }
    });

    const iconClose2 = document.querySelector('.icon-close2');
    iconClose2.addEventListener('click', () => {
        wrapper2.classList.remove('active-popup');
    });
});
