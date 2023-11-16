
 var jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImlkIjoidGVzdCIsImlhdCI6MTY5OTYzMjA1NywiZXhwIjoxNzAyMjI0MDU3fQ.P0AX2jyS18tjHFKBQRy6Wi6OWG9AlDQ4hJtpZp3woB0";
//API 1 >> under 10th용 
  var xhttp = new XMLHttpRequest();
  // 서버로부터 데이터 가져오기
  xhttp.open("GET", "http://34.127.90.191:3000/ranking/", true);
  
  // 데이터가 도착할 때 실행할 콜백 함수 설정
  xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
          var data = JSON.parse(xhttp.responseText); // 서버에서 받은 데이터 파싱

          console.log(data);// 티어별 구분 -success  

          var singlePlayer = data[0];
          displayPlayerInfo(singlePlayer);//-success
           // 데이터를 HTML에 표시하는 함수 호출
          
          const fourthTear = data[4];
          console.log(fourthTear);//under10th 
          extractAndDisplayData(fourthTear);
          
      }
  };
xhttp.send();//request sending


function extractAndDisplayData(data) {
  const names = data.name.split(',');
  //const tier = data.tier;

  // HTML 클래스 "result"를 가진 요소를 찾아서 가져오기
  const resultElements = document.getElementsByClassName("under10th");

  // 가져온 티어와 이름들을 모든 "result" 클래스를 가진 요소에 표시
  for (let i = 0; i < resultElements.length; i++) {
      const resultElement = resultElements[i];

      // 이름들을 나타내는 <p> 요소 생성 및 추가
      names.forEach(name => {
          const paragraph = document.createElement("p");
          paragraph.textContent = name.trim();
          resultElement.appendChild(paragraph);
      });
  }
}


  
// API 2 호출 >> 순위표 반영용(1~10위 추출)
var xhttp2 = new XMLHttpRequest();
xhttp2.open("GET", "http://34.127.90.191:3000/ranking/rank", true);

xhttp2.onreadystatechange = function () {
    if (xhttp2.readyState === 4 && xhttp2.status === 200) {
        var data2 = JSON.parse(xhttp2.responseText);
        console.log(data2);// > success
       
        var box2=data2[1];
        boxInfo(box2);
        //displayPlayerInfo(singlePlayer2, 'playerInfo2');
    }
};
xhttp2.send();

//개별 사람 
function displayPlayerInfo(player) {
  var playerInfoContainer = document.querySelector('.wrapper'); // 클래스로 선택

  var playerElement = document.createElement('div');
  playerElement.innerHTML = `
      <h1>이름: ${player.name}</h1>
      <p>티어: ${player.tier}</p>
  `;
  playerInfoContainer.appendChild(playerElement);
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




