document.getElementById("input-btn").addEventListener("click",function(){
    const nameInput=document.getElementById("input-name")
    const name=nameInput.value
    console.log(name)

    const passwordInput=document.getElementById("input-password")
    const password=passwordInput.value
    console.log(name,password)


    if(name=="admin" && password=="admin123"){
         alert("login successful")
         window.location.assign("/home.html")
    }else{
          alert("login Failed");
        return;
    }
})

