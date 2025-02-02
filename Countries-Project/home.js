const dataApi = async () => {
  try {
    const api = await fetch("./countriesapi/data.json");
    const data = await api.json();
    return data;
  } catch (error) {
    console.log("API çekilemiyor:", error);
    return null;
  }
};
const theme = document.getElementById("span-theme");
const header = document.getElementById("container");
const flags = document.querySelectorAll(".flags");
theme.addEventListener("click", () => {
  const text =
    "Light Mode" === event.target.textContent ? "Dark Mode" : "Light Mode";
  const bool = text === "Light Mode" ? true : false;

  document.querySelector("body").style = `background-color: ${
    bool ? "rgb(29, 29, 35)" : "whitesmoke"
  };
  color: ${bool ? "whitesmoke" : "rgb(29, 29, 35)"};
  box-shadow:  ${
    bool
      ? "0px 0px 8px 0.2px rgba(249, 249, 249, 0.19);"
      : "0px 0px 8px 0.2px rgba(0, 0, 0, 0.114);"
  }`;
  header.style = `background-color: ${bool ? "rgb(29, 29, 35);" : "whitesmoke;"}
  color: ${bool ? "whitesmoke" : "rgb(29, 29, 35);"};
  box-shadow: ${
    bool
      ? "0px 0px 8px 0.2px rgba(255, 253, 253, 0.15);"
      : "box-shadow: 0px 0px 8px 0.2px rgba(0, 0, 0, 0.114);"
  }`;
  document.getElementById("span-theme").querySelector("h5").textContent = text;
});
const search_filter = document.getElementById("search");
const opt = document.getElementById("options");
let datas = [];
let filteredData = [];
let fullData = [];
const filter = document.getElementById("filter");
filter.addEventListener("mousemove", () => {
  opt.style.display = "flex";
});
filter.addEventListener("mouseleave", () => {
  opt.style.display = "none";
});

const optAll = opt.querySelectorAll(".region");
optAll.forEach((value) => {
  value.addEventListener("click", (event) => {
    filteredData = datas.filter((data) => {
      return data.region === event.target.textContent;
    });
    pagination(10);
  });
});
const filterData = (data) => {
  return data.map((country) => ({
    name: country.name,
    capital: country.capital ? country.capital : "N/A",
    population: country.population,
    region: country.region,
    flag: country.flags.svg,
  }));
};
(async () => {
  const data = await dataApi();
  fullData = data;
  if (data) {
    datas = filterData(data);
  }

  search_filter.addEventListener("input", () => {
    filteredData = datas.filter((value) => {
      return value.name
        .toUpperCase()
        .includes(search_filter.value.toUpperCase());
    });
    pagination(10);
  });
  if (filteredData.length === 0) {
    filteredData = datas;
    pagination(10);
  }
})();
const dynamicSection = (data, start, end) => {
  const container = document.getElementById("container-flags");
  const fragment = document.createDocumentFragment();
  container.innerHTML = "";
  data = data.slice(start, end);
  data.forEach(({ name, flag, population, region, capital }) => {
    const dynamic = document.createElement("div");
    dynamic.classList.add("flags");
    dynamic.innerHTML = `
      <div class="flag">
        <div class='get-details'
          class="img-container"
        >
          <img id='name' class='img-item'
            src="${flag}"
          />
        </div>
        <div class="details">
          <div style="width: 100%">
            <h3 class='get-details' style="font-size: 21px; letter-spacing: 0.1px">
              ${name}
            </h3>
          </div>
          <div class="details-bottom stil" >
            <p>Population:</p>
            <h6 >${parseInt(population).toLocaleString("tr")}</h6>
          </div>
          <div class="details-bottom stil-second">
            <p>Region:</p>
            <h6 style='white-space:none'>${region}</h6>
          </div>
          <div class="details-bottom stil-second">
            <p>Capital:</p>
            <h6>${capital}</h6>
          </div>
        </div>
      </div>
    `;
    dynamic.querySelectorAll(".get-details").forEach((value) => {
      value.addEventListener("click", (event) => {
        let getData = fullData.filter((value) => {
          return (
            value.name ===
            dynamic
              .querySelector(".details")
              .querySelector("h3")
              .textContent.trim()
          );
        });
        const container_data = document.getElementById("container-main");
        const details = document.getElementById("container-detail");
        details.innerHTML = "";
        const detail = document.createElement("div");
        container_data.style = "display:none";
        details.style.display = "flex";
        const main = document.querySelector("main");

        detail.classList.add("detail");
        detail.style = `margin-top: 3%;
            width: 90%;
            display: flex;
            flex-direction: column;
            align-items: center;`;
        detail.innerHTML = `<div style="width: 90%">
            <button
              id="back"
              style="
                background-color: white;
                box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.167);
                color: black;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                letter-spacing: 1px;
              "
            >
              <i class="fa fa-arrow-left"></i> Back
            </button>
          </div>
          <div
            class="detail-flags"
            style="
              width: 90%;
              margin-top: 5%;
              display: flex;
              gap: 5%;
              height: 100%;
              justify-content: space-between;
            "
          >
            <div style="flex-basis: 45%; height: 80%; box-shadow:0px 0px 15px 2px grey">
              <img
                src="${getData[0].flags.svg}"
                style="width: 100%; height: 100%"
              />
            </div>
            <div style="flex-basis: 45%; height: 80%">
              <div
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  gap: 4%;
                "
              >
                <h2 style="margin-top: 5%; margin-bottom: 5%">${
                  getData[0].name
                }</h2>
                <div style="display: flex; gap: 5%">
                  <div style="flex-basis: 50%">
                    <p>
                      <strong>Native Name:</strong>
                      ${getData[0].nativeName}
                    </p>
                    <p><strong>Population:</strong> ${parseInt(
                      getData[0].population
                    ).toLocaleString()}</p>
                    <p><strong>Region:</strong> ${getData[0].region}</p>
                    <p><strong>Sub Region:</strong> ${getData[0].subregion}</p>
                    <p><strong>Capital:</strong> ${
                      getData[0].capital ?? "N/A"
                    }</p>
                  </div>
                  <div style="flex-basis: 50%">
                    <p><strong>Top Level Domain:</strong> ${
                      getData[0].topLevelDomain
                    }</p>
                    <p><strong>Currencies:</strong> ${
                      getData[0].currencies !== undefined
                        ? getData[0].currencies.map((currencies) => {
                            return `
                    
                      ${currencies.name}
                    `;
                          })
                        : "N/A"
                    }</p>
                    <p><strong>Languages:</strong> ${
                      getData[0].languages !== undefined
                        ? getData[0].languages.map((languagesed) => {
                            return `
                    
                      ${languagesed.name}
                    `;
                          })
                        : "N/A"
                    }</p>
                  </div>
                </div>
                <div style="margin-top: 5%">
                  <p><strong>Border Countries:</strong></p>
                  <div style="display: flex; gap: 5%; margin-top: 2%; flex-wrap:nowrap;">
                    
                  ${
                    getData[0].borders !== undefined
                      ? getData[0].borders.map((border) => {
                          return `
                            <div
                            style="
                            background-color: white;
                            padding: 5px 10px;
                            border-radius: 5px;
                            box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.242);
                            color:black; 
                            "
                            >
                            ${border}
                            </div>`;
                        })
                      : "N/A"
                  }
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        detail.querySelector("#back").addEventListener("click", () => {
          details.style.display = "none";
          container_data.style.display = "flex";
        });
        details.appendChild(detail);
        main.appendChild(details);
      });
    });

    fragment.appendChild(dynamic);
  });

  container.appendChild(fragment);
};
const perPage = (perMax, index, per) => {
  return {
    perMax: Math.ceil(perMax / per),
    start: index * per - per,
    end: index * per,
  };
};
const pagination = (per) => {
  const dataitem = filteredData.length === 0 ? datas : filteredData;
  const renderPage = perPage(dataitem.length, 1, per);
  dynamicSection(dataitem, renderPage.start, renderPage.end);
  const paginations = document.getElementById("paginations");
  paginations.innerHTML = "";
  for (let i = 1; i <= renderPage.perMax; i++) {
    const paginationElement = document.createElement("div");
    paginationElement.id = "pagination";
    paginationElement.classList.add("pagination-cube");
    paginationElement.innerHTML = `<button class="pagination"><p id='pageindex'>${i}</p></button>`;

    paginationElement.addEventListener("click", () => {
      document.getElementById("container-flags").innerHTML = "";
      const render = perPage(datas.length, i, per);
      dynamicSection(filteredData, render.start, render.end);
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    });
    paginations.appendChild(paginationElement);
  }
};
