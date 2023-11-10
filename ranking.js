
    
  //var jwt = localStorage.getItem("jwt");
  var jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImlkIjoidGVzdCIsImlhdCI6MTY5OTYzMjA1NywiZXhwIjoxNzAyMjI0MDU3fQ.P0AX2jyS18tjHFKBQRy6Wi6OWG9AlDQ4hJtpZp3woB0";

  var xhttp = new XMLHttpRequest();
  // 서버로부터 데이터 가져오기
  xhttp.open("GET", "http://34.127.90.191:3000/ranking/", true);
  // 데이터가 도착할 때 실행할 콜백 함수 설정
  xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
          var data = JSON.parse(xhttp.responseText); // 서버에서 받은 데이터 파싱
          console.log(data);

          var singlePlayer = data[0];
          displayPlayerInfo(singlePlayer);
          displayData(data); // 데이터를 HTML에 표시하는 함수 호출
      }
  };

  // 요청 보내기
  xhttp.send();ss



function displayPlayerInfo(player) {
  var playerInfoContainer = document.querySelector('.champion'); // 클래스로 선택

  var playerElement = document.createElement('div');
  playerElement.innerHTML = `
      <p>이름: ${player.name}</p>
      <p>티어: ${player.tier}</p>
  `;

  playerInfoContainer.appendChild(playerElement);
}
function displayData(data) {

// 플레이어 목록을 표현할 부분
var playerListContainer = document.querySelector('.under10th'); // 클래스로 선택

// 배열 데이터를 동적으로 HTML에 추가
data.forEach(player => {
    var playerElement = document.createElement('div');
    playerElement.innerHTML = `
        <p>이름: ${player.name}</p>
        <p>티어: ${player.tier}</p>
        <hr>
    `;
    playerListContainer.appendChild(playerElement);
});
}


