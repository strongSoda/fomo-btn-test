const wallWrapper = `
        <!-- black browser window img -->
        <div class="fomo-wall-header">
        </div>
        <h2 class="fomo-wall-title center">a community led professional network for women</h2>
        <div class="fomo-wall-container">
        </div>
        
        <!-- load more reviews -->
        <div class="load-more-reviews">
            <button id="load-more-reviews-btn" class="load-more-reviews-btn">load more reviews</button>
        </div>

        <footer>Powered by <a href="https://ureka.io/?ref=co" target="_blank">Ureka.io</a></footer>
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
    for (let i = 0; i < reviews.length; i += 3) {
        // create row
        const row = createReviewsRow(reviews.slice(i, i + 3))
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

const CTA_URL = "https://www.leap.club/?_ga=2.38682539.98150128.1659322844-1775045221.1659322844#waitlist";
const loadingBox = `<div class="cssload-box-loading"></div>`;
let is_advanced_mode = false;
// let is_advanced_mode = localStorage.getItem("is_advanced_mode");


function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString;

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild;
}

const ctaBtn = `
        <div class="load-more-reviews">
            <a id="ureka-cta" type="button" style="text-decoration:none;" class="btn btn-primary mx-auto load-more-reviews-btn" href="${CTA_URL}">join the waitlist now</a>
        </div>`

const ureka_cta = document.getElementById('ureka-cta');
  if(!ureka_cta) {
    FOMO_WALL_CONTAINER.insertAdjacentHTML('beforebegin', ctaBtn);
}

let reviews_index = 0

const getIpAddressLocation = async () => {
    console.log('here 2');
    try {
        const res = await fetch(
            "https://api.ipstack.com/check?access_key=31d2eff2fab302c3d8c4cca4945c8faf&format=1"
        );
        const data = await res?.json();
        console.log('data', data);
        // console.log(data);
        return { lat: data?.latitude, lng: data?.longitude }
    }
    catch (err) {
        console.log(err);
        return false
    }
    // else throw new Error(data?.error?.info);
};

// sort reviews by closest to ip address location
const sortReviews = async (reviews) => {
    console.log('here');
    const ascending_reviews = JSON.parse(JSON.stringify(reviews))
    // get ip address location
    const ip_address_location = await getIpAddressLocation()
    if(!ip_address_location) {
        return reviews
    }
    console.log('ip_address_location', ip_address_location);
    // sort reviews by distance from ip address location
    ascending_reviews.sort((a, b) => {
        // get distance from ip address location to review location
        const distance_a = getDistance(ip_address_location, a)
        const distance_b = getDistance(ip_address_location, b)
        // sort reviews by distance from ip address location
        return distance_a - distance_b
    })
    console.log('sorted', reviews);

    console.log('ascending_reviews', ascending_reviews);
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
    appendFomoWall(createFomoWall(ascending_reviews.slice(reviews_index, 3)))
    reviews_index += 3
})

// load more reviews
const LOAD_MORE_REVIEWS = document.querySelector('#load-more-reviews-btn')
LOAD_MORE_REVIEWS.addEventListener('click', () => {
    console.log('load more reviews');
    if(reviews_index < REVIEWS.length) {
        // create fomo wall
        sortReviews(REVIEWS).then(ascending_reviews => {
            appendFomoWall(createFomoWall(ascending_reviews.slice(reviews_index, reviews_index + 3)))
            reviews_index += 3
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
