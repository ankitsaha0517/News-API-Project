const API_KEY ='9404cb60552a4745b4db49cef0b961d8'
const  URL = "https://newsapi.org/v2/everything?"







document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.getElementById('nav-links');
    
    navLinks.addEventListener('click', (event) => {
        if(event.target.tagName==='A'){
            navLinks.querySelectorAll('a').forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');
        }

    });
    const searchBox = document.getElementById('search-box');
    searchBox.addEventListener('keyup', (event) => {
        navLinks.querySelectorAll('a').forEach(link => link.classList.remove('active'));
    });

  });
  
function convertToIndianDate(isoDateString) {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}
window.addEventListener('load', ()=>{
    fetchTopNews("West bengal")
});

const n= document.querySelectorAll('#nav-links')
    n.forEach(item=>{
        item.addEventListener('click',(e)=>{
            if(e.target.tagName==='A'){
                if(e.target.textContent==="Home") return  fetchTopNews("West bengal");
                if(e.target.textContent==="Eduction"){
                    let rant = ["school", "indian college", "university", "neet", "primary school", "secondary school", "higher education", "engineering college", "medical college", "IIT", "NIT", "IIM", "AIIMS", "UGC", "CBSE", "ICSE", "state board", "private school", "government school", "distance education", "online education", "vocational training", "entrance exam", "scholarship", "tuition", "science coaching center", "curriculum", "syllabus", "degree", "diploma", "PhD", "postgraduate", "undergraduate", "research", "internship", "fellowship", "student loans"];
                    let rantIndex = Math.floor(Math.random() * rant.length);
                    return fetchTopNews(rant[rantIndex])
                }
                fetchTopNews(e.target.textContent)
            }
        })
    })

async function fetchTopNews(quary){
    const loader = document.getElementById('loader');
    const newsLoder = document.getElementById('news-lodar');
    const newsContainer = document.getElementById('news-container')

    try {
        loader.style.display = 'block';
        newsLoder.style.display = 'none';
        const response = await fetch(`${URL}q=in india ${quary}&apiKey=${API_KEY}`)
        const data = await response.json()
        loader.style.display = 'none';
        newsLoder.style.display = 'block';
        console.log(data);
        if (!data.status==="ok") {
            throw new Error(`${data.message}`);
        }
        getNews(data.articles)
    } catch (error) {
        newsContainer.innerHTML = `
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="mt-[15vh] fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" blur-3xl  aria-hidden="true"></div>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                    </div>
                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">ERROR</h3>
                        <div class="mt-2">
                        <p class="text-sm text-gray-500">${error.toString().split("Error:")[1].trim()}</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>`
    }
}

function getNews(articles){
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''
    let clutter = " "
    articles.forEach(article => {
        if(!article.urlToImage) return;
        clutter +=`
                            <article  class="flex max-w-60 mb-10 flex-col items-start justify-between">
                            <a href="${article.url}" target="_blank">

                            <div class="h-80 bg-gray-500  w-full rounded-[20px] overflow-hidden">
                                <img class="w-full h-full object-cover " src="${article.urlToImage}" alt="${article.title}">
                            </div>
                            </a>
                            <div class="flex items-center gap-x-4 text-xs mt-4">
                                <time datetime="2020-03-16" class="text-gray-500">${convertToIndianDate(article.publishedAt)}</time>
                                
                                <a href="#" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 transition-all duration-400 ease-in-out hover:bg-blue-100 hover:text-blue-500">${article.author==null?"":article.author}</a>
                            </div>
                            <div class="group relative mt-2 ">
                                <h3 class="text-lg font-semibold line-clamp-2 leading-2 text-gray-900 group-hover:text-gray-600">
                                    <a href="${article.url} target="_blank">
                                        
                                        ${article.title}
                                    </a>
                                </h3>
                                <p class="mt-3 line-clamp-2 text-[2vh] leading-2 text-gray-600">${article.description}</p>
                            </div>
                        </article>`
    });
    newsContainer.innerHTML= clutter;
}