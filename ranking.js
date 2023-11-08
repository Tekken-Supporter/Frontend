// XMLHttpRequest 객체 생성
var xhttp = new XMLHttpRequest();

// 페이지 로드 시 데이터를 받아오는 함수 실행
window.addEventListener("load", function () {
    // 요청을 열고 설정
    xhttp.open("GET", "http://34.168.80.42:3000/ranking/", true);

    // 데이터가 도착할 때 실행할 콜백 함수 설정
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var data = JSON.parse(xhttp.responseText); // 서버에서 받은 데이터 파싱
            displayData(data); // 데이터를 HTML에 표시하는 함수 호출
        }
    };

    // 요청 보내기
    xhttp.send();
});

// 데이터를 HTML에 표시하는 함수
function displayData(data) {
    // 데이터가 배열로 구성되어 있다고 가정
    for (var i = 0; i < data.length; i++) {
        var person = data[i];
        
        // 1등부터 10등까지의 데이터를 별도의 div에 표시
        if (i >= 0 && i < 10) {
            var dataDisplayElement = document.getElementById("dataDisplay" + (i + 1));
            dataDisplayElement.innerHTML = "이름: " + person.name + ", 순위: " + person.rank + ", 캐릭터: " + person.character + ", 승률: " + person.winRate;
        }
        
        // 11등부터 20등까지의 데이터를 하나의 div에 배열로 표시
        if (i >= 10 && i < 20) {
            var dataDisplayElement3 = document.getElementById("dataDisplay11");
            var listItem3 = document.createElement("li");
            listItem3.innerHTML = "이름: " + person.name + ", 순위: " + person.rank + ", 캐릭터: " + person.character;
            dataDisplayElement3.appendChild(listItem3);
        }

        if (i == 20) { //수문장 
            var dataDisplayElement = document.getElementById("dataDisplay12");
            dataDisplayElement.innerHTML = "수문장:  " + person.name;
        }

    }
}
