const priorityColors = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const labelColors = {
  "enhancement": "bg-green-100 text-green-700",
  "good first issue": "bg-purple-100 text-purple-700",
  "bug": "bg-red-100 text-red-700",
  "documentation": "bg-gray-100 text-gray-700",
  "help wanted": "bg-yellow-100 text-yellow-700" 
};

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
      : allIssues.filter(
          (card) => card.status.toLowerCase() === click.toLowerCase(),
        );
  displayIssuse(cards);

  document.getElementById("count-value").innerText = cards.length + " Issues";
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
    const borderColor =
      issue.status.toLowerCase() === "open"
        ? "border-t-4 border-green-500"
        : "border-t-4 border-purple-500";

    const div = document.createElement("div");
    div.innerHTML = `
   <div class="card-body bg-white shadow space-y-3 ${borderColor} rounded-xl ">
            <div class="flex justify-between items-center space-y-3 ">
              <img src="./assets/${issue.status === "open" ? "Open-Status.png" : "Closed- Status .png"}" alt="">
             <h2 class="font-medium text-xs px-4 py-1 rounded-full ${priorityColors[issue.priority.toLowerCase()] || "bg-gray-200"}">${issue.priority.toUpperCase()}</h2> 
            </div>
            <div class=" space-y-3">
              <h2 class="text-sm font-semibold text-[#1F2937]">${issue.title} </h2>
              <p class="text-xs line-clamp-2 text-[#64748B]">${issue.description}</p>

              <div class=" ">
                <div class="flex  flex-wrap gap-2">${issue.labels
                  .map((label) => {
                    const colorClass =
                      labelColors[label.toLowerCase()] ||
                      "bg-gray-200 text-gray-700";
                    return `<span class="${colorClass} px-4 py-1 rounded-full">${label}</span>`;
                  })
                  .join("")} </div>
              </div>
              <div class="flex justify-between items-center">
                <div class="text-[#64748B] space-y-3">
                  <p>#1 by ${issue.author} </p>
                  <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

            </div>

          </div>
    
    `;
    container.appendChild(div);
  });
}
loadIssues();
