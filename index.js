import REVIEWS from "./reviews";

const reviewsWrapper = document.getElementById("reviews");

function fetchReviews() {
  console.log(reviewsWrapper.hasChildNodes());

  if (reviewsWrapper.hasChildNodes()) return;
  const reviews_container = document.createElement("div");
  reviews_container.classList.add("reviews_container");

  REVIEWS.forEach((r) => {
    const review = document.createElement("figure");
    const review_text = document.createElement("blockquote");
    const review_author = document.createElement("p");
    const review_author_img = document.createElement("img");
    const review_arrow = document.createElement("div");

    review_text.innerHTML = r.text;
    review.appendChild(review_text);
    review_text.appendChild(review_arrow);
    review_author_img.src = r.img;
    review.appendChild(review_author_img);
    review_author.innerHTML = r.author;
    review.appendChild(review_author);

    review.classList.add("review");
    review_author_img.classList.add("review_author_img");
    review_text.classList.add("review_text");
    review_author.classList.add("review_author");
    review_arrow.classList.add("review_arrow");

    reviews_container.appendChild(review);
  });

  reviewsWrapper.appendChild(reviews_container);
}

const reviewsTriggerBtn = document.getElementById("reviews-tigger-btn");

reviewsTriggerBtn.addEventListener("click", () => {
  fetchReviews();
});
