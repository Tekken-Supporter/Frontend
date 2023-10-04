window.onload=()=>{

    //panel-faq-container
    const panelFaqContainer = document.querySelectorAll('.panel-faq-container');
    console.log(panelFaqContainer);//NodeList객체

    // panel-faq-answer
    let panelFaqAnswer = document.querySelectorAll('.panel-faq-answer');
    console.log(panelFaqAnswer);

    //btn-all-close
    const btnAllClose=document.getElementById('btn-all-close');
    console.log(btnAllClose);


    //반복문 순회하면서 해당FAQ제목 클릭시 콜백 처리
    for(let i=0;i<panelFaqContainer.length;i++){
        panelFaqContainer[i].addEventListener('click',function(){
            //클릭시 처리할일
            console.log('나 클릭...' + i);   

            //FAQ제목클릭시 > 본문이 보이게끔 > active 클래스 추가
            //this.classList.add('active');
            panelFaqAnswer[i].classList.add('active');
        });
    }
    btnAllClose.addEventListener('click',function(){
        //버튼클릭시 처리할일
      //  let panelFaqAnswer=document.querySelectorAll('.panel-faq-answer')

    });
}
