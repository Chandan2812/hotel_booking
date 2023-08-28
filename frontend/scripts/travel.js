window.addEventListener("load",()=>{
    getData();
})
 

function getData(){
    var logedInUserID = localStorage.getItem('logedInUserID')
    if (!logedInUserID) {
        alert(' Kindly Login First')
        window.location.assign("index.html")
        return
      }
    fetch(`https://hotel-ydop.onrender.com/booking/${logedInUserID}`,{
            headers:{
                "content-type":"applicaiton/json"
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            appendData(data)
            
        })
        .catch(err=>console.log(err))
}
const list=document.getElementById('list')

function appendData(data){
    
    if(data.length==0)
    {
        list.style.display = 'flex';
        list.style.justifyContent = 'center';
        list.style.alignItems = 'center';
        list.style.height = '100vh';
        list.innerHTML=`<img src="https://cdn.dribbble.com/users/1489103/screenshots/6326497/no-data-found.png">`
        
    }
    else{

    list.innerHTML=""
    data.forEach(element => {

        let div=document.createElement("div")

        let div1=document.createElement("div")
        let img=document.createElement("img")
        img.src=element.room.image

        let div2=document.createElement("div")
        let type=document.createElement("h2")
        type.textContent=element.room.type

        let description=document.createElement("h3")
        description.textContent=element.description

        let price=document.createElement("h3")
        price.textContent=`₹${element.totalPrice}`

        let checkin=document.createElement("h4")
        checkin.textContent=`Check in : ${element.startDate.split("T")[0]}`

        let checkout=document.createElement("h4")
        checkout.textContent=`Check Out : ${element.endDate.split("T")[0]}`

        let bookingDate=document.createElement("h4")
        bookingDate.textContent=`Booking Date : ${element.bookingDate.split("T")[0]}`

        let payment=document.createElement('h3')
        payment.textContent=`Payment:`
        let status=document.createElement('span')
        status.textContent=element.paymentStatus
        payment.append(status)
        if(status.textContent=='Pending')
        status.style.color="orange"
        if(status.textContent=='Paid')
        status.style.color='green'
        if(status.textContent=="Pending")
        {
            status.addEventListener("click",()=>{
                localStorage.setItem('bookingId',element._id)
                console.log(element._id)
                window.location.href="payment.html"
            })
        }

        if(element.status=="Cancel")
        {
            let btn2=document.createElement("button")
            btn2.innerText="Canceled"
            btn2.style.backgroundColor="rgb(251, 64, 12)"
            btn2.style.color="White"

            div1.append(img)
            div2.append(type,description,price,checkin,checkout,bookingDate,btn2)
            div.append(div1,div2)
            list.append(div)
        }
        else{
            let btn1=document.createElement("button")
            btn1.innerText=element.status+"ed"
            btn1.style.backgroundColor="Green"
            btn1.style.color="White"
            
            let btn2=document.createElement("button")
            btn2.innerText="Cancel"
            btn2.style.backgroundColor="red"
            btn2.style.color="White"

            btn2.addEventListener('click', function() {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You want to cancel the booking!",
                    icon: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'No',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Cancel it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const bookingId = element._id;
                        console.log(bookingId);
                        
                        fetch(`https://hotel-ydop.onrender.com/booking/${bookingId}/cancel`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ status: 'Cancel' })
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            Swal.fire(  
                                'Canceled!',
                                'Your booking has been canceled.',
                                'success'
                            )
                            setTimeout(() => {
                                location.reload();
                            }, 2000);
                           
                           
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    }
                })
            });
            
            

            div1.append(img)
            div2.append(type,description,price,checkin,checkout,bookingDate,payment,btn1,btn2)
            div.append(div1,div2)
            list.append(div)
        }
        
    });
}

}
