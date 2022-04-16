const sideBarButton = document.getElementById('sideBarButton')
const closeSideBarButton = document.getElementById('closeSideBarButton')
const sideBar = document.getElementById('sideBar')
const sideBarItems = document.getElementById('sideBarItems')
const productsContainer = document.getElementById('productsContainer')

closeSideBarButton.addEventListener("click", () => {
    sideBar.style = 'transform:translate(-250px)'
})

sideBarButton.addEventListener("click", () => {
    
    sideBar.style = 'transform:translate(1px)'
})

const URI = "http://localhost:3004";

fetch(`${URI}/products`)
.then(res => res.json())
.catch(err => console.log(errrs))
.then(data => {
    console.log(data)
    data.map(x => {
        productsContainer.innerHTML += `
        <div class="card">
            <img class="card-img-top" src="${x.url_image}" alt="Card image cap">
            <div class="card-body"><h5 class="card-title">
            ${x.name}
        </h5> </div>
            
            <div class="card-footer">
            <span>${x.price}</span>
            </div>
        </div>`
    })
})

fetch(`${URI}/categories`)
.then(res => res.json())
.catch(err => console.log(errrs))
.then(data => {
    data.map(x => {
        
        sideBarItems.innerHTML += `<a class="list-group-item item">${x.name}</a>`
    })
    
})

