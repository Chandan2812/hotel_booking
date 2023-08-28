window.addEventListener("load",()=>{
    getData();
})
let loadingIndicator = document.getElementById("loading");



function getData(){
    loadingIndicator.style.display = 'block';
    fetch(`https://hotel-ydop.onrender.com/hotel`,{
            headers:{
                "content-type":"applicaiton/json"
            }
        })
        .then(res=>res.json())
        .then(data=>{
            loadingIndicator.style.display = 'none';
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
        div.addEventListener("click",()=>{
            const hotelId=element._id
            const hotelName=element.name
            // console.log(hotelId)
            localStorage.setItem('hotelName',hotelName)
            localStorage.setItem('hotelId',hotelId)
            window.location.assign("room.html")
        })

        let div1=document.createElement("div")
        let img=document.createElement("img")
        img.src=element.image

        let div2=document.createElement("div")
        let name=document.createElement("h3")
        name.textContent=element.name

        let location=document.createElement("p")
        location.textContent='🏦'+ element.location

        let city=document.createElement("h4")
        city.textContent=element.city

        let rating=document.createElement("h4")
        rating.textContent=`${element.rating}⭐`

        let content=document.createElement("p")
        content.textContent="🍴 Breakfast included ☕"
        content.style.color="green"

        let content2=document.createElement("p")
        content2.textContent="❎ FREE cancellation • No prepayment needed"
        content2.style.color="green"

        


        div1.append(img)
        div2.append(name,location,city,rating,content,content2,)
        div.append(div1,div2)
        list.append(div)
    });
}

}



    let city=document.getElementById("city")
    let search=document.getElementById("search")
    search.addEventListener("click",()=>{
        data=city.value;
        //console.log(data)
        city.value=""
         
        fetch(`https://hotel-ydop.onrender.com/hotel/search?q=${data}`,{
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