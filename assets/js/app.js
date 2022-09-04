// Load all News Header menu data 
const loadAllNewHeader = async () => {
   const url = `https://openapi.programming-hero.com/api/news/categories`;
   try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
   } catch (error) {
      alert(error);
   }
};
// Show All News feed Menu bar
// const uniqueArray = [];
const showAllNewHeader = async () => {
   const allData = await loadAllNewHeader();
   const menuUl = document.getElementById('navbar-id');
   const newAllData = allData.data.news_category;
   // console.log(allData.data.news_category);
   const uniqueArray = [];
   for (const news of newAllData) {
      // console.log(news);
      if (uniqueArray.indexOf(news) == -1) {
         uniqueArray.push(news);
         const li = document.createElement('li');
         li.classList.add("nav-item", "me-3", "menu-li");
         li.innerHTML = `
         <a class="nav-link" href="#" onclick= showAllNewDetails(${news.category_id})>${news.category_name}</a>
         `;
         menuUl.appendChild(li);
      }

   }

};

const showAllNewDetails = async (link) => {
   toggleLoading(true)
   let linkString = "0" + link;
   // console.log(linkString);
   const url = `https://openapi.programming-hero.com/api/news/category/${linkString}`;
   try {
      // fetch(url)
      //    .then(res => res.json())
      //    .then(data => displayAllNews(data.data))
      const res = await fetch(url);
      const data = await res.json();
      return displayAllNews(data.data);
   } catch (error) {
      alert(error);
   }


};

const displayAllNews = async (data) => {
   const newsBody = document.getElementById("news-body");
   newsBody.textContent = '';
   let getLengthCategory = data.length == [] ? 0 : data.length;
   // console.log(getLengthCategory);
   let getCategoryId = data.length == 0 ? 0 : data[0].category_id;

   // console.log(data);
   // All Data sort and top view data show now 
   const newData = [...data].sort((a, b) => b.total_view - a.total_view);
   // console.log(newData);

   if (getCategoryId == 1 && getLengthCategory == 26) {
      lengthAndCategoryShow(getLengthCategory, 'All News');

   } else if (getCategoryId == 2) {
      lengthAndCategoryShow(getLengthCategory, 'Regular News')
   } else if (getCategoryId == 3) {
      lengthAndCategoryShow(getLengthCategory, 'International News')
   } else if (getCategoryId == 4) {
      lengthAndCategoryShow(getLengthCategory, 'Sports')
   } else if (getCategoryId == 5) {
      lengthAndCategoryShow(getLengthCategory, 'Entertainment')
   } else if (getCategoryId == 0) {
      lengthAndCategoryShow(getLengthCategory, 'Culture')
   } else if (getCategoryId == 7) {
      lengthAndCategoryShow(getLengthCategory, 'Arts')
   } else if (getCategoryId == 1) {
      lengthAndCategoryShow(getLengthCategory, 'breaking News')
   }


   setTimeout(() => {
      newData.forEach(allNews => {
         console.log(allNews);
         const createDiv = document.createElement("div");
         createDiv.classList.add("row", "g-0", "mb-4", "shadow", "p-2");
         createDiv.innerHTML = `
            <div class="col-md-3">
               
                  <img src="${allNews.thumbnail_url ? allNews.image_url : 'NO IMAGE FOUND'}" class="img-fluid rounded-start img-height" alt="news image">
               </div>
               <div class="col-md-9">
                  <div class="card-body mt-3">
                     <h5 class="card-title">${allNews.title}</h5>
                     <p class="card-text mt-4">${allNews.details.length > 20 ? allNews.details.slice(0,250) + ' ...' : allNews.details}</p>
                     
                     
                     <div class="row mt-5 mt-sm-3">
                           <div class="col-md-5 p-md-0 col-sm-5 col-9 d-flex flex-row justify-content-between align-content-center" id="author-img">
                              <div class="col-md-4 col-sm-4 col-4">
                                 <img class="w-75 h-75 rounded-circle author-img" src="${allNews.author.img}" alt="">
                              </div>
                              <div class="col-md-8 col-sm-9 col-8 p-0 author-name">
                                 <h6>${allNews.author.name == null || allNews.author.name == '' ? 'NOT FOUND NAME' : allNews.author.name }</h6>
                                 <p class="text-dark"><small>${allNews.author.published_date == null ? 'NO Found Date' : allNews.author.published_date}</small></p>
                              </div>
                           </div>
                           <div class="col-md-2 col-sm-3 p-md-0 col-3 d-flex flex-column justify-content-center align-content-center flex-wrap">
                              <p class="text-warning"><i class="fa-regular fa-eye"></i>
                                 <span>${allNews.rating.number} M</span>
                              </p>
                           </div>
                           <div class="col-md-2 col-sm-4 col-12 p-md-0 d-flex flex-column justify-content-center align-content-center flex-wrap">
                              <p class="text-warning">
                                 <i class="fa-solid fa-star-half-stroke"></i>
                                 <i class="fa-regular fa-star"></i>
                                 <i class="fa-regular fa-star"></i>
                                 <i class="fa-regular fa-star"></i>
                                 <i class="fa-regular fa-star"></i>
                              </p>
                           </div>
                           <div class="col-md-3 col-sm-12 col-12 d-flex flex-column justify-content-center align-content-center  flex-wrap">
                              <button onclick= showSingleNews('${allNews._id}') class="btn btn-info font-weight-bold" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
                           </div>
                        </div>
                     
                  </div>
            </div>
         
      `;
         newsBody.appendChild(createDiv);
      });
   }, 500)
   // STOP LOADING
   toggleLoading(false)
};

// Single News Details With Model 
const showSingleNews = (singleData) => {
   const url = `https://openapi.programming-hero.com/api/news/${singleData}`;
   fetch(url)
      .then(res => res.json())
      .then(data => singleNewsDetails(data.data[0]))
};

const singleNewsDetails = (data) => {
   console.log(data);
   const modelId = document.getElementById('modal-body-id');
   modelId.innerHTML = '';
   const createDiv = document.createElement('div');
   createDiv.classList.add('modal-content');
   createDiv.innerHTML = `
      
         <div class="modal-header">
         <h4 class="font-weight-bold ">Title: <span class="ms-2">${data.title}</span></h4> 
             
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
         <div class="card">
         <div class="card-body">
         <img src="${data.thumbnail_url}" class="card-img-bottom model-img" alt="new detail image">
           
           <p class="card-text mt-4">Details: ${data.details}</p>
           <p class="card-text mt-3 text-warning" >Total View: ${data.total_view == '' || data.total_view == null ?'NO DATA FOUND':  data.total_view }</p>
           

           <div class="row mt-5">
                        <div class="col-md-5 col-sm-5 col-9 d-flex flex-row justify-content-between align-content-center id="author-img"">
                           <div class="col-md-4 col-sm-4 col-4"">
                              <img class="w-75 h-75 rounded-circle" src="${data.author.img}" alt="">
                           </div>
                           <div class="col-md-8 col-sm-9 col-8 p-0 author-name">
                              <h6>${data.author.name == '' || data.author.name == null ? 'NO DATA FOUND' : data.author.name}</h6>
                              <p class="text-dark"><small>${data.author.published_date == null ? 'NO Found Date' : data.author.published_date}</small></p>
                           </div>
                        </div>
                        <div class="col-md-3 col-sm-3 col-3 d-flex p-0 flex-column justify-content-center align-content-center flex-wrap">
                           <p class="text-warning"><i class="fa-regular fa-eye"></i>
                              <span>${data.rating.number} M</span>
                           </p>
                        </div>
                        <div class="col-md-4 col-sm-4 col-12 d-flex flex-column justify-content-center align-content-center flex-wrap">
                           <p class="text-warning">
                              <i class="fa-solid fa-star-half-stroke"></i>
                              <i class="fa-regular fa-star"></i>
                              <i class="fa-regular fa-star"></i>
                              <i class="fa-regular fa-star"></i>
                              <i class="fa-regular fa-star"></i>
                           </p>
                        </div>
                        
                     </div>
         </div>
         
       </div>
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
         </div>
      
   `;
   modelId.appendChild(createDiv);
};

// displayAllNews();
// spinner add 
const toggleLoading = (isLoading) => {
   const spinnerId = document.getElementById('loader');
   if (isLoading) {
      spinnerId.classList.remove('d-none');
   } else {
      spinnerId.classList.add('d-none')

   }
};
// Length show in top header
const lengthAndCategoryShow = (length = 0, category) => {
   const itemsLength = document.getElementById('items-length');
   itemsLength.innerHTML = '';
   const createDiv = document.createElement('div');
   createDiv.classList.add("bg-white", "pt-4", "ps-md-4", "pb-2", "rounded-pill", "show-length", "ps-lg-4", "ps-3", "text-sm-center");
   createDiv.innerHTML = `
      <p class="fw-bold fs-6 font-sz"> ${length} items found for category ${category}</p>
   `;
   itemsLength.appendChild(createDiv);
}

showAllNewHeader()