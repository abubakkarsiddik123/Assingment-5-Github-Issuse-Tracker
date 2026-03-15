
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


let allIssues =[];

async function loadIssues() {
  const res= await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  const data=await res.json();
  console.log(data);
  allIssues=data.data;
  displayIssuse(allIssues)
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

function displayIssuse (issues){
  console.log(issues);
  const container=document.getElementById("card-container")
  container.innerHTML="";

  issues.forEach(issue => {
    console.log(issue);
    const div=document.createElement("div")
    div.innerHTML=`
   <div class="card-body bg-white shadow ">
            <div class="flex justify-between items-center ">
              <img src="./assets/Open-Status.png" alt="">
              <h2 class="font-medium text-xs">${issue.priority}</h2>
            </div>
            <div class="">
              <h2 class="text-sm font-semibold text-[#1F2937]">${issue.title} </h2>
              <p class="text-xs text-[#64748B]">The navigation menu doesn't collapse properly on mobile devices...</p>
              <div class="">
                <span class="font-medium">lab1</span>
                <span class="font-medium">lab2</span>
              </div>

              <div class="flex justify-between items-center">
                <div class="text-[#64748B]">
                  <p>arthor</p>
                  <p>assigne</p>
                </div>
                <div class="text-[#64748B]">
                  <p>createAt</p>
                  <p>updateAT</p>
                </div>
              </div>

            </div>

          </div>
    
    `;
    container.appendChild(div)
  });
}
loadIssues()
