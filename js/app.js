const btnnote = document.querySelector('.btn-note');

btnnote.addEventListener('click', addfun);

let carddiv, titleinput;
function addfun() {
    btnnote.classList.add('active');

    carddiv = document.createElement('div');
    carddiv.className = "card title";
    carddiv.innerHTML = `
        <input type="text" name="title-input" class="inputbox" id="title-input" placeholder="Enter list title..." />
        <div class="btn-group">
            <button class="add" onclick="addcard();">Add list</button>
            <button class="cancel" onclick="cancelfun(this);"><i class="fas fa-times"></i></button>
        </div>`;
    document.body.appendChild(carddiv);

    document.getElementById('title-input').focus();
}
let notediv, titlediv, listdiv, button, temp, card;
function addcard() {
    titleinput = document.getElementById('title-input');
    temp = titleinput.value;
    createtitle();

    if (document.body.childElementCount === 4) {
        document.body.children[document.body.childElementCount - 4].insertAdjacentElement("afterend", notediv);
    } else if (document.body.childElementCount < 4) {
        document.body.insertBefore(notediv, document.body.children[0]);
    } else if (document.body.childElementCount > 4) {
        document.body.insertBefore(notediv, document.body.lastChild);
    }

    card = {'id': document.body.childElementCount - 4, 'title': temp};
    updatels(card);

    titleinput.value = '';
}
function createtitle() {
    if (temp) {
        notediv = document.createElement('div');
        notediv.className = "card note-card";

        titlediv = document.createElement('div');
        titlediv.className = "title-card";
        titlediv.innerText = temp;

        listdiv = document.createElement('div');
        listdiv.className = "list-card";

        button = document.createElement('button');
        button.className = "btn btn-card";
        button.setAttribute('onclick', 'addlist(this)');
        button.innerHTML = `<i class="fas fa-plus"></i>Add a card`;

        notediv.appendChild(titlediv);
        notediv.appendChild(listdiv);
        notediv.appendChild(button);

        listdiv.addEventListener('dragover', dragover);
        listdiv.addEventListener('dragenter', dragenter);
        listdiv.addEventListener('dragleave', dragleave);
        listdiv.addEventListener('drop', dragdrop);
    }
}
let displaydiv, textdiv;
function addlist(e) {
    e.classList.add('active');

    textdiv = document.createElement('div');
    textdiv.innerHTML = `
            <textarea id="text-input" class="inputbox" placeholder="Enter a title for this card..."></textarea>
            <div class="btn-group">
                <button class="add" onclick="displayfun(this);">Add card</button>
                <button class="cancel" onclick="cancellist(this);"><i class="fas fa-times"></i></button>
            </div>`;
    e.previousElementSibling.appendChild(textdiv);

    document.getElementById('text-input').focus();
}
let display;
function displayfun(e) {
    value = e.parentNode.previousElementSibling.value;
    display = createlist();

    let divs = document.querySelectorAll('.note-card');
    divs.forEach(function (div, index) {
        if (div === e.parentNode.parentNode.parentNode.parentNode) {
            card = {'id': index, 'list': value};
            updatels(card);
        }
    });

    listtmp = e.parentNode.parentNode.parentNode;
    if (listtmp.childElementCount > 1) {
        listtmp.children[listtmp.childElementCount - 2].insertAdjacentElement("afterend", display);
    } else {
        listtmp.insertBefore(display, listtmp.children[0]);
    }
    e.parentNode.previousElementSibling.value = '';
}
function createlist() {
    if (value) {
        displaydiv = document.createElement('div');
        displaydiv.className = "display";
        displaydiv.setAttribute('draggable', 'true');
        displaydiv.innerHTML = `<div class="text">${value}</div>
            <button class="edit" onclick="editfun(this);"><i class="fas fa-edit"></i></button>
            `;
        displaydiv.addEventListener('dragstart', dragstart);
        displaydiv.addEventListener('dragend', dragend);
        return displaydiv;
    }
}
function dragstart() {
    this.className += " hold";

    let titlename = this.children[0].parentNode.parentNode.previousSibling.innerText;
    let listname = this.children[0];
    let cards = JSON.parse(localStorage.getItem('cards'));
    cards.forEach(function (card, index) {
        if (titlename === card.title) {
            removeitems(listname, card.id);
        }
    });
    setTimeout(()=>{
        this.className += " invisible";
    },0);
}
function dragend() {
    this.className = "display";
}
function dragover(e) {
    e.preventDefault();
}
function dragenter(e) {
    this.className += " hovered";
    e.preventDefault();
}
function dragleave(e) {
    this.className = "list-card";
    e.preventDefault();
}
function dragdrop() {
    let listtxt = document.querySelectorAll('.hold');
    let titletxt = this.previousElementSibling.innerText;

    let cards = JSON.parse(localStorage.getItem('cards'));
    cards.forEach(function (card) {
        if (card.title === titletxt) {
            card = {'id' : card.id,'list' : listtxt[0].children[0].innerText};
            updatels(card);
            }
    });
    this.appendChild(listtxt[0]);
    this.className = "list-card";
}
let listtmp, value;
document.addEventListener('DOMContentLoaded', getitems);

function removeitems(item, cardId) {
    cards = JSON.parse(localStorage.getItem('cards'));
    cards.forEach(function (card, index) {
        if (card.id === cardId && card.list === item.innerText) {
            cards.splice(index, 1);
        }
    });
    localStorage.setItem('cards', JSON.stringify(cards));
}
function getitems() {
    let cards;
    if (localStorage.getItem('cards') === null) {
        cards = [];
    } else {
        cards = JSON.parse(localStorage.getItem('cards'));
    }
    for (let i = cards.length - 1; i > -1; i--) {
        cards.forEach(function (card) {
            if (card.id === i) {
                temp = card.title;
                createtitle();
                document.body.prepend(notediv);

                if (card.list) {
                    value = card.list;
                    display = createlist();
                    listdiv.appendChild(display);
                }
            }
        });
    }
}
function updatels(card) {
    let cards;
    if (localStorage.getItem('cards') === null) {
        cards = [];
    } else {
        cards = JSON.parse(localStorage.getItem('cards'));
    }
    cards.push(card);
    localStorage.setItem('cards', JSON.stringify(cards));
}
function cancellist(e) {
    e.parentNode.parentNode.parentNode.nextSibling.classList.remove('active');
    e.parentNode.parentNode.innerHTML = ``;
}
function cancelfun(e) {
    btnnote.classList.remove('active');
    e.parentNode.parentNode.remove();
}
let blurdiv, editarea, savebtn;
function editfun(e) {
    e.previousElementSibling.className += " origin";

    let positionx = e.parentNode.parentNode.parentNode.offsetLeft;
    let positiony = e.parentNode.parentNode.parentNode.offsetTop;

    document.body.classList.add('show');

    blurdiv = document.createElement('div');
    blurdiv.className = 'blur-card';

    editarea = document.createElement('textarea');
    editarea.className = "edit-card";

    savebtn = document.createElement('button');
    savebtn.className = "save";
    savebtn.textContent = "Save";
    savebtn.setAttribute('onclick', 'savefun(this)');

    editarea.style.top = `${50 + positiony}px`;
    editarea.style.left = `${13 + positionx}px`;

    savebtn.style.top = `${180 + positiony}px`;
    savebtn.style.left = `${10 + positionx}px`;

    editarea.textContent = e.previousElementSibling.textContent;
    document.body.appendChild(blurdiv);
    document.body.appendChild(editarea);
    document.body.appendChild(savebtn);

    editarea.setSelectionRange(editarea.value.length, editarea.value.length);
    editarea.focus();
}
function removeorigin(){
    let texts = document.getElementsByClassName("text");
    for (let a=0; a<texts.length; a++){
        texts[a].classList.remove('origin');
    }
}
function savefun(e) {
    let origin = document.getElementsByClassName("origin");
    cards = JSON.parse(localStorage.getItem('cards'));
    cards.forEach(function (card) {
        if (origin[0].innerText === card.list){
            removeitems(origin[0], card.id);
            card = {'id' : card.id,'list' : e.previousElementSibling.value};
            updatels(card);
            console.log(origin[0].innerText, card.id);
            console.log(card.id,e.previousElementSibling.value);
        }
    });
    origin[0].innerText = e.previousElementSibling.value;

    blurdiv.remove();
    editarea.remove();
    savebtn.remove();

    removeorigin();
}
window.onclick = function (e) {
    if (e.target === blurdiv) {
        blurdiv.remove();
        editarea.remove();
        savebtn.remove();
    }
}


