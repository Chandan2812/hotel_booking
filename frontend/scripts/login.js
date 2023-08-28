const url = "https://hotel-ydop.onrender.com";

// login script is  start hare
let login = document.getElementById("login-form");

login.addEventListener("submit", (e) => {
  e.preventDefault();

  let lemail = document.getElementById("lemail").value;
  let lpass = document.getElementById("lpass").value;

  if (!lemail || !lpass) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "E-mail and Password can't be empty",
    });
    return;
  }
if(lemail=="admin@gmail.com"&&lpass=='admin'){
  window.location.href="admin.html"
  
}
else{


  let signdata = {
    email: lemail,
    password: lpass,
  };


  fetch(`${url}/user/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(signdata),
  })
    .then((res) => res.json())

    .then((res) => {
      console.log(res)

      if (res.status=='ok') {
        Swal.fire(

          'Login Successfull',
          '',
          'success'
        )
        localStorage.setItem("userName", res.user.username);
        localStorage.setItem("signedIn",true)
        localStorage.setItem("logedInUserID", res.user._id)
        localStorage.setItem("token",res.token)
        setTimeout(()=>{
          window.location.href = "./index.html";
         },2000)

      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.msg,
        });

      }

    })
    .catch((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops... Something Went Wrong",
        text: err.message,
      });

    });
  }
});