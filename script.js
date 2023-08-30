const API_KEY = "1c6ac86a45104cfc9574dedf9e910894"
const url = "https://newsapi.org/v2/everything?q="

function reload(){
    window.location.reload();
}

async function fetchData(query){
    const res = await fetch(`${url}${encodeURIComponent(query)}&apiKey=${API_KEY}`);
    const data = await res.json()
    return data;
}

fetchData("all").then(data => renderMain(data.articles));

let mobileMenu = document.querySelector(".mobile-nav");
let menuBtn = document.querySelector(".menu-btn");

menuBtn.addEventListener("click", ()=>{
    mobileMenu.classList.toggle("hidden");
})

// rendering news cards

function renderMain(arr){
    let mainHTML = '';
    arr.forEach(article => {
        if(!article.urlToImage)
        {
            return;
        }
        else{
            mainHTML += `<div class="card">
                        <a href=${article.url} target="_blank">
                            <img src=${article.urlToImage} alt="Unable to load image" lazy="loading">
                            <h4>${article.title}</h4>
                            <div class="source">
                                <p>${article.source.name}</p>
                                <p>${new Date(article.publishedAt).toLocaleString("en-US",{timeZone: "Asia/Jakarta"})}</p>
                            </div>
                            <div class="description">
                                ${article.description}
                            </div>
                        </a>
                    </div>`
        }
    });

    document.querySelector("main").innerHTML = mainHTML;
}

const searchBtn = document.getElementById("search-form");
const searchInp = document.getElementById("searchInput");
const searchBtnMob = document.getElementById("search-formMobile");
const searchInpMob = document.getElementById("searchInputMobile");

searchBtn.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = await fetchData(searchInp.value);
    renderMain(data.articles);
})

searchBtnMob.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = await fetchData(searchInpMob.value);
    renderMain(data.articles);
})

async function Search(query){
    const data = await fetchData(query);
    renderMain(data.articles);
}
