
var jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImlkIjoidGVzdCIsImlhdCI6MTY5OTYzMjA1NywiZXhwIjoxNzAyMjI0MDU3fQ.P0AX2jyS18tjHFKBQRy6Wi6OWG9AlDQ4hJtpZp3woB0";
//API 1 >> under 10th용 
  var xhttp = new XMLHttpRequest();
  //서버로부터 데이터 가져오기
  xhttp.open("GET", "http://34.127.90.191:3000/ranking/", true);
  
  // 데이터가 도착할 때 실행할 콜백 함수 설정
  xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
          var data = JSON.parse(xhttp.responseText); 
          console.log(data);// 티어별 구분 -success  
          var opener = data[5];
         
          displayGateKeeperInfo(opener);
          
          const fourthTear = data[4];
          console.log(fourthTear);//under10th 
          extractAndDisplayData(fourthTear);
          
      }
  };
xhttp.send();//request sending

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
  
  for (let i = 0; i < resultElements.length; i++) {
      const resultElement = resultElements[i];
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
    }
};
xhttp2.send();

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
  
  picture.innerHTML = `
    <img class="champion-image" src="${getChampionImageDynamic(player.champion)}" alt="${player.champion} 이미지">
  `;
  playerCharacter.appendChild(picture);
  console.log(getChampionImageDynamic(player.champion));

  var playerInfoContainer = document.querySelector('.champion'); 
  var playerElement = document.createElement('div');
  playerElement.style= 'margin-top : 50px;'
  playerElement.innerHTML = `
  <button class="btn outlineforC"><h1> ${player.name}</h1></button>
  <button class="btn fillforC"><h1> ${player.tier}</h1></button>
  `;
  playerInfoContainer.appendChild(playerElement);
}
function boxInfo3(player) {
  var playerCharacter = document.querySelector('.banner-image2.banner3');
  var picture = document.createElement('div');
  picture.classList.add('images'); 
  console.log(player.champion);
  picture.innerHTML = `
  <img class="character-image" src="${getChampionImageDynamic(player.champion)}" alt="${player.champion} 이미지">
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

function boxInfo2(player) {
  var playerCharacter = document.querySelector('.banner-image2.banner2');
  var picture = document.createElement('div');
  picture.classList.add('images'); 
  console.log(player.champion);
  picture.innerHTML = `
  <img class="character-image" src="${getChampionImageDynamic(player.champion)}" alt="${player.champion} 이미지">
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


function boxInfo4(player) {
  var playerCharacter = document.querySelector('.banner-image2.banner4');
  var picture = document.createElement('div');
  picture.classList.add('images'); 
  console.log(player.champion);
  picture.innerHTML = `
  <img class="character-image" src="${getChampionImageDynamic(player.champion)}" alt="${player.champion} 이미지">
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
  var playerCharacter = document.querySelector('.banner-image2.banner5');
  var picture = document.createElement('div');
  picture.classList.add('images'); 
  console.log(player.champion);
  picture.innerHTML = `
  <img class="character-image" src="${getChampionImageDynamic(player.champion)}" alt="${player.champion} 이미지">
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
  var playerCharacter = document.querySelector('.banner-image2.banner6');
  var picture = document.createElement('div');
  picture.classList.add('images'); 
  console.log(player.champion);
  picture.innerHTML = `
  <img class="character-image" src="${getChampionImageDynamic(player.champion)}" alt="${player.champion} 이미지">
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
  var playerCharacter = document.querySelector('.banner-image2.banner7');
  var picture = document.createElement('div');
  picture.classList.add('images'); 
  console.log(player.champion);
  picture.innerHTML = `
  <img class="character-image" src="${getChampionImageDynamic(player.champion)}" alt="${player.champion} 이미지">
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
  var playerCharacter = document.querySelector('.banner-image2.banner8');
  var picture = document.createElement('div');
  picture.classList.add('images'); 
  console.log(player.champion);
  picture.innerHTML = `
  <img class="character-image" src="${getChampionImageDynamic(player.champion)}" alt="${player.champion} 이미지">
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
  var playerCharacter = document.querySelector('.banner-image2.banner9');
  var picture = document.createElement('div');
  picture.classList.add('images'); 
  console.log(player.champion);
  picture.innerHTML = `
  <img class="character-image" src="${getChampionImageDynamic(player.champion)}" alt="${player.champion} 이미지">
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
  var playerCharacter = document.querySelector('.banner-image2.banner10');
  var picture = document.createElement('div');
  picture.classList.add('images'); 
  console.log(player.champion);
  picture.innerHTML = `
  <img class="character-image" src="${getChampionImageDynamic(player.champion)}" alt="${player.champion} 이미지">
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

const btnLogout = document.querySelector(".btnLogout");

btnLogout.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "main.html";
    console.log("Redirecting to:", window.location.href);
    localStorage.removeItem("jwt");
  });