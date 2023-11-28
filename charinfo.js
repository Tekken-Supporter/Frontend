var jwt= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImlkIjoidGVzdCIsImlhdCI6MTY5OTYzMjA1NywiZXhwIjoxNzAyMjI0MDU3fQ.P0AX2jyS18tjHFKBQRy6Wi6OWG9AlDQ4hJtpZp3woB0";
var reviews = [];
const reviewsPerPage = 3;
let currentPage = 1;

window.onload=()=>{

var submitButton = document.getElementById("button");
// 이벤트 리스너를 추가하기 전에 엘리먼트가 존재하는지 확인
if (submitButton) {
    submitButton.addEventListener("click", submitReview);
} else {
    console.error("Submit 버튼을 찾을 수 없습니다.");
}

//1 submit , POST 
function submitReview() {
  console.log("come in submit Review");
  var cName = document.getElementById("cName").value;
  var userId = document.getElementById("userId").value;
  var reviewContent = document.getElementById("reviewContent").value;

  var currentTime = new Date();
  var creationTime = currentTime.toISOString();
  var modifiedTime = currentTime.toISOString();

  // 데이터 객체 생성
  var data = {
    c_name: cName,
    id: userId,
    reviewData: reviewContent,
    creationTime: creationTime,
    modifiedTime: modifiedTime,
  };

  // XMLHttpRequest 객체 생성
  console.log("posting 2 server");
  var xhr2 = new XMLHttpRequest();
  var url = "http://34.127.90.191:3000/character/review";

  xhr2.open("POST", url, true);

  xhr2.onreadystatechange = function () {
    if (xhr2.readyState == 4) {
      if (xhr2.status == 200) {
        console.log("서버 응답:", xhr2.responseText);
        // 서버 응답에 따른 추가 작업 수행
        var response = JSON.parse(xhr2.responseText);
        console.log(response.status);
        if (response.status === "success") {
          // 리뷰가 성공적으로 등록된 경우에 처리할 내용 추가
          // 예: 수정된 리뷰를 웹에 보여주기
          displayReview(response.data);
        } else {
          // 리뷰 등록이 실패한 경우에 처리할 내용 추가
          console.error("리뷰 등록 실패:", response.message);
        }
      } else {
        console.error("서버 에러:", xhr2.status);
      }
    }
  };
  // 데이터를 JSON 형식으로 변환하여 전송
  xhr2.send(JSON.stringify(data));
  
loadReviews(currentPage);
loadPageNumbers();//index of lists
}

function getReviews() {
  var xhr1 = new XMLHttpRequest();
  var url = "http://34.127.90.191:3000/character/review";
  
  xhr1.open("GET", url, true);
  xhr1.onreadystatechange = function () {
      if (xhr1.readyState == 4) {
          if (xhr1.status == 200) {
              var response = JSON.parse(xhr1.responseText);
              displayReviews(response);
          } else {
              console.error("서버 에러:", xhr1.status);
          }
      }
  };
  xhr1.send();
}

// 2 PUT, update 리뷰 수정 함수
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
    var url = "http://34.127.90.191:5500/character/review?c_name=&id=&reviewData=&creationTime=";
   
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

    // 데이터를 JSON 형식으로 변환하여 전송
    xhr3.send(JSON.stringify(updatedData));
  }
}

//3 delete, REview
// 리뷰 삭제 함수 (삭제하는 방법은 서버에 따라 다를 수 있습니다)
function deleteReview(reviewId) {
  var confirmation = confirm("정말로 리뷰를 삭제하시겠습니까?");
  if (confirmation) {
    // XMLHttpRequest 객체 생성
    var xhr4 = new XMLHttpRequest();
    var url = "http://34.127.90.191:5500/character/review?number=";

    xhr4.open("DELETE", url + "?reviewId=" + reviewId, true);

    xhr4.onreadystatechange = function () {
      if (xhr4.readyState == 4) {
        if (xhr4.status == 200) {
          console.log("서버 응답:", xhr4.responseText);
          // 서버 응답에 따른 추가 작업 수행
          var response = JSON.parse(xhr4.responseText);
          if (response.status === "success") {
            // 리뷰가 성공적으로 삭제된 경우에 처리할 내용 추가
            // 예: 삭제된 리뷰를 웹에서 제거
            removeReviewFromUI(reviewId);
          } else {
            // 리뷰 삭제가 실패한 경우에 처리할 내용 추가
            console.error("리뷰 삭제 실패:", response.message);
          }
        } else {
          console.error("서버 에러:", xhr4.status);
        }
      }
    };
    xhr4.send();
  }
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
      <p>작성 시간: ${review.creationTime}</p>
      <p>수정 시간: ${review.modifiedTime}</p>
      <button onclick="updateReview(${review.id})">수정</button>
      <button onclick="deleteReview(${review.id})">삭제</button>
    `;
    reviewListContainer.appendChild(reviewElement);
  });
 }
//
// [ 캐릭터 목록들 정리버튼 ]
const btnAllClose=document.getElementById('btn-all-close');
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
    
function showCharacterInfo(event) {
   // 클릭한 캐릭터의 데이터 얻기
   const characterId = event.target.getAttribute('data-character');
    
   // 모든 캐릭터 컨테이너 숨기기
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

  ///////////////////
//[리뷰창 보이게 만들기] 
loadReviews(currentPage);
loadPageNumbers();//index of lists

function loadReviews(page) {
  var xhr = new XMLHttpRequest();
  var url = "http://34.127.90.191:3000/character/review";
  
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
 function displayReviews(reviews) {
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
          <button onclick="updateReview(${review.number})">수정</button>
          <button onclick="deleteReview(${review.number})">삭제</button>
      `;
      reviewListContainer.appendChild(reviewElement);
  });
}
function loadPageNumbers() {
  const paginationContainer = document.getElementById("pagination-container");
  const totalPages = Math.ceil(12 / reviewsPerPage);

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

checkLevel();

function checkLevel(){
  var xhr7 = new XMLHttpRequest();
  var url = "http://34.127.90.191:3000/character/main";
  
  xhr7.open("GET", url, true);
  xhr7.onreadystatechange = function () {
    if (xhr7.readyState == 4) {
      if (xhr7.status == 200) {
        // 서버 응답에 따른 추가 작업 수행
       tips = JSON.parse(xhr7.responseText);
       console.log(tips);
      } else {
          console.error("서버 에러:", xhr7.status);
        }
      }

    };
    xhr7.send();
}
  


    }
    
    
    
