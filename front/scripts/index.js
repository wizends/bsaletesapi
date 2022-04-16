const sideBarButton = document.getElementById('sideBarButton')
const closeSideBarButton = document.getElementById('closeSideBarButton')
const sideBar = document.getElementById('sideBar')

closeSideBarButton.addEventListener("click", () => {
    sideBar.style = 'transform:translate(-250px)'
})

sideBarButton.addEventListener("click", () => {
    sideBar.style = 'transform:translate(1px)'
})

const URI = "http://localhost:3004"