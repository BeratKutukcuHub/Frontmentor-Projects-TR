const container = document.getElementById("container");
const dataApi = async () => {
  const api = fetch("../comment/data.json").then((res) => res.json());
  return await api;
};

const renderComponent = async () => {
  let datas = await dataApi();
  let comments = await datas.comments;
  let commentDatas = [];
  commentDatas = comments;
  commentDatas.forEach((data, index) => {
    const container_base = document.createElement("div");
    container_base.style =
      "display: flex;justify-content: center;width: 100%;background-color: rgb(245, 250, 255);align-items: center;flex-direction: column;gap: 2%;";

    const element = document.createElement("section");
    element.classList.add("container-section");
    element.innerHTML = `<div style="display: flex; gap: 3%">
            <div class="section-calc">
              <div class="calc-buttons">
                <button class="button" id='increment'>
                  <img src="../comment/images/icon-plus.svg" />
                </button>
                <h5 id='score-text'>${data.score}</h5>
                <button class="button" id='decrement'>
                  <img src="../comment/images/icon-minus.svg" />
                </button>
              </div>
            </div>
            <div class="section-top">
              <div class="section-top-top">
                <div class="top-left">
                  <img
                    src="../comment/${data.user.image.png}"
                    width="8%"
                  />
                  <h4 style='font-weight:600'>${data.user.username}</h4>
                  <h4 style="opacity: 60%">${data.createdAt}</h4>
                </div>

                <div style="flex-basis: 30%">
                  <button class="reply-button">
                    <img src="../comment/images/icon-reply.svg" />
                    Reply
                  </button>
                </div>
              </div>
              <div class="section-content">
                <p style="opacity: 50%">
                  ${data.content}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section class='second'
          style="
            display: none;
            width: 100%;
            justify-content: space-between;
            margin-top: 1%;
          "
        >
          <div
            style="
              display: flex;
              align-items: flex-start;
              gap: 2%;
              margin-left: 4%;
              flex-basis: 95%;
            "
          >
            <img
              src="../comment/images/avatars/image-ramsesmiron.png"
              style="width: 5%"
            />
            <form id='comment-form' method='POST'>
            <textarea id='text-val'
              cols="80%"
              rows="4%"
              placeholder="Yorumunuzu buraya yazabilirsiniz..."
              style="resize: none; padding: 2%; border-radius: 10px"
            ></textarea>
            </form>
          </div>
          <div style="flex-basis: 5%">
            <button class="bottom-reply-button">Reply</button>
          </div>`;

    container_base.appendChild(element);
    const textarea = container_base.querySelector("#text-val");
    const submit = container_base.querySelector(".bottom-reply-button");
    submit.addEventListener("click", async () => {
      const value = textarea.value;
      updateComment[index].replies.push({
        content: value,
        createdAt: "before one minute",
        id: 4,
        score: 0,
        user: {
          image: {
            png: "./images/avatars/image-ramsesmiron.png",
            webp: "./images/avatars/image-ramsesmiron.webp",
          },
          username: "ramsesmiron",
        },
      });
      textarea.value = "";
    });

    const score = container_base.querySelector("#score-text");
    const increment = container_base.querySelector("#increment");
    const lastData = data.score + 1;
    increment.addEventListener("click", () => {
      if (parseInt(score.textContent) !== lastData) {
        score.textContent = lastData;
      } else {
        score.textContent = data.score;
      }
    });
    const decrement = container_base.querySelector("#decrement");
    const declastData = data.score - 1;
    decrement.addEventListener("click", () => {
      if (parseInt(score.textContent) !== declastData) {
        score.textContent = declastData;
      } else {
        score.textContent = data.score;
      }
    });
    if (data.replies.length > 0) {
      data.replies.forEach((replie, index) => {
        const second_section = document.createElement("div");
        second_section.style =
          "flex-direction:column;display:flex;align-items:flex-end; justify-content:center; width:60%";
        second_section.innerHTML = `<section class="second-section">
        <div style="display: flex; gap: 3%">
          <div class="section-calc">
            <div class="calc-buttons">
              <button class="button" id='increment'>
                <img src="../comment/images/icon-plus.svg" />
              </button>
              <h5 id='score'>${replie.score}</h5>
              <button class='button' id='decrement'>
                <img src="../comment/images/icon-minus.svg" />
              </button>
            </div>
          </div>
          <div class="section-top">
            <div class="section-top-top">
              <div class="top-left">
                <img
                  src="../comment/${replie.user.image.png}"
                  width="8%"
                />
                <h4>${replie.user.username}</h4>
                <h4 style="opacity: 60%">${replie.createdAt}</h4>
              </div>

              <div style="flex-basis: 30%">
                <button class="reply-button">
                  <img src="../comment/images/icon-reply.svg" />
                  Reply
                </button>
              </div>
            </div>
            <div class="section-content">
              <p style="opacity: 50%">
                ${replie.content}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class='second'
        style="
          display: none;
          width: 80%;
          justify-content: space-between;
          margin-top: 1%;
        "
      >
        <div 
          style="
            display: flex;
            align-items: flex-start;
            gap: 2%;
            margin-left: 4%;
            flex-basis: 95%;
          "
        >
          <img
            src="../comment/images/avatars/image-ramsesmiron.png"
            style="width: 5%"
          />
          <textarea
            cols="60%"
            rows="4%"
            placeholder="Yorumunuzu buraya yazabilirsiniz..."
            style="resize: none; padding: 2%; border-radius: 10px"
          ></textarea>
        </div>
        <div style="flex-basis: 5%">
          <button class="bottom-reply-button">Reply</button>
        </div>
      </section>`;

        container_base.appendChild(second_section);

        const replyButton = second_section.querySelector(".reply-button");
        replyButton.addEventListener("click", () => {
          const replyInput = second_section.querySelector(".second");
          replyInput.style.display = "flex";
        });
        const scoresecond = container_base.querySelectorAll("#score")[index];
        const increment = second_section.querySelector("#increment");
        const lastData = replie.score + 1;
        increment.addEventListener("click", () => {
          if (parseInt(scoresecond.textContent) !== lastData) {
            scoresecond.textContent = lastData;
          } else {
            scoresecond.textContent = replie.score;
          }
        });
        const decrement = second_section.querySelector("#decrement");
        const declastData = replie.score - 1;
        decrement.addEventListener("click", () => {
          if (parseInt(scoresecond.textContent) !== declastData) {
            scoresecond.textContent = declastData;
          } else {
            scoresecond.textContent = replie.score;
          }
        });
      });
    }
    container.appendChild(container_base);

    const replyButton = container_base.querySelector(".reply-button");
    replyButton.addEventListener("click", () => {
      const replyInput = container_base.querySelector(".second");
      replyInput.style.display = "flex";
    });
  });
};
renderComponent();
