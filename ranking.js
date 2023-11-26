
var jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImlkIjoidGVzdCIsImlhdCI6MTY5OTYzMjA1NywiZXhwIjoxNzAyMjI0MDU3fQ.P0AX2jyS18tjHFKBQRy6Wi6OWG9AlDQ4hJtpZp3woB0";
//API 1 >> under 10th용 
  var xhttp = new XMLHttpRequest();
  //서버로부터 데이터 가져오기
  xhttp.open("GET", "http://34.127.90.191:3000/ranking/", true);
  
  // 데이터가 도착할 때 실행할 콜백 함수 설정
  xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
          var data = JSON.parse(xhttp.responseText); // 서버에서 받은 데이터 파싱

          console.log(data);// 티어별 구분 -success  

          //var champion = data[0];
          var opener = data[5];
          // displayChampionInfo(champion);//-success> champion
          displayGateKeeperInfo(opener);
           // 데이터를 HTML에 표시하는 함수 호출
          
          const fourthTear = data[4];
          console.log(fourthTear);//under10th 
          extractAndDisplayData(fourthTear);
          
      }
  };
xhttp.send();//request sending


//개별 사람 

function displayGateKeeperInfo(player) {
  var playerInfoContainer = document.querySelector('.rank-opener'); // 클래스로 선택

  var playerElement = document.createElement('div');
  playerElement.innerHTML = `
  <p> ${player.tier}</p>   
  <p> ${player.name}</p>
  `;
  playerInfoContainer.appendChild(playerElement);
}

function extractAndDisplayData(data) {
  const names = data.name.split(',');
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


       
        var champion=data2[0];

        var box2=data2[1];
        var box3=data2[2];
        var box4=data2[3];
        var box5=data2[4];
        var box6=data2[5];
        var box7=data2[6];
        var box8=data2[7];
        var box9=data2[8];
        var box10=data2[9];

        displayChampionInfo(champion);//-success> champion

        boxInfo2(box2);
        boxInfo3(box3);
        boxInfo4(box4);
        boxInfo5(box5);
        boxInfo6(box6);
        boxInfo7(box7);
        boxInfo8(box8);
        boxInfo9(box9);
        boxInfo10(box10);
        //displayPlayerInfo(singlePlayer2, 'playerInfo2');
    }
};
xhttp2.send();


function getCharacterImage(characterName) {
  // 캐릭터 이름을 기반으로 캐릭터 이미지 경로 또는 URL을 반환하는 함수
  // 여기서는 간단한 예제로 고정된 이미지 URL을 반환하도록 하겠습니다.
  // 실제 서비스에서는 서버에서 동적으로 이미지 URL을 가져오는 방식으로 구현해야 합니다.
  // 예: 서버에서는 캐릭터 이름에 대응하는 이미지 URL을 DB에서 조회하여 전송
  console.log(characterName);

  switch (characterName) {
    
    case 'PAUL':
      return 'https://github.com/Tekken-Supporter/Frontend/blob/main/image/lili.png?raw=true';
    case 'ASKUKA':
      return 'https://github.com/Tekken-Supporter/Frontend/blob/main/image/asuka.png?raw=true';
    case 'EDDY':
      return 'https://github.com/Tekken-Supporter/Frontend/blob/main/image/eddy.png?raw=true';
    default:
      return '#';
  }
}

// 이미지 URL을 동적으로 가져오는 함수 추가
function getChampionImageDynamic(championName) {
  const lowercaseChampionName = championName.toLowerCase();

  return `https://github.com/Tekken-Supporter/Frontend/blob/main/image/${lowercaseChampionName}`+ `.png?raw=true`;
}

//개별 사람 > 1st~ 10th
function displayChampionInfo(player) {
  
  var playerCharacter = document.querySelector('.banner-image');
  var picture = document.createElement('div');
  console.log(player.champion);
  console.log(picture);
  
  // 이미지 URL을 동적으로 가져오기
  picture.innerHTML = `
    <img class="champion-image" src="${getChampionImageDynamic(player.champion)}" alt="${player.champion} 이미지">
  `;
  playerCharacter.appendChild(picture);
  console.log(getChampionImageDynamic(player.champion));

  var playerInfoContainer = document.querySelector('.champion'); // 클래스로 선택

  var playerElement = document.createElement('div');
  playerElement.style= 'margin-top : 50px;'
  playerElement.innerHTML = `
  <button class="btn outlineforC"><h1> ${player.tier}</h1></button>
  <button class="btn fillforC"><h1> ${player.name}</h1></button>
  `;
  playerInfoContainer.appendChild(playerElement);
}

function boxInfo2(player) {
  var playerCharacter = document.querySelector('.banner2');
  var picture = document.createElement('div');
  console.log(player.champion);
  console.log(picture);
  picture.innerHTML = `
  <img class="character-image" src="${getCharacterImage("${player.champion}")}" alt="${player.champion} 이미지">
  `
  ;
  playerCharacter.appendChild(picture);

  var playerInfoContainer = document.querySelector('.player2'); // 클래스로 선택

  var playerElement = document.createElement('div');
  playerElement.innerHTML = `
  <button class="btn2 outline"> ${player.name}</button>
  <button class="btn2 fill">${player.tier}</button>  
  `;
  playerInfoContainer.appendChild(playerElement);
}


function boxInfo3(player) {
  var playerCharacter = document.querySelector('.banner3');
  var picture = document.createElement('div');
  console.log(player.champion);
  console.log(picture);
  picture.innerHTML = `
  <img class="character-image" src="${getCharacterImage("${player.champion}")}" alt="${player.champion} 이미지">
  `
  ;
  playerCharacter.appendChild(picture);

  var playerInfoContainer = document.querySelector('.player3'); // 클래스로 선택

  var playerElement = document.createElement('div');
  playerElement.innerHTML = `
  <button class="btn2 outline"> ${player.name}</button>
  <button class="btn2 fill">${player.tier}</button>  
  `;
  playerInfoContainer.appendChild(playerElement);
}

function boxInfo4(player) {
  var playerCharacter = document.querySelector('.banner4');
  var picture = document.createElement('div');
  console.log(player.champion);
  console.log(picture);
  picture.innerHTML = `
  <img class="character-image" src="${getCharacterImage("${player.champion}")}" alt="${player.champion} 이미지">
  `
  ;
  playerCharacter.appendChild(picture);
  var playerInfoContainer = document.querySelector('.player4'); // 클래스로 선택

  var playerElement = document.createElement('div');
  playerElement.innerHTML = `
  <button class="btn2 outline"> ${player.name}</button>
  <button class="btn2 fill">${player.tier}</button>  
  `;
  playerInfoContainer.appendChild(playerElement);
}
function boxInfo5(player) {
  var playerCharacter = document.querySelector('.banner5');
  var picture = document.createElement('div');
  console.log(player.champion);
  console.log(picture);
  picture.innerHTML = `
  <img class="character-image" src="${getCharacterImage("${player.champion}")}" alt="${player.champion} 이미지">
  `
  ;
  playerCharacter.appendChild(picture);

  var playerInfoContainer = document.querySelector('.player5'); // 클래스로 선택

  var playerElement = document.createElement('div');
  playerElement.innerHTML = `
  <button class="btn2 outline"> ${player.name}</button>
  <button class="btn2 fill">${player.tier}</button>  
  `;
  playerInfoContainer.appendChild(playerElement);
}

function boxInfo6(player) {
  var playerCharacter = document.querySelector('.banner6');
  var picture = document.createElement('div');
  console.log(player.champion);
  console.log(picture);
  picture.innerHTML = `
  <img class="character-image" src="${getCharacterImage("${player.champion}")}" alt="${player.champion} 이미지">
  `
  ;
  playerCharacter.appendChild(picture);

  var playerInfoContainer = document.querySelector('.player6'); // 클래스로 선택

  var playerElement = document.createElement('div');
  playerElement.innerHTML = `
  <button class="btn2 outline"> ${player.name}</button>
  <button class="btn2 fill">${player.tier}</button>  
  `;
  playerInfoContainer.appendChild(playerElement);
}
function boxInfo7(player) {
  var playerCharacter = document.querySelector('.banner7');
  var picture = document.createElement('div');
  console.log(player.champion);
  console.log(picture);
  picture.innerHTML = `
  <img class="character-image" src="${getCharacterImage("${player.champion}")}" alt="${player.champion} 이미지">
  `
  ;
  playerCharacter.appendChild(picture);

  var playerInfoContainer = document.querySelector('.player7'); // 클래스로 선택

  var playerElement = document.createElement('div');
  playerElement.innerHTML = `
  <button class="btn2 outline"> ${player.name}</button>
  <button class="btn2 fill">${player.tier}</button>  
  `;
  playerInfoContainer.appendChild(playerElement);
}
function boxInfo8(player) {
  var playerCharacter = document.querySelector('.banner8');
  var picture = document.createElement('div');
  console.log(player.champion);
  console.log(picture);
  picture.innerHTML = `
  <img class="character-image" src="${getCharacterImage("${player.champion}")}" alt="${player.champion} 이미지">
  `
  ;
  playerCharacter.appendChild(picture);

  var playerInfoContainer = document.querySelector('.player8'); // 클래스로 선택

  var playerElement = document.createElement('div');
  playerElement.innerHTML = `
  <button class="btn2 outline"> ${player.name}</button>
  <button class="btn2 fill">${player.tier}</button>  
  `;
  playerInfoContainer.appendChild(playerElement);
}
function boxInfo9(player) {
  var playerCharacter = document.querySelector('.banner9');
  var picture = document.createElement('div');
  console.log(player.champion);
  console.log(picture);
  picture.innerHTML = `
  <img class="character-image" src="${getCharacterImage("${player.champion}")}" alt="${player.champion} 이미지">
  `
  ;
  playerCharacter.appendChild(picture);

  var playerInfoContainer = document.querySelector('.player9'); // 클래스로 선택

  var playerElement = document.createElement('div');
  playerElement.innerHTML = `
  <button class="btn2 outline"> ${player.name}</button>
  <button class="btn2 fill">${player.tier}</button>  
  `;
  playerInfoContainer.appendChild(playerElement);
}
function boxInfo10(player) {
  var playerCharacter = document.querySelector('.banner10');
  var picture = document.createElement('div');
  console.log(player.champion);
  console.log(picture);
  picture.innerHTML = `
  <img class="character-image" src="${getCharacterImage("${player.champion}")}" alt="${player.champion} 이미지">
  `
  ;
  playerCharacter.appendChild(picture);

  var playerInfoContainer = document.querySelector('.player10'); // 클래스로 선택

  var playerElement = document.createElement('div');
  playerElement.innerHTML = `
  <button class="btn2 outline"> ${player.name}</button>
  <button class="btn2 fill">${player.tier}</button>  
  `;
  playerInfoContainer.appendChild(playerElement);
}