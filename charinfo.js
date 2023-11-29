var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImlkIjoidGVzdCIsImlhdCI6MTY5OTYzMjA1NywiZXhwIjoxNzAyMjI0MDU3fQ.P0AX2jyS18tjHFKBQRy6Wi6OWG9AlDQ4hJtpZp3woB0";
var reviews = [];
const reviewsPerPage = 3;
let currentPage = 1;

document.addEventListener("DOMContentLoaded", loadReviews(currentPage));

var submitButton = document.getElementById("submit");
// 이벤트 리스너를 추가하기 전에 엘리먼트가 존재하는지 확인

// [리뷰창 보이게 만들기] 
//loadReviews > 리뷰 편집기능과는 별개로 사용자에게 리뷰공개 
loadReviews(currentPage);
loadPageNumbers();//index of lists

function loadPageNumbers() {
  const paginationContainer = document.getElementById("pagination-container");
  const totalPages = Math.ceil(20 / reviewsPerPage);

  for (let i = 0; i < totalPages; i++) {
    const pageNumber = i + 1;
    const pageLink = document.createElement("span");
    pageLink.textContent = pageNumber;
    pageLink.classList.add("page-link");
    pageLink.addEventListener("click", () => {
      currentPage = i + 1;
      loadReviews(currentPage);
      const pageLinks = document.querySelectorAll(".page-link");

      pageLinks.forEach((link, index) => {
        if (index + 1 === currentPage) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    });
    paginationContainer.appendChild(pageLink);
  }
}

function loadReviews(page) {
  var xhr = new XMLHttpRequest();
  var url = "http://34.127.90.191:3000/character/review?c_name=&id=&reviewData=&creationTime=";

  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        // 서버 응답에 따른 추가 작업 수행
        reviews = JSON.parse(xhr.responseText);
        console.log(reviews);
        const startIndex = (page - 1) * reviewsPerPage;
        const endIndex = startIndex + reviewsPerPage;
        const currentPageReviews = reviews.slice(startIndex, endIndex);
        displayReviews(currentPageReviews);
      } else {
        console.error("서버 에러:", xhr.status);
      }
    }
  };
  xhr.send();
}

function displayReviews(reviews) {//loadReviews 관련
  const reviewListContainer = document.getElementById("reviewList");
  reviewListContainer.innerHTML = "";

  reviews.forEach((review) => {
    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review");
    reviewElement.innerHTML = `
          <p>캐릭터 이름: ${review.c_name || "알 수 없음"}</p>
          <p>사용자 ID: ${review.id || "알 수 없음"}</p>
          <p>리뷰 내용: ${review.reviewData || "리뷰 없음"}</p>
          <p>작성 시간: ${review.Creationtime || "알 수 없음"}</p>
          <button type="updateReview(${review.number})">수정</button>
          <button type="deleteReview(${review.number})">삭제</button>
      `;
    reviewListContainer.appendChild(reviewElement);
  });
}

// [ 캐릭터 목록들 정리버튼 ]
const btnAllClose = document.getElementById('btn-all-close');
btnAllClose.addEventListener('click', resetCharacterContainers);
console.log('all close button click');
function resetCharacterContainers() {
  const characterContainers = document.querySelectorAll('.character-container');
  characterContainers.forEach(container => {
    container.style.display = 'none';
  });
}
// 각 캐릭터 링크에 이벤트 리스너 추가
const characterLinks = document.querySelectorAll('.character-link');
characterLinks.forEach(link => {
  link.addEventListener('click', showCharacterInfo);
});
// 클릭한 캐릭터의 데이터 얻기
function showCharacterInfo(event) {
  const characterId = event.target.getAttribute('data-character');
  const characterContainers = document.querySelectorAll('.character-container');
  characterContainers.forEach(container => {
    container.style.display = 'none';
  });
  // 클릭한 캐릭터에 해당하는 컨테이너 보이기
  const selectedContainer = document.getElementById(characterId);
  if (selectedContainer) {
    selectedContainer.style.display = 'block';
  }
}

///////////////// 캐릭터 설명창입니다 //////////////
var xhr7 = new XMLHttpRequest();
var url = "http://34.127.90.191:3000/character/main";

xhr7.open("GET", url, true);
xhr7.onreadystatechange = function () {
  if (xhr7.readyState == 4) {
    if (xhr7.status == 200) {
      // 서버 응답에 따른 추가 작업 수행
     tips = JSON.parse(xhr7.responseText);
     console.log(tips);
     var akuma =tips[0];
     var alisa = tips[1];
     var armor = tips[2];
     var asuka = tips[3];
     var bob =tips[4];
     var bryan =tips[5];
     var claudio =tips[6];
     var devil =tips[7];
     var eddy =tips[9];
     
    checkLevel1(akuma);
    checkLevel2(alisa);
    checkLevel3(armor);
    checkLevel4(asuka);
    checkLevel5(bob);
    checkLevel6(bryan);
    checkLevel7(claudio);
    checkLevel8(devil);
    checkLevel9(eddy);
    } else {
        console.error("서버 에러:", xhr7.status);
      }
    }
  };
  xhr7.send();

  function getChacImageDynamic(chacName) { //모두 대문자로 받음
    return `https://github.com/Tekken-Supporter/Frontend/blob/main/IMAGES/${chacName}`+ `.png?raw=true`;
  }
  ///~295 같은형식의 코드들 
function checkLevel1(tips) {
  var characterinfo = document.getElementById('character1');
  var tip = document.createElement('div');
  tip.classList.add('tips');
  console.log(tips.difficulty);
  tip.innerHTML = `<p>${tips.difficulty}</p>`;
  characterinfo.appendChild(tip);
  var pic = document.createElement('div');
  pic.innerHTML = `
  <img class="character-image"  src="${getChacImageDynamic(tips.c_name)}" alt="캐릭터 이미지"></img>
  `;
  characterinfo.appendChild(pic);
}
function checkLevel2(tips) {
  var characterinfo = document.getElementById('character2');
  var tip = document.createElement('div');
  tip.classList.add('tips');
  console.log(tips.difficulty);
  tip.innerHTML = `<p>${tips.difficulty}</p>`;
  characterinfo.appendChild(tip);
  var pic = document.createElement('div');
  pic.innerHTML = `
  <img class="character-image" src="${getChacImageDynamic(tips.c_name)}" alt="캐릭터 이미지"></img>
  `;
  characterinfo.appendChild(pic);
}
function checkLevel3(tips) {
  var characterinfo = document.getElementById('character3');
  var tip = document.createElement('div');
  tip.classList.add('tips');
  console.log(tips.difficulty);
  tip.innerHTML = `<p>${tips.difficulty}</p>`;
  characterinfo.appendChild(tip);
  var pic = document.createElement('div');
  pic.innerHTML = `
  <img class="character-image"  src="${getChacImageDynamic(tips.c_name)}" alt="캐릭터 이미지"></img>
  `;
  characterinfo.appendChild(pic);
}
function checkLevel4(tips) {
  var characterinfo = document.getElementById('character4');
  var tip = document.createElement('div');
  tip.classList.add('tips');
  console.log(tips.difficulty);
  tip.innerHTML = `<p>${tips.difficulty}</p>`;
  characterinfo.appendChild(tip);
  var pic = document.createElement('div');
  pic.innerHTML = `
  <img class="character-image"  src="${getChacImageDynamic(tips.c_name)}" alt="캐릭터 이미지"></img>
  `;
  characterinfo.appendChild(pic);
}
function checkLevel5(tips) {
  var characterinfo = document.getElementById('character5');
  var tip = document.createElement('div');
  tip.classList.add('tips');
  console.log(tips.difficulty);
  tip.innerHTML = `<p>${tips.difficulty}</p>`;
  characterinfo.appendChild(tip);

   
  var pic = document.createElement('div');
  pic.innerHTML = `
  <img class="character-image"  src="${getChacImageDynamic(tips.c_name)}" alt="캐릭터 이미지"></img>
  `;
  characterinfo.appendChild(pic);
}
function checkLevel6(tips) {
  var characterinfo = document.getElementById('character6');
  var tip = document.createElement('div');
  tip.classList.add('tips');
  console.log(tips.difficulty);
  tip.innerHTML = `<p>${tips.difficulty}</p>`;
  characterinfo.appendChild(tip);

   
  var pic = document.createElement('div');
  pic.innerHTML = `
  <img class="character-image"  src="${getChacImageDynamic(tips.c_name)}" alt="캐릭터 이미지"></img>
  `;
  characterinfo.appendChild(pic);
}
function checkLevel7(tips) {
  var characterinfo = document.getElementById('character7');
  var tip = document.createElement('div');
  tip.classList.add('tips');
  console.log(tips.difficulty);
  tip.innerHTML = `<p>${tips.difficulty}</p>`;
  characterinfo.appendChild(tip);

   
  var pic = document.createElement('div');
  pic.innerHTML = `
  <img class="character-image"  src="${getChacImageDynamic(tips.c_name)}" alt="캐릭터 이미지"></img>
  `;
  characterinfo.appendChild(pic);
}
function checkLevel8(tips) {
  var characterinfo = document.getElementById('character8');
  var tip = document.createElement('div');
  tip.classList.add('tips');
  console.log(tips.difficulty);
  tip.innerHTML = `<p>${tips.difficulty}</p>`;
  characterinfo.appendChild(tip);
   
  var pic = document.createElement('div');
  pic.innerHTML = `
  <img class="character-image"  src="${getChacImageDynamic(tips.c_name)}" alt="캐릭터 이미지"></img>
  `;
  characterinfo.appendChild(pic);
}
function checkLevel9(tips) {
  var characterinfo = document.getElementById('character9');
  var tip = document.createElement('div');
  tip.classList.add('tips');
  console.log(tips.difficulty);
  tip.innerHTML = `<p>${tips.difficulty}</p>`;
  characterinfo.appendChild(tip);
   
  var pic = document.createElement('div');
  pic.innerHTML = `
  <img class="character-image"  src="${getChacImageDynamic(tips.c_name)}" alt="캐릭터 이미지"></img>
  `;
  characterinfo.appendChild(pic);
}

//여기서부터 수정필요한 REVIEW 코드들:put, delete, post  
// 1 GET, reviewsend. js에 따로 있음.  
// 2 PUT, update 리뷰 수정 함수 > 미루기 
function updateReview(reviewId) {
  var modifiedReviewContent = prompt("수정된 리뷰 내용을 입력하세요:");
  if (modifiedReviewContent !== null) {
    var modifiedTime = new Date().toISOString();

    var updatedData = {
      reviewId: reviewId,
      modifiedTime: modifiedTime,
      reviewData: modifiedReviewContent,
    };

    // XMLHttpRequest 객체 생성
    var xhr3 = new XMLHttpRequest();
    var url = "http://34.127.90.191:3000/character/review?c_name=&id=&reviewData=&creationTime=";

    xhr3.open("PUT", url, true);
    xhr3.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr3.setRequestHeader("Authorization", "Bearer " + jwt);

    xhr3.onreadystatechange = function () {
      if (xhr3.readyState == 4) {
        if (xhr3.status == 200) {
          console.log("서버 응답:", xhr3.responseText);
          // 서버 응답에 따른 추가 작업 수행
          var response = JSON.parse(xhr3.responseText);
          if (response.status === "success") {
            // 리뷰가 성공적으로 수정된 경우에 처리할 내용 추가
            // 예: 수정된 리뷰를 웹에 보여주기
            displayReview(response.data);
          } else {
            // 리뷰 수정이 실패한 경우에 처리할 내용 추가
            console.error("리뷰 수정 실패:", response.message);
          }
        } else {
          console.error("서버 에러:", xhr3.status);
        }
      }
    };
    xhr3.send(JSON.stringify(updatedData));
  }
}

//3 delete, Review
var deleteButtons = document.querySelectorAll(".deleteButton");
deleteButtons.forEach(function (deleteButton) {
  deleteButton.addEventListener("click", function () {
    var reviewId = deleteButton.getAttribute("data-reviewid");
    console.log(reviewId);
    deleteReviewFunction(reviewId);
  });
});

function deleteReview(reviewId) {
  var xhr4 = new XMLHttpRequest();
  var url = "http://34.127.90.191:3000/character/review";

  xhr4.open("DELETE", url + "?number" + reviewId, true);

  xhr4.onreadystatechange = function () {
    if (xhr4.readyState == 4) {
      if (xhr4.status == 200) {
        console.log("서버 응답:", xhr4.responseText);
        var response = JSON.parse(xhr4.responseText);
        if (response.status === "success") {
          removeReviewFromUI(reviewId);
        } else {
          console.error("리뷰 삭제 실패:", response.message);
        }
      } else {
        console.error("서버 에러:", xhr4.status);
      }
    }
  };
  xhr4.send();
}

// 4. 리뷰를 웹에 보여주는 함수 (UI 업데이트)
function displayReview(reviewData) {
  reviews.push(reviewData);// 리뷰 배열에 추가
  // 리뷰를 웹에 표시
  updateReviewList();
}

// 리뷰를 웹에서 제거하는 함수 (UI 업데이트)
function removeReviewFromUI(reviewId) {
  // 리뷰 목록에서 해당 리뷰를 찾아서 제거
  reviews = reviews.filter(review => review.id !== reviewId);
  // 리뷰를 웹에 표시
  updateReviewList();
}

// 2,4  related: 리뷰 목록을 업데이트하는 함수
function updateReviewList() {

  var reviewListContainer = document.getElementById("reviewList");
  // 이전 리뷰 목록을 지우기
  reviewListContainer.innerHTML = "";

  // 각 리뷰에 대해 HTML 엘리먼트를 생성하여 추가
  reviews.forEach(function (review) {
    var reviewElement = document.createElement("div");
    reviewElement.classList.add("review");
    reviewElement.innerHTML = `
      <p>캐릭터 이름: ${review.c_name}</p>
      <p>사용자 ID: ${review.id}</p>
      <p>리뷰 내용: ${review.reviewData}</p>
      <p>작성 시간: ${review.CreationTime}</p>
      <p>수정 시간: ${review.modifiedTime}</p>
      <button onclick="updateReview(${review.number})">수정</button>
      <button onclick="deleteReviewFunction(${review.number})">삭제</button>
  `;
    reviewListContainer.appendChild(reviewElement);
  });
}


  


    
    
  

