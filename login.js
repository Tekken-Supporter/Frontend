var jwt = localStorage.getItem("jwt");
if (jwt != null) {
  window.location.href = "./myinfo.html";
}

function login() {
  const id = document.getElementById("id").value;
  const password = document.getElementById("password").value;
  const rememberMe = document.getElementById("rememberMe").checked; // '아이디 저장하기' 체크박스 상태 확인

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://34.127.90.191:3000/auth/login");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhttp.send(JSON.stringify({ id: id, password: password }));

  xhttp.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE) {
      try {
        if (this.status >= 200 && this.status < 300) {
          const objects = JSON.parse(this.responseText);

          if (objects["status"] === "ok") {
            localStorage.setItem("jwt", objects["token"]);
            
            if (rememberMe) { // 체크박스가 선택된 경우, 로컬 스토리지에 아이디 저장
              localStorage.setItem("userId", id);
            }

            Swal.fire({
              text: "로그인 성공!",
              icon: "success",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "./myinfo.html";
              }
            });
          } else {
            Swal.fire({
              text: "로그인에 실패했습니다",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        } else {
          Swal.fire({
            text: "서버 오류 발생. 잠시 후 다시 시도해주세요.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (e) {
        Swal.fire({
          text: "응답 처리 중 오류가 발생했습니다.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return false; // 폼 제출 방지
}


function load() {
  // 로컬 스토리지에서 저장된 아이디를 검색
  var savedUserId = localStorage.getItem("savedUserId");
  if (savedUserId) {
    // 저장된 아이디가 있으면 입력 필드에 채워 넣음
    document.getElementById("id").value = savedUserId;
    // '아이디 저장하기' 체크박스 선택
    document.getElementById("rememberMe").checked = true;
  }
}

// 페이지 로드 시 'load' 함수 실행
window.onload = load;