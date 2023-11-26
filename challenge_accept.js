const wrapper2 = document.querySelector('.wrapper_unread')
const btnPopup2 = document.querySelector('.btnAccept-popup');
const iconClose2 = document.querySelector('.icon-close2');

btnPopup2.addEventListener('click', () => { wrapper2.classList.add('active-popup'); });
iconClose2.addEventListener('click', () => { wrapper2.classList.remove('active-popup'); });

var jwt = localStorage.getItem("jwt");

/* 대결 수락 정보 연결*/
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

function loadChallengeInfo(){
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

    xhttp.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status >= 200 && this.status < 300) {
                try {
                    const objects = JSON.parse(this.responseText);
                    console.log("Response from challenge check:", objects);

                    if (objects["status"] == "ok") {
                        // 받아온 이름 정보를 'challenger_accept'와 'btnAccept-popup' 버튼에 설정
                        // document.getElementById("challenger_accept").textContent = objects["name"];

                        // 모든 'btnAccept-popup' 버튼에 대해 이름 설정
                        // const acceptButtons = document.querySelectorAll('.btnAccept-popup');
                        //acceptButtons.forEach(button => {
                        //    button.textContent = objects["name"];
                        //});
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