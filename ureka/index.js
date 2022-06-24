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

const SHEETY_API_URL = "https://api.sheety.co/e6308a30988c2a9e6e0ead2fd194efa5/cleverlinkMetrics"
const CTA_URL = "https://fomobutton.com/#details"
var DEMOGRAPHICS_DATA;

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const logVisit = async (currenturl, date, time, utcTime) => {
  let url = `${SHEETY_API_URL}/visitors`;
  let body = {
    visitor: {
      url: currenturl,
      date: date,
      time: time,
      utcTime: utcTime
    }
  }
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then((response) => response.json())
  .then(json => {
    // Do something with object
    console.log(json);
  });
}
const logTriggerBtnClick = async (currenturl, date, time, utcTime) => {
  let url = `${SHEETY_API_URL}/fomoButtonClicked`;
  let body = {
    fomoButtonClicked: {
      url: currenturl,
      date: date,
      time: time,
      utcTime: utcTime,
    }
  }
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then((response) => response.json())
  .then(json => {
    // Do something with object
    console.log(json);
  });
}
const logReviewsShown = async (total, currenturl, date, time, utcTime) => {
  let url = `${SHEETY_API_URL}/reviewsShown`;
  let body = {
    reviewsShown: {
      url: currenturl,
      date: date,
      time: time,
      numberOfReviews: total,
      utcTime: utcTime,
    }
  }
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then((response) => response.json())
  .then(json => {
    // Do something with object
    console.log(json);
  });
}
const logUrekaCtaClick = async (ureka, currenturl, date, time, utcTime) => {
  let url = `${SHEETY_API_URL}/urekaCtaClicked`;
  let body = {
    urekaCtaClicked: {
      url: currenturl,
      date: date,
      time: time,
      ureka: ureka,
      utcTime: utcTime,
      ctaCity: DEMOGRAPHICS_DATA.city
    }
  }
  console.log('###############', body, url);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  
    console.log('#############', res);
  const json = await res.json()
  console.log(json);
  } catch(e) {
    console.log(e, 'yo');
  }
}

const logDemographics = async (city, continent, latitude, longitude, country, ip, region, zip, timezone_code, timezone_id, currency, utcTime) => {
  let url = `${SHEETY_API_URL}/demographics`;
  let body = {
    demographic: {
      city: city,
      continent: continent,
      latitude: latitude,
      longitude: longitude,
      country: country,
      ip: ip,
      region: region,
      zip: zip,
      timezoneCode: timezone_code,
      timezoneId: timezone_id,
      currency: currency,
      utcTime: utcTime
    }
  }
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then((response) => response.json())
  .then(json => {
    // Do something with object
    console.log(json);
  });
}

const logUrekaBtnFocus = async (currenturl, date, time, utcTime) => {
  let url = `${SHEETY_API_URL}/urekaButtonSeen`;
  let body = {
    urekaButtonSeen: {
      url: currenturl,
      date: date,
      time: time,
      utcTime: utcTime
    }
  }
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then((response) => response.json())
  .then(json => {
    // Do something with object
    console.log(json);
  });
}


console.log('Visit', window.location.href, new Date().toDateString(), new Date().toLocaleTimeString(), 'UTC', new Date().toUTCString());
logVisit(window.location.href, new Date().toDateString(), new Date().toTimeString(), new Date().toUTCString())
console.log('Visit logged', window.location.href, new Date().toDateString(), new Date().toLocaleTimeString(), 'UTC', new Date().toUTCString());


const loadingBox = `<div class="cssload-box-loading"></div>`;
let is_advanced_mode = false;
// let is_advanced_mode = localStorage.getItem("is_advanced_mode");
let UREKA_BTN_FOCUSED = false;

// document.body.insertAdjacentHTML('beforeend', modalWrapper)
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const reviewsTriggerBtn = document.getElementById("reviews-tigger-btn");
    document.body.insertAdjacentHTML('beforeend', modalWrapper)
    reviewsTriggerBtn.addEventListener('click', (e) => {
      fetchReviews()

      console.log('Click', window.location.href, new Date().toDateString(), new Date().toLocaleTimeString(), 'UTC', new Date().toUTCString());
      logTriggerBtnClick(window.location.href, new Date().toDateString(), new Date().toTimeString(), new Date().toUTCString())
      console.log('Click logged', window.location.href, new Date().toDateString(), new Date().toLocaleTimeString(), 'UTC', new Date().toUTCString());
    })
   

    document.addEventListener('click', (e) => {
      if (e.target.href === CTA_URL && e.target.id !== "ureka-cta") {
        console.log('Other CTA Click', false, window.location.href, new Date().toDateString(), new Date().toLocaleTimeString(), 'UTC', new Date().toUTCString());
        logUrekaCtaClick(false, window.location.href, new Date().toDateString(), new Date().toTimeString(), new Date().toUTCString())
        console.log('Other CTA Click logged', false, window.location.href, new Date().toDateString(), new Date().toLocaleTimeString(), 'UTC', new Date().toUTCString());
      }
    })

    document.addEventListener('scroll', (e) => {
      if(isInViewport(reviewsTriggerBtn) && !UREKA_BTN_FOCUSED) {
        console.log('Ureka Button in Focus', window.location.href, new Date().toDateString(), new Date().toLocaleTimeString(), 'UTC', new Date().toUTCString());
        logUrekaBtnFocus(window.location.href, new Date().toDateString(), new Date().toTimeString(), new Date().toUTCString())        
        console.log('Ureka Button in Focus', window.location.href, new Date().toDateString(), new Date().toLocaleTimeString(), 'UTC', new Date().toUTCString());
        UREKA_BTN_FOCUSED = true;
      }
    })

    // const advanced_mode = document.getElementById('advanced-mode')
    // const advanced_mode_checkbox = document.getElementById('advanced-mode-checkbox')
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
                                <button style="background: none; border: none; cursor: pointer;" class="ureka-modal-control position-relative" role="button" data-slide="prev" data-target="#carouselMultiItemExample">
                                  <i class="fas fa-angle-left pe-2"></i>&nbsp;<span>Previous</span>
                                </button>
                                <button style="background: none; border: none; cursor: pointer;" class="ureka-modal-control position-relative" role="button" data-slide="next" data-target="#carouselMultiItemExample">
                                  <span>Next</span>&nbsp;<i class="fas fa-angle-right pe-2" role="img" class="md hydrated"
                                        aria-label="chevron back outline"></i>
                                </button>
                            </div>`

const ctaBtn = `<button id="ureka-cta" type="button" style="text-decoration:none;" class="btn btn-primary mx-auto">Get Beta Access</button>`

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
  console.log(data);
  DEMOGRAPHICS_DATA=data;
  console.log('DEMOGRAPHICS', data?.city, data?.continent_name, data?.latitude, data?.longitude, data?.country_name, data?.ip, data?.region_name, data?.zip, data?.time_zone?.code, data?.time_zone?.id, data?.currency?.code, new Date().toUTCString());
  logDemographics(data?.city, data?.continent_name, data?.latitude, data?.longitude, data?.country_name, data?.ip, data?.region_name, data?.zip, data?.time_zone?.code, data?.time_zone?.id, data?.currency?.code, new Date().toUTCString())
  console.log('DEMOGRAPHICS logged', data?.city, data?.continent_name, data?.latitude, data?.longitude, data?.country_name, data?.ip, data?.region_name, data?.zip, data?.time_zone?.code, data?.time_zone?.id, data?.currency?.code, new Date().toUTCString());
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

    review_text.innerHTML = '<i class="fas fa-quote-left pe-2"></i>&nbsp;' + r.text + '&nbsp;<i class="fas fa-quote-right pe-2"></i>'
    review_author_h5.innerHTML = r.author;
    review_city.innerHTML = r.city;

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

  // console.log(is_advanced_mode);
  if(is_advanced_mode) {
    // console.log('from browser');
    await getLocationFromBrowser()
  } else {
    // console.log('from ip');
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
      
      console.log('REVIEWS SHOWN', ascending_reviews.length, window.location.href, new Date().toDateString(), new Date().toLocaleTimeString(), 'UTC', new Date().toUTCString());
      logReviewsShown(ascending_reviews.length, window.location.href, new Date().toDateString(), new Date().toTimeString(), new Date().toUTCString())
      console.log('REVIEWS SHOWN logged', ascending_reviews.length, window.location.href, new Date().toDateString(), new Date().toLocaleTimeString(), 'UTC', new Date().toUTCString());

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

      console.log('REVIEWS SHOWN', 3, window.location.href, new Date().toDateString(), new Date().toLocaleTimeString(), 'UTC', new Date().toUTCString());
      logReviewsShown(3, window.location.href, new Date().toDateString(), new Date().toTimeString(), new Date().toUTCString())
      console.log('REVIEWS SHOWN logged', 3, window.location.href, new Date().toDateString(), new Date().toLocaleTimeString(), 'UTC', new Date().toUTCString());
    }

    // reviewsContent.innerHTML = ''
    // console.log(reviews_container);
    // reviewsContent.appendChild(reviews_container)
    reviewsContent.appendChild(createElementFromHTML(carousel_controls))
    // reviewsContent.insertAdjacentHTML('afterend', ctaBtn)


    try {
    document.addEventListener('click', (e) => {
      if(e.target.id === "ureka-cta") {
        console.log('Ureka CTA Click', true, document.location.href, new Date().toDateString(), new Date().toLocaleTimeString(), 'UTC', new Date().toUTCString());
        logUrekaCtaClick(true, document.location.href, new Date().toDateString(), new Date().toTimeString(), new Date().toUTCString())
        console.log('Ureka CTA Click logged', true, window.location.href, new Date().toDateString(), new Date().toLocaleTimeString(), 'UTC', new Date().toUTCString());
        const modal = document.querySelector("#ureka-modal");
        const backdrop = document.querySelector(".modal-backdrop");
        modal.style.display = "none";
        modal.ariaHidden = "true";
        modal.classList.toggle("show");
        backdrop.classList.toggle("show");
        document.body.classList.toggle('modal-open')
        setTimeout(() => {
          window.location.href = CTA_URL;
        }, 500)
      } else if (e.target.href === CTA_URL) {
        console.log('Other CTA Click', false, document.location.href, new Date().toDateString(), new Date().toLocaleTimeString(), 'UTC', new Date().toUTCString());
        logUrekaCtaClick(false, document.location.href, new Date().toDateString(), new Date().toTimeString(), new Date().toUTCString())
        console.log('Other CTA Click logged', false, document.location.href, new Date().toDateString(), new Date().toLocaleTimeString(), 'UTC', new Date().toUTCString());
      } else {
        console.log('Not my click')
      }
    })
  } catch(e) {
    console.log(e);
  }
  }, 3000)

  // setTimeout(() => {
  //   if(!modal.classList.contains('show')) {
  //     modal.classList.toggle("show");
  //     document.body.classList.toggle('modal-open')
  //     modal.style.display = modal.style.display === "block" ? "none" : "block" ;
  //     // modal.classList.toggle("show");
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

// Google Analytics
(function(){
    var ga=document.createElement('script');
    ga.type='text/javascript';
    ga.async=true;
    ga.src=('https:'==document.location.protocol?'https://ssl':'http://www')+'.googletagmanager.com/gtag/js?id=G-60JTK0P5MS';
    var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga,s)
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-60JTK0P5MS');
})();

// GTM
// (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
// j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
// 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// })(window,document,'script','dataLayer','GTM-NPFGT67');


// Microsoft clarity
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "cctdlea808");

// jquery
// (function(){
//     var bp=document.createElement('script');
//     bp.type='text/javascript';
//     bp.async=true;
//     bp.src='https://code.jquery.com/jquery-3.2.1.slim.min.js';
//     bp.integrity = "sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN";
//     bp.crossOrigin = "anonymous";
//     var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(bp,s)
//     window.dataLayer = window.dataLayer || [];
// })();
// // popper
// (function(){
//     var bp=document.createElement('script');
//     bp.type='text/javascript';
//     bp.async=true;
//     bp.src='https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js';
//     bp.integrity = "sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q";
//     bp.crossOrigin = "anonymous";
//     var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(bp,s)
//     window.dataLayer = window.dataLayer || [];
// })();

// // bootstrap
// (function(){
//     var bp=document.createElement('script');
//     bp.type='text/javascript';
//     bp.async=true;
//     bp.src='https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js';
//     bp.integrity = "sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl";
//     bp.crossOrigin = "anonymous";
//     var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(bp,s)
//     window.dataLayer = window.dataLayer || [];
// })();

// // reviews
// (function(){
//     var bp=document.createElement('script');
//     bp.type='text/javascript';
//     bp.async=true;
//     bp.src='https://fomobutton.netlify.app/ureka/reviews.js';
//     var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(bp,s)
//     window.dataLayer = window.dataLayer || [];
// })();
