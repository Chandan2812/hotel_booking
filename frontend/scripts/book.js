


const hotelName=localStorage.getItem("hotelName")
const hotelImage=localStorage.getItem("roomImage")

document.getElementById('hotelimg').src = hotelImage;
document.getElementById("name").innerText=hotelName


let modal = document.getElementById('bookingModal');
let btn = document.getElementById('booking');
let span = document.getElementsByClassName('close')[0];
let modalContent = document.querySelector('.modal-content');

btn.onclick = function() {
  modal.style.display = "block";
  modalContent.style.animation = "slideIn 0.5s forwards"; /* This applies the animation */
}

span.onclick = function() {
  modal.style.display = "none";
  modalContent.style.top = "-50%"; /* Reset the modal's position */
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modalContent.style.top = "-50%"; /* Reset the modal's position */
  }
}

const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Set the min attributes for both date input fields
startDateInput.setAttribute('min', today);
endDateInput.setAttribute('min', today);

startDateInput.addEventListener('change', function() {
    endDateInput.setAttribute('min', startDateInput.value);
  });
  



  const bookingbtn= document.getElementById("submitBooking")
  bookingbtn.addEventListener('click',()=>{

  
    const logedInUserID = localStorage.getItem('logedInUserID') || null
    if (!logedInUserID) {
      alert(' Kindly Login First')
      return
    }
    const roomId = localStorage.getItem('roomId') || null
    const startDate=document.getElementById("startDate").value
    const endDate=document.getElementById("endDate").value
    // console.log(roomId,startDate,endDate)
    
    const payload={
      roomId,
      startDate,
      endDate
    }
  
    fetch(`https://hotel-ydop.onrender.com/booking/${logedInUserID}`,{
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(payload)
      })
      .then(res =>res.json())
      .then(data=>{
        console.log(data)
        localStorage.setItem('bookingId',data.booking._id)
        if(data.message!='This room is already booked for the selected dates.'){
          Swal.fire({
            title: 'Do you want to pay?',
            showCancelButton: true,
            cancelButtonText: 'Pay later',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Pay now'
          }).then((result) => {
            if (result.isConfirmed) {
             window.location.assign('payment.html')
            }
            else{
              Swal.fire(
                'Booking Confirmed',
                'Payment must be made within 24 hours, or the booking will be cancelled.',
                'success'
              )
            }
          })
       
        }
        else{
          Swal.fire(
            'This room is already booked for the selected dates.',
            '',
            'error',
          )
        }
      })

    
  
  })