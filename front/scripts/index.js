const sideBarButton = document.getElementById('sideBarButton')
const closeSideBarButton = document.getElementById('closeSideBarButton')
const sideBar = document.getElementById('sideBar')
const sideBarItems = document.getElementById('sideBarItems')
const productsContainer = document.getElementById('productsContainer')
const searchInput = document.getElementById('searchInput')

closeSideBarButton.addEventListener("click", () => {
    sideBar.style = 'transform:translate(-350px)'
})

sideBarButton.addEventListener("click", () => {
    
    sideBar.style = 'transform:translate(1px)'
})
productsContainer.addEventListener("click", () => {
    
    sideBar.style = 'transform:translate(-350px)'
})


const URI = "http://localhost:3004";

searchInput.addEventListener("submit", async (e) => {
    e.preventDefault()
    const search = document.getElementById('tosearch').value
    fetch(`${URI}/products/${search}`)
    .then(res => res.json())
    .then(data => console.log(data))
})


fetch(`${URI}/products`)
.then(res => res.json())
.catch(err => console.log(err))
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
});

fetch(`${URI}/categories`)
.then(res => res.json())
.catch(err => console.log(errrs))
.then(data => {
    data.map(x => {
        sideBarItems.innerHTML += `<a id="${x.id}" onClick="handleClick(${x.id})"class="list-group-item item">${x.name}</a>`
    })
});

const handleClick = async (id) => {
    fetch(`${URI}/categories/${id}`)
    .then(res => res.json())
    .then(data => {
        productsContainer.innerHTML = ""
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
}

