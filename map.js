class Map{

    /* click 이벤트 생성 */
    makeClickEvent(travelArr){
        for (let i = 0; i < travelArr.length; i++) {
            travelArr[i].addEventListener('click', () => {
                this.fillArea(travelArr[i]);
            });
        }
    };

    /* 클릭시 해당 화면을 색칠해줌 */
    fillArea(item){
        let content = item.textContent;
        let cityName = this.getFullName(content);
        let changeColor;
        console.log(content, cityName);
        
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
}