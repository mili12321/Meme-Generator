var gKeywords = {'happy': 12,'funny puk': 1}
var gImgs = [
    {id: 1, url: 'meme-imgs/1.jpg', keywords: ['happy']},
    {id: 2, url: 'meme-imgs/2.jpg', keywords: ['happy']},
    {id: 3, url: 'meme-imgs/3.jpg', keywords: ['happy']},
    {id: 4, url: 'meme-imgs/4.jpg', keywords: ['happy']},
    {id: 5, url: 'meme-imgs/5.jpg', keywords: ['happy']},
    {id: 6, url: 'meme-imgs/6.jpg', keywords: ['happy']},
    {id: 7, url: 'meme-imgs/7.jpg', keywords: ['happy']},
    {id: 8, url: 'meme-imgs/8.jpg', keywords: ['happy']},
    {id: 9, url: 'meme-imgs/9.jpg', keywords: ['happy']},
    {id: 10, url: 'meme-imgs/10.jpg', keywords: ['happy']},
    {id: 11, url: 'meme-imgs/11.jpg', keywords: ['happy']},
    {id: 12, url: 'meme-imgs/12.jpg', keywords: ['happy']},
    {id: 13, url: 'meme-imgs/13.jpg', keywords: ['happy']},
    {id: 14, url: 'meme-imgs/14.jpg', keywords: ['happy']},
    {id: 15, url: 'meme-imgs/15.jpg', keywords: ['happy']},
    {id: 16, url: 'meme-imgs/16.jpg', keywords: ['happy']},
    {id: 17, url: 'meme-imgs/17.jpg', keywords: ['happy']},
    {id: 18, url: 'meme-imgs/18.jpg', keywords: ['happy']}

];


var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    currentLineOnEdit: {
        txt: '',
        size: 20,
        align: 'center',
        color: 'white',
        underline: false,
        fontFamily: 'Impact'
    },
    lines:
     [
        // {
        //     txt: '',
        //     size: 20,
        //     align: 'center',
        //     color: 'white'
        // },
        // {
        //     txt: 'hello2',
        //     size: 30,
        //     align: 'center',
        //     color: 'white'
        // },
        // {
        //     txt: 'hello3',
        //     size: 30,
        //     align: 'center',
        //     color: 'red'
        // },
        // {
        //     txt: 'hello4',
        //     size: 30,
        //     align: 'center',
        //     color: 'pink'
        // },
        // {
        //     txt: 'hello5',
        //     size: 30,
        //     align: 'center',
        //     color: 'red'
        // }
    ]
}
var gEmojis = [
    {id:1 ,url:'emoji/meow_coffee.png'},
    {id:2 ,url:'emoji/rainbow_puke.jpg'},
    {id:3 ,url:'emoji/grinn.png'},
    {id:4 ,url:'emoji/i_see_what_you_did_there.png'},
    {id:5 ,url:'emoji/troll.png'},
    {id:6 ,url:'emoji/zany_cat_face.png'},
    {id:7 ,url:'emoji/meow_wow.png'},
    {id:8 ,url:'emoji/meow_knife.png'},
    {id:9 ,url:'emoji/no.jpg'},
    {id:10 ,url:'emoji/smiley.png'},
    {id:11 ,url:'emoji/blob_aww.png'},
    {id:12 ,url:'emoji/blob_excited.gif'},
    {id:13 ,url:'emoji/Emoji_on.png'},
    {id:14 ,url:'emoji/emoji_off.png'},
    {id:15 ,url:'emoji/Calque_7.png'},
    {id:16 ,url:'emoji/Calque_8.png'},
    {id:17 ,url:'emoji/computerrage.gif'}
]
var EMOJI_PAGE_SIZE = 4;
var gEmojiPageIdx = 0;

var gCanvas = document.getElementById('meme-canvas');
var gCtx = gCanvas.getContext('2d');

var elDraggableElementId;

//drag and drop functions

function allowDrop(ev){
    ev.preventDefault(); 
}

function dragstart(ev){
    elDraggableElementId = ev.target.id;
}

function drop(ev){
    ev.target.append(document.getElementById(elDraggableElementId));
}
//-------------------------------------------------------------------
// var	width = gCanvas.width
// var	height = gCanvas.height
// var	handle = {
//     // x: width / 2,
//     // y: height / 2,
//     // radius: 20
//     x1:20,
//     y1:20,
//     x2:100,
//     y2:100
// }
// var offset = {};

// var utils = {

//     distanceXY: function(x0, y0, x1, y1) {
//         var dx = x1 - x0,
//             dy = y1 - y0;
//         return Math.sqrt(dx * dx + dy * dy);
//     },
//     //Testing if a point is inside a object 
//     circlePointCollision: function(x, y, circle) {
//         return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius;
//     }
// }
// // draw();
// draw();

// function draw() {
//     gCtx.clearRect(0, 0, width, height);//clear the canvas
//     gCtx.fillStyle = "pink";
//     gCtx.beginPath();
//     // gCtx.arc(handle.x, handle.y, handle.radius, 0, Math.PI * 2, false);
//     gCtx.fillRect(handle.x1,handle.y1,handle.x2,handle.y2);
//     gCtx.fill();
// }
// // function draw2(){
// //     gCtx.clearRect(0, 0, width, height);//clear the canvas
// //     // var rect1 = { x:30, y:30, width:50, height:25, color:"blue" };
// //     gCtx.fillStyle='blue';
// //     gCtx.fillRect(handle.x,handle.y,handle.width,handle.height);
// // }

// document.body.addEventListener("mousedown", function(event) {
//     console.log('123')
 
//     // var x = event.offsetX;//The offsetX property returns the x-coordinate the mouse cursor, relative to the target element.
//     // var y = event.offsetY;
//     // //event.clientX//coordinates of the mouse pointer when the mouse button is clicked on an element
//     // mouseX=parseInt(event.clientX-event.offsetX);
//     // mouseY=parseInt(event.clientY-event.offsetY);
//     var shetahX=event.clientX-event.offsetX;
//     var shetahY=event.clientY-event.offsetY;
//     console.log('shetahX',shetahX)
//     console.log('shetahY',shetahY)
//     console.log('rect1.x+rect1.width',handle.y1+handle.y2)
//     console.log('rect1.y+rect1.height',handle.x1+handle.x2)
//     console.log('event.clientX',event.clientX)
//     console.log('event.clientY',event.clientY)
//     console.log('handle',handle)
//     console.log('event.offsetX',event.offsetX)
//     console.log('event.offsetY',event.offsetY)
//     console.log('event.clientY',event.clientY)
//     console.log('event.clientx',event.clientX)
//     if((event.offsetY>=20)&&(event.offsetY<=100)&&(event.offsetX>=20)&&(event.offsetX<=100)) {
//         console.log('utils')
      
//         document.body.addEventListener("mousemove", onMouseMove);
//         document.body.addEventListener("mouseup", onMouseUp);
        
//         offset.x = event.clientX - handle.x1;
//         offset.y = event.clientY - handle.y1;
//     }else{
//         console.log('false')
//     }
// });

// function onMouseMove(event) {
//     handle.x1 = event.clientX - offset.x;
//     handle.y1 = event.clientY - offset.y;
//     console.log('hi');
//     draw();
//     // draw2();
//     console.log('hi');
// }
// function onMouseUp(event) {
//     document.body.removeEventListener("mousemove", onMouseMove);
//     document.body.removeEventListener("mouseup", onMouseUp);
// }



//--------------------------------------------------------------------


function getEmojisForDisplay(){
    // return gEmojis
    var strIdx= gEmojiPageIdx*EMOJI_PAGE_SIZE;
    return gEmojis.slice(strIdx, strIdx + EMOJI_PAGE_SIZE)
}


function getKeywordsForDisplay(){
    return gKeywords;
}
function getImgsForDisplay(){
    return gImgs;
}
function getMemeForDisplay(){
    return gMeme;
}
function getCanvas(){
    return gCanvas;
}
function getCanvasObject(){
    return gCtx;
}

function selectMeme(elMeme,memeIdx){
    gMeme.selectedImgId = memeIdx;
    changeMemeOnCanvas(gMeme.selectedImgId);
    console.log(gMeme);
}
function selectEmoji(idx){
    gEmojis[idx-1].id = idx
    console.log('gEmojis[idx-1].url ',gEmojis[idx-1].url )
    addEmojiToCanvas(gEmojis[idx-1].url );
}


function showAllLines() {
    
}

function goNextPage(){
    // gEmojiPageIdx++;
    var pageCount = gEmojis.length / EMOJI_PAGE_SIZE;
    gEmojiPageIdx = (gEmojiPageIdx+1 <= pageCount)? gEmojiPageIdx+1 : 0
}

function goPrevPage(){
    var pageCount = gEmojis.length / EMOJI_PAGE_SIZE;
    gEmojiPageIdx = (gEmojiPageIdx-1 > 0)? gEmojiPageIdx-1 : 0
}



function removeLine(lineId){
    var lineIdx = gMeme.lines.findIndex(function(line){
        return line.id === lineId;
    })
    gMeme.lines.splice(lineIdx, 1)
}


