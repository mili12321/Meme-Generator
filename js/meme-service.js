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
// function draw(){
//     gCtx.fillStyle = "red";
//     gCtx.fillRect(10, 10, 450, 100);
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


