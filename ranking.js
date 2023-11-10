
    
  //var jwt = localStorage.getItem("jwt");
 var jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImlkIjoidGVzdCIsImlhdCI6MTY5OTYzMjA1NywiZXhwIjoxNzAyMjI0MDU3fQ.P0AX2jyS18tjHFKBQRy6Wi6OWG9AlDQ4hJtpZp3woB0";

  if (jwt == null) {
   window.location.href = './ranking.html'
 }
     //console.log(jwt);
     console.log(localStorage.getItem("jwt"));
     if (jwt) {
       var xhttp = new XMLHttpRequest();

       xhttp.open("GET", "http://34.127.90.191:3000/ranking", true);
       xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
       xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
       xhttp.send();
      
       xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
            
           const objects = JSON.parse(this.responseText);
           
           if (objects["status"] == "ok"){
             const user = objects["user"];
             displayUserInfo(objects.user);
           }
           else {
             console.error("Error fetching user information");
           }
         }
       };
   
       
     } 
     
     else {
       console.error("JWT token not found. User not authenticated.");
     }
   
     function displayUserInfo(user) {
       document.querySelector(".avatar").src = user.avatar;
       document.querySelector(".username").textContent = user.username;
     }
 
     function displayUserInfo(user) {
         document.querySelector(".avatar").src = user.avatar;
         document.querySelector(".username").textContent = user.username;
 
       
       }
 
 
   