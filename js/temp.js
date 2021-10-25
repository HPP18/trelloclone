// const btnnote = document.getElementById('btn-note');
//
// btnnote.addEventListener('click', shownote);
//
// function shownote() {
//     btnnote.classList.add('active');
//     const carddiv = document.createElement('div');
//     carddiv.className = "card title-card";
//     carddiv.innerHTML = `
//     <input type="text" name="title-input" class="inputbox" id="title-input" placeholder="Enter list title..." />
//         <div class="btn-group">
//             <button class="add" id="add-list">Add list</button>
//             <button class="cancel" id="cancel-list"><i class="fas fa-times"></i></button>
//         </div>`;
//     document.body.appendChild(carddiv);
//
//     const addlist = document.getElementById('add-list'),
//         cancellist = document.getElementById('cancel-list'),
//         titleinput = document.getElementById('title-input');
//
//     addlist.addEventListener('click', () => {
//         if (titleinput.value) {
//             carddiv.remove();
//                 const notediv = document.createElement('div');
//                 notediv.className = "card note-card";
//                 notediv.innerHTML = `       <div class="title">Title</div>
//         <div class="display">
//             <div class="text">Hello World</div>
//             <button class="edit" id="edit"><i class="fas fa-edit"></i></button>
//         </div>
//         <div class="card" id="text-card">
//             <textarea id="text-input" class="inputbox" placeholder="Enter a title for this card..." autofocus></textarea>
//             <div class="btn-group">
//                 <button class="add" id="add-card">Add card</button>
//                 <button class="cancel" id="cancel-card"><i class="fas fa-times"></i></button>
//             </div>
//         </div>
//             `;
//                 document.body.appendChild(notediv);
//
//             const title = document.querySelector('.title'),
//                 btncard = document.getElementById('btn-card');
//             title.textContent = titleinput.value;
//             console.log(btncard);
//
//             btncard.addEventListener('click', () => {
//                 console.log(btncard);
//
//                     btncard.classList.add('active');
//                     const textdiv = document.createElement('div');
//                     textdiv.className = "card text-card";
//                     textdiv.innerHTML = `
//                     <textarea id="text-input" class="inputbox" placeholder="Enter a title for this card..."></textarea>
//                 <div class="btn-group">
//                     <button class="add" id="add-card">Add card</button>
//                     <button class="cancel" id="cancel-card"><i class="fas fa-times"></i></button>
//                 </div>`;
//                     notediv.appendChild(textdiv);
//
//                     const addcard = document.getElementById('add-card'),
//                         cancelcard = document.getElementById('cancel-card'),
//                         textcard = document.querySelector('.text-card');
//                         textinput = document.getElementById('text-input');
//
//                     addcard.addEventListener('click', addfun);
//                     function addfun(){
//                         if (textinput.value) {
//                             // textcard.classList.add('active');
//                             const displaydiv = document.createElement('div');
//                             displaydiv.className = "display";
//                             displaydiv.innerHTML = `
//                 <div class="text">Hello World</div>
//                 <button class="edit" id="edit"><i class="fas fa-edit"></i></button>`;
//                             notediv.appendChild(displaydiv);
//                         const text = document.querySelector('.text');
//                         text.textContent = textinput.value;
//                         }
//                         // textcard.classList.remove('active');
//
//                     }
//                     cancelcard.addEventListener('click', () => {
//                         btncard.classList.remove('active');
//                         textdiv.remove();
//                     });
//             });
//         }
//     });
//
//     cancellist.addEventListener('click', () => {
//         btnnote.classList.remove('active');
//         carddiv.remove();
//     });
//
//
// }
// btnnote.style.transform = `translateX(${(305 * cards.length)-305}px)`;

// let displaydiv, textdiv;
// function addlist() {
//     button.classList.add('active');
//
//     tempdiv = document.createElement('div');
//
//     textdiv = document.createElement('div');
//     textdiv.className = "card text-card";
//     textdiv.innerHTML = `<textarea id="text-input" class="inputbox" placeholder="Enter a title for this card..."></textarea>
//             <div class="btn-group">
//                 <button class="add" id="add-card" onclick="displayfun();">Add card</button>
//                 <button class="cancel" id="cancel-card" onclick="cancellist();"><i class="fas fa-times"></i></button>
//             </div>`;
//
//     listdiv.appendChild(textdiv);
//
//     const textinput = document.getElementById('text-input');
//     console.log(listdiv.lastChild);
//     return textinput.value;
// }
// function displayfun(){
//     listdiv.classList.add('active');
//     let value = addlist();
//
//     if (value) {
//         displaydiv = document.createElement('div');
//         displaydiv.className = "display";
//         displaydiv.innerHTML = `<div class="text">${value}</div>
//             <button class="edit" id="edit" onclick="editfun(this);"><i class="fas fa-edit"></i></button>`;
//
//         if (listdiv.childElementCount>2){
//             listdiv.children[listdiv.childElementCount-3].insertAdjacentElement("afterend",displaydiv);
//         }else {
//             listdiv.insertBefore(displaydiv,listdiv.children[0]);
//         }
//     }
//         textdiv.previousElementSibling.remove();
// }
// function cancellist(){
//     button.classList.remove('active');
//     textdiv.innerHTML= ``;
// }
//
// function editfun(e){
//     console.log(e.previousElementSibling);
// }

const btnnote = document.querySelector('.btn-note');
const getnotes = JSON.parse(localStorage.getItem('tasks'));

btnnote.addEventListener('click', addfun);

let carddiv, titleinput;
function addfun() {
    btnnote.classList.add('active');

    carddiv = document.createElement('div');
    carddiv.className = "card title-card";
    carddiv.innerHTML = `
        <input type="text" name="title-input" class="inputbox" id="title-input" placeholder="Enter list title..." />
        <div class="btn-group">
            <button class="add" onclick="addcard();">Add list</button>
            <button class="cancel" onclick="cancelfun(this);"><i class="fas fa-times"></i></button>
        </div>`;
    document.body.appendChild(carddiv);

    titleinput = document.getElementById('title-input');
    return titleinput.value;
}

function cancelfun(e) {
    btnnote.classList.remove('active');
    e.parentNode.parentNode.remove();
}

let notediv, titlediv, listdiv, button, temp;
function addcard() {

    temp = addfun();

    if (temp) {
        carddiv.remove();

        notediv = document.createElement('div');
        notediv.className = "card note-card";

        titlediv = document.createElement('div');
        titlediv.className = "title";
        titlediv.innerText = temp;

        listdiv = document.createElement('div');
        listdiv.className = "list-card";

        button = document.createElement('button');
        button.className = "btn btn-card";
        button.setAttribute('onclick','addlist(this);');
        button.innerHTML = `<i class="fas fa-plus"></i>Add a card`;

        notediv.appendChild(titlediv);
        notediv.appendChild(listdiv);
        notediv.appendChild(button);

        if (document.body.childElementCount>3){
            document.body.children[document.body.childElementCount-4].insertAdjacentElement("afterend",notediv);
        }else {
            document.body.insertBefore(notediv,document.body.children[0]);
        }
        titleinput.value = '';
    }
    else {
        carddiv.remove();
    }
}

let displaydiv, textdiv, textinput;
function addlist(e) {

    textdiv = document.createElement('div');
    textdiv.className = "text-card";
    textdiv.innerHTML = `
            <textarea id="text-input" class="inputbox" placeholder="Enter a title for this card..."></textarea>
            <div class="btn-group">
                <button class="add" onclick="displayfun(this);">Add card</button>
                <button class="cancel" onclick="cancellist(this);"><i class="fas fa-times"></i></button>
            </div>
`;

    e.previousElementSibling.appendChild(textdiv);

    button.classList.add('active');
}

function displayfun(e){
    let listtmp = e.parentNode.parentNode.parentNode;
    let value = e.parentNode.previousElementSibling.value;

    if (value) {
        displaydiv = document.createElement('div');
        displaydiv.className = "display";
        displaydiv.innerHTML = `<div class="text">${value}</div>
            <button class="edit" onclick="editfun(this);"><i class="fas fa-edit"></i></button>
            `;


        if (listtmp.childElementCount>1){
            listtmp.children[listtmp.childElementCount-2].insertAdjacentElement("afterend",displaydiv);
        }else {
            listtmp.insertBefore(displaydiv,listtmp.children[0]);
        }
        e.parentNode.previousElementSibling.value = '';
    }
}
function cancellist(e){
    button.classList.remove('active');
    e.parentNode.parentNode.innerHTML= ``;
}
let blurdiv, editdiv, savebtn;
function editfun(e){
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
    savebtn.setAttribute('onclick','savefun(this)');

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
function savefun(e){
    displaydiv.innerText = e.previousElementSibling.value;
    blurdiv.remove();
    editarea.remove();
    savebtn.remove();
}
window.onclick=function (e){
    if (e.target === blurdiv){
        blurdiv.remove();
        editarea.remove();
        savebtn.remove();
    }
}



function updatels(){
    let titlevalue = addfun();
    let textvalue =  addlist();
    console.log(titlevalue);
    console.log(textvalue);
}



