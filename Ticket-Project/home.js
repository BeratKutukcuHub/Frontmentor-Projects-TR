const uploadinput = document.getElementById("upload");
let img = document.getElementById("uploadimg");

img.addEventListener("click", () => {
  uploadinput.click();
});
let image = "";
uploadinput.addEventListener("change", () => {
  const file = uploadinput.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const base64String = event.target.result;
    img.src = base64String;
    image = base64String;
  };
  reader.readAsDataURL(file);
});

const container_ticket = document.getElementById("container-ticket");

const form = document.getElementById("form-id");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fullName = document.getElementById("fullName-box");
  const email = document.getElementById("email-box");
  const github = document.getElementById("github-box");
  console.log(image);
  if (
    fullName.getElementsByTagName("input")[0].value.length <= 10 ||
    email.getElementsByTagName("input")[0].value.length <= 4
  ) {
    fullName.getElementsByTagName("div")[0].style.display = "flex";
    email.getElementsByTagName("div")[0].style.display = "flex";
    event.preventDefault();
  } else {
    document.querySelector(
      "#header"
    ).innerHTML = ` <h1>Congrats, <span id="gradient-text">${
      fullName.getElementsByTagName("input")[0].value
    }</span>! Your ticket is ready</h1>`;
    document.querySelector("#header-content").innerHTML = `<p>
            We've emailed your ticket to
            <span style="color: hsl(7, 88%, 67%)">${
              email.getElementsByTagName("input")[0].value
            }</span> and
            will send updates in the run up to the event.
          </p>`;

    form.style.display = "none";
    const ticketContainer = document.getElementById("container-ticket");
    ticketContainer.style.display = "flex";
    const ticket = document.createElement("div");
    ticket.style = "position: relative; width: 45%";
    ticket.innerHTML = `
            <img
              style="width: 100%"
              src="./ticketdesing/assets/images/pattern-ticket.svg"
            />
            <div
              style="
                position: absolute;
                left: 0%;
                top: 0%;
                display: flex;
                width: 100%;
                height: 100%;
                flex-direction: column;
                justify-content: space-between;
              "
            >
              <div style="display: flex; flex-direction: column; margin: 3% 5%">
                <div style="display: flex; gap: 3%">
                  <img src="./ticketdesing/assets/images/logo-mark.svg" />
                  <h1>Coding Conf</h1>
                </div>
                <p
                  style="opacity: 40%; margin-left: 10%; align-self: flex-start"
                >
                  Jan 31, 2025 / Austin, TX
                </p>
              </div>
              <div
                style="
                  display: flex;
                  gap: 1%;
                  justify-content: flex-start;
                  margin: 0px 5% 4% 5%;
                  align-items: center;
                "
              >
                <div style="flex-basis: 20%">
                  <img
                    style="width: 80%; float: left"
                    src="${image}"
                  />
                </div>
                <div
                  style="
                    flex-basis: 80%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 7px;
                  "
                >
                  <h3>${fullName.getElementsByTagName("input")[0].value}</h3>
                  <span
                    style="
                      display: flex;
                      gap: 3%;
                      width: 1%;
                      align-items: center;
                    "
                  >
                    <img src="./ticketdesing/assets/images/icon-github.svg" />
                    <p>${github.getElementsByTagName("input")[0].value}</p>
                  </span>
                </div>
              </div>
            </div>
          `;
    ticketContainer.appendChild(ticket);
    event.preventDefault();
  }
});
