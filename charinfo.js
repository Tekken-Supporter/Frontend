window.onload=()=>{

    //panel-faq-container
    const panelContainer = document.querySelectorAll('.panel-container');
    console.log(panelContainer);//NodeList객체

    // panel-faq-answer
    let panelAnswer = document.querySelectorAll('.panel-answer');
    console.log(panelAnswer);

    //btn-all-close
    const btnAllClose=document.getElementById('btn-all-close');
    console.log(btnAllClose);

    //반복문 순회하면서 해당FAQ제목 클릭시 콜백 처리
    for(let i=0;i<panelContainer.length;i++){
        panelContainer[i].addEventListener('click',function(){
            //클릭시 처리할일
            console.log('나 클릭...' + i);  

            //FAQ제목클릭시 > 본문이 보이게끔 > active 클래스 추가
            panelAnswer[i].classList.add('active');
        });
    }
    btnAllClose.addEventListener('click',function(){
    console.log('all close button click');

    //버튼클릭시 처리할일
    for(let i=0;i<panelAnswer.length;i++){
        panelAnswer[i].classList.remove('active');
    }
    });


//for review 
// XMLHTTPRequest를 이용한 API 호출 함수
function getReviews() {
    var xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var reviews = JSON.parse(xhr.responseText);
        displayReviews(reviews);
      } else if (xhr.readyState == 4 && xhr.status != 200) {
        console.error('API 호출 중 오류 발생');
      }
    };
  
    xhr.open('GET', '/character/review?c_name=&id=&reviewData=&creationTime=', true);
    xhr.send();
  }
  
  function postReview(comment) {
    var xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 201) {
        // 성공적으로 리뷰가 생성되었을 때의 처리
        getReviews(); // 업데이트된 리뷰 목록을 다시 가져와서 화면에 표시
      } else if (xhr.readyState == 4 && xhr.status != 201) {
        console.error('리뷰 작성 중 오류 발생');
      }
    };
  
    xhr.open('POST', '/character/review', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    // 리뷰 데이터를 JSON 형식으로 전송
    var reviewData = { comment: comment };
    xhr.send(JSON.stringify(reviewData));
  }
  
  function putReview(reviewId, updatedComment) {
    var xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // 성공적으로 리뷰가 수정되었을 때의 처리
        getReviews(); 
        // 업데이트된 리뷰 목록을 다시 가져와서 화면에 표시
      } else if (xhr.readyState == 4 && xhr.status != 200) {
        console.error('리뷰 수정 중 오류 발생');
      }
    };
  
    xhr.open('PUT', '/character/review?c_name=&id=&reviewData=&creationTime=' + reviewId, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    // 수정된 리뷰 데이터를 JSON 형식으로 전송
    var updatedReviewData = { comment: updatedComment };
    xhr.send(JSON.stringify(updatedReviewData));
  }
  
  function deleteReview(reviewId) {
    var xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // 성공적으로 리뷰가 삭제되었을 때의 처리
        getReviews(); // 업데이트된 리뷰 목록을 다시 가져와서 화면에 표시
      } else if (xhr.readyState == 4 && xhr.status != 200) {
        console.error('리뷰 삭제 중 오류 발생');
      }
    };
  
    xhr.open('DELETE', '/character/review?number=' + reviewId, true);
    xhr.send();
  }
  
  // 예시로 페이지 로드 시 리뷰를 가져와 화면에 표시
  document.addEventListener('DOMContentLoaded', function() {
    getReviews();
  });






}
