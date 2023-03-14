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
        for(let i=0; i < cityList_json.length; i++){
            if(Object.values(cityList_json[i])[0] == param){
                return Object.values(cityList_json[i])[1];
            }
        }
    }

    // travel-api select
    travelArea_C(uri) {
        //XMLHttpRequest 객체 생성
        let xhr = new XMLHttpRequest();
    
        //요청을 보낼 방식, 주소, 비동기여부 설정 (true == 비동기)
        xhr.open('POST', uri , true);
    
        //HTTP 요청 헤더 설정 
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

        //요청 전송
        xhr.send(); // <- JSON.stringify(data)를 해서 Body로 보내면됨
        
        //비동기 통신일때
        xhr.onload = () => { 
            if (xhr.status == 200) { 
                this.repeatJSON(xhr.response);
            } else { 
                alert("통신 실패"); 
                location.reload();
            } 
        }
    }

    // travel-api insert or update 
    travelArea_RUD(uri,jsonString){
        //XMLHttpRequest 객체 생성
        let xhr = new XMLHttpRequest();
    
        //요청을 보낼 방식, 주소, 비동기여부 설정 (true == 비동기)
        xhr.open('POST', uri , true);
    
        //HTTP 요청 헤더 설정 
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

        //요청 전송
        xhr.send(jsonString); // <- JSON.stringify(data)를 해서 Body로 보내면됨
        
        //비동기 통신일때
        xhr.onload = () => { 
            if (xhr.response >= 1) { 
                location.reload();
            } else { 
                alert("통신 실패"); 
                location.reload();
            } 
        }

    }

    /* JSON 객체를 가져와서 색칠하기 */
    repeatJSON(obj){
        //포문 돌리고 getfullname해야댐
        let jsonParse = JSON.parse(obj);

        for(let i =0; i< jsonParse.length; i++){
            //let content = item.textContent; csv클릭한것의 text 가져오기
            //let cityName = this.getFullName(jsonParse[i].location);
            let cityName = jsonParse[i].location;
            let changeColor;
            changeColor = svg.contentDocument.getElementById(cityName);
    
            if(changeColor == null){
                changeColor = svg.contentDocument.getElementsByClassName(cityName);
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
        let prom = prompt('비밀번호를 입력하세요'); //나중엔 DB연결할꺼임 SHA256 쓰면 괜찮을듯

        if(prom == '0212'){
            let input = confirm('변경하시겠습니까?');
            let update;

            if(input){
                update = 'Y'
            }else{
                update = 'N'
            }
            
            let content = this.getFullName(item.textContent);
            let mapcontent = {"location" : content , "update" : update};
            let jsonString = JSON.stringify(mapcontent);

            this.travelArea_RUD('https://travel-api.potatoo.dev/api/update/area',jsonString);
            //this.travelArea_RUD('http://127.0.0.1:9002/api/update/area',jsonString);

        }else{
            alert('비밀번호가 틀렸습니다.');
        }
    }


    MobileOrPC(mapCss){
        let mobileOrPc =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if(!mobileOrPc){
            mapCss.style.width = "700px";
        }
    }


}