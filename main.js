const mainPosts = document.getElementById("main");
const input = document.getElementById("input");
const textarea = document.getElementById("textarea");
const btn = document.getElementById("createPost");
const inputEditTitle = document.createElement("input");
const textareaEditText = document.createElement("textarea");

// array with months. When post was created
const arrayMonth = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

// main btn. Create post
btn.onclick = (evt) => {
  evt.preventDefault();
  if (input.value && textarea.value) {
    // main element
    let newPost = document.createElement("div");
    newPost.classList.add("post");
    // header
    let title = document.createElement("h2");
    title.classList.add("title");
    let header = document.createElement("div");
    header.classList.add("header");
    // main
    let text = document.createElement("h3");
    text.classList.add("text");
    let main = document.createElement("div");
    main.classList.add("main");
    main.classList.add("hidden");
    // footer block 1
    let block = document.createElement("div");
    block.classList.add("ds");
    // footer block 2
    let blockEdit = document.createElement("div");
    blockEdit.classList.add("ds");
    // footer block 3
    let blockBtn = document.createElement("button");
    blockBtn.classList.add("edit");
    blockBtn.dataset.action = "edit";
    blockBtn.textContent = "Смотреть";
    // block child
    let textTime = document.createElement("h4");
    textTime.textContent = "Дата создания: ";
    block.appendChild(textTime);
    // time create
    let timeCreate = document.createElement("h3");
    let date = new Date();
    let minutes = date.getMinutes();
    if (String(date.getMinutes()).split("").length === 1) {
      minutes = "0" + date.getMinutes();
    }
    // simple time
    timeCreate.textContent =
      date.getDate() +
      " " +
      arrayMonth[date.getMonth()] +
      " " +
      date.getFullYear() +
      " года " +
      date.getHours() +
      ":" +
      minutes +
      " ";
    block.appendChild(timeCreate);

    // block child 2
    let editText = document.createElement("h4");
    editText.textContent = "Дата редактирования: ";
    editText.classList.add("editTimeText");
    editText.classList.add("hidden");
    blockEdit.appendChild(editText);
    // time edit
    let timeEdit = document.createElement("h3");
    timeEdit.classList.add("time");
    blockEdit.appendChild(timeEdit);
    // footer
    let footer = document.createElement("div");
    footer.classList.add("footer");

    // header title
    title.textContent = input.value;
    header.appendChild(title);
    // main text
    text.textContent = textarea.value;
    main.appendChild(text);
    // footer block
    footer.appendChild(block);
    footer.appendChild(blockEdit);
    footer.appendChild(blockBtn);

    // header main footer (div)
    newPost.appendChild(header);
    newPost.appendChild(main);
    newPost.appendChild(footer);
    // main post
    mainPosts.append(newPost);
    // clear
    input.value = "";
    textarea.value = "";
    posts();
  }
};

// LocalStorage. Save data
let post;
function posts() {
  post = main.innerHTML;
  localStorage.setItem("post", post);
}

// LocalStorage. Use data
if (localStorage.getItem("post")) {
  main.innerHTML = localStorage.getItem("post");
}

//  Edit. Find dataset btn and next find items which need to edit
window.addEventListener("click", (event) => {
  if (event.target.dataset.action === "edit") {
    // find post
    const post = event.target.closest(".post");
    const header = post.querySelector(".header");
    const main = post.querySelector(".main");
    const title = post.querySelector(".title");
    const text = post.querySelector(".text");
    const btnEdit = post.querySelector(".edit");
    const timeEdit = post.querySelector(".time");
    const editTimeText = post.querySelector(".editTimeText");
    // Look. first btn
    if (btnEdit.textContent === "Смотреть") {
      main.classList.remove("hidden");
      btnEdit.textContent = "Редактировать";
      // Edit. second btn
    } else if (btnEdit.textContent === "Редактировать") {
      title.classList.add("hidden");
      text.classList.add("hidden");
      // styles
      inputEditTitle.classList.add("inputEditTitle");
      textareaEditText.classList.add("textareaEditText");
      // type input & textarea
      inputEditTitle.type = "text";
      textareaEditText.type = "text";
      // value
      inputEditTitle.value = title.textContent;
      textareaEditText.value = text.textContent;
      // add
      header.appendChild(inputEditTitle);
      main.appendChild(textareaEditText);
      // btn name
      btnEdit.textContent = "Сохранить";
      // Save. third btn
    } else {
      // clear, what was before
      header.innerHTML = "";
      main.innerHTML = "";
      // new text
      title.textContent = inputEditTitle.value;
      text.textContent = textareaEditText.value;
      // save in HTML
      header.appendChild(title);
      main.appendChild(text);
      // styles
      title.classList.add("title");
      title.classList.remove("hidden");
      text.classList.add("text");
      text.classList.remove("hidden");
      // time update
      editTimeText.classList.remove("hidden");

      let date = new Date();
      let minutes = date.getMinutes();
      if (String(date.getMinutes()).split("").length === 1) {
        minutes = "0" + date.getMinutes();
      }
      timeEdit.textContent =
        date.getDate() +
        " " +
        arrayMonth[date.getMonth()] +
        " " +
        date.getFullYear() +
        " года " +
        date.getHours() +
        ":" +
        minutes +
        " ";
      // btn name
      btnEdit.textContent = "Редактировать";
      // update localStorage
      posts();
    }
  }
});
