const modalWrapper = `
<div class="fomo-wall-container" id="">
        <div class="fomo-wall-wrapper" role="">
            <div class="fomo-wall-content">
                <div class="fomo-wall-header text-center">
                    <h5 class="fomo-wall-title" id="">
                        Searching for nearest reviews ...
                    </h5>
                </div>
                <div class="text-center fomo-wall-body">
                    <!-- Carousel wrapper -->
                    <div id="carouselMultiItemExample" class="carousel slide carousel-dark text-center" data-ride="carousel">
                        <!-- Inner -->
                        <div class="carousel-inner py-4" style="min-height: 100px">
                        </div>
                        <!-- Inner -->
                    </div>
                    <!-- Carousel wrapper -->
                </div>
                <div class="fomo-wall-footer" id="fomo-wall-footer">
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

const CTA_URL = "https://ureka-plugin.carrd.co/#pricing";
const SOURCES = {"PH": "https://cdn-icons-png.flaticon.com/512/2111/2111581.png", "GOOGLE": "https://services.google.com/fh/files/misc/google_g_icon_download.png"}

const loadingBox = `<div class="cssload-box-loading"></div>`;
let is_advanced_mode = false;
// let is_advanced_mode = localStorage.getItem("is_advanced_mode");

// document.body.insertAdjacentHTML('beforeend', modalWrapper)
window.addEventListener('DOMContentLoaded', (event) => {
  const fomoWall = document.getElementById("fomo-wall");
  fomoWall.innerHTML = modalWrapper
  fetchReviews()
    // fomoWall.addEventListener('click', (e) => {
    // })
   

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

const ctaBtn = `<a id="ureka-cta" type="button" style="text-decoration:none;" class="btn btn-primary mx-auto" href="${CTA_URL}">Book a Call</a>`

const carousel_controls = `<div class="d-flex justify-content-between mb-4 position-relative">
                                <a class="fomo-wall-container-control position-relative" href="#" onclick="return false;" role="button" data-slide="prev" data-target="#carouselMultiItemExample">
                                  <i class="fas fa-angle-left pe-2"></i>&nbsp;<span>Previous</span>
                                </a>
                                <a class="fomo-wall-container-control position-relative" href="#" onclick="return false;" role="button" data-slide="next" data-target="#carouselMultiItemExample">
                                  <span>Next</span>&nbsp;<i class="fas fa-angle-right pe-2" role="img" class="md hydrated"
                                        aria-label="chevron back outline"></i>
                                </a>
                            </div>`

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
  if (navigator.geolocation) {

    navigator.permissions.query({name:'geolocation'}).then(function(result) {
      // Will return ['granted', 'prompt', 'denied']
      if(result.state !== "granted") {
        getLocationFromIP()
      }
    });
    navigator.geolocation.getCurrentPosition((position) => {
      MY_LOCATION = position
    });
  } else { 
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
    const review_source_img = document.createElement("img");
    review_author_img.src = r.img;
    review_source_img.src = SOURCES[r.source]

    review_text.innerHTML = '<i class="fas fa-quote-left pe-2"></i>&nbsp;' + r.text + '&nbsp;<i class="fas fa-quote-right pe-2"></i>'
    review_author_h5.innerHTML = r.author;
    review_city.innerHTML = r.city;

    col_lg_4.appendChild(review_author_img)
    col_lg_4.appendChild(review_source_img)
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
    review_source_img.classList.add('review_source_img');
    review_author_img.classList.add('review_author_img')
    review_author_img.classList.add('rounded-circle', 'shadow-1-strong', 'mb-4')
    review_source_img.classList.add('rounded-circle', 'shadow-1-strong', 'mb-4');

    review_author_img.style.width = "150px"
    review_source_img.style.width = "25px"

    review_author_img.style.alt = "avatar"
    review_source_img.style.alt = "source"

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
  const loadingText = document.querySelector(".fomo-wall-title");
  const fomoWallFooter = document.getElementById('fomo-wall-footer');
  reviewsContent.innerHTML = '';
  reviewsContent.innerHTML = loadingBox;
  const ureka_cta = document.getElementById('ureka-cta');
  if(!ureka_cta) {
    fomoWallFooter.innerHTML = fomoWallFooter.innerHTML +  ctaBtn;
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


  if(is_advanced_mode) {
    await getLocationFromBrowser()
  } else {
    await getLocationFromIP()
  }

  setTimeout(() => {
    loadingText.innerHTML = 'Reviews from your neighbors'
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
        const three_reviews = [ascending_reviews[i], ascending_reviews[i+1], ascending_reviews[i+2]]
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
// const fomoWall = document.getElementById("reviews-tigger-btn");
// console.log(fomoWall);
// fomoWall.addEventListener("click", (e) => {
//   e.stopPropagation();
//   console.log('po');
//   fetchReviews();
// });

// fetchReviews();
