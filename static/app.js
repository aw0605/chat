async function editChat(e) {
  const id = e.target.dataset.id;
  const editInput = prompt("수정할 내용을 입력해주세요");

  const res = await fetch(`/chats/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editInput,
    }),
  });
  readChat();
}

async function deleteChat(e) {
  const id = e.target.dataset.id;

  const res = await fetch(`/chats/${id}`, {
    method: "DELETE",
  });
  readChat();
}

function showChat(chat) {
  const ul = document.querySelector(".showChat");
  const li = document.createElement("li");

  const editBtn = document.createElement("button");
  editBtn.innerText = "수정";
  editBtn.dataset.id = chat.id;
  editBtn.addEventListener("click", editChat);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "삭제";
  deleteBtn.dataset.id = chat.id;
  deleteBtn.addEventListener("click", deleteChat);

  li.innerText = `${chat.content}`;

  ul.appendChild(li);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
}

async function readChat() {
  const res = await fetch("/chats");
  const jsonRes = await res.json();
  console.log(jsonRes);
  const ul = document.querySelector(".showChat");

  ul.innerHTML = "";

  jsonRes.forEach(showChat);
}

async function createChat(value) {
  const res = await fetch("/chats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });
  readChat();
}

function sendChat(e) {
  e.preventDefault();
  const input = document.querySelector("#chatText");

  createChat(input.value);

  input.value = "";
}

const form = document.querySelector("#chatBox");
form.addEventListener("submit", sendChat);

readChat();
