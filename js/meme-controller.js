'use strict'
var isEditUnderlined = false;
var isShowColorPicker = false;

function onInit(){
    console.log('init');
    renderGallery();
    renderEmoji();
}


function onSelectMeme(elMeme,memeIdx){
    console.log('selected',memeIdx,elMeme);
    selectMeme(elMeme,memeIdx);
    document.querySelector('.meme-modal-container').style.display = 'flex';
    document.querySelector('.main-web-page-container').style.display = 'none';
}
function backToGallery(){
    document.querySelector('.meme-modal-container').style.display = 'none';
    document.querySelector('.main-web-page-container').style.display = 'block';
}

// the image is taken from gMeme
function changeMemeOnCanvas(id){
    var img = new Image()
    img.src = `meme-imgs/${id}.jpg`
    var ctx = getCanvasObject();
    ctx.drawImage(img, 0, 0);
    drawAllLines();
}

function drawAllLines(){
    var ctx = getCanvasObject();
    var meme = getMemeForDisplay();
    var lines = meme.lines;
    if (lines.length > 0) {
        for(var i =0; i < lines.length; i++){
            ctx.lineWidth = 3;
            ctx.stroketyle = 'black';
            ctx.fillStyle = `${lines[i].color}`;
            ctx.font = `${lines[i].size}px ` + `${lines[i].fontFamily}`;
            ctx.textAlign= lines[i].align;
            if(i==0){
                // ctx.verticalAlign = 'top'
                ctx.strokeText(lines[i].txt, gCanvas.width/2,50)
                ctx.fillText(lines[i].txt, gCanvas.width/2,50)
                if(lines[i].underline === true) {
                    var text = ctx.measureText(lines[i].txt);
                    ctx.fillRect(gCanvas.width/2 - text.width/2, 50 + 5, text.width, 2);
                };
            }else if(i==1){
                // ctx.verticalAlign = 'bottom'
                ctx.strokeText(lines[i].txt, gCanvas.width/2,450) 
                ctx.fillText(lines[i].txt, gCanvas.width/2,450) 
                if(lines[i].underline === true) {
                    var text = ctx.measureText(lines[i].txt);
                    ctx.fillRect(gCanvas.width/2 - text.width/2, 450 + 5, text.width, 2);
                };
            }else{
                // ctx.verticalAlign = 'middle'
                ctx.strokeText(lines[i].txt, gCanvas.width/2,120 + i*50);
                ctx.fillText(lines[i].txt, gCanvas.width/2,120 + i*50);
                if(lines[i].underline === true) {
                    var text = ctx.measureText(lines[i].txt);
                    ctx.fillRect(gCanvas.width/2 - text.width/2, 120 + i*50 + 5, text.width, 2);
                };
            }
        }
    }
}

function onUpdateMemeText(){
    var elTextInputArea = document.getElementById('text-input-area'); 
    var userInputTxt = elTextInputArea.value;
    changeMemeOnCanvas(gMeme.selectedImgId);
    drawAllLines();
    currentLineEdit(userInputTxt);
}

function currentLineEdit(txt ='') {
    var meme = getMemeForDisplay();
    var ctx = getCanvasObject();
    var currentLineEditObj = gMeme.currentLineOnEdit;
    ctx.font = `${currentLineEditObj.size}px ` + `${currentLineEditObj.fontFamily}`;
    ctx.fillStyle = currentLineEditObj.color;
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    ctx.textAlign = currentLineEditObj.align;
    ctx.strokeText(txt, gCanvas.width/2, 250);
    ctx.fillText(txt, gCanvas.width/2, 250);
    var text = ctx.measureText(txt);
    if (isEditUnderlined) {
        ctx.fillRect(gCanvas.width/2 - text.width/2, 250 + 5, text.width, 2);
    }
}

function onClickNewImage() {
    document.getElementById('text-input-area').value = "";
}

// var testColor = document.getElementById('color-input').value;
// document.getElementById('color-input').onchange = function() {
//     testColor = this.value;
//     console.log(testColor)
// }

document.getElementById('color-input').addEventListener("change", onChangeColor);

function onChangeColor() {
    var liveColor = document.getElementById('color-input').value;
    gMeme.currentLineOnEdit.color = liveColor;
    onUpdateMemeText();
}

/********************************************** */
function onAddTextLine(){
    var val = document.getElementById('text-input-area').value;
    var line = {
        txt: val,
        size: gMeme.currentLineOnEdit.size,
        align: gMeme.currentLineOnEdit.align,
        color: gMeme.currentLineOnEdit.color,
        underline: isEditUnderlined,
        fontFamily: gMeme.currentLineOnEdit.fontFamily
    }
    var meme = getMemeForDisplay();
    meme.lines.push(line);
    gMeme.currentLineOnEdit = line;
    document.getElementById('text-input-area').value = "";
    console.log(meme.lines)
    changeMemeOnCanvas(gMeme.selectedImgId);
    gMeme.currentLineOnEdit = {
        txt: '',
        size: 20,
        align: 'center',
        color: 'white'
    };
    console.log('test');
    document.getElementById('color-input').value = "#FFFFFF";
}


function onIncreseFontSize(){
    var oldSize = gMeme.currentLineOnEdit.size;
    var newSize = oldSize+2;
    gMeme.currentLineOnEdit.size = newSize;
    onUpdateMemeText();
}
function onDecreaseFontSize(){
    var oldSize = gMeme.currentLineOnEdit.size;
    var newSize = oldSize-2;
    gMeme.currentLineOnEdit.size = newSize;
    onUpdateMemeText();
}

function onChangeFontFamily(fontFamily){
    var oldFont = gMeme.currentLineOnEdit.fontFamily;
    var newFont = fontFamily;
    gMeme.currentLineOnEdit.fontFamily = newFont;
    document.querySelector('.font-dropbtn').innerHTML = newFont +
    '<i class="fas fa-caret-down font-dropbtn"></i>';
    onUpdateMemeText();
}
function onChangeAlignLeft(){
    gMeme.currentLineOnEdit.align = 'right';
    onUpdateMemeText();

}
function onChangeAlignCenter(){
    gMeme.currentLineOnEdit.align = 'center';
    onUpdateMemeText();
}
function onChangeAlignRight(){
    gMeme.currentLineOnEdit.align = 'left';
    onUpdateMemeText();
}
function onToggleUnderline(){
    isEditUnderlined = !isEditUnderlined;
    onUpdateMemeText();
}
function toggleColorPicker(){
    isShowColorPicker = !isShowColorPicker;
    if(isShowColorPicker){
        document.getElementById('color-input').style.display = 'block';
    }else{
        document.getElementById('color-input').style.display = 'none';
    }
    // document.getElementById('color-input').addEventListener('click')
}


/************************************************ */

function renderEmoji(){
    var strHTML= '';
    var emojis = getEmojisForDisplay();
    emojis.forEach(function(emoji){
        strHTML += `
        <div class="emoji"><img id="draggable${emoji.id}" ondragstart="dragstart(event)" onclick="pickImage(${emoji.url})" src="${emoji.url}"></div>
        `
    })
    var elEmojis = document.querySelector('.emojis');
    elEmojis.innerHTML = strHTML;
}

function pickImage(emoji) {
    console.log(emoji);
}

function onNextPage(){
    goNextPage();
    renderEmoji();
}
function onPrevPage(){
    goPrevPage();
    renderEmoji();
}



function renderGallery(){
    var strHTML = '';
    var imgs = getImgsForDisplay();

    imgs.forEach(function(img){
        strHTML += `
            <div class='img-container'>
                <img id='${img.id}' onclick=onSelectMeme(this,${img.id});onClickNewImage(); src='${img.url}' />
            </div>
        `;
    })
    // <div class="img-text">
    // <i class="fas fa-magic"></i>
    // </div>
    var elImageGallery = document.querySelector('.image-gallery');
    elImageGallery.innerHTML = strHTML;
}

function onDownloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

function onOpenFontDropdown(){
    document.getElementById("dropdown").classList.toggle("show");
}
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.font-dropbtn')) {
      var dropdowns = document.getElementsByClassName("font-dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


function onAddClassActive(btn){
    var elGallery = document.querySelector('.gallery');
    var elAbout = document.querySelector('.about');
    if(btn.classList.contains("not-active")&&!btn.classList.contains("gallery")){
        btn.classList.add("active");
        elGallery.classList.remove("active");
        elGallery.classList.add("not-active");
    }else if(btn.classList.contains("not-active")&&btn.classList.contains("gallery")){
        btn.classList.add("active");
        elAbout.classList.remove("active");
        elAbout.classList.add("not-active");
    }
}


