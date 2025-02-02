const container = document.getElementById("todo");
const todo = document.getElementById("todo-container");
document.addEventListener("DOMContentLoaded", () => {
  const get = JSON.parse(localStorage.getItem("todos"));
  if (!Array.isArray(get)) {
    localStorage.setItem("todos", JSON.stringify([]));
  }
});
class Todo {
  todoInfos = {
    name: "",
    check: false,
  };
  constructor({ name = "", check = false }) {
    this.todoInfos.name = name;
    this.todoInfos.check = check;
  }

  todoModified = () => {
    if (
      !this.todoInfos.name.toString() === "" ||
      this.todoInfos.name !== null
    ) {
      return this.todoInfos;
    } else {
      return null;
    }
  };
  responseSetTime = (response) => {
    container.insertBefore(response, container.firstChild);
    setTimeout(() => {
      container.removeChild(response);
    }, 3000);
  };
  getTodo = () => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
      return todos;
    }
    return null;
  };
  setTodo = () => {
    const todos = this.getTodo();
    const todo = this.todoModified();
    if (!todos) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      if (todo) {
        const todos = JSON.parse(localStorage.getItem("todos"));
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
      } else console.log("todo boş veya yersiz.");
    }
  };
  addTodoResponse = () => {
    const response = document.createElement("div");
    response.classList.add("todo-response");

    if (this.todoModified()) {
      response.textContent = "Todo başarıyla eklenmiştir, listelenmiştir.";
      response.style.backgroundColor = "rgb(81, 114, 81)";
      this.responseSetTime(response);
    } else {
      response.textContent =
        "Girilen değerler yanlış veya yetersiz, tekrar deneyiniz.";
      response.style.backgroundColor = "rgb(125, 55, 55)";
      this.responseSetTime(response);
    }
  };
}
const checkController = (check, element) => {
  const check_img = document.createElement("img");
  if (!check) {
    element.style.background =
      "linear-gradient(to right, aqua, rgb(136, 92, 153))";
    check_img.src = "../todoapp/images/icon-check.svg";
    check_img.style.borderRadius = "50%";
    element.appendChild(check_img);
    return true;
  } else {
    const existingImg = element.querySelector("img");
    if (existingImg) {
      element.removeChild(existingImg);
      element.style.background = "transparent";
      return false;
    }
  }
};
const container_bottom = container.querySelector(".container-bottom");
const ContainerBottom = ({ name = "", check = false }) => {
  const footer = container.querySelector(".footer");

  const todos = document.createElement("div");
  todos.id = "todo-created";
  todos.classList.add("todo-login");
  todos.innerHTML = `<div style='width:100%; display:flex; flex-direction:column'>
    <div style='width:100%; display:flex; align-items:center;height:100%'>
        <div class="left">
                <div class="check">
                  
                </div>
              </div>
              <div class="right">
                <h4 ${
                  !check
                    ? "style='text-decoration: line-through;opacity:30%'"
                    : ""
                }>${name}</h4>
              </div>
            </div>
            <hr />
    </div>
            `;
  const checkinner = todos.querySelector(".check");
  check = checkController(check, checkinner);
  return container_bottom.insertBefore(todos, footer);
};

const LoadDOM = () => {
  const form = document.getElementById("todo-login-form");
  const button = form.querySelector("button");

  let checkInfo = false;
  button.addEventListener("click", () => {
    checkInfo = checkController(checkInfo, button);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("#todo-login");
    const todoModified = new Todo({ name: input.value, check: !checkInfo });
    if (todoModified.todoModified()) {
      input.value = "";
      todoModified.setTodo();
      todoModified.addTodoResponse();
      todosPost("all");
    } else {
      todoModified.addTodoResponse();
    }
  });
  let items = 0;
  const todosPost = (response = "method") => {
    const itemslength = document.querySelector("#length");

    const parsed = JSON.parse(localStorage.getItem("todos"));
    let listForOperations = [];
    if (container_bottom.querySelectorAll("#todo-created") !== null) {
      container_bottom.querySelectorAll("#todo-created").forEach((values) => {
        container_bottom.removeChild(values);
      });
    }
    const first = container_bottom.firstChild;
    if (first !== null) {
      first.style =
        "border-top-left-radius: 6px; border-top-right-radius: 6px;";
    }
    if (response === "active" || response === "completed") {
      listForOperations = parsed.filter((value) => {
        if (response === "active") {
          return value.check !== false;
        } else {
          return value.check !== true;
        }
      });
      itemslength.textContent = `${listForOperations.length} items left`;
      listForOperations.map((value) => {
        ContainerBottom({ name: value.name, check: value.check });
      });
    } else {
      itemslength.textContent = `${parsed.length} items left`;
      parsed.map((value) =>
        ContainerBottom({ name: value.name, check: value.check })
      );
    }
  };
  todosPost("all");
  const filters = document.querySelectorAll(".filter");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const filterName = filter.getAttribute("data-name");
      todosPost(filterName);
      if (filterName == "clear") {
        localStorage.setItem("todos", JSON.stringify([]));
        todosPost("all");
      }
    });
  });
};

LoadDOM();
