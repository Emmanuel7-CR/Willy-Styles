export const SITE = {
  name: 'Willy Styles',
  // Hero background. heroImage is always shown (and is the fallback).
  // When you have a clip, put it in public/assets/ and set heroVideo to its path,
  // e.g. '/assets/hero.mp4'. Leave it as null to use the photo only.
  heroImage: '/assets/cut-5.jpg',
  heroVideo: null,
  phoneDisplay: '+234 814 369 0562',
  phoneIntl: '2348143690562',
  whatsappLink: 'https://wa.link/js8keg',
  instagram: 'https://www.instagram.com/willystyles00001',
  instagramHandle: '@willystyles00001',
  tiktok: 'https://www.tiktok.com/@willystyles01',
  areas: ['Sapele', 'Warri', 'Ughelli', 'Oghara'],
  hours: [
    ['Monday to Thursday', '10:00 to 20:00'],
    ['Friday', '10:00 to 15:00'],
    ['Saturday and Sunday', '12:00 to 20:00'],
  ],
}

// Each entry is a real cut photo from the original site.
export const WORKS = [
  { slug: 'low-fade', title: 'Low fade', category: 'Fades', tags: ['Fades'], img: '/assets/cut-1.jpg', w: 1080, h: 1009, service: 'Skin Fade', blurb: 'A low fade with a clean, even lineup.', details: ['Low fade', 'Lineup', 'Cut at home'] },
  { slug: 'fade-and-beard', title: 'Fade and beard', category: 'Fades', tags: ['Fades', 'Beard'], img: '/assets/cut-2.jpg', w: 810, h: 1080, service: 'Full Package', blurb: 'Fade on the sides with a shaped beard, cut together so the lines match.', details: ['Fade', 'Beard shaping', 'Lineup'] },
  { slug: 'twists', title: 'Twists', category: 'Twists', tags: ['Twists'], img: '/assets/cut-4.jpg', w: 720, h: 953, service: 'Twists and Braids', blurb: 'Neat twists with a clean part and a sharp edge.', details: ['Twists', 'Clean parting', 'Edge-up'] },
  { slug: 'textured-top-beard', title: 'Textured top and beard', category: 'Beard', tags: ['Beard'], img: '/assets/cut-3.jpg', w: 810, h: 1080, service: 'Beard Grooming', blurb: 'Textured top with a full beard, shaped and lined up.', details: ['Textured top', 'Beard shape', 'Neckline'] },
  { slug: 'skin-fade', title: 'Skin fade', category: 'Fades', tags: ['Fades'], img: '/assets/cut-5.jpg', w: 1240, h: 1280, service: 'Skin Fade', blurb: 'A skin fade with a sharp hairline.', details: ['Skin fade', 'Hairline', 'Cut at home'] },
  { slug: 'fade-with-design', title: 'Fade with a hair design', category: 'Fades', tags: ['Fades'], img: '/assets/cut-6.jpg', w: 1200, h: 1600, service: 'Skin Fade', blurb: 'A skin fade with a sharp lineup and a small design cut into the side.', details: ['Skin fade', 'Sharp lineup', 'Hair design'] },
  { slug: 'textured-top-fade', title: 'Textured top and fade', category: 'Fades', tags: ['Fades'], img: '/assets/cut-7.jpg', w: 1200, h: 1600, service: 'Skin Fade', blurb: 'A textured top with a clean fade and a crisp, squared hairline.', details: ['Textured top', 'Fade', 'Squared hairline'] },
  { slug: 'crisp-fade', title: 'Crisp fade', category: 'Fades', tags: ['Fades'], img: '/assets/cut-8.jpg', w: 1200, h: 1600, service: 'Skin Fade', blurb: 'A close fade with a sharp, even lineup.', details: ['Close fade', 'Sharp lineup', 'Cut at home'] },
]

export const WORK_FILTERS = ['All', 'Fades', 'Twists', 'Beard']

// Prices are intentionally not shown anywhere on the site.
export const SERVICES = [
  { id: 'Haircut', name: 'Haircut', blurb: 'Clean fades, modern cuts and sharp finishes at your location.' },
  { id: 'Skin Fade', name: 'Skin fade', blurb: 'A smooth blend down to the skin with a sharp hairline.' },
  { id: 'Twists and Braids', name: 'Twists and braids', blurb: 'Neat parts and a clean edge so the style holds.' },
  { id: 'Beard Grooming', name: 'Hair and beard lineup', blurb: 'Sharp hairline and beard shaping for a clean, polished look.' },
  { id: 'Hair Dye and Tinting', name: 'Hair dye and tinting', blurb: 'Professional colouring and tinting, applied with precision.' },
  { id: 'Kids Cut', name: 'Kids haircut', blurb: 'A quick, tidy cut for the little ones, at home.' },
  { id: 'Full Package', name: 'Haircut and beard', blurb: 'Hair and beard done together, so the lines match.' },
]

export const STEPS = [
  { title: 'Send your request', text: 'Pick a service, your area and a time on the booking page. It opens in WhatsApp, ready to send.' },
  { title: 'Willy confirms', text: 'He replies on WhatsApp with a slot that works for you.' },
  { title: 'He comes to you', text: 'Willy arrives on time with everything he needs, and you skip the queue.' },
]

export const FAQS = [
  { q: 'Do you travel outside Sapele?', a: 'Yes. Willy covers Sapele, Warri, Ughelli, Oghara and other parts of Delta State. Message on WhatsApp to confirm your area.' },
  { q: 'What safety measures do you follow?', a: 'All tools are sterilized and linen is fresh for every client. Strict hygiene practice applies at every visit, right at your doorstep.' },
  { q: 'Can I reschedule my appointment?', a: 'Yes. Message Willy on WhatsApp and he will move your booking to a time that works.' },
  { q: 'How do I book?', a: 'Use the booking page. Your request opens in WhatsApp, ready to send, and Willy confirms a time there.' },
  ]

export const REVIEWS = [
  { text: "Guy came to my house and gave me one of the cleanest fades I've had in years. No stress of going to the shop. Highly recommend Willy Styles!", name: 'Emmanuel O.', place: 'Sapele' },
  { text: 'Best mobile barber service. He was punctual, polite, and the beard trim was sharp. Will definitely book again.', name: 'Alvin N.', place: 'Oghara' },
]
