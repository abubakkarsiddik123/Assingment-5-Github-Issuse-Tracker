const priorityColors = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const labelColors = {
  enhancement: "bg-green-100 text-green-700",
  "good first issue": "bg-purple-100 text-purple-700",
  bug: "bg-red-100 text-red-700",
  documentation: "bg-gray-100 text-gray-700",
  "help wanted": "bg-yellow-100 text-yellow-700",
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("issue-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("issue-container").classList.remove("hidden");
  }
};

let currentBtn = "All";

function switchBtn(click) {
  manageSpinner(true);
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
  manageSpinner(false);
}

let allIssues = [];

async function loadIssues() {
  manageSpinner(true);
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  console.log(data);
  allIssues = data.data;
  displayIssuse(allIssues);
  manageSpinner(false);
}

async function loadIssueDetails(id) {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  displayIssuseDetails(details.data);
}

// {
//     "id": 10,
//     "title": "Update dependencies to latest versions",
//     "description": "Several npm packages are outdated and have security vulnerabilities. Need to update and test.",
//     "status": "closed",
//     "labels": [
//         "documentation"
//     ],
//     "priority": "medium",
//     "author": "security_sam",
//     "assignee": "john_doe",
//     "createdAt": "2024-01-05T14:00:00Z",
//     "updatedAt": "2024-01-15T11:30:00Z"
// }

function displayIssuseDetails(issue) {
  console.log(issue);
  const detailCards = document.getElementById("details-container");
  detailCards.innerHTML = `
  <div class="space-y-6">
       <div class="space-y-3">
         <h2 class="text-2xl font-bold text-[#1F2937]">${issue.title} </h2>
        <div class="flex items-center gap-3"><span class="${issue.status === "open" ? "bg-green-500" : "bg-purple-500"} text-white  px-4 rounded-full">
  ${issue.status === "open" ? "Open" : "Closed"}
</span> </span><p class="text-xs text-[#64748B]">Opened by ${issue.assignee}</p><span class="text-xs text-[#64748B]"><p>${new Date(issue.updatedAt).toLocaleDateString()}</p></span></div>
      </div>
      <div class="">
        <div class="flex  flex-wrap gap-2">${issue.labels
          .map((label) => {
            const colorClass =
              labelColors[label.toLowerCase()] || "bg-gray-200 text-gray-700";
            return `<span class="${colorClass} px-4 py-1 rounded-full">${label}</span>`;
          })
          .join("")} </div>
      </div>
      <p class="text-[#64748B]">${issue.description} </p>
      <div class="flex bg-[#F8FAFC]  rounded-s-lg">
        <div class="w-72 p-4">
                  <p class="text-[#64748B]">Assignee:</p>
                  <spen class="font-semibold text-[#1F2937]">${issue.assignee} </spen>
        </div>
        <div class="text-start space-y-1">
         <p class="text-[#64748B]">Priority:</p>
                  <h2 class="font-medium text-xs px-4 py-1 rounded-full ${priorityColors[issue.priority.toLowerCase()] || "bg-gray-200"}">${issue.priority.toUpperCase()}</h2> 
        </div>
      </div>
       </div>
  `;
  document.getElementById("cards_modal").showModal();
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
   <div onclick="loadIssueDetails(${issue.id})"  class="card-body bg-white shadow space-y-3 ${borderColor} rounded-xl h-full">
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
              <div class="divider"></div>
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



