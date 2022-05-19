const reviewsWrapper = document.getElementById("reviews");

const title = '<h3 class="eureka-title">Read reviews from your friends</h3>'
// const closeBtn = '<span class="close">&times;</span>'

const getLocationFromIP = async () => {
  const res = await fetch(
    "http://api.ipstack.com/check?access_key=31d2eff2fab302c3d8c4cca4945c8faf&format=1"
  );
  const data = await res?.json();
  console.log(data);

  if (data.success) return data;
  else throw new Error(data?.error?.info);
};

// TODO
function getThreeClosestReviewsByZip(zip) {
  const closest_three_reviews_by_zip = [];
  return closest_three_reviews_by_zip;
}
// TODO
function showReviews(closest_reviews) {}
// TODO
function showDefaultFallbackReviews(closest_reviews) {}

function fetchReviews() {
  /**
   * pusedo code to get ip -> geolocation, find closest reviews & show popup
   * or show fallback reviews if some error
   */
  // getLocationFromIP()
  //   .then((zip) => {
  //     console.log("zip", zip);
  //     reviewsWrapper.appendChild(JSON.stringify(zip));
  //     const closest_reviews = getThreeClosestReviewsByZip(zip);
  //     showReviews(closest_reviews);
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //     showDefaultFallbackReviews();
  //   });

  console.log(reviewsWrapper.hasChildNodes());

  if (reviewsWrapper.hasChildNodes()) return;
  const reviews_container = document.createElement("div");
  reviews_container.classList.add("reviews_container");

  REVIEWS.slice(0,3).forEach((r) => {
    const review = document.createElement("figure");
    const review_text = document.createElement("blockquote");
    const review_author = document.createElement("p");
    const review_city = document.createElement("p");
    // const review_author_img = document.createElement("img");
    // const review_arrow = document.createElement("div");

    review_text.innerHTML = r.text;
    review.appendChild(review_text);
    // review_text.appendChild(review_arrow);
    // review_author_img.src = r.img;
    // review.appendChild(review_author_img);
    review_author.innerHTML = r.author;
    review.appendChild(review_author);
    review_city.innerHTML = r.city;
    review.appendChild(review_city);

    review.classList.add("review");
    // review_author_img.classList.add("review_author_img");
    review_text.classList.add("review_text");
    review_author.classList.add("review_author");
    review_city.classList.add('review_city');
    // review_arrow.classList.add("review_arrow");

    reviews_container.appendChild(review);
  });

  reviewsWrapper.appendChild(reviews_container);
  reviews_container.insertAdjacentHTML('beforebegin', title)
  // reviews_container.insertAdjacentHTML('beforebegin', closeBtn)
}

const reviewsTriggerBtn = document.getElementById("reviews-tigger-btn");

reviewsTriggerBtn.addEventListener("click", () => {
  fetchReviews();
});

// fetchReviews();
