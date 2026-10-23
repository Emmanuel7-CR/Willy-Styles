export const SITE = {
  name: 'Willy Styles',
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
  {
    slug: 'low-fade',
    title: 'Low fade',
    category: 'Fades',
    tags: ['Fades'],
    img: '/assets/cut-1.jpg',
    w: 1080,
    h: 1009,
    service: 'Skin Fade',
    blurb: 'A soft low fade with a crisp, symmetrical lineup. Clean enough for the office, relaxed enough for the weekend.',
    details: ['Low blend into the skin', 'Sharp edge-up', 'Cut at home'],
  },
  {
    slug: 'fade-and-beard',
    title: 'Fade and beard',
    category: 'Fades',
    tags: ['Fades', 'Beard'],
    img: '/assets/cut-2.jpg',
    w: 810,
    h: 1080,
    service: 'Full Package (Hair + Beard)',
    blurb: 'Short tapered sides with a neatly shaped beard. Hair and beard cut together so the lines match.',
    details: ['Tapered sides', 'Shaped beard', 'Hairline matched to beard'],
  },
  {
    slug: 'twists',
    title: 'Twists',
    category: 'Twists',
    tags: ['Twists'],
    img: '/assets/cut-4.jpg',
    w: 720,
    h: 953,
    service: 'Twists and Braids',
    blurb: 'Even twists with a clean centre part and a tidy edge-up, finished so they hold their shape.',
    details: ['Neat parting', 'Clean edge-up', 'Even twist size'],
  },
  {
    slug: 'textured-top-beard',
    title: 'Textured top and beard',
    category: 'Beard',
    tags: ['Beard'],
    img: '/assets/cut-3.jpg',
    w: 810,
    h: 1080,
    service: 'Beard Grooming and Lineup',
    blurb: 'A textured top with a full, well-shaped beard and a clean neckline. Done on a porch with the tools laid out.',
    details: ['Textured top', 'Beard shape and neckline', 'Cut outdoors at home'],
  },
  {
    slug: 'skin-fade',
    title: 'Skin fade',
    category: 'Fades',
    tags: ['Fades'],
    img: '/assets/cut-5.jpg',
    w: 1240,
    h: 1280,
    service: 'Skin Fade',
    blurb: 'A smooth skin fade with a sharp hairline, the kind of cut that photographs well from every side.',
    details: ['Skin-smooth blend', 'Sharp hairline', 'Finished in the living room'],
  },
]

export const WORK_FILTERS = ['All', 'Fades', 'Twists', 'Beard']

// Prices are intentionally not shown anywhere on the site.
export const SERVICES = [
  {
    id: 'Haircut',
    name: 'Classic haircut',
    blurb: 'Clean scissor and clipper work, shaped to your head and finished with a tidy lineup.',
    includes: ['Consultation on the cut', 'Scissor and clipper work', 'Neck and edge clean-up', 'Fresh cape and sterilized tools'],
  },
  {
    id: 'Skin Fade',
    name: 'Skin fade',
    blurb: 'A smooth blend from skin to length with a sharp, symmetrical hairline.',
    includes: ['Low, mid or high blend', 'Edge-up and hairline', 'Neck clean-up', 'Fresh cape and sterilized tools'],
  },
  {
    id: 'Twists and Braids',
    name: 'Twists and braids',
    blurb: 'Neat parts, even sections and a clean edge so your style holds.',
    includes: ['Even parting', 'Edge-up', 'Finished and shaped', 'Fresh cape and sterilized tools'],
  },
  {
    id: 'Beard Grooming',
    name: 'Beard and lineup',
    blurb: 'Shape, trim and sharp lines for the beard and the hairline.',
    includes: ['Beard shaping and trim', 'Cheek and neck lines', 'Hairline lineup', 'Fresh cape and sterilized tools'],
  },
  {
    id: 'Hair Dye and Tinting',
    name: 'Hair dye and tinting',
    blurb: 'Professional colouring and tinting applied with precision.',
    includes: ['Colour consultation', 'Precise application', 'Clean finish', 'Fresh cape and sterilized tools'],
  },
  {
    id: 'Kids Cut',
    name: 'Kids haircut',
    blurb: 'Patient, quick and tidy for the little ones, in the comfort of home.',
    includes: ['Gentle, unhurried approach', 'Neat shape and edges', 'Fresh cape and sterilized tools'],
  },
  {
    id: 'Full Package',
    name: 'Full package',
    blurb: 'Haircut and beard together, so every line matches from head to chin.',
    includes: ['Haircut of your choice', 'Beard shaping and lineup', 'Matched hairline', 'Fresh cape and sterilized tools'],
  },
]

export const STEPS = [
  { n: '01', title: 'Pick your cut', text: 'Choose a service and tell Willy your area, then send the request on WhatsApp.' },
  { n: '02', title: 'Lock a time', text: 'Willy confirms a slot that suits you. No queue, no guessing, no waiting around.' },
  { n: '03', title: 'Sit back', text: 'He arrives on time with everything needed, does the cut, and leaves your space clean.' },
]

export const FAQS = [
  { q: 'Do you travel outside Sapele?', a: 'Yes. Willy covers Sapele, Warri, Ughelli, Oghara and other parts of Delta State. Message on WhatsApp to confirm your area.' },
  { q: 'What safety measures do you follow?', a: 'All tools are sterilized and linen is fresh for every client. Strict hygiene practice applies at every visit, right at your doorstep.' },
  { q: 'Can I reschedule my appointment?', a: 'Yes. Message Willy on WhatsApp and he will move your booking to a time that works.' },
  { q: 'How do I book?', a: 'Use the booking page. Your request opens in WhatsApp, ready to send, and Willy confirms your slot there.' },
  { q: 'Do I need to prepare anything?', a: 'Just a seat, good light and a bit of space. Willy brings the tools, cape and everything else.' },
]

export const REVIEWS = [
  { text: "Guy came to my house and gave me one of the cleanest fades I've had in years. No stress of going to the shop. Highly recommend Willy Styles!", name: 'Emmanuel O.', place: 'Sapele' },
  { text: 'Best mobile barber service. He was punctual, polite, and the beard trim was sharp. Will definitely book again.', name: 'Alvin N.', place: 'Oghara' },
]
