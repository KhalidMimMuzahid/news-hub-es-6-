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
    if(data.length===0){
        const spinnering= document.getElementById('spinnering');
        spinnering.classList.add('d-none');
        const warningBG = document.getElementById('warning-bg');
        warningBG.classList.remove('bg-secondary');
        warningBG.classList.add('bg-warning');
        const warningMessage = document.getElementById('warning-message');
        warningMessage.classList.remove('d-none');
        const warningMessageDisplay = document.getElementById('warning-message-display');
        warningMessageDisplay.innerText='No News Found';
        return data.length;
        
    }
    else{
        const newsCount= data.length;
        const warningBG = document.getElementById('warning-bg');
        warningBG.classList.remove('bg-warning');
        warningBG.classList.add('bg-secondary');
        const warningMessage = document.getElementById('warning-message');
        warningMessage.classList.remove('d-none');
        const warningMessageDisplay = document.getElementById('warning-message-display');
        warningMessageDisplay.innerText=`Total ${newsCount} News Found`;
    }
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent='';
    // if(!(isHome)){
    //     newsContainer.textContent='';
    // }
    // else{
    //     const warningMessage = document.getElementById('warning-message');
    //     warningMessage.classList.add('d-none');
    // }
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
        const spinnering= document.getElementById('spinnering');
        spinnering.classList.add('d-none');
        return data.length;
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

const allCategories = (id, isHome) =>{
    const spinnering= document.getElementById('spinnering');
    spinnering.classList.remove('d-none');
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent='';
    const warningMessage = document.getElementById('warning-message');
        warningMessage.classList.add('d-none');
    getCategoryById(id)
    console.log(isHome)
}


const setNav = data =>{
    const navBar = document.getElementById('categories');
    data.forEach(category =>{
        const categoryName = document.createElement('div');
        categoryName.classList.add('col','cetagory-name-color');
        categoryName.innerHTML=`
        <button class="nav-link btn btn-secondary text-white px-1 py-2" href="#" onclick="allCategories('${category.category_id}','${this}')">${category.category_name}</button>
        `;
        navBar.appendChild(categoryName)
    })
    
}

const defaultNews = ()=>{
    const url= 'https://openapi.programming-hero.com/api/news/categories';
    try {
        fetch(url)
        .then(response => response.json())
        .then(data => setNav(data.data.news_category))
    }
    catch(error){
        console.log('There have this error \n',error);
    }
    allCategories('01');
}
defaultNews();
// const catagories= document.getElementById('categories');
// const eachCetagory = catagories.querySelectorAll('.cetagory-name-color');
// console.log(eachCetagory)