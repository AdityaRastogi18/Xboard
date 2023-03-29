// console.log(magazines);

let ID = () => Math.random().toString(36).substr(2, 9);
// console.log(ID())

let createAccordion = (title, id) => {
  return `
  <div class="accordion-item mb-4" id="card-${id}">
    <h2 class="accordion-header" id="heading-${id}">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${id}" aria-expanded="true" aria-controls="collapseOne">
        <div class="ms-5">${title}</div>
      </button>
    </h2>
    <div id="collapse-${id}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionID">
    </div>
  </div>
  `;
};

let createCarouselOuter = (id, innerId) => {

  return `
  <div id="carousel-${id}" class="carousel slide d-flex justify-content-center" data-bs-ride="carousel">
    <div class="card-carousel d-flex justify-content-center">  
      <div id="${innerId}" class="carousel-inner">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${id}" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carousel-${id}" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  `
}; 
// USE D-NONE PROPERTY TO HIDE THE BUTTON


let createCarouselInner = (id, active) => {
  return `
  <div class="carousel-item ${active ? "active" : ""}" id="${id}"></div>
  `
};

let createCard = (item) => {
  return `
  <div class="card d-block">
    <img src="${item["enclosure"]["link"]}" class="card-img-top" height="500rem" alt="...">
    <div class="card-body">
      <h5 class="card-title">${item["title"]}</h5>
      <p class="text-muted mb-2">${item["author"]}  •  ${item["pubDate"]}</p>
      <p class="card-text">${item["description"]}</p>
      <a href="${item["link"]}" class="stretched-link" target="_blank"></a>
    </div>
  </div>
  `
};

let addContent = async () => {
  
  for(let i = 0; i < magazines.length; i++) {

    // 1. Fetch data from RSS URL
    let url = "https://api.rss2json.com/v1/api.json?rss_url="+magazines[i];
    // console.log(url);
    let response = await fetch(url);
    let data = await response.json();
    console.log(data)

    // 2. Create Accordion
    let accordionId = ID();
    let accordion = createAccordion(data["feed"]["title"], accordionId);
    // console.log(accordion);
    // 2.1 Get main Accordion Div and append accordion to it.
    document.getElementById("accordionID").innerHTML += accordion;
    // 2.2 Open one carousel by default
    if(i === 0){
      document.getElementById(`collapse-${accordionId}`).classList.add("show")
    }

    // 3. Create Carousel Outer
    let carouselId = ID();
    let carouselInnerId = ID();
    let carousel = createCarouselOuter(carouselId, carouselInnerId);
    // console.log(carousel);
    // 3.1 Get Accordion Div and append Carousel to it.
   
    
    
    document.getElementById(`collapse-${accordionId}`).innerHTML = carousel;
    // console.log(document.getElementById(`carousel-${carouselId}`))
    // for(let k = 0; k < item.length; k++){
    //   if(k === 0){
    //     console.log("heelo")
    //     let nextButton = document.createElement("div");
    //     nextButton.innerHTML = `
    //     <button class="carousel-control-next" type="button" data-bs-target="#carousel-${carouselId}" data-bs-slide="next">
    //     <span class="carousel-control-next-icon" aria-hidden="true"></span>
    //     <span class="visually-hidden">Next</span>
    //     </button>`
    //     return nextButton;
    //   }
    //   document.getElementById(`carousel-${carouselId}`).innerHTML += nextButton;

          // else if(){

          // }
          // else if(){

          // }
    // }


    // 4. Create Card and append it inside the inner Carousel
    let item = data["items"];
    for(j in item){
      let card = createCard(item[j]);
      let innerCarouselCardId = ID();
      let innerCarouselCard = createCarouselInner(innerCarouselCardId, j == 0)
    
    // 4.1 Get Carousel Inner & Card then append the data
      document.getElementById(`${carouselInnerId}`).innerHTML += innerCarouselCard;
      document.getElementById(`${innerCarouselCardId}`).innerHTML += card;
    }
  };
};

addContent();
