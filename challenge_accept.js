const wrapper2 = document.querySelector('.wrapper_unread')
const btnPopup2 = document.querySelector('.btnAccept-popup');
const iconClose2 = document.querySelector('.icon-close');

btnPopup2.addEventListener('click', () => { wrapper2.classList.add('active-popup'); });
iconClose2.addEventListener('click', () => { wrapper2.classList.remove('active-popup'); });

var jwt = localStorage.getItem("jwt");

/* 대결 수락 정보 연결*/
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
    xhttp.open("GET", `http://34.127.90.191:3000/user/info/${userId}`); // 본인 이름 띄우기
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

    xhttp.open("GET", `http://34.127.90.191:3000/challenge/accpet/${userId}`); // 신청 정보 띄우기

}