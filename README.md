## FOMO Button

### Get started

1. Clone repo `git clone https://github.com/strongSoda/fomo-btn-test.git`
2. You can add the repo as remote to your local `git remote add origin https://github.com/strongSoda/fomo-btn-test.git`
3. Create a new branch `git checkout -b branch_name`
4. Update code
5. Push your branch `git push origin branch_name`
6. Open a PR `branch_name` -> `main`

### Steps for adding a new client

1. Copy and rename the `template/` folder
2. Update the `reviews` in reviews.js file for new client. (zip, lat, long, name, text, city). Can get lat/long from zip from a site like [this one](https://www.freemaptools.com/convert-us-zip-code-to-lat-lng.htm).
3. Update the button color in `styles.css` in the new client folder as desired

```css
#reviews-tigger-btn,
#ureka-cta {
  background-color: #f15645;
  /* ... */
}
```

4. Find & comment/uncomment the following line of code in `index.js` to remove/add CTA button to popup.

```javascript
modal_footer.innerHTML = modal_footer.innerHTML + ctaBtn;
```

Change the CTA link:

```javascript
const CTA_URL = "";
```

and text:

```
const ctaBtn = ...
```

5. Get the plugin code to embed for new client by substituting value for `client_folder_name` in the following template at all appropriate places. This will work after code is in master branch.

```html
<!-- FOMO Button -->
<!-- Paste this code at the place you want the button to appear -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
  integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/fontawesome.min.css"
  integrity="sha512-xX2rYBFJSj86W54Fyv1de80DWBq7zYLn2z0I9bIhQG+rxIF6XVJUpdGnsNHWRa6AvP89vtFupEPDP8eZAtu9qA=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>

<link
  href="https://fomobutton.netlify.app/{client_folder_name}/styles.css"
  rel="stylesheet"
/>

<div class="center">
  <button
    id="reviews-tigger-btn"
    type="button"
    class="btn btn-primary"
    data-toggle="modal"
    data-target="#ureka-modal"
    data-site-id="{client_folder_name}"
  >
    Read Reviews from your neighbors
  </button>
</div>

<script
  src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
  integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
  crossorigin="anonymous"
></script>
<script
  src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
  integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
  crossorigin="anonymous"
></script>
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
  integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
  crossorigin="anonymous"
></script>

<script src="https://fomobutton.netlify.app/{client_folder_name}/reviews.js"></script>
<script src="https://fomobutton.netlify.app/{client_folder_name}/index.js"></script>

<!-- FOMO Button -->
<!-- --------- END --------- -->
```

### Post button installation setup

1. sheety
2. google analytics
3. microsoft clarity (session replay)

## Carousel Wall

### Steps for adding a new client

1. Copy and rename the `template_carousel_wall/` folder
2. Update the `reviews` in reviews.js file for new client. (zip, lat, long, name, text, city). Can get lat/long from zip from a site like [this one](https://www.freemaptools.com/convert-us-zip-code-to-lat-lng.htm).
3. Update the button, links color, font, size in `styles.css` in the new client folder as desired

```css
/* general wall styles */
#fomo-wall {
  width: 100%;
  overflow: hidden;
  font-family: "Lato", Arial, sans-serif;
}
.fomo-wall-body {
  /* min-height:calc(100% - (0.5rem * 5)); */
  min-height: 60vh;
  /* height: auto; */
  /* height: 60%; */
}
/* colors */
/* controls, author name */
.fomo-wall-container-control,
.review_author {
  color: #805847;
}
/* cta button */
#ureka-cta {
  background-color: #000;
  border-radius: 0;
  font-size: 20px;
}
/* loading animation box */
.cssload-box-loading:before,
.cssload-box-loading:after {
  background: #805847;
}
/* font */
.fomo-wall-content {
  font-family: "Forum", cursive;
  font-size: 20px;
  /* background-color: transparent; */
}
```

4. Find & comment/uncomment the following line of code in `index.js` to remove/add CTA button to wall.

```javascript
modal_footer.innerHTML = modal_footer.innerHTML + ctaBtn;
```

Change the CTA link:

```javascript
const CTA_URL = "";
```

and text:

```
const ctaBtn = ...
```

5. Get the plugin code to embed for new client by substituting value for `client_folder_name` in the following template at all appropriate places. This will work after code is in master branch.

```html
<!-- FOMO CAROUSEL WALL -->
<!-- Paste this code at the place you want the wall to appear -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
  integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/fontawesome.min.css"
  integrity="sha512-xX2rYBFJSj86W54Fyv1de80DWBq7zYLn2z0I9bIhQG+rxIF6XVJUpdGnsNHWRa6AvP89vtFupEPDP8eZAtu9qA=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
<link
  href="https://fomobutton.netlify.app/{client_folder_name}/styles.css"
  rel="stylesheet"
/>
<div style="width: 99vw; background-color: bisque;">
  <h3>THE FOMO CAROUSEL WALL</h3>
  <!-- <div style="width: 80%; background-color: aqua;">       -->
  <!-- </div> -->
  <div id="fomo-wall" data-site-id="{client_folder_name}"></div>
</div>

<script
  src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
  integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
  crossorigin="anonymous"
></script>
<script
  src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
  integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
  crossorigin="anonymous"
></script>
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
  integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
  crossorigin="anonymous"
></script>

<script src="https://fomobutton.netlify.app/{client_folder_name}/reviews.js"></script>
<script src="https://fomobutton.netlify.app/{client_folder_name}/index.js"></script>

<!-- FOMO CAROUSEL WALL -->
<!-- --------- END --------- -->
```

### Post wall installation setup

1. sheety
2. google analytics
3. microsoft clarity (session replay)

## Full Page Wall

### Steps for adding a new client

1. Copy and rename the `template_full_page_wall/` folder
2. Update the `reviews` in reviews.js file for new client. (lat, lng, name, text, city, profile_pic, logo, id, rating, date). Can get lat/long from zip from a site like [this one](https://www.freemaptools.com/convert-us-zip-code-to-lat-lng.htm).
3. Update the button, links color, font, size in `styles.css` in the new client folder as desired

```css
.load-more-reviews-btn {
  background-color: #003366;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 10px #ccc;
  color: #fff;
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  padding: 0.8em 2em;
  cursor: pointer;
}

.load-more-reviews-btn:hover {
  background-color: #fff;
  border: 1px solid #003366;
  color: #003366;
  transition: 0.3s;
}
```

Change the CTA link:

```javascript
const CTA_URL = "";
```

and text:

```
const ctaBtn = ...
```

5. Get the plugin code to embed for new client by substituting value for `client_folder_name` in the following template at all appropriate places. This will work after code is in master branch.

```html
<!-- FOMO Wall -->
<!-- Paste this code at the place you want the button to appear -->
<link
  href="https://fomobutton.netlify.app/{client_folder_name}/styles.css"
  rel="stylesheet"
/>
<div id="fomo-wall" data-site-id="{client_folder_name}"></div>
<script src="https://fomobutton.netlify.app/{client_folder_name}/reviews.js"></script>
<script src="https://fomobutton.netlify.app/{client_folder_name}/index.js"></script>
<!-- FOMO Wall -->
<!-- --------- END --------- -->
```

### Post wall installation setup

1. sheety
2. google analytics
3. microsoft clarity (session replay)
