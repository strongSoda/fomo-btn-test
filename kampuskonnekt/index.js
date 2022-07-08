const modalWrapper = `
<div class="ureka-modal fade" id="ureka-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <h5 class="modal-title w-100 eureka-title" id="exampleModalLongTitle">
                        Searching for nearest reviews ...
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body text-center">
                    <!-- Carousel wrapper -->
                    <div id="carouselMultiItemExample" class="carousel slide carousel-dark text-center" data-ride="carousel">

                        <!-- Inner -->
                        <div class="carousel-inner py-4" style="min-height: 100px">
                        </div>
                        <!-- Inner -->
                    </div>
                    <!-- Carousel wrapper -->
                </div>
                <div class="modal-footer" id="modal-footer">
                </div>
            </div>
        </div>
    </div>
`

// Advanced mode
{/* <div class="mr-auto" id="advanced-mode">
  <label class="switch" style="margin-right: 1em;">
    <input type="checkbox" id="advanced-mode-checkbox">
    <span class="slider round"></span>
  </label>
  <p class="my-2">Advanced Matching</p>
</div> */}

const SHEETY_API_URL = "#"
const CTA_URL = "https://kampuskonnekt49.com/offers/home/40-practical-study-guide.html"
const SOURCES = {"PH": "https://cdn-icons-png.flaticon.com/512/2111/2111581.png", "GOOGLE": "https://services.google.com/fh/files/misc/google_g_icon_download.png"}

const loadingBox = `<div class="cssload-box-loading"></div>`;
let is_advanced_mode = false;
// let is_advanced_mode = localStorage.getItem("is_advanced_mode");

// document.body.insertAdjacentHTML('beforeend', modalWrapper)
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const reviewsTriggerBtn = document.getElementById("reviews-tigger-btn");
    // reviewsTriggerBtn.insertAdjacentHTML('afterend', modalWrapper)
    document.body.insertAdjacentHTML('beforeend', modalWrapper)

    reviewsTriggerBtn.addEventListener('click', (e) => {
      fetchReviews()
    })
   

    // advanced_mode_checkbox.addEventListener('click', (e) => {
    //   is_advanced_mode = !is_advanced_mode
    //   console.log('changed ', is_advanced_mode);
    //   if(advanced_mode_checkbox.checked) {
    //     console.log('refetch');
    //     fetchReviews()
    //   }
    // })
    // const advanced_mode = document.getElementById("advanced-mode")
    // advanced_mode.addEventListener('click', (e) => {
    //   const advanced_mode_checkbox = document.getElementById('advanced-mode-checkbox')
    //   // console.log('clicked', advanced_mode_checkbox.attributes.checked);
    //   advanced_mode_checkbox.attributes.checked = !advanced_mode_checkbox.attributes.checked;
    //   is_advanced_mode = !is_advanced_mode;
    //   // console.log('changing mode', is_advanced_mode);
    //   localStorage.setItem("is_advanced_mode", is_advanced_mode);
    //   if(is_advanced_mode) {
    //     fetchReviews();
    //   }
    // })
});


function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString;

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild;
}


const carousel_controls = `<div class="d-flex justify-content-between mb-4 position-relative">
                                <a class="ureka-modal-control position-relative" href="#" role="button" data-slide="prev" data-target="#carouselMultiItemExample">
                                  <i class="fas fa-angle-left pe-2"></i>&nbsp;<span>Previous</span>
                                </a>
                                <a class="ureka-modal-control position-relative" href="#" role="button" data-slide="next" data-target="#carouselMultiItemExample">
                                  <span>Next</span>&nbsp;<i class="fas fa-angle-right pe-2" role="img" class="md hydrated"
                                        aria-label="chevron back outline"></i>
                                </a>
                            </div>`

                            
const ctaBtn = `<a id="ureka-cta" type="button" style="text-decoration:none;" class="btn btn-primary mx-auto" href="${CTA_URL}">Get Started</a>`

let MY_LOCATION = null

function distance(lat1, lat2, lon1, lon2) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 =  lon1 * Math.PI / 180;
  lon2 = lon2 * Math.PI / 180;
  lat1 = lat1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a = Math.pow(Math.sin(dlat / 2), 2)
            + Math.cos(lat1) * Math.cos(lat2)
            * Math.pow(Math.sin(dlon / 2),2);
          
  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;

  // calculate the result
  return(c * r);
}

const getLocationFromBrowser = async () => {
  console.log('here');
  if (navigator.geolocation) {
    console.log('in navigator.geolocation');

    navigator.permissions.query({name:'geolocation'}).then(function(result) {
      // Will return ['granted', 'prompt', 'denied']
      console.log(result.state);
      if(result.state !== "granted") {
        getLocationFromIP()
      }
    });
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      MY_LOCATION = position
    });
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
};

const getLocationFromIP = async () => {
  const res = await fetch(
    "https://api.ipstack.com/check?access_key=31d2eff2fab302c3d8c4cca4945c8faf&format=1"
  );
  const data = await res?.json();
  // console.log(data);
  MY_LOCATION = {coords: {latitude: data?.latitude, longitude: data?.longitude}}
  // else throw new Error(data?.error?.info);
};

function buidReviewsDom(reviews, active=true) {
  const carousel_item = document.createElement("div");
  carousel_item.classList.add("carousel-item");
  if(active) {
    carousel_item.classList.add("active");
  }
  const ureka_container = document.createElement("div");
  ureka_container.classList.add("ureka-container");
  const row = document.createElement("div");
  row.classList.add("row");

  ureka_container.appendChild(row)
  carousel_item.appendChild(ureka_container)

    reviews.forEach((r, idx) => {
    const col_lg_4 = document.createElement("div");
    const review_text = document.createElement("p");
    const review_author_h5 = document.createElement("h5");
    const review_city = document.createElement("p");
    const review_author_img = document.createElement("img");
    // const review_source_img = document.createElement("img");

    review_text.innerHTML = '<i class="fas fa-quote-left pe-2"></i>&nbsp;' + r.text + '&nbsp;<i class="fas fa-quote-right pe-2"></i>'
    review_author_h5.innerHTML = r.author;
    review_city.innerHTML = r.city;
    review_author_img.src = r.img;
    // review_source_img.src = SOURCES[r.source]

    col_lg_4.appendChild(review_author_img)
    // col_lg_4.appendChild(review_source_img)
    col_lg_4.appendChild(review_author_h5)
    col_lg_4.appendChild(review_city)
    col_lg_4.appendChild(review_text)

    col_lg_4.classList.add("review");
    col_lg_4.classList.add("col-lg-4");
    review_text.classList.add("review_text");
    review_city.classList.add("text-muted");
    review_author_h5.classList.add("review_author");
    review_author_h5.classList.add("mb-3");
    review_city.classList.add('review_city');
    // review_source_img.classList.add('review_source_img');
    review_author_img.classList.add('review_author_img')
    review_author_img.classList.add('rounded-circle', 'shadow-1-strong', 'mb-4')
    // review_source_img.classList.add('rounded-circle', 'shadow-1-strong', 'mb-4');
    
    review_author_img.style.width = "150px"
    // review_source_img.style.width = "25px"

    review_author_img.style.alt = "avatar"
    // review_source_img.style.alt = "source"


    if(idx!=0) {
      col_lg_4.classList.add('d-none')
      col_lg_4.classList.add('d-lg-block')
    }

    row.appendChild(col_lg_4);
  });

  return carousel_item
}

async function fetchReviews() {
  const reviewsContent = document.querySelector(".carousel-inner");
  const loadingText = document.querySelector(".eureka-title");
  const modal_footer = document.getElementById('modal-footer');
  reviewsContent.innerHTML = '';
  reviewsContent.innerHTML = loadingBox;
  const ureka_cta = document.getElementById('ureka-cta');
  if(!ureka_cta) {
    modal_footer.innerHTML = modal_footer.innerHTML +  ctaBtn;
  }


// advanced mode
// if(skip) {
//   const advanced_mode = document.getElementById('advanced-mode')
//   const advanced_mode_checkbox = document.getElementById('advanced-mode-checkbox')
//   console.log(advanced_mode_checkbox);
//   advanced_mode.addEventListener('change', async (e) => {
//     console.log('here');
//     if (e.target.checked) {
//       console.log("Checkbox is checked..");
//       is_advanced_mode=true
//         await getLocationFromBrowser()
//         fetchReviews(false)
//     } else {
//       console.log("Checkbox is not checked..");
//       await getLocationFromIP()
//     }
//   })
// }


  console.log(is_advanced_mode);
  if(is_advanced_mode) {
    console.log('from browser');
    await getLocationFromBrowser()
  } else {
    console.log('from ip');
    await getLocationFromIP()
  }

  setTimeout(() => {
    loadingText.innerHTML = 'Reviews from students'
    reviewsContent.innerHTML = ''
    const reviews = JSON.parse(JSON.stringify(REVIEWS));    
    let reviews_container
    if(MY_LOCATION) {
      reviews.forEach(review => {
        review['distance'] = distance(MY_LOCATION.coords.latitude, review?.lat, MY_LOCATION.coords.longitude, review?.lng)
      })
      
      // console.log('reviews with distance', reviews);
      const ascending_reviews = JSON.parse(JSON.stringify(reviews))
      ascending_reviews.sort((a,b) => a.distance - b.distance) // b - a for reverse sort
      // console.log('ascending', ascending_reviews); // b - a for reverse sort
      
      for (var i = 0; i < ascending_reviews.length; i += 3) {
        // console.log(ascending_reviews[i], ascending_reviews[i+1], ascending_reviews[i+2]);
        const first_review = ascending_reviews[i] ? ascending_reviews[i] : ascending_reviews[0]
        const second_review = ascending_reviews[i+1] ? ascending_reviews[i+1] : ascending_reviews[1]
        const three_review = ascending_reviews[i+2] ? ascending_reviews[i+2] : ascending_reviews[2]
        const three_reviews = [first_review, second_review, three_review]
        if(i===0) {
          reviewsContent.appendChild(buidReviewsDom(three_reviews, true))
        } else {
          reviewsContent.appendChild(buidReviewsDom(three_reviews, false))
        }
        // or console.log(array.slice(i, 3));
      }
    } else {
      const threeRandomReviews = REVIEWS.sort(() => .5 - Math.random()).slice(0,3)
      reviewsContent.appendChild(buidReviewsDom(threeRandomReviews))
    }

    // reviewsContent.innerHTML = ''
    // console.log(reviews_container);
    // reviewsContent.appendChild(reviews_container)
    reviewsContent.appendChild(createElementFromHTML(carousel_controls))
    // reviewsContent.insertAdjacentHTML('afterend', ctaBtn)


  try {
    document.addEventListener('click', (e) => {
      if(e.target.id === "ureka-cta") {
        // const event = new Event('ureka_cta_clicked');
        // document.dispatchEvent(event)
        // console.log('Ureka CTA Click', true, window.location.href, new Date().toDateString(), new Date().toLocaleTimeString(), 'UTC', new Date().toUTCString());
        // logUrekaCtaClick(true, window.location.href, new Date().toDateString(), new Date().toTimeString(), new Date().toUTCString())
        // console.log('Ureka CTA Click logged', true, window.location.href, new Date().toDateString(), new Date().toLocaleTimeString(), 'UTC', new Date().toUTCString());
        
        const modal = document.querySelector("#ureka-modal");
        const backdrop = document.querySelector(".modal-backdrop");
        modal.classList.toggle("show");
        backdrop.classList.toggle("show");
        document.body.classList.toggle('modal-open')
        setTimeout(() => {
          modal.style.display = "none";
          modal.ariaHidden = "true";
          backdrop.remove()
          window.location.href = CTA_URL;
        }, 500)
      }
    })
    } catch(e) {
       console.log(e);
      }
  }, 1500)

  // setTimeout(() => {
  //   if(!modal.classList.contains('show')) {
  //     modal.classList.toggle("show");
  //     modal.style.display = modal.style.display === "block" ? "none" : "block" ;
  //     // modal.classList.toggle("show");
  //     document.body.classList.toggle('modal-open')
  //     document.body.insertAdjacentHTML('beforeend', '<div class="modal-backdrop fade show"></div>')
  //   }
  // }, 300)

  // reviews_container.insertAdjacentHTML('beforebegin')
  // reviews_container.insertAdjacentHTML('beforebegin', closeBtn)
}


// window.addEventListener('DOMContentLoaded', (e) => {
// })
// const reviewsTriggerBtn = document.getElementById("reviews-tigger-btn");
// console.log(reviewsTriggerBtn);
// reviewsTriggerBtn.addEventListener("click", (e) => {
//   e.stopPropagation();
//   console.log('po');
//   fetchReviews();
// });

// fetchReviews();
