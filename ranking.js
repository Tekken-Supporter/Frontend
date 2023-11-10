
 var jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImlkIjoidGVzdCIsImlhdCI6MTY5OTYzMjA1NywiZXhwIjoxNzAyMjI0MDU3fQ.P0AX2jyS18tjHFKBQRy6Wi6OWG9AlDQ4hJtpZp3woB0";
//API 1 >> under 10th용 
  var xhttp = new XMLHttpRequest();
  // 서버로부터 데이터 가져오기
  xhttp.open("GET", "http://34.127.90.191:3000/ranking/", true);
  
  // 데이터가 도착할 때 실행할 콜백 함수 설정
  xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
          var data = JSON.parse(xhttp.responseText); // 서버에서 받은 데이터 파싱
          console.log(data);
          
          const serverData = data[4];
          console.log(serverData);

          var singlePlayer = data[0];
          displayPlayerInfo(singlePlayer);
          //displayData(lowthan10th);
           // 데이터를 HTML에 표시하는 함수 호출
      }
  };

  // 요청 보내기
  xhttp.send();


// name을 쉼표로 분리하여 배열로 만들기
const nameArray = serverData.name.split(',');

// 표시할 부분을 선택
const nameListContainer = document.querySelector('.under10th'); // 클래스로 선택

// 분리된 name을 HTML에 표시
nameArray.forEach(name => {
  const nameElement = document.createElement('div');
  nameElement.textContent = name;
  nameListContainer.appendChild(nameElement);
});

  
// API 2 호출 >> 순위표 반영용
var xhttp2 = new XMLHttpRequest();
xhttp2.open("GET", "http://34.127.90.191:3000/ranking/rank", true);

xhttp2.onreadystatechange = function () {
    if (xhttp2.readyState === 4 && xhttp2.status === 200) {
        var data2 = JSON.parse(xhttp2.responseText);
        console.log(data2);
       
        var box2=data2[1];
        boxInfo(box2);
        //displayPlayerInfo(singlePlayer2, 'playerInfo2');
    }
};
xhttp2.send();

function displayPlayerInfo(player) {
  //개별 사람 
  var playerInfoContainer = document.querySelector('.wrapper'); // 클래스로 선택

  var playerElement = document.createElement('div');
  playerElement.innerHTML = `
      <h1>이름: ${player.name}</h1>
      <p>티어: ${player.tier}</p>
  `;
  playerInfoContainer.appendChild(playerElement);
}

function displayData(data) {
  //플레이어 목록용 
// 플레이어 목록을 표현할 부분
var playerListContainer = document.querySelector('.under10th'); // 클래스로 선택

// 배열 데이터를 동적으로 HTML에 추가
data.forEach(name => {
    var playerElement = document.createElement('div');
    playerElement.innerHTML = `
        <p>이름: ${player.name}</p>
        <p>티어: ${player.tier}</p>
        <hr>
    `;
    playerListContainer.appendChild(playerElement);
});
}

function boxInfo(player) {
  //개별 사람 
  var playerInfoContainer = document.querySelector('.box2'); // 클래스로 선택

  var playerElement = document.createElement('div');
  playerElement.innerHTML = `
      <h6>이름: ${player.name}</h6>
      <p>티어: ${player.tier}</p>
  `;
  playerInfoContainer.appendChild(playerElement);
}




