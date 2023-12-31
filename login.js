var jwt = localStorage.getItem("jwt");
if (jwt != null) {
  window.location.href = "./myinfo.html";
}

function login() {
  const id = document.getElementById("id").value;
  const password = document.getElementById("password").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://34.127.90.191:3000/auth/login");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      id: id,
      password: password,
    })
  );

  xhttp.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE) {
      try {
        if (this.status >= 200 && this.status < 300) {
          const objects = JSON.parse(this.responseText); //서버로부터 받은 응답텍스트를 JSON 객체로 변환
          console.log(objects); //서버로부터 받은 응답 콘솔에 출력

          if (objects["status"] === "ok") { //서버로부터 받은 응답의 상태가 ok일 때
            localStorage.setItem("jwt", objects["token"]); //jwt라는 이름으로 서버에서 받은 토큰을 로컬스토리지에 저장
            localStorage.setItem("userId", id); // 사용자 ID를 로컬 스토리지에 저장
            Swal.fire({
              text: "로그인 성공!",
              icon: "success",
              confirmButtonText: "OK", //성공 메시지를 사용자에게 보여줌
            }).then((result) => { //확인 버튼 누르면
              if (result.isConfirmed) {
                window.location.href = "./myinfo.html"; //해당 페이지로 리다이렉션
              }
            });
          } else {
            Swal.fire({
              text: "로그인에 실패했습니다",
              icon: "error",
              confirmButtonText: "OK", 
            });
            console.error("Empty response received from the server");
          }
        } else {
          Swal.fire({
            text: "서버 오류 발생. 잠시 후 다시 시도해주세요.",
            icon: "error",
            confirmButtonText: "OK",
          });
          console.error("Server responded with status:", this.status);
        }
      } catch (e) {
        Swal.fire({
          text: "응답 처리 중 오류가 발생했습니다.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error parsing response:", e);
      }
    }
  };
  return false;
}

