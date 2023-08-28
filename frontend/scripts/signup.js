const url = "https://hotel-ydop.onrender.com";

let signbtn = document.getElementById("btn");
signbtn.addEventListener("click", (e) => {
  e.preventDefault();
  let fname = document.getElementById("fname").value;
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;
  

  if(!fname || !pass || !email){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Fill All the Required Details",
    });
    return;
  }


  let signdata = {
    username: fname,
    email: email,
    password: pass,
  };

  fetch(`${url}/user/signup`, {
    method: "POST",
    body: JSON.stringify(signdata),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      if (res.status) {
        Swal.fire(
            'Registration Successfull',
            '',
            'success'
          )
          setTimeout(()=>{
            window.location.href = "./login.html";
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
        title: "Oops...",
        text: err.message,
      });
 
    });
});

