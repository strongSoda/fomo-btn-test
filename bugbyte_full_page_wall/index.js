const wallWrapper = `
        <!-- black browser window img -->
        <div class="fomo-wall-header">
        </div>
<!-- remove title
<h2 class="fomo-wall-title center">Ureka Reviews Full Page Wall Widget</h2>
-->
        <div class="fomo-wall-container">
        </div>
        
        <!-- load more reviews -->
        <div class="load-more-reviews">
            <button class="load-more-reviews-btn">Load More Reviews</button>
        </div>
`

const wallParent = document.querySelector('#fomo-wall')
wallParent.innerHTML = wallWrapper;

// select fomo wall container
const FOMO_WALL_CONTAINER = document.querySelector('.fomo-wall-container')

// create reviews row from REVIEWS array
const createReviewsRow = (reviews) => {
    // create row
    const row = document.createElement('div')
    row.classList.add('row')
    // create reviews
    reviews?.forEach(review => {
        // create review
        const review_card = document.createElement('div')
        review_card.classList.add('col-lg-4', 'col-sm-12')
        review_card.classList.add('review')
        review_card.innerHTML = `
            <div class="responsive_card border-shadow">
                <img class="rounded-avatar" src="${review.profile_pic}" alt="">
                <h2>${review.name}</h2>
                <div>
                    ${Array(review.rating).fill('⭐️').join('')}
                </div>
                <p class="review_text center">
                    ${review.text}
                </p>
                <p class="review_city center">
                    ${review.city}
                </p>
                <img class="small_logo" src="${review.logo}" alt="">
            </div>
        `
        row.appendChild(review_card)
    })
    return row
}

// create fomo wall from REVIEWS array
const createFomoWall = (reviews) => {
    // create fomo wall
    const fomo_wall = document.createElement('div')
    // fomo_wall.id = 'fomo-wall'

    // iterate over reviews with 4 reviews at a time
    for (let i = 0; i < reviews.length; i += 4) {
        // create row
        const row = createReviewsRow(reviews.slice(i, i + 4))
        // append row to fomo wall
        fomo_wall.appendChild(row)
    }
    return fomo_wall
}

// append fomo wall to FOMO_WALL_CONTAINER
const appendFomoWall = (fomo_wall) => {
    // console.log(fomo_wall);
    FOMO_WALL_CONTAINER.appendChild(fomo_wall)
}

let reviews_index = 0

const getIpAddressLocation = async () => {
    try {
        const res = await fetch(
            "https://api.ipstack.com/check?access_key=31d2eff2fab302c3d8c4cca4945c8faf&format=1"
        );
        const data = await res?.json();
        // console.log(data);
        return { lat: data?.latitude, lng: data?.longitude }
        // else throw new Error(data?.error?.info);
    }
    catch (err) {
        console.log(err);
        return false
    }
};

// sort reviews by closest to ip address location
const sortReviews = async (reviews) => {
    const ascending_reviews = JSON.parse(JSON.stringify(reviews))
    // get ip address location
    const ip_address_location = await getIpAddressLocation()
    if(!ip_address_location) {
        return reviews
    }
    // sort reviews by distance from ip address location
    ascending_reviews.sort((a, b) => {
        // get distance from ip address location to review location
        const distance_a = getDistance(ip_address_location, a)
        const distance_b = getDistance(ip_address_location, b)
        // sort reviews by distance from ip address location
        return distance_a - distance_b
    })
    console.log('sorted', reviews);
    return ascending_reviews
}

function distance(lat1, lat2, lon1, lon2) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return (c * r);
}

// getDistance from ip address location to review location
const getDistance = (ip_address_location, review) => {
    console.log(ip_address_location);
    return distance(ip_address_location.lat, review.lat, ip_address_location.lng, review.lng)
}

// convert degrees to radians
const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
}

// console.log(sortReviews(REVIEWS));
sortReviews(REVIEWS).then(ascending_reviews => {
    appendFomoWall(createFomoWall(ascending_reviews.slice(reviews_index, 2)))
    reviews_index += 2
})

// load more reviews
const LOAD_MORE_REVIEWS = document.querySelector('.load-more-reviews')
LOAD_MORE_REVIEWS.addEventListener('click', () => {
    console.log('load more reviews');
    if(reviews_index < REVIEWS.length) {
        // create fomo wall
        sortReviews(REVIEWS).then(ascending_reviews => {
            appendFomoWall(createFomoWall(ascending_reviews.slice(reviews_index, reviews_index + 2)))
            reviews_index += 2
        })
    } else {
        // hide load more reviews button
        LOAD_MORE_REVIEWS.style.display = 'none'
    }
})

// Advanced mode
{/* <div class="mr-auto" id="advanced-mode">
  <label class="switch" style="margin-right: 1em;">
    <input type="checkbox" id="advanced-mode-checkbox">
    <span class="slider round"></span>
  </label>
  <p class="my-2">Advanced Matching</p>
</div> */}

const CTA_URL = "#";
const loadingBox = `<div class="cssload-box-loading"></div>`;
let is_advanced_mode = false;
// let is_advanced_mode = localStorage.getItem("is_advanced_mode");


function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString;

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild;
}

const ctaBtn = `<a id="ureka-cta" type="button" style="text-decoration:none;" class="btn btn-primary mx-auto" href="${CTA_URL}">Get Creative</a>`


// const getLocationFromBrowser = async () => {
//   if (navigator.geolocation) {

//     navigator.permissions.query({name:'geolocation'}).then(function(result) {
//       // Will return ['granted', 'prompt', 'denied']
//       if(result.state !== "granted") {
//         getLocationFromIP()
//       }
//     });
//     navigator.geolocation.getCurrentPosition((position) => {
//       MY_LOCATION = position
//     });
//   } else { 
//   }
// };
