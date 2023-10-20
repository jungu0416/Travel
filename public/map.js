class Map{

    /* 이벤트 생성 */
    event(travelArr){
        for (let i = 0; i < travelArr.length; i++) {
            travelArr[i].addEventListener('click', () => {
                this.fillArea(travelArr[i]);
            });

            travelArr[i].addEventListener('mouseover', () => {
                travelArr[i].classList.add("mouseVisual");
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
    getArea(uri) {
        //XMLHttpRequest 객체 생성
        let xhr = new XMLHttpRequest();
    
        //요청을 보낼 방식, 주소, 비동기여부 설정 (true == 비동기)
        xhr.open('GET', uri , true);
    
        //HTTP 요청 헤더 설정 
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

        //요청 전송
        xhr.send(); // <- JSON.stringify(data)를 해서 Body로 보내면됨
        
        //비동기 통신일때
        xhr.onload = () => { 
            if (xhr.status == 200) { 
                this.repeatJSON(xhr.response);
            } else { 
                alert("서버와의 통신이 끊겼습니다. 다시 접속해 주세요."); 
                location.reload();
            } 
        }
    }

    // travel-api insert
    // insertArea(uri,jsonString){
        
    //     //XMLHttpRequest 객체 생성
    //     let xhr = new XMLHttpRequest();
    
    //     //요청을 보낼 방식, 주소, 비동기여부 설정 (true == 비동기)
    //     xhr.open('POST', uri , true);
    
    //     //HTTP 요청 헤더 설정 
    //     xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

    //     //요청 전송
    //     xhr.send(jsonString); // <- JSON.stringify(data)를 해서 Body로 보내면됨
        
    //     //비동기 통신일때
    //     xhr.onload = () => { 
    //         location.reload();
    //     }
    
    // }


    // travel-api update 
    // updateArea(uri,jsonString){
        
    //     //XMLHttpRequest 객체 생성
    //     let xhr = new XMLHttpRequest();
    
    //     //요청을 보낼 방식, 주소, 비동기여부 설정 (true == 비동기)
    //     xhr.open('PUT', uri , true);
    
    //     //HTTP 요청 헤더 설정 
    //     xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

    //     //요청 전송
    //     xhr.send(jsonString); // <- JSON.stringify(data)를 해서 Body로 보내면됨
        
    //     //비동기 통신일때
    //     xhr.onload = () => { 
    //         location.reload();
    //     }
    
    // }

    // DBKEY 비교 후 upSert 
    upSertArea(uri,jsonString){
        
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
            location.reload();
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
            changeColor = document.getElementById(cityName);
    
            if(changeColor == null){
                changeColor = document.getElementsByClassName(cityName);
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
        let dbKey = prompt('비밀번호를 입력하세요', '');
        let url = 'https://travel-api.potatoo.dev/api/dbKey'
        let content = this.getFullName(item.textContent);
        let mapContent = { 
            "dbKey" : dbKey,
            "upsertArea" : "",
            "apiRequest" : {
                "location" : content
            }
        };
        let mapContentJson = JSON.stringify(mapContent);
        
        console.log(mapContent);
        console.log(mapContentJson);
        debugger;
        
        

        //let areaBackground = document.getElementById(content);
        //if(areaBackground == null) { areaBackground = document.getElementsByClassName(content); };
        // if( areaBackground.style.fill ) {
        //     this.updateArea('https://travel-api.potatoo.dev/api/area',jsonString);
        // } else {
        //     this.insertArea('https://travel-api.potatoo.dev/api/area',jsonString);
        // }

    }


    MobileOrPC(mapCss){
        let mobileOrPc =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if(mobileOrPc){
            document.getElementById("Layer_1").style.width = "400px";
            document.getElementById("Layer_1").style.height = "600px";
        }
        
    }


}