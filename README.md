## Ureka button

### Steps for adding a new client

1. Copy and rename the `template/` folder
2. Update the `reviews` in reviews.js file for new client. (zip, name, text, city)
3. Update the button color in `styles.css` in the new client folder as desired

```css
#reviews-tigger-btn,
#cta {
  background-color: #f15645;
  /* ... */
}
```

4. Optionally, find & uncomment the following two lines of code in `index.js` to add CTA button to popup and change the CTA text and link

```javascript
// const ctaBtn = '<a id="cta" href="https://lunchbreak4kids.com/meal-plans/">Get Started</a>'
// reviewsContent.insertAdjacentHTML('afterend', ctaBtn)
```

5. Get the plugin code to embed for new client by substituting value for `client_folder_name` in the following template at all appropriate places. This will work after code is in master branch.

```html
<!-- Eureka reiviews plugin -->
<!-- Paste this code at the place you want the button to appear -->
<link
  href="https://cdn.jsdelivr.net/gh/strongSoda/fomo-btn-test/{client_folder_name}/styles.min.css"
  rel="stylesheet"
/>
<button id="reviews-tigger-btn" data-site-id="{client_folder_name}">
  Read reviews from my neighbors
</button>
<div id="reviews"></div>
<script src="https://cdn.jsdelivr.net/gh/strongSoda/fomo-btn-test/{client_folder_name}/reviews.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/strongSoda/fomo-btn-test/{client_folder_name}/index.min.js"></script>
<!-- Eureka reiviews plugin -->
<!-- --------- END --------- -->
```
