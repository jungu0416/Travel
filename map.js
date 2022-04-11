class Map{

    /* click 이벤트 생성 */
    makeClickEvent(travelArr){
        for (let i = 0; i < travelArr.length; i++) {
            travelArr[i].addEventListener('click', () => {
                this.fillArea(travelArr[i]);
            });
        }
    };


    /* 해당 글자를 시/군으로 알려줌 
     * cityList_json = json 형식의 변수
     */ 
    getFullName(param){
        if(param == '광주'){
            let seperate_prompt = prompt('1 : 경기도 광주'+ '\n' +'2 : 전라도 광주');
            if(seperate_prompt == '1'){
                return '광주시';
            }else{
                return '광주광역시';
            }
        }

        if (param == '고성') {
            let seperate_prompt = prompt('1 : 강원도 고성' + '\n' + '2 : 경상남도 고성');
            if (seperate_prompt == '1') {
                return '고성군';
            } else {
                return '고성군_1_';
            }
        }

        for(let i=0; i < cityList_json.length; i++){
            if(Object.values(cityList_json[i])[0] == param){
                return Object.values(cityList_json[i])[1];
            }
        }
    }

    /*
    *   travel-api 색칠된 지역 조회하기
    */
    checkArea() {
        //XMLHttpRequest 객체 생성
        let xhr = new XMLHttpRequest();
    
        //요청을 보낼 방식, 주소, 비동기여부 설정 (true == 비동기)
        xhr.open('POST', 'https://travel-api.potatoo.dev/api/check/area', true);
    
        //요청 전송
        xhr.send();
        
        //비동기 통신일때
        xhr.onload = () => { 
            //통신 성공 
            if (xhr.status == 200) { 
                this.repeatJSON(xhr.response);
            } else { 
                //통신 실패
                alert("통신 실패"); 
            } 
        }
    }


    /* JSON 객체를 가져와서 색칠하기 */
    repeatJSON(obj){
        //포문 돌리고 getfullname해야댐
        let jsonParse = JSON.parse(obj);

        for(let i =0; i< jsonParse.length; i++){
            //let content = item.textContent; csv클릭한것의 text 가져오기
            let cityName = this.getFullName(jsonParse[i].location);
            let changeColor;
            
            changeColor = svgDoc.getElementById(cityName);
    
            if(changeColor == null){
                changeColor = svgDoc.getElementsByClassName(cityName);
                
                for(let i=0; i < changeColor.length; i++){
                    changeColor[i].style.cssText = 'fill: rgb(108 242 125);';
                }
                
            }else{
                changeColor.style.cssText = 'fill: rgb(108 242 125);';
            }
        }

    }
    
    /* 클릭시 DB에 Insert or Update */
    fillArea(item){
        let content = item.textContent;
        alert(content);
        
    }


}