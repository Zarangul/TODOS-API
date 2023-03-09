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

addButton.addEventListener("click", () => {
  let inValue = input.value.trim();

  if (inValue !== "") {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title: inValue }),
    })
      .then(() => {
        ul.innerHTML = "";
        input.value = "";
        write();
      })
      .catch((error) => console.error(error));
    
  } else {
    alert("Please enter valid value");
  }
});

function write() {
  fetch(API_URL)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data.todos[0].title);

      data.todos.forEach((e) => {
        ul.innerHTML += `<li id="in-li${e._id}" class="in-li">
        <span id="in-span-1${e._id}">${e.title}</span>
        <div>
        <span class='edit' onClick=editLi(${`'${e._id}'`})><i class="fa-regular fa-pen-to-square"></i></span>
        <span class="in-span-2" onClick=deletedLi(${`'${e._id}'`})><i class="fa-sharp fa-solid fa-trash-can"></i></span></div>
        
    </li>`;
      });
    });
}

function deletedLi(id) {
  fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  }).then(() => {
    // Remove the deleted item from the DOM
    document.getElementById(`in-li${id}`).remove();
  })
  .catch((error) => console.log(error));
}

function editLi(id){
  let span = document.getElementById(`in-span-1${id}`);
  span.style.textDecoration = 'line-through'
  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ completed: false }),
  })
    .then(() => {
      ul.innerHTML = "";
      input.value = "";
      write();
    })
    .catch((error) => console.error(error));
}
write();