

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
  let cards = 
  click === "All" 
    ? allIssues 
    : allIssues.filter(card => card.status.toLowerCase() === click.toLowerCase());
    displayIssuse(cards)

     document.getElementById("count-value").innerText =cards.length +" Issues";
}

let allIssues = [];

async function loadIssues() {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  console.log(data);
  allIssues = data.data;
  displayIssuse(allIssues);
}

// {
//     "id": 47,
//     "title": "Add code syntax highlighting",
//     "description": "Implement syntax highlighting for code blocks in comments and descriptions.",
//     "status": "open",
//     "labels": [
//         "enhancement",
//         "good first issue"
//     ],
//     "priority": "low",
//     "author": "syntax_simon",
//     "assignee": "",
//     "createdAt": "2024-01-25T11:00:00Z",
//     "updatedAt": "2024-01-25T11:00:00Z"
// }


// function issuesBtn (status){
//   let issues =allIssues;
//   if(status !=="all"){
//     issues=allIssues.filter(issue => issue.status===status);
//   }
//   displayIssuse(issues)
// }

function displayIssuse(issues) {
  console.log(issues);
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  issues.forEach((issue) => {
    console.log(issue);
    const div = document.createElement("div");
    div.innerHTML = `
   <div class="card-body bg-white shadow space-y-3 ">
            <div class="flex justify-between items-center space-y-3 ">
              <img src="./assets/Open-Status.png" alt="">
              <h2 class="font-medium text-xs bg-yellow-100">${issue.priority}</h2>
            </div>
            <div class=" space-y-3">
              <h2 class="text-sm font-semibold text-[#1F2937]">${issue.title} </h2>
              <p class="text-xs text-[#64748B]">The navigation menu doesn't collapse properly on mobile devices...</p>

              <div class=" space-y-3 flex gap-4">
                <div class="">${issue.labels} </div>
              </div>
              <div class="flex justify-between items-center">
                <div class="text-[#64748B]">
                  <p>${issue.author} </p>
                  <p>${issue.assignee}</p>
                </div>
                <div class="text-[#64748B]">
                  <p>${issue.createdAt}</p>
                  <p>${issue.updatedAt}</p>
                </div>
              </div>

            </div>

          </div>
    
    `;
    container.appendChild(div);
  });
}
loadIssues();
