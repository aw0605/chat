function showChat(chat) {
  const ul = document.querySelector(".showChat");
  const li = document.createElement("li");
  li.innerText = chat.content;

  ul.appendChild(li);
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
