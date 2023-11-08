const btnLogout = document.querySelector(".btnLogout");
const input_password = document.querySelector(".input_password");
const input_champion = document.querySelector(".input_champion");
const change_btn = document.querySelector(".change_btn")
const user_id = document.querySelector(".user_id");

var jwt = localStorage.getItem("jwt");

function loadUser() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://34.168.80.42:3000/user/info/:${user_id.value}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      if (objects["status"] == "ok") {
        const user = objects["user"];
        document.getElementById("name").placeholder = user["name"];
        document.getElementById("password").placeholder = user["password"];
        document.getElementById("id").placeholder = user["id"];
        document.getElementById("champion").src = user["champion"];
        document.getElementById("tier").placeholder = user["tier"];
        document.getElementById("winrate").placeholder = user["winrate"];
      }
    }
  };
}

const update_user = (event) =>{
  event.preventDefault();
  if (!input_champion.value || !input_password.value) {
        alert('챔피언 값과 비밀번호 값이 채워져야 합니다!');
        return;
    }
  const validChampions = ['AKUMA', 'ALISA', 'ARMOR KING', 'ASUKA', 'BOB', 'BRYAN', 'CLAUDIO', 'DEVIL JIN', 'DRAGUNOV', 'EDDY', 
  'FENG', 'GIGAS', 'HEIHACHI','HWARANG', 'JACK-7', 'JIN', 'JOSIE', 'KATARINA', 'KAZUMI', 'KAZUYA', 'KING', 'KUMA', 'LARS',
  'LAW', 'LEE', 'LEO', 'LILI', 'LUCKY CHLOE', 'MASTER RAVEN', 'MIGUEL', 'NINA', 'PANDA', 'PAUL', 'SHAHEEN', 'STEVE', 'XIAOYU', 'YOSHIMITSU'
  ];
  if (!validChampions.includes(input_champion.value)) {
        alert('Please enter a valid champion!');
        return;
  }
  console.log(input_password.value,input_champion.value)

  if (this.readyState == 4) {
    if(this.status == 200){
        const objects = JSON.parse(this.responseText);
        console.log(objects);
        if (objects["status"] == "ok") {
        localStorage.setItem("jwt", objects["token"]);
        Swal.fire({
            text: '정보 수정 완료!',
            icon: "success",
            confirmButtonText: "OK",
        })       
      };
    }
  }
}

btnLogout.addEventListener("click",logout)
change_btn.addEventListener("click",update_user)


document.querySelectorAll('input').forEach(input => {
  input.addEventListener('click', function() {
    if (!this.value) {
      this.value = this.placeholder;
    }
  });
});

function logout(event) {
  event.preventDefault()
  window.location.href = "main.html";
  console.log(window.location.href)
  localStorage.removeItem("jwt");
}