var jwt = localStorage.getItem("jwt");
if (jwt != null) {
  window.location.href = "./myinfo.html";
}

function login() {
  const id = document.getElementById("id").value;
  const password = document.getElementById("password").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://34.168.80.42:3000/auth/login");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhttp.send(
    JSON.stringify({
      id: id,
      password: password,
    })
  );

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText); // 서버로부터 받은 응답텍스트를 JSON 객체로 변환
      console.log(objects); //서버로부터 받은 응답 콘솔에 출력
      if (objects["status"] == "ok") { // 서버로부터 받은 응답의 상태가 ok일 때
        localStorage.setItem("jwt", objects["token"]); //jwt라는 이름으로 서버에서 받은 토큰을 로컬스토리지에 저장
        Swal.fire({
          text: "로그인 성공!",
          icon: "success",
          confirmButtonText: "OK", //성공 메시지를 사용자에게 보여줌
        }).then((result) => { // 확인 버튼 누르면
          if (result.isConfirmed) {
            window.location.href = "./myinfo.html"; // 해당 페이지로 리다이렉션
          }
        });
      } else {
        Swal.fire({
          text: "로그인에 실패했습니다",
          icon: "error",
          confirmButtonText: "OK", //서버로부터 받은 응답이 ok가 아닐 때 에러 메세지를 보여줌
        });
      }
    }
  };
  return false;
}