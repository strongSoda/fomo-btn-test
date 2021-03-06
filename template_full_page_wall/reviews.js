// reviews data
const REVIEWS = [
{
    id: 0,
    name: 'Lara Smith',
    rating: 5,
    text: "I can't say enough good things about Frieza and ABC.  They gave me the confidence to finally launch my business and helped ensure we were profitable from day one.",
    logo: 'https://1000logos.net/wp-content/uploads/2016/11/New-Google-Logo.jpg',
    profile_pic: "https://i.pravatar.cc/?img=9",
    date: '2020-01-01',
    city: 'New York',
    lat: 40.730610,
    lng: -73.935242,
},
{
    id: 1,
    name: 'Seth Johnson',
    rating: 5,
    text: "Frieza truly is a force of nature.  So much energy, so much enthusiasm.  She has given my business the boost we needed to get off the ground.  Thank you!",
    logo: 'https://1000logos.net/wp-content/uploads/2016/11/New-Google-Logo.jpg',
    profile_pic: "https://i.pravatar.cc/?img=6",
    date: '2020-01-01',
    city: 'Delhi',
    lat: 28.7041,
    lng: 77.1025,
},
{
    id: 2,
    name: 'Anna Williams',
    rating: 5,
    text: "Thank you ABC for helping build my brand.  I had no idea what my brand was going to be but you helped me think through how my brand would be unique to me.  Now my customers tell me how much they love the new design of my website.",
    logo: 'https://1000logos.net/wp-content/uploads/2016/11/New-Google-Logo.jpg',
    profile_pic: "https://i.pravatar.cc/?img=5",
    date: '2020-01-01',
    city: 'Mumbai',
    lat: 19.0760,
    lng: 72.8777,
},
{
    id: 3,
    name: 'Douglas Brown',
    rating: 5,
    text: "ABC knows how to deliver results.  They are true professionals who bring a wealth of experience to the table.  I wouldn't trust my brand with anyone else.",
    logo: 'https://1000logos.net/wp-content/uploads/2016/11/New-Google-Logo.jpg',
    profile_pic: "https://i.pravatar.cc/?img=11",
    date: '2020-01-01',
    city: 'Dubai',
    lat: 25.2048,
    lng: 55.2708,
},
{
    id: 4,
    name: 'Luke Jones',
    rating: 5,
    text: "My website was a mess when I called up Frieza, but she helped me think through a total site overhaul.  Now it looks great, is easy to use - and is generating sales at twice the monthly rate as before.  Thank you thank you thank you!",
    logo: 'https://1000logos.net/wp-content/uploads/2016/11/New-Google-Logo.jpg',
    profile_pic: 'https://i.pravatar.cc/',
    date: '2020-01-01',
    city: 'London',
    lat: 51.5,
    lng: -0.1,
},
{
    id: 5,
    name: 'Angela Garcia',
    rating: 5,
    text: "Frieza's business coaching service was exactly what I needed to get my business going.  Before working with her I had a hundred ideas but no clear direction.  She helped me identify my core competencies and focus on a target customer base.  Now I have real revenue and am growing each month.  Thank you ABC!",
    logo: 'https://1000logos.net/wp-content/uploads/2016/11/New-Google-Logo.jpg',
    profile_pic: "https://i.pravatar.cc/?img=16",
    date: '2020-01-01',
    city: 'Paris',
    lat: 48.8566,
    lng: 2.3522,
},
{
    id: 6,
    name: 'Sterling Miller',
    rating: 5,
    text: "ABC is the best business coaching service in the South Bay, hands down.  I would not trust my business with anyone else.",
    logo: 'https://1000logos.net/wp-content/uploads/2016/11/New-Google-Logo.jpg',
    profile_pic: "https://i.pravatar.cc/?img=68",
    date: '2020-01-01',
    city: 'Quebec',
    lat: 46.8138,
    lng: -71.2080,
},
{
    id: 7,
    name: 'Mary Davis',
    rating: 5,
    text: "So many good ideas, so many helpful connections.  Frieza has been an angel for our business.  Thank you so much!!",
    logo: 'https://1000logos.net/wp-content/uploads/2016/11/New-Google-Logo.jpg',
    profile_pic: "https://i.pravatar.cc/?img=44",
    date: '2020-01-01',
    city: 'Amsterdam',
    lat: 52.3738,
    lng: 4.8910,
},
{
    id: 8,
    name: 'Sophia Rodriguez',
    rating: 5,
    text: "I am scared of speaking with the press, so I knew I needed help.  I'm so glad I found ABC.  They helped me build a PR strategy that plays to my strengths and gets the results I need.  I am no longer afraid of getting publicity.",
    logo: 'https://1000logos.net/wp-content/uploads/2016/11/New-Google-Logo.jpg',
    profile_pic: "https://i.pravatar.cc/?img=45",
    date: '2020-01-01',
    city: 'Sydney',
    lat: -33.8688,
    lng: 151.2093,
},
{
    id: 9,
    name: 'Wally Martinez',
    rating: 5,
    text: "I would recommend ABC to any business looking for more exposure in the media.  They are the best of the best!",
    logo: 'https://1000logos.net/wp-content/uploads/2016/11/New-Google-Logo.jpg',
    profile_pic: 'https://i.pravatar.cc/',
    date: '2020-01-01',
    city: 'Tokyo',
    lat: 35.6762,
    lng: 139.6503,
},
{
    id: 10,
    name: 'Louisa Hernandez',
    rating: 5,
    text: "Frieza has a fantastic eye for design.  We needed a new logo but weren't happy with any of the options we had.  Frieza helped us design a brand new logo that reflects our specific persona.  We love it.",
    logo: 'https://1000logos.net/wp-content/uploads/2016/11/New-Google-Logo.jpg',
    profile_pic: "https://i.pravatar.cc/?img=60",
    date: '2020-01-01',
    city: 'New York',
    lat: 40.7128,
    lng: -74.0060,
},
{
    id: 11,
    name: "Alex Wilson",
    text:
      "ABC is a true gem - they will bend over backwards to meet your every need.  I feel so fortunate to have found them.  Give them a try - you won't regret it!",
    profile_pic:
      "https://i.pravatar.cc/?img=53",
    lat: "38.7223",
    lng: "9.1393",
    city: "Lisbon",
    source: 'GOOGLE',
    logo: 'https://1000logos.net/wp-content/uploads/2016/11/New-Google-Logo.jpg',
  },
]