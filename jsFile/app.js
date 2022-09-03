const getCategoryById = async (categoryId, isHome=false) =>{
    const url= `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    try {
        const response =await fetch(url);
        const data = await response.json();
        setCategory(data.data , isHome);
    }
    catch(error){
        console.log('There have this error \n',error);
    }
}
const getNewsById = async (newsId) =>{
    const url= `https://openapi.programming-hero.com/api/news/${newsId}`
    try{
        const response =await fetch(url);
        const data = await response.json();
        setNews(data.data[0]);
    }
    catch(error){
        console.log('There have this error \n',error)
    }
}

const setCategory = (data, isHome=false) =>{
    // console.log('function category',data)
    const newsContainer = document.getElementById('news-container');
    if(!(isHome)){
        newsContainer.textContent='';
    }
    data.forEach(news => {
        // console.log(news._id);
        const xxx =()=>{
            return news.details.length>= 520? '...':'';
        }
        const eachCard = document.createElement('div');
        eachCard.classList.add("card", "mb-3", "container", "portal-card");
        eachCard.innerHTML = `
        <div class="row g-0">
            <div class="col-md-2">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-10">
                <div class="card-body d-flex flex-column justify-content-between " style="height:100%">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text" style="text-align:justify">${news.details.slice(0,520) +  xxx()}
                    </p>
                    <div class="d-flex flex-row justify-content-between">
                        <div class=" d-flex">
                            <img src="${news.author.img}" class="img-fluid image-author" alt="..." />
                            <p class="ms-2">${news.author.name === null? 'no data found for author name' : news.author.name}</p>
                        </div>
                        <div class="">
                            <i class="fa-solid fa-eye"></i>
                            ${(news.total_view) === null? 'no Data Found for views' : news.total_view }
                        </div>
                        <div class="">
                            <button type="button" class="btn btn-light modal-details" onclick="displayModal('${news._id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(eachCard);
    });

}
const setNews = data =>{
    // console.log('function news',data)
    const titleImage= document.getElementById('img-title');
    titleImage.setAttribute('src',`${data.image_url}`)
    const title = document.getElementById('staticBackdropLabel');
    title.innerText=`${data.title}`;
    const authorPhoto = document.getElementById('author-photo');
    authorPhoto.setAttribute('src',`${data.author.img}`);
    const authorName = document.getElementById('author-name');
    authorName.innerText=`${data.author.name === null? 'no data found for author name' : data.author.name}`;
    const publishDate= document.getElementById('publish-date');
    publishDate.innerText = `${data.author.published_date === null? 'no data found for Date' : data.author.published_date}`
    const totalView = document.getElementById('total-view')
    totalView.innerText = `${(data.total_view) === null? 'no Data Found for views' : data.total_view }`
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerText = `${data.details}`
    
}

// getCategoryById('01');
// const url = 5;\
// getNewsById('0282e0e58a5c404fbd15261f11c2ab6a');

const displayModal= id =>{
    getNewsById(id);
}

const allCategories = (id, isHome= false) =>{
    getCategoryById(id, isHome)
}


const home= ()=>{
    for(let i = 1; i<=8 ; i++){
        // console.log(`0${i}`)
        const isHome= true;
        allCategories(`0${i}`, isHome);
    }
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent='';
}
home();