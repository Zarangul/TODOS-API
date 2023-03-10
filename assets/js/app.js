let input = document.getElementById("input-value");
let addButton = document.getElementById("add-btn");
let ul = document.getElementById("ul-box");
const API_URL = "https://crudapp-pwlck5pebq-el.a.run.app/api/todos";

addButton.addEventListener("mouseover", () => {
  addButton.style.backgroundColor = "#080d9e";
});
addButton.addEventListener("mouseleave", () => {
  addButton.style.backgroundColor = "darkblue";
});

addButton.addEventListener("click", postToDo);
getData();
function getData() {
  fetch("https://crudapp-pwlck5pebq-el.a.run.app/api/todos")
    .then((res) => res.json())
    .then((data) =>
      data.todos.forEach((e) => {
        ul.innerHTML += `
    <li id="in-li${e._id}" class="in-li" style="${
          e.completed && "background-color: #e9f0f1"
        }">
        <span id="in-span-1${e._id}" style="${
          e.completed && "text-decoration: line-through"
        }">${e.title}</span>
        <div class='edit-delete-icon'>
          <span class='edit' onClick='updateToDo(${JSON.stringify(e)})'>
            <i class="fa-regular fa-pen-to-square"></i>
          </span>
          <span class="in-span-2" onClick=deleteToDo('${e._id}')>
            <i class="fa-sharp fa-solid fa-trash-can"></i>
          </span>
        </div> 
    </li>
    `;
      })
    );
}

function postToDo() {
  fetch("https://crudapp-pwlck5pebq-el.a.run.app/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: input.value,
      completed: false,
    }),
  })
    .then((res) => {
      if (res.status === 201) {
        ul.innerHTML = "";
        input.value = "";
        getData();
      }
    })
    .catch((err) => console.log(err));
}

function deleteToDo(id) {
  fetch(`https://crudapp-pwlck5pebq-el.a.run.app/api/todos/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.status === 200) {
      ul.innerHTML = "";
      getData();
    }
  });
}

function updateToDo(value) {
  fetch(`https://crudapp-pwlck5pebq-el.a.run.app/api/todos/${value._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...value,
      completed: value.completed == false ? true : false,
    }),
  }).then((e) => {
    if (e.status === 200) {
      ul.innerHTML = "";
      getData();
    }
  });
}
