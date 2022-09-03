const getCategoryById = async (categoryId) =>{
    const url= `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const response =await fetch(url);
    const data = await response.json();
    setCategory(data.data);
}
const getNewsById = async (newsId) =>{
    const url= `https://openapi.programming-hero.com/api/news/${newsId}`
    const response =await fetch(url);
    const data = await response.json();
    setNews(data.data[0]);
}

const setCategory = data =>{
    // console.log('function category',data)
    const newsContainer = document.getElementById('news-container');
    data.forEach(news => {
        console.log(news);
        const eachCard = document.createElement('div');
        eachCard.classList.add("card", "mb-3", "container", "portal-card");
        eachCard.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${news.image_url}" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text " style="text-align:justify">${news.details}
                    </p>
                    <div class="d-flex flex-row justify-content-between">
                        <div class=" d-flex">
                            <img src="${news.author.img}" class="img-fluid image-author" alt="..." />
                            <p class="ms-2">${news.author.name}</p>
                        </div>
                        <div class="">
                            <i class="fa-solid fa-eye"></i>
                            ${news.total_view}
                        </div>
                        <div class="">
                            <i class="fa-solid fa-arrow-right"></i>
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
    console.log('function news',data)
}

// getCategoryById('01');
// const url = 5;\
// getNewsById('0282e0e58a5c404fbd15261f11c2ab6a');


const allCategories = id =>{
    getCategoryById(id)
}