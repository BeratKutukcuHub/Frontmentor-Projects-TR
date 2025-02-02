const step_1 = document.getElementById("step-1");
const step_2 = document.getElementById("step-2");
const step_3 = document.getElementById("step-3");
const step_4 = document.getElementById("step-4");
const back = document.getElementById("back");
const next = document.getElementById("next");
const check = (...params) => {
  return params.every((param) => param !== "");
};

const display = (element) => {
  const steps = document.querySelectorAll(".step-left");

  element === step_1
    ? (step_1.classList.add("content-display"),
      steps[0].classList.add("selected"),
      (step_1.style.display = "flex"))
    : (step_1.classList.remove("content-display"),
      steps[0].classList.remove("selected"),
      (step_1.style.display = "none"));

  element === step_2
    ? (step_2.classList.add("content-display"),
      steps[1].classList.add("selected"),
      (step_2.style.display = "flex"))
    : (step_2.classList.remove("content-display"),
      steps[1].classList.remove("selected"),
      (step_2.style.display = "none"));

  element === step_3
    ? (step_3.classList.add("content-display"),
      steps[2].classList.add("selected"),
      (step_3.style.display = "flex"))
    : (step_3.classList.remove("content-display"),
      steps[2].classList.remove("selected"),
      (step_3.style.display = "none"));

  element === step_4
    ? (step_4.classList.add("content-display"),
      steps[3].classList.add("selected"),
      (step_4.style.display = "flex"))
    : (step_4.classList.remove("content-display"),
      steps[3].classList.remove("selected"),
      (step_4.style.display = "none"));
};

display(step_1);
let Data = {
  name: "",
  email: "",
  phone: "",
  packaged: "",
  price: "",
  timeSpan: "",
  promotion: {
    online: "",
    larger: "",
    custom: "",
  },
};
// Step 1
class StepByFirst {
  name = "";
  email = "";
  phone = "";
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
  checkInputs = (bool) => {
    const checkController = document.querySelectorAll(".check");
    const inputs = document.querySelectorAll(".form-input");
    checkController.forEach((val) => {
      if (bool) {
        const check = val.classList.contains("no-look");
        check ? "" : val.classList.add("no-look");
        if (inputs[0].classList.contains("no-input")) {
          inputs.forEach((val) => {
            val.classList.remove("no-input");
          });
        }
      } else {
        val.classList.remove("no-look");
        inputs.forEach((val) => {
          val.classList.add("no-input");
        });
      }
    });
  };
  nextStep = () => {
    if (check(this.name, this.email, this.phone)) {
      this.checkInputs(true);
      return true;
    } else {
      this.checkInputs(false);
      return false;
    }
  };
}
const step_1_run = () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const stepCheck = new StepByFirst(name, email, phone);
  if (stepCheck.nextStep()) {
    Data.name = name;
    Data.email = email;
    Data.phone = phone;
  }
  return stepCheck.nextStep();
};

// Step 2
const steps = document.querySelectorAll(".step2-header-blocks");
const stepsCalc = document.querySelector(".step2-footer");

const errorMessage = () => {
  if (!check(Data.packaged, Data.price)) {
    const message = document.createElement("div");
    message.id = "message";
    message.style = `display: flex; 
                    justify-content: center;
                    
                    width: 100%;
                    align-items: center;
                    background-color: rgb(100, 14, 14); border-radius:5px; padding:1%`;
    message.innerHTML = `
                    <div style="width: 70%;
                    font-size: 18px;
                    
                    font-weight: 100; text-align: center;"><p style='color:white; opacity:100%'>Lütfen herhangi bir paketi seçiniz!</p></div>
                    `;
    if (
      step_2.querySelector("#message") == undefined ||
      step_2.querySelector("#message") == null
    ) {
      step_2.insertBefore(message, stepsCalc);
      setTimeout(() => {
        return step_2.removeChild(message);
      }, 2000);
    }
    return false;
  } else return true;
};
class StepBySecond {
  border = (element) => {
    steps.forEach((val) => {
      val.classList.remove("step2-border");
    });
    element.classList.add("step2-border");
  };

  checkInput = () => {
    steps.forEach((values) => {
      values.addEventListener("click", (event) => {
        const packaged = values.querySelector("h4").textContent;
        const price = values.querySelector("span").textContent;
        this.border(values);
        if (check(packaged, price)) {
          Data.packaged = packaged;
          Data.price = price;
        } else {
          console.log("Hatalı Veriler Girilmiştir");
        }
      });
    });
  };
  textController = (timeSpan) => {
    steps.forEach((val) => {
      val.querySelectorAll("p").forEach((val) => {
        val.textContent = timeSpan;
      });
    });
  };
  calc = () => {
    const calcClick = stepsCalc.querySelector("#timeCalc");
    calcClick.addEventListener("click", () => {
      calcClick.classList.add("fa-solid");
      calcClick.classList.toggle("fa-toggle-on");
      calcClick.classList.toggle("fa-toggle-off");
      calcClick.classList.add("fa-lg");
      const confirm = calcClick.classList.contains("fa-toggle-off");
      const value = confirm ? "mo" : "yr";
      this.textController(value);
      Data.timeSpan = value;
    });
  };
}
const step2_controller = () => {
  const step_2 = new StepBySecond();
  step_2.checkInput();
  step_2.calc();
};

// Step 3
const checks = step_3.querySelectorAll("#form-input");
const checks_div = step_3.querySelectorAll("#check-div");

checks.forEach((values, index) => {
  values.addEventListener("click", (event) => {
    values.checked
      ? ((Data.promotion[event.target.name] = values.value),
        checks_div[index].classList.add("step3-border"),
        checks_div[index].classList.remove("step3-no-border"))
      : ((Data.promotion[event.target.name] = ""),
        checks_div[index].classList.remove("step3-border"),
        checks_div[index].classList.add("step3-no-border"));
  });
});

let data = -1;

next.onclick = () => {
  switch (data) {
    case -1:
      if (step_1_run()) {
        display(step_2);
        data = 0;
      }
      break;
    case 0:
      step2_controller();
      if (errorMessage()) {
        display(step_3);
        data = 1;
      }
      break;
    case 1:
      display(step_4);
      data = 2;
      break;
    case 2:
      console.log("Son adım tamamlandı!");
      break;
    default:
      console.log("Geçersiz adım!");
      break;
  }
};
