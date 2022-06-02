## FOMO Button

### Steps for adding a new client

1. Copy and rename the `template/` folder
2. Update the `reviews` in reviews.js file for new client. (zip, name, text, city)
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

Change the CTA text and link.

```javascript
const ctaBtn =
  '<a id="ureka-cta" type="button" style="text-decoration:none;" class="btn btn-primary m-auto" href="https://lunchbreak4kids.com/meal-plans/">GetStarted</a>';
```

5. Get the plugin code to embed for new client by substituting value for `client_folder_name` in the following template at all appropriate places. This will work after code is in master branch.

```html
<!-- Eureka reiviews plugin -->
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
    Read Reviews from your nighbors
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

<!-- Eureka reiviews plugin -->
<!-- --------- END --------- -->
```
