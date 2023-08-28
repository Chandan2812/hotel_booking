window.addEventListener("load",()=>{
    getData();
})
const hotelId=localStorage.getItem("hotelId")

function getData(){
    fetch(`https://hotel-ydop.onrender.com/room/${hotelId}`,{
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
        img.src=element.image

        let div2=document.createElement("div")
        let type=document.createElement("h2")
        type.textContent=element.type

        let description=document.createElement("h3")
        description.textContent=element.description

        let price=document.createElement("h3")
        price.textContent=`₹${element.pricePerNight}`

        let facility=document.createElement('h3')
        facility.textContent='Facility:'

        let telphone=document.createElement("h4")
        telphone.textContent=`☎️ Telephone`

        let room=document.createElement("h4")
        room.textContent=`🏠 Room size: 31 m²/334 ft²`
        let balcony =document.createElement("h4")
        balcony.textContent=`🌆 Balcony/Terrace`
        let shower=document.createElement("h4")
        shower.textContent='🚿 Shower'

        let detail=document.createElement("p")
        detail.textContent="Details...."
        detail.addEventListener("click",()=>{
            const roomId=element._id
            const roomImage=element.image
            // console.log(element.image)
            localStorage.setItem("roomImage",roomImage)
            localStorage.setItem('roomId',roomId)
            window.location.assign("book.html")
        })

        div1.append(img)
        div2.append(type,description,price,facility,telphone,room,balcony,shower,detail)
        div.append(div1,div2)
        list.append(div)
    });
}

}

let fil = document.getElementById("fil");

fil.addEventListener('click', () => {

    let checkboxes = document.querySelectorAll('.star');
    
    let typeValues = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            typeValues.push(checkbox.value);
        }
    });
    
    if (typeValues.length) { 
        let queryParam = typeValues.join(',');
        console.log(queryParam)
        
        fetch(`https://hotel-ydop.onrender.com/room/${hotelId}/type?q=${queryParam}`, {
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            appendData(res); 
        })
        .catch(err => console.log(err));
    }
});


let select=document.querySelector("select")
select.addEventListener("change",()=>{
   let data=select.value
   console.log(data)

   fetch(`https://hotel-ydop.onrender.com/room/${hotelId}/sort?q=${data}`,{
    headers:{
        "content-type":"application/json"
    }
    })
    .then(res=>res.json())
    .then(res=>{
        console.log(res)
        appendData(res)
    })
    .catch(err=>console.log(err))
})