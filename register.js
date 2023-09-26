var jwt = localStorage.getItem("jwt");
if (jwt != null) {
  window.location.href = "./main.html";
}

function register() {
  const name = document.getElementById("newname").value;
  const id = document.getElementById("newid").value;
  const password = document.getElementById("newpassword").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://34.168.80.42:3000/auth/register");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhttp.send(
    JSON.stringify({
      name: name,
      id: id,
      password: password,
    })
  );

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
        if(this.status == 200){
            const objects = JSON.parse(this.responseText);
            console.log(objects);
            if (objects["status"] == "ok") {
            localStorage.setItem("jwt", objects["token"]);
            Swal.fire({
                text: '회원가입 성공!',
                icon: "success",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "./main.html";
                }
            });
            } else {
                Swal.fire({
                    text: '동일한 계정이 존재합니다',
                    icon: "error",
                    confirmButtonText: "Retry",
                });
            }
        } else {
            Swal.fire({
                text: '알 수 없는 오류가 발생했습니다',
                icon: "error",
                confirmButtonText: "Retry",
            })
        }
    }
  };
  return false;
}