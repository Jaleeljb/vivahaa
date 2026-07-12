/* ==========================================================================
   VIVAHA — SAMPLE DATA
   In a production build this would come from an API. Here it powers the
   search/filter UI and the dashboard, and is bilingual per-record.
   ========================================================================== */

const VivahaData = {

  venues: [
    { id: "v1", city: "Mumbai",   type: "banquet", capacity: 500, priceMin: 400000, priceMax: 900000, rating: 4.8, reviews: 214, ph: "ph-1", featured: true,
      name: { en: "The Ivory Grand Banquet", hi: "द आइवरी ग्रैंड बैंक्वेट" }, tagline: { en: "Chandelier-lit hall in Bandra", hi: "बांद्रा में झूमर से सजा हॉल" } },
    { id: "v2", city: "Udaipur",  type: "palace",  capacity: 350, priceMin: 1500000, priceMax: 4000000, rating: 4.9, reviews: 178, ph: "ph-2", featured: true,
      name: { en: "Lake Mahal Palace", hi: "लेक महल पैलेस" }, tagline: { en: "Lakeside heritage palace wedding", hi: "झील किनारे हेरिटेज महल में शादी" } },
    { id: "v3", city: "Goa",      type: "beach",   capacity: 250, priceMin: 600000, priceMax: 1500000, rating: 4.7, reviews: 132, ph: "ph-3", featured: true,
      name: { en: "Sunset Sands Beach Resort", hi: "सनसेट सैंड्स बीच रिज़ॉर्ट" }, tagline: { en: "Barefoot beachside ceremonies", hi: "बीच किनारे नंगे पांव समारोह" } },
    { id: "v4", city: "Jaipur",   type: "palace",  capacity: 400, priceMin: 1800000, priceMax: 5000000, rating: 4.9, reviews: 201, ph: "ph-4", featured: true,
      name: { en: "Rajwada Heritage Fort", hi: "राजवाड़ा हेरिटेज फ़ोर्ट" }, tagline: { en: "Royal courtyard, royal welcome", hi: "शाही आंगन, शाही स्वागत" } },
    { id: "v5", city: "Delhi",    type: "hotel",   capacity: 600, priceMin: 900000, priceMax: 2200000, rating: 4.6, reviews: 256, ph: "ph-1", featured: true,
      name: { en: "The Aravali Grand Hotel", hi: "द अरावली ग्रैंड होटल" }, tagline: { en: "5-star ballroom in Aerocity", hi: "एयरोसिटी में 5-स्टार बॉलरूम" } },
    { id: "v6", city: "Bengaluru", type: "lawn",   capacity: 300, priceMin: 350000, priceMax: 800000, rating: 4.7, reviews: 98, ph: "ph-2", featured: true,
      name: { en: "Green Meadows Lawns", hi: "ग्रीन मीडोज लॉन्स" }, tagline: { en: "Open-air garden celebration", hi: "खुले आसमान में गार्डन उत्सव" } },
    { id: "v7", city: "Jaipur",   type: "resort",  capacity: 450, priceMin: 1200000, priceMax: 3000000, rating: 4.8, reviews: 167,  ph: "ph-3",
      name: { en: "Amber Hills Resort", hi: "अंबर हिल्स रिज़ॉर्ट" }, tagline: { en: "Hilltop views over the Pink City", hi: "पिंक सिटी के ऊपर पहाड़ी दृश्य" } },
    { id: "v8", city: "Mumbai",   type: "hotel",   capacity: 550, priceMin: 1100000, priceMax: 2600000, rating: 4.7, reviews: 189, ph: "ph-4",
      name: { en: "Marina Bay Grand", hi: "मरीना बे ग्रैंड" }, tagline: { en: "Sea-facing ballroom in Worli", hi: "वर्ली में समुद्र दृश्य बॉलरूम" } },
    { id: "v9", city: "Goa",      type: "resort",  capacity: 300, priceMin: 700000, priceMax: 1700000, rating: 4.6, reviews: 121, ph: "ph-1",
      name: { en: "Palm Grove Resort", hi: "पाम ग्रोव रिज़ॉर्ट" }, tagline: { en: "Coconut groves & candle-lit lawns", hi: "नारियल के बाग और मोमबत्ती से सजे लॉन" } },
    { id: "v10", city: "Delhi",   type: "lawn",    capacity: 350, priceMin: 500000, priceMax: 1100000, rating: 4.5, reviews: 143, ph: "ph-2",
      name: { en: "Mughal Garden Lawns", hi: "मुगल गार्डन लॉन्स" }, tagline: { en: "Fountains, arches & open sky", hi: "फव्वारे, मेहराब और खुला आसमान" } },
    { id: "v11", city: "Udaipur", type: "resort",  capacity: 280, priceMin: 1300000, priceMax: 3200000, rating: 4.8, reviews: 112, ph: "ph-3",
      name: { en: "Aravalli Lakeview Resort", hi: "अरावली लेकव्यू रिज़ॉर्ट" }, tagline: { en: "Every window frames a lake view", hi: "हर खिड़की से झील का नज़ारा" } },
    { id: "v12", city: "Bengaluru", type: "banquet", capacity: 400, priceMin: 450000, priceMax: 950000, rating: 4.6, reviews: 87, ph: "ph-4",
      name: { en: "Orchid Palms Banquet", hi: "ऑर्किड पाम्स बैंक्वेट" }, tagline: { en: "Modern banquet in Indiranagar", hi: "इंदिरानगर में आधुनिक बैंक्वेट" } }
  ],

  vendors: [
    { id: "c1", category: "caterers", city: "Mumbai", priceRange: "₹1,200 – ₹2,500 / plate", rating: 4.8, reviews: 240, ph: "ph-3",
      name: { en: "Swaad Regal Caterers", hi: "स्वाद रीगल केटरर्स" }, tagline: { en: "Multi-regional Indian menus", hi: "बहु-क्षेत्रीय भारतीय मेन्यू" } },
    { id: "c2", category: "caterers", city: "Delhi", priceRange: "₹1,000 – ₹2,000 / plate", rating: 4.7, reviews: 198, ph: "ph-1",
      name: { en: "Zaffran Wedding Cuisine", hi: "ज़ाफ़रान वेडिंग क्यूज़ीन" }, tagline: { en: "Mughlai, Punjabi & live counters", hi: "मुगलई, पंजाबी और लाइव काउंटर" } },
    { id: "c3", category: "caterers", city: "Jaipur", priceRange: "₹900 – ₹1,800 / plate", rating: 4.6, reviews: 156, ph: "ph-2",
      name: { en: "Rajasthani Rasoi Caterers", hi: "राजस्थानी रसोई केटरर्स" }, tagline: { en: "Pure vegetarian & Jain specialists", hi: "शुद्ध शाकाहारी और जैन विशेषज्ञ" } },
    { id: "d1", category: "decorators", city: "Jaipur", priceRange: "₹2,00,000 – ₹8,00,000", rating: 4.9, reviews: 134, ph: "ph-4",
      name: { en: "Phoolon Ka Sehra Decor", hi: "फूलों का सेहरा डेकोर" }, tagline: { en: "Floral mandaps & entrance art", hi: "फ्लोरल मंडप और एंट्रेंस आर्ट" } },
    { id: "d2", category: "decorators", city: "Mumbai", priceRange: "₹3,00,000 – ₹12,00,000", rating: 4.8, reviews: 176, ph: "ph-1",
      name: { en: "Studio Vivaaha Decor", hi: "स्टूडियो विवाहा डेकोर" }, tagline: { en: "Contemporary theme design", hi: "समकालीन थीम डिज़ाइन" } },
    { id: "d3", category: "decorators", city: "Goa", priceRange: "₹1,50,000 – ₹6,00,000", rating: 4.7, reviews: 92, ph: "ph-2",
      name: { en: "Beachside Blooms", hi: "बीचसाइड ब्लूम्स" }, tagline: { en: "Boho florals & fairy lights", hi: "बोहो फूल और फेयरी लाइट्स" } },
    { id: "p1", category: "photographers", city: "Delhi", priceRange: "₹80,000 – ₹4,00,000", rating: 4.9, reviews: 289, ph: "ph-3",
      name: { en: "Frame & Fable Studios", hi: "फ़्रेम एंड फेबल स्टूडियोज़" }, tagline: { en: "Cinematic candid storytelling", hi: "सिनेमैटिक कैंडिड कहानी" } },
    { id: "p2", category: "photographers", city: "Bengaluru", priceRange: "₹60,000 – ₹3,00,000", rating: 4.7, reviews: 154, ph: "ph-4",
      name: { en: "Shutter Tales Photography", hi: "शटर टेल्स फोटोग्राफी" }, tagline: { en: "Drone + same-day edits", hi: "ड्रोन + सेम-डे एडिट" } },
    { id: "p3", category: "photographers", city: "Udaipur", priceRange: "₹1,00,000 – ₹5,00,000", rating: 4.8, reviews: 121, ph: "ph-1",
      name: { en: "Palace Light Films", hi: "पैलेस लाइट फ़िल्म्स" }, tagline: { en: "Heritage-wedding specialists", hi: "हेरिटेज-वेडिंग विशेषज्ञ" } },
    { id: "m1", category: "music", city: "Mumbai", priceRange: "₹50,000 – ₹3,00,000", rating: 4.8, reviews: 167, ph: "ph-2",
      name: { en: "DJ Rhythm Republic", hi: "डीजे रिद्म रिपब्लिक" }, tagline: { en: "High-energy DJ + sound", hi: "हाई-एनर्जी डीजे + साउंड" } },
    { id: "m2", category: "music", city: "Delhi", priceRange: "₹1,50,000 – ₹6,00,000", rating: 4.7, reviews: 103, ph: "ph-3",
      name: { en: "Sufi Soul Live Band", hi: "सूफ़ी सोल लाइव बैंड" }, tagline: { en: "Live Sufi & folk fusion", hi: "लाइव सूफ़ी और लोक फ्यूज़न" } },
    { id: "m3", category: "music", city: "Jaipur", priceRange: "₹40,000 – ₹1,50,000", rating: 4.6, reviews: 88, ph: "ph-4",
      name: { en: "Sangeet Steps Choreography", hi: "संगीत स्टेप्स कोरियोग्राफी" }, tagline: { en: "Family sangeet choreography", hi: "पारिवारिक संगीत कोरियोग्राफी" } },
    { id: "mk1", category: "makeup", city: "Mumbai", priceRange: "₹25,000 – ₹1,50,000", rating: 4.9, reviews: 212, ph: "ph-1",
      name: { en: "Glow by Riya Kapoor", hi: "ग्लो बाय रिया कपूर" }, tagline: { en: "HD bridal makeup artist", hi: "एचडी ब्राइडल मेकअप आर्टिस्ट" } },
    { id: "mk2", category: "makeup", city: "Delhi", priceRange: "₹20,000 – ₹1,20,000", rating: 4.7, reviews: 145, ph: "ph-2",
      name: { en: "Mehendi by Anushka", hi: "मेहंदी बाय अनुष्का" }, tagline: { en: "Bridal & Arabic mehendi art", hi: "ब्राइडल और अरबी मेहंदी आर्ट" } },
    { id: "mk3", category: "makeup", city: "Bengaluru", priceRange: "₹18,000 – ₹90,000", rating: 4.6, reviews: 97, ph: "ph-3",
      name: { en: "Groom Edit Styling", hi: "ग्रूम एडिट स्टाइलिंग" }, tagline: { en: "Sherwani & grooming specialists", hi: "शेरवानी और ग्रूमिंग विशेषज्ञ" } },
    { id: "i1", category: "invitations", city: "Jaipur", priceRange: "₹80 – ₹1,200 / card", rating: 4.8, reviews: 76, ph: "ph-4",
      name: { en: "Likhawat Invitation Studio", hi: "लिखावट इनविटेशन स्टूडियो" }, tagline: { en: "Hand-crafted boxed invites", hi: "हाथ से बने बॉक्स्ड निमंत्रण" } },
    { id: "i2", category: "invitations", city: "Mumbai", priceRange: "₹15 – ₹150 / e-invite", rating: 4.7, reviews: 112, ph: "ph-1",
      name: { en: "Digital Shaadi Cards", hi: "डिजिटल शादी कार्ड्स" }, tagline: { en: "Animated video e-invites", hi: "एनिमेटेड वीडियो ई-निमंत्रण" } },
    { id: "i3", category: "invitations", city: "Delhi", priceRange: "₹60 – ₹800 / card", rating: 4.6, reviews: 64, ph: "ph-2",
      name: { en: "The Paper Baraat", hi: "द पेपर बारात" }, tagline: { en: "Letterpress & silk-thread cards", hi: "लेटरप्रेस और सिल्क-थ्रेड कार्ड्स" } }
  ],

  decorationStyles: [
    { id: "ds1", icon: "fa-seedling", ph: "ph-2", illustration: "floral", name: { en: "Floral Mandap", hi: "फ्लोरल मंडप" }, desc: { en: "Marigold, orchid & rose installations", hi: "गेंदा, ऑर्किड और गुलाब की सजावट" } },
    { id: "ds2", icon: "fa-chess-rook", ph: "ph-1", illustration: "palace", name: { en: "Royal Rajwada", hi: "रॉयल राजवाड़ा" }, desc: { en: "Regal drapes, brass & jharokha arches", hi: "शाही परदे, पीतल और झरोखा मेहराब" } },
    { id: "ds3", icon: "fa-shapes", ph: "ph-4", illustration: "modernDecor", name: { en: "Modern Minimal", hi: "मॉडर्न मिनिमल" }, desc: { en: "Clean lines, neutral tones, statement light", hi: "साफ़ लाइनें, न्यूट्रल टोन, स्टेटमेंट लाइट" } },
    { id: "ds4", icon: "fa-umbrella-beach", ph: "ph-3", illustration: "beach", name: { en: "Beach Boho", hi: "बीच बोहो" }, desc: { en: "Driftwood, fairy lights & sea breeze", hi: "ड्रिफ्टवुड, फेयरी लाइट्स और समुद्री हवा" } }
  ],

  musicServices: [
    { id: "ms1", icon: "fa-compact-disc", name: { en: "Professional DJ", hi: "प्रोफेशनल डीजे" }, desc: { en: "Curated playlists for every generation", hi: "हर उम्र के लिए क्यूरेटेड प्लेलिस्ट" } },
    { id: "ms2", icon: "fa-guitar", name: { en: "Live Band", hi: "लाइव बैंड" }, desc: { en: "Sufi, folk and Bollywood fusion", hi: "सूफ़ी, लोक और बॉलीवुड फ्यूज़न" } },
    { id: "ms3", icon: "fa-drum", name: { en: "Dhol & Baraat", hi: "ढोल और बारात" }, desc: { en: "Traditional dhol for the grand entry", hi: "भव्य एंट्री के लिए पारंपरिक ढोल" } },
    { id: "ms4", icon: "fa-person-walking", name: { en: "Sangeet Choreography", hi: "संगीत कोरियोग्राफी" }, desc: { en: "Family-friendly dance routines", hi: "परिवार के लिए डांस रूटीन" } }
  ],

  testimonials: [
    { id: "t1", name: "Ananya & Rohan", city: "Mumbai", rating: 5, initials: "AR",
      quote: { en: "Vivaha's planner tracked every rupee for us — we knew our budget down to the last decoration item. Our wedding felt effortless.", hi: "विवाह के प्लानर ने हमारे लिए हर रुपये का हिसाब रखा — हमें अपने बजट का आख़िरी सजावट के सामान तक पता था। हमारी शादी बिना किसी तनाव के हुई।" } },
    { id: "t2", name: "Priya & Karan", city: "Jaipur", rating: 5, initials: "PK",
      quote: { en: "We found our palace venue and caterer in the same afternoon. The Hindi interface meant my parents could plan right alongside us.", hi: "हमें अपना महल वेन्यू और केटरर एक ही दोपहर में मिल गए। हिंदी इंटरफेस के कारण मेरे माता-पिता भी हमारे साथ प्लानिंग कर सके।" } },
    { id: "t3", name: "Meera & Aditya", city: "Goa", rating: 4.5, initials: "MA",
      quote: { en: "Our destination wedding had twelve vendors from three cities. Vivaha's dashboard kept everyone — and us — perfectly in sync.", hi: "हमारी डेस्टिनेशन वेडिंग में तीन शहरों से बारह वेंडर थे। विवाह के डैशबोर्ड ने सभी को — और हमें भी — पूरी तरह तालमेल में रखा।" } }
  ],

  gallery: [
    { id: "g1", category: "decoration", ph: "ph-1" }, { id: "g2", category: "mehendi", ph: "ph-2" },
    { id: "g3", category: "sangeet", ph: "ph-3" }, { id: "g4", category: "ceremony", ph: "ph-4" },
    { id: "g5", category: "reception", ph: "ph-2" }, { id: "g6", category: "bridal", ph: "ph-1" },
    { id: "g7", category: "decoration", ph: "ph-3" }, { id: "g8", category: "mehendi", ph: "ph-4" },
    { id: "g9", category: "sangeet", ph: "ph-1" }, { id: "g10", category: "ceremony", ph: "ph-2" },
    { id: "g11", category: "reception", ph: "ph-3" }, { id: "g12", category: "bridal", ph: "ph-4" },
    { id: "g13", category: "decoration", ph: "ph-2" }, { id: "g14", category: "ceremony", ph: "ph-1" },
    { id: "g15", category: "sangeet", ph: "ph-4" }, { id: "g16", category: "reception", ph: "ph-1" },
    { id: "g17", category: "bridal", ph: "ph-3" }, { id: "g18", category: "mehendi", ph: "ph-1" }
  ],

  /* Planner budget model — base costs (INR) per selection, scaled by guest count where noted */
  plannerCosts: {
    type:        { traditional: 0, destination: 400000, royal: 300000, modern: 0, beach: 150000, interfaith: 100000 },
    venue:       { banquet: 500000, resort: 1200000, palace: 2200000, lawn: 350000, beach: 700000, hotel: 1400000 },
    food:        { veg: 900, nonveg: 1300, jain: 950, vegan: 1100, regional: 1500 }, // per guest
    decoration:  { floral: 250000, royal: 600000, modern: 350000, boho: 220000, themed: 450000 },
    music:       { dj: 90000, liveband: 350000, classical: 180000, choreographer: 60000, none: 0 },
    photography: { basic: 120000, standard: 280000, premium: 550000, none: 0 },
    bridal:      { makeup: 60000, mehendi: 25000, styling: 40000, jewellery: 20000, none: 0 }, // per selected checkbox
    invitations: { digital: 8000, printed: 60000, boxed: 180000, none: 0 }
  },

  notifications: [
    { id: "n1", icon: "fa-circle-check", unread: true,  title: { en: "Venue booking confirmed", hi: "वेन्यू बुकिंग की पुष्टि हुई" }, desc: { en: "The Ivory Grand Banquet confirmed your date.", hi: "द आइवरी ग्रैंड बैंक्वेट ने आपकी तारीख़ की पुष्टि की।" }, time: "2h ago" },
    { id: "n2", icon: "fa-comment-dots", unread: true,  title: { en: "New message from your planner", hi: "आपके प्लानर से नया संदेश" }, desc: { en: "\"Let's finalise the decor mood board this week.\"", hi: "\"इस सप्ताह डेकोर मूड बोर्ड फाइनल करते हैं।\"" }, time: "5h ago" },
    { id: "n3", icon: "fa-tag", unread: false, title: { en: "Price drop on a wishlisted vendor", hi: "विशलिस्ट वेंडर की कीमत घटी" }, desc: { en: "Frame & Fable Studios lowered their package price.", hi: "फ़्रेम एंड फेबल स्टूडियोज़ ने अपनी पैकेज कीमत घटाई।" }, time: "1d ago" },
    { id: "n4", icon: "fa-calendar-check", unread: false, title: { en: "Payment milestone due in 7 days", hi: "पेमेंट माइलस्टोन 7 दिनों में देय है" }, desc: { en: "Second instalment for Rajwada Heritage Fort.", hi: "राजवाड़ा हेरिटेज फ़ोर्ट के लिए दूसरी किस्त।" }, time: "2d ago" }
  ]
};
