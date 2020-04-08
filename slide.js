var slideInterval = 10000;
var pointer = 0;

function getAverageColor(imgEl){
    //imgEl.crossOrigin = "Anonymous";
    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:255,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0,

        a = document.getElementById('Slide_id_01');
        height = canvas.height = a.naturalHeight || a.offsetHeight || a.height;

    if (!context) {
        return defaultRGB;
    }
    
    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    
    context.drawImage(imgEl, 0, 0);
    
    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain *///alert('x');
        console.log("error");
        return defaultRGB;
    }
    
    length = data.data.length;
    
    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }
    
    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    
    return rgb;
}

function darwColor(imgEl){
    var a = document.getElementById('Slide_back_01');
    a.style.backgroundColor = "red";
    //a.style.backgroundColor = getAverageColor(imgEl);
}

function getSlide(){
    return 
    document.getElementsById('Slider_Container').getElementsByTagName('div');
}

function GetSlideCilde(){
    return
    document.getElementsById('Slider_Container').getElementsByTagName('div');
}

function moveView(point){
    var rgb = {r:0,g:0,b:0};
    var child = document.getElementById('Slider_Container').firstChild;
    console.log("Ok Break");
    point = point+1;
    if(point >= 8){
        point = 1;
    }
    else if(point <= 0){
        point = 7;
    }
    console.log(point);
    for(var i =0; i< point; i++){
        child = child.nextSibling;
    }
    console.log("change class");
    child.className = 'Slide_visible';

    switch (point){
        case 1: 
            var a = document.getElementById('Slide_id_01');
            console.log(a.baseURI);
            rgb = getAverageColor(document.getElementById('Slide_id_01'));
            document.getElementById('Slide_back_01').style.backgroundColor = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
            console.log("case 1");
            break;
        case 3: 
            var a = document.getElementById('Slide_id_02');
            //a.crossOrigin="Anonymous";
            console.log(a);
            rgb = getAverageColor(document.getElementById('Slide_id_02'));
            document.getElementById('Slide_back_02').style.backgroundColor = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
            console.log("case 2");
            break;
        case 5: 
            var a = document.getElementById('Slide_id_03');
            //a.crossOrigin="Anonymous";
            rgb = getAverageColor(document.getElementById('Slide_id_03'));
            document.getElementById('Slide_back_03').style.backgroundColor = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
            console.log("case 3");
            break;
        case 7:
            rgb = getAverageColor(document.getElementById('Slide_id_04'));
            document.getElementById('Slide_back_04').style.backgroundColor = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
            console.log("case 4");
            break;
    }
    console.log("visible");

    return point;
}

function recSlideNext(point){
    removeView();
    point += 1;
    pointer = moveView(point);
}
function recSlidePrev(point){
    removeView();
    point -= 3;
    pointer = moveView(point);
}

function removeView(){
    var child = document.getElementById('Slider_Container').firstChild;
    var lastChild = document.getElementById('Slider_Container').lastChild;
    for(;;){
        if(child == lastChild){
            break;
        }
        if(child.className == 'Slide_visible'){
            child.className = 'Slide_hidden';
        }
        child = child.nextSibling;
    }
}

function moveForward(){
    var a = document.getElementById('Slide_back_01');
    var check = 0;
    var figures = getSlide();
    //var child = GetSlideCilde();
    var childCount = document.getElementById('Slider_Container').childElementCount;
    var child = document.getElementById('Slider_Container').firstChild;
    var lastChild = document.getElementById('Slider_Container').lastChild;
    var imgEl;

    //document.getElementsByClassName('Slider_Container').childNodces[1].nodeValue.className = "Slide_visible";
    for(;;){
        check++;
        if(child == lastChild){
            child = document.getElementById('Slider_Container').firstChild;
            check = 0;
            console.log("Break");
            break;
        }
        console.log("cant Break");
        if(child.className == 'Slide_visible'){
            child.className = 'Slide_hidden' ;
            pointer = check;
            console.log(pointer);
            console.log("hidden");
        }
        child = child.nextSibling;
    }

    pointer = moveView(pointer);
    
    setTimeout(moveForward, slideInterval);
}
document.getElementById("prevBtn_Slide_01").addEventListener("click",function(){recSlidePrev(pointer);});
document.getElementById("prevBtn_Slide_02").addEventListener("click",function(){recSlidePrev(pointer);});
document.getElementById("prevBtn_Slide_03").addEventListener("click",function(){recSlidePrev(pointer);});
document.getElementById("prevBtn_Slide_04").addEventListener("click",function(){recSlidePrev(pointer);});
document.getElementById("nextBtn_Slide_01").addEventListener("click",function(){recSlideNext(pointer);});
document.getElementById("nextBtn_Slide_02").addEventListener("click",function(){recSlideNext(pointer);});
document.getElementById("nextBtn_Slide_03").addEventListener("click",function(){recSlideNext(pointer);});
document.getElementById("nextBtn_Slide_04").addEventListener("click",function(){recSlideNext(pointer);});
moveForward();
