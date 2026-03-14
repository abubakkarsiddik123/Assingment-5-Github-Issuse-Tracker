
let currentBtn = "All";

function switchBtn(click) {
  const btns = ["All", "Open", "Closed"];

  currentBtn = click;

  for (const btn of btns) {
    const btnName = document.getElementById("btn-" + btn);
    if (btn === click) {
      btnName.classList.remove("btn-outline");
      btnName.classList.add("btn-primary");
    } else {
      btnName.classList.remove("btn-primary");
      btnName.classList.add("btn-outline");
    }
  }
}

