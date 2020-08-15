var gKeywords = {'happy': 12,'funny puk': 1}
var gImgs = [
    {id: 1, url: '/meme-imgs (square)/1.jpg', keywords: ['happy']},
    {id: 2, url: '/meme-imgs (square)/2.jpg', keywords: ['happy']},
    {id: 3, url: '/meme-imgs (square)/3.jpg', keywords: ['happy']},
    {id: 4, url: '/meme-imgs (square)/4.jpg', keywords: ['happy']},
    {id: 5, url: '/meme-imgs (square)/5.jpg', keywords: ['happy']},
    {id: 6, url: '/meme-imgs (square)/6.jpg', keywords: ['happy']},
    {id: 7, url: '/meme-imgs (square)/7.jpg', keywords: ['happy']},
    {id: 8, url: '/meme-imgs (square)/8.jpg', keywords: ['happy']},
    {id: 9, url: '/meme-imgs (square)/9.jpg', keywords: ['happy']},
    {id: 10, url: '/meme-imgs (square)/10.jpg', keywords: ['happy']},
    {id: 11, url: '/meme-imgs (square)/11.jpg', keywords: ['happy']},
    {id: 12, url: '/meme-imgs (square)/12.jpg', keywords: ['happy']},
    {id: 13, url: '/meme-imgs (square)/13.jpg', keywords: ['happy']},
    {id: 14, url: '/meme-imgs (square)/14.jpg', keywords: ['happy']},
    {id: 15, url: '/meme-imgs (square)/15.jpg', keywords: ['happy']},
    {id: 16, url: '/meme-imgs (square)/16.jpg', keywords: ['happy']},
    {id: 17, url: '/meme-imgs (square)/17.jpg', keywords: ['happy']},
    {id: 18, url: '/meme-imgs (square)/18.jpg', keywords: ['happy']}

];
var userInputTxt = 'txt from input';
var elTextInput = document.getElementById('text-input-area');
console.log(elTextInput.value)
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
            
        },
        {
            txt: userInputTxt,
            size: 50,
            align: 'left',
            color: 'pink'
        }
    ]
}

var gCanvas = document.getElementById('meme-canvas');
var gCtx = gCanvas.getContext('2d');

// the image is taken from gMeme
function changeMemeOnCanvas(id){
    var img = new Image()
    img.src = `/meme-imgs (square)/${id}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0)
        drawLine();
    }
    img.src = `/meme-imgs (square)/${id}.jpg`
}
// The text is taken from gMeme
function drawLine(){
    var memeLineIdx = gMeme.lines[gMeme.selectedLineIdx]
    var lineTxt = memeLineIdx.txt;
    var lineSize = memeLineIdx.size;
    var lineAlign = memeLineIdx.align;
    var lineColor = memeLineIdx.color;
    console.log(lineTxt);

    gCtx.fillStyle = "transparent";
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);

    gCtx.font = `${lineSize}px Arial`;
    gCtx.fillStyle = lineColor;
    gCtx.stroketyle = 'black';
    gCtx.textAlign = lineAlign;
    gCtx.fillText(lineTxt, gCanvas.width/2, gCanvas.height/2);
    gCtx.strokeText(lineTxt, gCanvas.width/2, gCanvas.height/2);
    // gCtx.strokeText(userInputTxt, gCanvas.width/2, 100);
    // gCtx.fillText(userInputTxt, gCanvas.width/2, 200);

    
}

// function onKeyDownFunction(e){
//     var keycode = parseInt(e.which);//which key 
//     //delete or backspace
//     if (keycode == 46 || keycode == 8) {
//       event.preventDefault(); //prevent back navigation from backspace
//       userInputTxt = userInputTxt.slice(0,userInputTxt.length-1);
//       drawLine();
//     }
// }
// function onKeyPressFunction(e){
//     var keycode = parseInt(e.which);
//     if (userInputTxt.length < 10)
//     {
//       userInputTxt += String.fromCharCode(keycode);
//     }
//     drawLine();
// }
// drawLine();

// g. Add text input to the HTML and dynamically take the text line value from
// the input to gMeme and from it to the Canvas

function onInit(){
    console.log('init');
    renderMemes();
}


function onSelectMeme(elMeme,memeIdx){
    console.log('selected',memeIdx,elMeme);
    gMeme.selectedImgId = memeIdx;
    // changeMemeOnCanvas(memeIdx);
    changeMemeOnCanvas(gMeme.selectedImgId);
    console.log(gMeme);
}


function renderMemes(){
    var strHTML = '';
    var imgs = gImgs;

    imgs.forEach(function(img){
        strHTML += `
            <div>
                <img id='${img.id}' onclick=onSelectMeme(this,${img.id}) src='${img.url}' />
            </div>
        `;
    })
    var elImageGallery = document.querySelector('.image-gallery');
    elImageGallery.innerHTML = strHTML;
}

