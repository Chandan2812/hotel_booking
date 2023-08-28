document.addEventListener("DOMContentLoaded", function(event) {
    function move() {
        window.location.href = "index.html"
    }

    const payment = document.getElementById('payment');
    payment.addEventListener('click', (event) => {
        event.preventDefault();

        const bookingId = localStorage.getItem('bookingId');
        console.log(bookingId);
        fetch(`https://hotel-ydop.onrender.com/booking/${bookingId}/update-payment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ paymentStatus: 'Paid' })
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data.message);
            Swal.fire(
                'Payment Successful',
                'Booking Confirmed',
                'success'
            )
            setTimeout(() => {
                window.location.assign("index.html")
            }, 2000);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
