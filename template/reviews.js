const REVIEWS = [
  {
    id: 0,
    author: "Alison Kaplan",
    text: 'The lunches are perfect as our kitchen is under construction and I can\'t prepare "real" meals for the kids.',
    img:
      "https://cdn-cmhkh.nitrocdn.com/TezMmPgFmiYDBaHMYdPwMCWAKAYkIeiI/assets/static/optimized/www.theloremipsumco.com/wp-content/uploads/2014/04/73e4a3fe6ad959478d8562505bf1e43e.pic7_3000x2003-e1482875351271.jpg",
    lat: "33.87449",
    lng: "-118.37203",
    zip: "90278",
    city: 'Redondo Beach',
  },
  {
    id: 1,
    author: "Anicia Mendez",
    text:
      'My kids have raved about their lunches 3 days in a row.',
    img:
      "https://cdn-cmhkh.nitrocdn.com/TezMmPgFmiYDBaHMYdPwMCWAKAYkIeiI/assets/static/optimized/www.theloremipsumco.com/wp-content/uploads/2014/04/16cf23915a4dc235a62f204704f4b424.Gordon-Kelsi.jpg",
    lat: "33.88949",
    lng: "-118.40090",
    zip: "90266",
    city: 'Manhattan Beach',
  },
  {
    id: 2,
    author: "Belinda Oakes",
    text:
      "Bodie said the chili was by far the best meal he's had from you guys. I added rice to it to make it last two days and he was stoked.",
    img:
      "https://cdn-cmhkh.nitrocdn.com/TezMmPgFmiYDBaHMYdPwMCWAKAYkIeiI/assets/static/optimized/www.theloremipsumco.com/wp-content/uploads/2017/01/5f92099ec3f04b259e1a4a80f5b35d6b.KellySwedaPhotography.Seth_Gewirtz_high_res-7628-e1483741109998.jpg",
    lat: "33.86479",
    lng: "-118.39719",
    zip: "90254",
    city: 'Hermosa Beach',
  },
    {
    id: 3,
    author: "Catherine Chambliss",
    text:
      "Thank you. I was so happy to wake up today and have your food ready to put in the lunch and not have to figure out what to make!",
    img:
      "https://cdn-cmhkh.nitrocdn.com/TezMmPgFmiYDBaHMYdPwMCWAKAYkIeiI/assets/static/optimized/www.theloremipsumco.com/wp-content/uploads/2017/01/5f92099ec3f04b259e1a4a80f5b35d6b.KellySwedaPhotography.Seth_Gewirtz_high_res-7628-e1483741109998.jpg",
    lat: "33.86479",
    lng: "-118.39719",
    zip: "90254",
    city: 'Hermosa Beach',
  },
  {
    id: 4,
    author: "Charise Mirabal",
    text:
      "Just wanted to say how delighted we were by our first order. It was like getting a little early \"food\" Christmas present. At least for me as a mother, it was! My 14-year old son is, as I type, enjoying the hamburger slider lunch for breakfast. It's great that the meals are satisfying for big kids and little kids. Initially I ordered for my second grader, but it was just too easy to give one to my teenager this morning. :) Thanks again for your wonderful customer service, and fun, healthy product.",
    img:
      "https://cdn-cmhkh.nitrocdn.com/TezMmPgFmiYDBaHMYdPwMCWAKAYkIeiI/assets/static/optimized/www.theloremipsumco.com/wp-content/uploads/2017/01/5f92099ec3f04b259e1a4a80f5b35d6b.KellySwedaPhotography.Seth_Gewirtz_high_res-7628-e1483741109998.jpg",
    lat: "33.84022",
    lng: "-118.35317",
    zip: "90503",
    city: 'Torrance',
  },
    {
    id: 5,
    author: "Erick Gutierrez",
    text:
      "Thanks Trevor! You are doing a great job!",
    img:
      "https://cdn-cmhkh.nitrocdn.com/TezMmPgFmiYDBaHMYdPwMCWAKAYkIeiI/assets/static/optimized/www.theloremipsumco.com/wp-content/uploads/2017/01/5f92099ec3f04b259e1a4a80f5b35d6b.KellySwedaPhotography.Seth_Gewirtz_high_res-7628-e1483741109998.jpg",
    lat: "33.88949",
    lng: "-118.40090",
    zip: "90266",
    city: 'Manhattan Beach',
  },
    {
    id: 6,
    author: "Jodi Lederman",
    text:
      "We absolutely love it! It is exceptional and I had asked where I could post or write something to help you out. I tell everyone about it and just haven’t had a minute. I am a single mom of a kindergartner and she eats every bit of it. Thank you so much - you have put together a gem that we can’t live without.",
    img:
      "https://cdn-cmhkh.nitrocdn.com/TezMmPgFmiYDBaHMYdPwMCWAKAYkIeiI/assets/static/optimized/www.theloremipsumco.com/wp-content/uploads/2017/01/5f92099ec3f04b259e1a4a80f5b35d6b.KellySwedaPhotography.Seth_Gewirtz_high_res-7628-e1483741109998.jpg",
    lat: "34.07834",
    lng: "-118.54750",
    zip: "90272",
    city: 'Pacific Palisades',
  },
    {
    id: 7,
    author: "Lisa Jutras",
    text:
      "Hi Trevor! We love the food! Thanks for the break!",
    img:
      "https://cdn-cmhkh.nitrocdn.com/TezMmPgFmiYDBaHMYdPwMCWAKAYkIeiI/assets/static/optimized/www.theloremipsumco.com/wp-content/uploads/2017/01/5f92099ec3f04b259e1a4a80f5b35d6b.KellySwedaPhotography.Seth_Gewirtz_high_res-7628-e1483741109998.jpg",
    lat: "33.88949",
    lng: "-118.40090",
    zip: "90266",
    city: 'Manhattan Beach',
  },
    {
    id: 8,
    author: "Melissa Shaivitz",
    text:
      "Thank you!  My daughter and I ate the Asian noodles last night and today I sent my son to school with the chicken tenders.  We're loving the service!",
    img:
      "https://cdn-cmhkh.nitrocdn.com/TezMmPgFmiYDBaHMYdPwMCWAKAYkIeiI/assets/static/optimized/www.theloremipsumco.com/wp-content/uploads/2017/01/5f92099ec3f04b259e1a4a80f5b35d6b.KellySwedaPhotography.Seth_Gewirtz_high_res-7628-e1483741109998.jpg",
    lat: "33.86479",
    lng: "-118.39719",
    zip: "90254",
    city: 'Hermosa Beach',
  },
    {
    id: 9,
    author: "Virginia Dunbabin",
    text:
      "We're all loving the meals, thank you. ",
    img:
      "https://cdn-cmhkh.nitrocdn.com/TezMmPgFmiYDBaHMYdPwMCWAKAYkIeiI/assets/static/optimized/www.theloremipsumco.com/wp-content/uploads/2017/01/5f92099ec3f04b259e1a4a80f5b35d6b.KellySwedaPhotography.Seth_Gewirtz_high_res-7628-e1483741109998.jpg",
    lat: "33.86479",
    lng: "-118.39719",
    zip: "90254",
    city: 'Hermosa Beach',
  },
];
