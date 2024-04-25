// DOM creating part

function element(tag, classname, id, text) {
  let tags = document.createElement(tag);
  tags.classList = classname;
  tags.id = id;
  tags.innerHTML = text;
  return tags;
}

let container = element("div", "container", "", "");
const h1 = element(
  "h1",
  "text-center",
  "title",
  " Check Weather of your Countries"
);
const row = element("div", "row", "", "");

// fetching part

const response = fetch("https://restcountries.com/v3.1/all");
response
  .then((data) => data.json())
  .then((result) => {
    // console.log(result);

    // bootsrap card part

    for (let i = 0; i < result.length; i++) {
      const col = document.createElement("div");
      col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
      col.innerHTML = `
        <div class = "card h-100">
        <div class = "card-header">
        <h5 class = "card-title text-center">${result[i].name.common}</h5>
        </div>
        <div class="img-box">
        <img src="${result[i].flags.png}" class="card-img-top"  alt="flags"/>
        </div>
        <div class = "card-body">
        <div class = "card-text text-center">Region: ${result[i].region}</div>
        <div class = "card-text text-center">Capital: ${result[i].capital}</div>
        <div class = "card-text text-center">Country Code: ${result[i].cca3}</div>
        <button class="btn btn-primary">Click for weather</button>
        </div>
        </div>
        `;
      row.append(col);
    }

    // getting weather API details from the button

    let buttons = document.querySelectorAll("button");
    // console.log(buttons);

    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        let latlng = result[index].latlng;
        //console.log(latlng);

        let lat = latlng[0];
        let lon = latlng[1];
        //    console.log(lat);
        //    console.log(lon);

        let weatherApi = fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9112600f1b163f6a6223dafd35b2ceea`
        );
        weatherApi
          .then((ele) => ele.json())
          .then((weatherRes) => {
            // console.log(weatherRes)
            alert(
              `Weather of ${
                result[index].name.common
              } Temperature is ${Math.floor(weatherRes.main.temp)} deg`
            );
          });
      });
    });
  });

//append part

container.append(row);
document.body.append(h1, container);
