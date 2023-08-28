const loginBtn = document.getElementById('login_btn')

const userName = localStorage.getItem('userName') || null
const logedInUserID = localStorage.getItem('logedInUserID') || null

if (logedInUserID) {
   loginBtn.innerHTML = `<span style="color:white;"> ${userName}</span> / Logout`
} else {
   loginBtn.innerHTML == ''
   loginBtn.innerText == 'Login'
}



loginBtn.addEventListener("click",()=>{
   if (loginBtn.innerText == 'Login') {

      location.href = './login.html'
      
      } else {
      
      
      if (confirm('Do you want to logout?')) {
         localStorage.removeItem('userName')
         localStorage.removeItem('signedIn')
         localStorage.removeItem('logedInUserID')
         localStorage.removeItem('token')
      
         location.reload()
      }
      
      
      }
})


