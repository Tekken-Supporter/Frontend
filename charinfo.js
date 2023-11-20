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
}
