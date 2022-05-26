const reviewsWrapper = document.getElementById("reviews");

const modalWrapper = `
<div class="modal" id="modal">
  <div class="modal-content">
    <span class="close-button">&times;</span>
    <h3 class="eureka-title">Searching for nearest reviews ...</h3>
    <div id="reviews-content">
      <div class="cssload-box-loading">
      </div>
    </div>
  </div>
</div>`

// const title = '<h3 class="eureka-title">Read reviews from your friends</h3>'
// const closeBtn = '<span class="close">&times;</span>'
const ctaBtn = '<a id="cta" href="https://lunchbreak4kids.com/meal-plans/">Get Started</a>'

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
  // console.log('here');
  if (navigator.geolocation) {
    // console.log('in navigator.geolocation');
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position.coords.latitude, position.coords.longitude);
      MY_LOCATION = position
    });
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
};

// const getLocationFromIP = async () => {
//   const res = await fetch(
//     "http://api.ipstack.com/check?access_key=31d2eff2fab302c3d8c4cca4945c8faf&format=1"
//   );
//   const data = await res?.json();
//   // console.log(data);

//   if (data.success) return data;
//   else throw new Error(data?.error?.info);
// };

// TODO
function getThreeClosestReviewsByZip(zip) {
  const closest_three_reviews_by_zip = [];
  return closest_three_reviews_by_zip;
}
// TODO
function showReviews(closest_reviews) {}
// TODO
function showDefaultFallbackReviews(closest_reviews) {}

function buidReviewsDom(reviews) {
  // if (reviewsWrapper.hasChildNodes()) return;
  const reviews_container = document.createElement("div");
  reviews_container.classList.add("reviews_container");

    reviews.forEach((r) => {
    const review = document.createElement("div");
    const review_text = document.createElement("blockquote");
    const review_text_h3 = document.createElement("h3");
    const review_author = document.createElement("p");
    const review_city = document.createElement("p");
    const review_bottom = document.createElement("div");
    // const review_author_img = document.createElement("img");
    // const review_arrow = document.createElement("div");

    review_text_h3.innerHTML = r.text;
    review_text.appendChild(review_text_h3)
    review.appendChild(review_text);
    // review_text.appendChild(review_arrow);
    // review_author_img.src = r.img;
    // review.appendChild(review_author_img);
    review_author.innerHTML = r.author;
    review_bottom.appendChild(review_author)
    review_city.innerHTML = r.city;
    review_bottom.appendChild(review_city)

    review.appendChild(review_bottom)

    review.classList.add("review");
    // review_author_img.classList.add("review_author_img");
    review_text.classList.add("review_text");
    review_author.classList.add("review_author");
    review_city.classList.add('review_city');
    review_bottom.classList.add('review_bottom');
    // review_arrow.classList.add("review_arrow");

    reviews_container.appendChild(review);
  });

  return reviews_container
}

async function fetchReviews() {  
  reviewsWrapper.innerHTML = modalWrapper;
  const modal = document.getElementById("modal");
  const closeButton = document.querySelector(".close-button");
  const reviewsContent = document.getElementById("reviews-content");
  const loadingText = document.querySelector(".eureka-title");

  closeButton.addEventListener("click", () => {
      modal.classList.toggle("show-modal");
  });

  await getLocationFromBrowser()

  setTimeout(() => {
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
      reviews_container = buidReviewsDom(ascending_reviews.slice(0,3))
    } else {
      const threeRandomReviews = REVIEWS.sort(() => .5 - Math.random()).slice(0,3)
      reviews_container = buidReviewsDom(threeRandomReviews)
    }

    reviewsContent.innerHTML = ''
    reviewsContent.appendChild(reviews_container)
    loadingText.innerHTML = 'Reviews from your neighbors'
    reviewsContent.insertAdjacentHTML('afterend', ctaBtn)
  }, 3000)
  setTimeout(() => {
    modal.classList.toggle("show-modal");
  }, 100)

  // reviews_container.insertAdjacentHTML('beforebegin')
  // reviews_container.insertAdjacentHTML('beforebegin', closeBtn)
}

const reviewsTriggerBtn = document.getElementById("reviews-tigger-btn");

reviewsTriggerBtn.addEventListener("click", () => {
  fetchReviews();
});

// fetchReviews();
