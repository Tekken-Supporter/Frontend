function submitReview() {
    const cName = document.getElementById("cName").value;
    const userId = document.getElementById("userId").value;
    const reviewContent = document.getElementById("reviewContent").value;
    console.log(cName + userId + reviewContent);
    // XMLHttpRequest 객체 생성
    const xhr2 = new XMLHttpRequest();

    xhr2.open("POST", "http://34.127.90.191:3000/character/review");
    xhr2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr2.send(
        JSON.stringify({
            c_name: cName,
            id: userId,
            reviewData: reviewContent
        })
    );

    xhr2.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            try {
                if (this.status >= 200 && this.status < 300) {
                    const objects = JSON.parse(this.responseText); //서버로부터 받은 응답텍스트를 JSON 객체로 변환
                    console.log(objects); //서버로부터 받은 응답 콘솔에 출력

                    if (objects["c_name"] === cName && objects["id"] === userId) {
                        console.log("save in Local done! ");
                        Swal.fire({
                            text: "리뷰를 작성했습니다!",
                            icon: "success",
                            confirmButtonText: "OK"
                        }).then((result) => { //확인 버튼 누르면
                            if (result.isConfirmed) {
                                window.location.href = "./charinfo.html"; //해당 페이지로 리다이렉션
                            }
                        });
                    } else {
                        console.error("Empty response received from the server");
                    }
                } else {
                    console.error("Server responded with status:", this.status);
                }
            } catch (e) {
                Swal.fire({
                    text: "응답 처리 중 오류가 발생했습니다!",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                console.error("Error parsing response:", e);
            }
        }
    };
    return false;
}