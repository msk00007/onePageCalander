const weekdays = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};
const months = {
  1: "JAN",
  2: "FEB",
  3: "MAR",
  4: "APR",
  5: "MAY",
  6: "JUN",
  7: "JUL",
  8: "AUG",
  9: "SEP",
  10: "OCT",
  11: "NOV",
  12: "DEC",
};

// loop for creating dates
const calanderDates = document.querySelector(".calander-grid-dates");
let num = 0; //to create 1 to 31
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 5; j++) {
    if (i < 3) {
      continue;
    }
    const div = document.createElement("div");
    div.classList.add("grid-item");
    div.dataset.row = i;
    div.dataset.col = j;
    if (j === 0) {
      num += 1;
      div.textContent = `${num}`;
      calanderDates.appendChild(div);
      div.classList.add("violet");
    } else {
      let day = num + 7 * j;
      if (day < 32) {
        div.textContent = `${day}`;
        if (day > 30) {
          div.classList.add("red");
          calanderDates.appendChild(div);
        } else if (day > 28) {
          div.classList.add("green");
          calanderDates.appendChild(div);
        } else {
          div.classList.add("violet");
          calanderDates.appendChild(div);
        }
      } else {
        calanderDates.appendChild(div);
      }
    }
  }
}

// loop for creating weeks
const calanderWeeks = document.querySelector(".calander-grid-weeks");
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 7; j++) {
    const div = document.createElement("div");
    div.classList.add("grid-item-weeks");
    div.dataset.row = i;
    div.dataset.col = j;
    div.textContent = "";
    calanderWeeks.appendChild(div);
  }
}

function generateCAl() {
  let input = document.querySelector("#YearValue").value;
  if (input === "" || isNaN(input)) {
    alert("please enter year value !");
  } else {
    // loop for removing past month values
    input = input.replace(/\s+$/, "");
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 7; j++) {
        let Div = document.querySelector(
          `.grid-item-weeks[data-row="${i}"][data-col="${j}"]`
        );
        Div.innerText = "";
      }
    }

    let YearInput = document.querySelector(".year");
    YearInput.innerText = `${input}`;
    // console.log(input);
    const date = new Date(`${input}-01-01`);
    // const date = new Date(`2022-01-01`);
    // console.log(date);
    // console.log(date.getDay());
    // const weekDay = date.toDateString().slice(0, 3);
    let weekDay = date.getDay();
    input = parseInt(input);
    // loop for creating weeks
    for (let i = 3; i < 10; i++) {
      for (let j = 0; j < 7; j++) {
        if (i == 3 && j == 0) {
          let targetDiv = document.querySelector(
            `.grid-item-weeks[data-row="${i}"][data-col="${j}"]`
          );
          targetDiv.innerText = `${weekdays[weekDay]}`;
        } else if (i > 3 && j == 0) {
          weekDay = (weekDay + 1) % 7;
          targetDiv = document.querySelector(
            `.grid-item-weeks[data-row="${i}"][data-col="${j}"]`
          );
          targetDiv.innerText = `${weekdays[weekDay]}`;
        } else {
          targetDiv = document.querySelector(
            `.grid-item-weeks[data-row="${i}"][data-col="${j}"]`
          );
          targetDiv.innerText = `${weekdays[(weekDay + j) % 7]}`;
        }
      }
    }

    // loop for creating months
    for (let i = 1; i <= 12; i++) {
      let dateForEveryMnth = new Date(`${input}-${i}-01`);
      let monthStartDay = dateForEveryMnth.toDateString().slice(0, 3);
      for (j = 0; j < 7; j++) {
        targetDiv = document.querySelector(
          `.grid-item-weeks[data-row="${3}"][data-col="${j}"]`
        );
        if (targetDiv.innerText === monthStartDay) {
          let k = 0;
          let monthValueArea = document.querySelector(
            `.grid-item-weeks[data-row="${k}"][data-col="${j}"]`
          ).innerText;

          while (monthValueArea != "") {
            // console.log(monthValueArea);
            // console.log(k);
            k += 1;
            monthValueArea = document.querySelector(
              `.grid-item-weeks[data-row="${k}"][data-col="${j}"]`
            ).innerText;
          }
          monthValueArea = document.querySelector(
            `.grid-item-weeks[data-row="${k}"][data-col="${j}"]`
          );
          monthValueArea.innerText = months[i];
          if (
            i == 1 ||
            i == 3 ||
            i == 5 ||
            i == 7 ||
            i == 8 ||
            i == 10 ||
            i == 12
          ) {
            monthValueArea.classList.add("red");
          } else if (i === 2) {
            if ((input % 4 === 0 && input % 100 !== 0) || input % 400 === 0) {
              monthValueArea.classList.add("green");
              monthValueArea.classList.remove("violet");
            } else {
              monthValueArea.classList.add("violet");
              monthValueArea.classList.remove("green");
            }
          } else {
            monthValueArea.classList.add("green");
          }
          break;
        }
      }
    }
  }
}

let submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", generateCAl);

const inputArea = document.querySelector("input");
inputArea.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    generateCAl();
  }
});
