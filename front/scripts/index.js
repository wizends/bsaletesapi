const sideBarButton = document.getElementById('sideBarButton')
const closeSideBarButton = document.getElementById('closeSideBarButton')
const sideBar = document.getElementById('sideBar')
const sideBarItems = document.getElementById('sideBarItems')
const productsContainer = document.getElementById('productsContainer')
const searchInput = document.getElementById('searchInput')
const searchResult = document.getElementById('searchResult')
const showAll = document.getElementById('showAll')


closeSideBarButton.addEventListener("click", async () => {
    sideBar.style = 'transform:translate(-350px)'
})

sideBarButton.addEventListener("click", async () => {
    
    sideBar.style = 'transform:translate(1px)'
})
productsContainer.addEventListener("click", async () => {
    
    sideBar.style = 'transform:translate(-350px)'
})


const URI = "http://localhost:3004";

showAll.addEventListener("click", async (e) => {
    console.log(showAll)
    productsContainer.innerHTML = ""
    searchResult.innerHTML = ""
    await fetch(`${URI}/products`)
    .then(res => res.json())
    .catch(err => console.log(err))
    .then(data => {
        console.log(data)
        data.map(x => {
            if(x.url_image == null || x.url_image == ''){
                x.url_image = "../../nodisp.png"
            }
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
})

searchInput.addEventListener("submit", async (e) => {
    e.preventDefault()
    const search = document.getElementById('tosearch').value
    fetch(`${URI}/products/${search}`)
    .then(res => res.json())
    .then(data => {
        productsContainer.innerHTML = ""
        searchResult.innerHTML = ""
        if(data.length == 0){
            fetch('https://api.thecatapi.com/v1/images/search')
            .then(res => res.json())
            .then(data => {
                console.log(data[0])
                searchResult.innerHTML = `
                <h3>No hay resultados para la busqueda: ${search}</h3>
                <div class="containerImg" ><img src="${data[0].url}" width="${data[0].width}" height="${data[0].height}" /></div>
                `
            })
            
            
        }else{
            data.map(x => {
                if(x.url_image == null || x.url_image == ''){
                    x.url_image = "../../nodisp.png"
                }
            
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
        }

    })
})


fetch(`${URI}/products`)
.then(res => res.json())
.catch(err => console.log(err))
.then(data => {
    data.map(x => {
        if(x.url_image == null || x.url_image == ''){
            x.url_image = "../../nodisp.png"
        }
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
        searchResult.innerHTML = ""
        data.map(x => {
            if(x.url_image == null || x.url_image == ''){
                x.url_image = "../../nodisp.png"
            }
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

