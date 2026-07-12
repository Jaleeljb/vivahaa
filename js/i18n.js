/* ==========================================================================
   VIVAHA — i18n ENGINE
   Loads /locales/en.json and /locales/hi.json and swaps every element
   marked with data-i18n="dot.path.key" (and data-i18n-placeholder /
   data-i18n-title) without a page reload.
   ========================================================================== */

const I18N = (() => {
  const STORAGE_KEY = "vivaha_lang";
  const SUPPORTED = ["en", "hi"];
  // Full copy of locales/en.json and locales/hi.json, embedded directly so the
  // site works perfectly even if fetch() can't reach /locales — e.g. when the
  // page is opened via file:// instead of a local server, or a host serves
  // the HTML without the locales/ folder. This is regenerated from the JSON
  // files themselves (see the "embed i18n fallback" step in the project
  // history) — if you edit locales/*.json significantly, regenerate this too
  // so the two stay in sync.
  const FALLBACK_STRINGS = {
    en:
    {
      "meta": {
        "siteName": "Vivaha",
        "tagline": "Where Every Ritual Finds Its Place"
      },
      "nav": {
        "home": "Home",
        "about": "About",
        "services": "Services",
        "packages": "Packages",
        "venues": "Venues",
        "vendors": "Vendors",
        "gallery": "Gallery",
        "contact": "Contact",
        "login": "Log In",
        "register": "Sign Up",
        "dashboard": "Dashboard",
        "planMyWedding": "Plan My Wedding",
        "logout": "Log Out"
      },
      "common": {
        "learnMore": "Learn More",
        "viewDetails": "View Details",
        "bookNow": "Book Now",
        "addToWishlist": "Add to Wishlist",
        "removeWishlist": "Remove from Wishlist",
        "viewAll": "View All",
        "submit": "Submit",
        "sendMessage": "Send Message",
        "getStarted": "Get Started",
        "save": "Save",
        "cancel": "Cancel",
        "edit": "Edit",
        "delete": "Delete",
        "apply": "Apply Filters",
        "clear": "Clear",
        "search": "Search",
        "next": "Next",
        "previous": "Previous",
        "back": "Back",
        "finish": "Finish & Save Plan",
        "seeFullGallery": "See Full Gallery",
        "subscribe": "Subscribe",
        "savePlan": "Save This Plan",
        "tryAgain": "Try Again",
        "from": "From",
        "perGuest": "per guest",
        "onwards": "onwards",
        "guests": "Guests",
        "capacity": "Capacity",
        "rating": "Rating",
        "reviews": "reviews",
        "allCategories": "All",
        "noResults": "No results found. Try adjusting your filters.",
        "loading": "Loading…",
        "required": "This field is required.",
        "currencySymbol": "₹",
        "readMore": "Read More",
        "close": "Close",
        "yes": "Yes",
        "no": "No",
        "wishlistEmpty": "Your wishlist is empty.",
        "min": "Min",
        "max": "Max"
      },
      "toast": {
        "languageChanged": "Language changed to English",
        "addedWishlist": "Added to your wishlist",
        "removedWishlist": "Removed from your wishlist",
        "loginSuccess": "Welcome back! Redirecting to your dashboard…",
        "loginError": "Incorrect email or password.",
        "registerSuccess": "Account created! Please log in.",
        "registerError": "An account with this email already exists.",
        "contactSuccess": "Your message has been sent. We'll be in touch soon!",
        "planSaved": "Your wedding plan has been saved to your dashboard.",
        "bookingRequested": "Booking request sent! Track it from your dashboard.",
        "profileSaved": "Profile updated successfully.",
        "loginRequired": "Please log in to continue.",
        "logoutSuccess": "You've been logged out.",
        "bookingCancelled": "Booking cancelled.",
        "subscribed": "You're subscribed! Watch your inbox for wedding inspiration."
      },
      "footer": {
        "about": "Vivaha is India's premium wedding planning platform — curating venues, vendors and rituals into one seamless celebration.",
        "quickLinks": "Quick Links",
        "ourServices": "Our Services",
        "getInTouch": "Get in Touch",
        "address": "3rd Floor, Ivory House, Bandra West, Mumbai, Maharashtra 400050",
        "phone": "+91 98765 43210",
        "email": "hello@vivaha.in",
        "newsletterTitle": "Join our wedding journal",
        "newsletterPlaceholder": "Your email address",
        "rights": "All rights reserved.",
        "privacy": "Privacy Policy",
        "terms": "Terms of Service",
        "sitemap": "Sitemap"
      },
      "home": {
        "hero": {
          "eyebrow": "From 40 Phone Calls to One Dashboard",
          "title": "Every Ritual, Every Rupee, Beautifully Arranged",
          "subtitle": "From the first haldi to the final vidaai, we line up the venues, vendors and artisans — so your own family finally gets to attend this wedding as guests, not staff.",
          "cta1": "Plan My Wedding",
          "cta2": "Explore Venues",
          "scriptTag": "so, shall we begin?",
          "stat1Num": "1,200+",
          "stat1Label": "Weddings Planned",
          "stat2Num": "480+",
          "stat2Label": "Trusted Vendors",
          "stat3Num": "60+",
          "stat3Label": "Cities Covered",
          "stat4Num": "4.9/5",
          "stat4Label": "Average Rating"
        },
        "search": {
          "title": "Start Planning in Seconds",
          "destinationLabel": "City",
          "typeLabel": "Wedding Type",
          "dateLabel": "Wedding Date",
          "guestsLabel": "Guests",
          "searchBtn": "Search"
        },
        "categories": {
          "eyebrow": "Nine Vendors, Zero Spreadsheets",
          "title": "Everything Your Wedding Needs",
          "subtitle": "Nine services, one coordinated plan — so you're not the one juggling vendor calls at 11pm.",
          "venues": "Venues",
          "venuesDesc": "Palaces, resorts, banquets & beach lawns",
          "catering": "Catering",
          "cateringDesc": "Veg, non-veg, Jain, vegan & regional cuisine",
          "decoration": "Decoration",
          "decorationDesc": "Floral mandaps to modern minimal themes",
          "photography": "Photography",
          "photographyDesc": "Candid, cinematic & traditional coverage",
          "music": "Music & DJ",
          "musicDesc": "Live bands, DJs, sangeet choreography",
          "bridal": "Bridal & Groom",
          "bridalDesc": "Makeup, mehendi, sherwani & jewellery styling",
          "invitations": "Invitations",
          "invitationsDesc": "Digital e-vites to hand-crafted boxes",
          "guests": "Guest Management",
          "guestsDesc": "RSVPs, seating & travel coordination",
          "budget": "Budget Planning",
          "budgetDesc": "Real-time cost estimates as you plan"
        },
        "venues": {
          "eyebrow": "Already Vetted, Already Loved",
          "title": "Featured Venues",
          "subtitle": "Site-visited by our team, loved by the couples before you."
        },
        "caterers": {
          "eyebrow": "Taste of Tradition",
          "title": "Popular Caterers",
          "subtitle": "Menus that bring every region of India to your table."
        },
        "decoration": {
          "eyebrow": "Set The Scene",
          "title": "Decoration Styles",
          "subtitle": "From royal Rajwada drapes to breezy beachside florals."
        },
        "music": {
          "eyebrow": "Set The Mood",
          "title": "Music & Entertainment",
          "subtitle": "Performers who know exactly when to slow it down — and when to bring the dhol."
        },
        "packages": {
          "eyebrow": "Simple, Transparent Pricing",
          "title": "Wedding Packages",
          "subtitle": "Start with a package, then make every line item yours."
        },
        "testimonials": {
          "eyebrow": "Real Weddings, Real Stories",
          "title": "What Our Couples Say"
        },
        "gallery": {
          "eyebrow": "Moments We Made",
          "title": "From Our Wedding Album",
          "subtitle": "A glimpse of the weddings we've had the joy of pulling together."
        },
        "cta": {
          "title": "Ready to Stop Juggling and Start Planning?",
          "subtitle": "Tell us the date and the city — we'll bring the venues, the vendors, and the checklist.",
          "btn": "Start Planning Now"
        }
      },
      "about": {
        "hero": {
          "eyebrow": "Our Story",
          "title": "Every Wedding Should Still Feel Like Yours"
        },
        "story": {
          "eyebrow": "How Vivaha Began",
          "title": "A Platform Born From 1,000 Family Weddings",
          "p1": "Vivaha started in 2019, when three friends — a wedding photographer, an event planner and a software engineer — kept hearing the same complaint from every family: planning an Indian wedding meant forty phone calls, a dozen spreadsheets, and never quite knowing if the budget actually added up.",
          "p2": "So we built the platform we wished existed: one place to discover venues, compare vendors, plan every ritual and track the budget — in English or Hindi, from a phone or a laptop.",
          "p3": "Today our planners and engineers work with families in 60-plus cities. The goal hasn't moved an inch: give every couple enough clarity to actually enjoy their own wedding."
        },
        "values": {
          "eyebrow": "What Guides Us",
          "title": "Our Values",
          "v1Title": "Rooted in Ritual",
          "v1Desc": "We design around your customs and traditions, never around a template.",
          "v2Title": "Radical Transparency",
          "v2Desc": "Every rupee is itemised. No hidden vendor commissions, ever.",
          "v3Title": "Verified Partners",
          "v3Desc": "Every venue and vendor is site-visited and background-checked.",
          "v4Title": "Always Reachable",
          "v4Desc": "A dedicated planner is one message away, right up to the big day."
        },
        "team": {
          "eyebrow": "Meet The Team",
          "title": "The People Behind Your Celebration",
          "subtitle": "A close-knit team of planners, designers and relationship managers."
        },
        "why": {
          "eyebrow": "Why Vivaha",
          "title": "What Keeps Families Coming Back",
          "w1": "Pan-India network of verified venues & vendors",
          "w2": "Transparent, itemised budgeting in real time",
          "w3": "Bilingual planning experience — English & Hindi",
          "w4": "Dedicated relationship manager for every booking",
          "w5": "Secure payments with milestone-based release",
          "w6": "24x7 support in the final week before your wedding"
        }
      },
      "services": {
        "hero": {
          "eyebrow": "Nine Jobs, One Team",
          "title": "Wedding Services",
          "subtitle": "Every service your celebration needs — coordinated by one team."
        },
        "s1Title": "Venue Sourcing",
        "s1Desc": "Palaces, five-star banquets, destination resorts and intimate lawns, shortlisted to your guest count, city and budget.",
        "s2Title": "Catering & Cuisine",
        "s2Desc": "Vegetarian, non-vegetarian, Jain, vegan and regional menus with live tasting sessions before you decide.",
        "s3Title": "Decor & Styling",
        "s3Desc": "Mandap design, floral installations, lighting and theme styling from classic Rajwada to modern minimal.",
        "s4Title": "Photography & Films",
        "s4Desc": "Candid photography, cinematic wedding films, drone coverage and same-day highlight reels.",
        "s5Title": "Music, DJ & Choreography",
        "s5Desc": "Live sufi and folk bands, professional DJs, and sangeet choreographers for every generation on the dance floor.",
        "s6Title": "Bridal & Groom Styling",
        "s6Desc": "Makeup artists, mehendi designers, sherwani & lehenga stylists, and jewellery consultants.",
        "s7Title": "Invitations & Favours",
        "s7Desc": "Digital e-invites, hand-crafted boxed invitations, and personalised return gifts for guests.",
        "s8Title": "Guest & Travel Management",
        "s8Desc": "Digital RSVPs, seating charts, hotel blocks and airport transfers for out-of-town guests.",
        "s9Title": "Budget & Planning Tools",
        "s9Desc": "A live wedding planner with real-time cost tracking, so you always know where you stand.",
        "process": {
          "eyebrow": "How It Works",
          "title": "From First Click to Final Vow",
          "step1Title": "Tell Us Your Vision",
          "step1Desc": "Share your city, dates, guest count and style preferences.",
          "step2Title": "See Your Shortlist",
          "step2Desc": "We match venues and vendors to your budget and your taste — not the other way around.",
          "step3Title": "Customise & Confirm",
          "step3Desc": "Fine-tune every detail with your dedicated planner.",
          "step4Title": "Celebrate, Stress-Free",
          "step4Desc": "We coordinate every vendor on the day so you don't have to."
        }
      },
      "packages": {
        "hero": {
          "eyebrow": "Four Starting Points, Infinite Combinations",
          "title": "Wedding Packages",
          "subtitle": "Pick the closest match, then make it yours."
        },
        "billing": {
          "perDay": "Per-day pricing shown for a 300-guest celebration in a Tier-1 city. Final cost depends on your customisations.",
          "customCta": "Don't see the fit? Build a fully custom plan.",
          "customBtn": "Build Custom Plan"
        },
        "silver": {
          "name": "Silver Ritual",
          "desc": "An elegant, essential celebration for intimate weddings.",
          "f1": "Banquet hall or lawn venue",
          "f2": "Standard vegetarian & non-veg menu",
          "f3": "Classic floral mandap decor",
          "f4": "Candid photography (1 day)",
          "f5": "DJ with sound & lighting",
          "f6": "Digital e-invitations"
        },
        "gold": {
          "name": "Gold Celebration",
          "badge": "Most Popular",
          "desc": "Our most-loved package — balanced, beautiful, complete.",
          "f1": "Premium banquet or resort venue",
          "f2": "Multi-cuisine live counters",
          "f3": "Designer mandap & entrance decor",
          "f4": "Photography + cinematic film (2 days)",
          "f5": "Live band + DJ + sangeet choreography",
          "f6": "Boxed invitations + return gifts",
          "f7": "Dedicated wedding planner"
        },
        "platinum": {
          "name": "Platinum Affair",
          "desc": "A grand, multi-day celebration across ceremonies.",
          "f1": "Luxury resort or heritage property",
          "f2": "Celebrity chef curated multi-cuisine menu",
          "f3": "Premium theme decor across all functions",
          "f4": "Full film crew + drone + same-day edit",
          "f5": "Live band, celebrity DJ & choreography",
          "f6": "Personalised bridal & groom styling",
          "f7": "Guest travel & hotel management"
        },
        "royal": {
          "name": "Royal Vivaha",
          "desc": "An unrestrained, palace-grade celebration — nothing left to chance.",
          "f1": "Palace or five-star destination venue",
          "f2": "Bespoke multi-cuisine & live global counters",
          "f3": "Signature couture decor & lighting design",
          "f4": "Feature-length wedding film + full album",
          "f5": "Headline performers & production team",
          "f6": "Complete bridal trousseau styling",
          "f7": "Dedicated on-ground team for every function",
          "f8": "Concierge for all outstation guests"
        }
      },
      "venues": {
        "hero": {
          "eyebrow": "Find Your Setting",
          "title": "Wedding Venues",
          "subtitle": "Palaces, resorts, banquets and lawns across India, verified and ready to book."
        },
        "filters": {
          "city": "City",
          "type": "Venue Type",
          "capacity": "Guest Capacity",
          "budget": "Budget Range",
          "search": "Search venues by name or city…"
        },
        "types": {
          "banquet": "Banquet Hall",
          "resort": "Resort",
          "palace": "Palace",
          "lawn": "Lawn / Garden",
          "beach": "Beachside",
          "hotel": "5-Star Hotel"
        }
      },
      "vendors": {
        "hero": {
          "eyebrow": "Meet Our Partners",
          "title": "Wedding Vendors",
          "subtitle": "Every vendor is site-visited, background-checked and rated by real couples."
        },
        "categories": {
          "all": "All Vendors",
          "caterers": "Caterers",
          "decorators": "Decorators",
          "photographers": "Photographers",
          "music": "Music & DJ",
          "makeup": "Makeup Artists",
          "invitations": "Invitation Designers"
        },
        "filters": {
          "city": "City",
          "priceRange": "Price Range",
          "search": "Search vendors…"
        }
      },
      "gallery": {
        "hero": {
          "eyebrow": "Proof, Not Promises",
          "title": "Wedding Gallery",
          "subtitle": "Real celebrations, real colour, real joy."
        },
        "filters": {
          "all": "All",
          "decoration": "Decoration",
          "mehendi": "Mehendi",
          "sangeet": "Sangeet",
          "ceremony": "Ceremony",
          "reception": "Reception",
          "bridal": "Bridal"
        }
      },
      "contact": {
        "hero": {
          "eyebrow": "We'd Love to Hear From You",
          "title": "Contact Us",
          "subtitle": "Questions about planning your wedding? Our team replies within one business day."
        },
        "info": {
          "visitTitle": "Visit Us",
          "callTitle": "Call Us",
          "emailTitle": "Email Us",
          "hoursTitle": "Working Hours",
          "hours": "Mon – Sat, 10:00 AM – 7:00 PM IST"
        },
        "form": {
          "title": "Send Us a Message",
          "name": "Full Name",
          "email": "Email Address",
          "phone": "Phone Number",
          "city": "Wedding City",
          "subject": "Subject",
          "message": "Your Message",
          "namePlaceholder": "e.g. Ananya Sharma",
          "emailPlaceholder": "you@example.com",
          "phonePlaceholder": "+91 98765 43210",
          "cityPlaceholder": "e.g. Jaipur",
          "subjectPlaceholder": "e.g. Venue availability for December",
          "messagePlaceholder": "Tell us about your wedding plans…",
          "submit": "Send Message"
        },
        "faq": {
          "eyebrow": "Frequently Asked",
          "title": "Common Questions",
          "q1": "How far in advance should we start planning?",
          "a1": "We recommend starting 6–9 months before your wedding date for the best choice of venues and vendors, though we've successfully planned celebrations in as little as 6 weeks.",
          "q2": "Does Vivaha charge couples a planning fee?",
          "a2": "Our venue and vendor discovery tools are completely free to use. A planning fee applies only if you choose a dedicated Vivaha planner for full-service coordination.",
          "q3": "Can I customise a package after booking?",
          "a3": "Yes — every package is a starting point. You can add, remove or upgrade any service at any time before your final payment milestone.",
          "q4": "Which cities does Vivaha operate in?",
          "a4": "We currently operate across 60+ cities in India, including all major metros and popular destination-wedding locations like Jaipur, Udaipur and Goa.",
          "q5": "Is my payment secure?",
          "a5": "All payments are held in escrow and released to vendors only at agreed milestones, so you're always protected."
        }
      },
      "auth": {
        "login": {
          "eyebrow": "Welcome Back",
          "title": "Log In to Your Account",
          "subtitle": "Continue planning your dream wedding.",
          "email": "Email Address",
          "password": "Password",
          "remember": "Remember me",
          "forgot": "Forgot password?",
          "submit": "Log In",
          "noAccount": "Don't have an account?",
          "signupLink": "Sign up",
          "visualTitle": "Your Wedding, Beautifully Organised",
          "visualDesc": "Track venues, vendors, budgets and guest lists in one calm, elegant dashboard."
        },
        "register": {
          "eyebrow": "Join Vivaha",
          "title": "Create Your Account",
          "subtitle": "It takes less than a minute to start planning.",
          "fullName": "Full Name",
          "email": "Email Address",
          "phone": "Phone Number",
          "weddingDate": "Approximate Wedding Date",
          "password": "Password",
          "confirmPassword": "Confirm Password",
          "terms": "I agree to the Terms of Service and Privacy Policy",
          "submit": "Create Account",
          "haveAccount": "Already have an account?",
          "loginLink": "Log in",
          "visualTitle": "Join 1,200+ Happy Couples",
          "visualDesc": "Get matched with verified venues and vendors picked for your budget and style."
        },
        "errors": {
          "nameRequired": "Please enter your full name.",
          "emailInvalid": "Please enter a valid email address.",
          "phoneInvalid": "Please enter a valid 10-digit phone number.",
          "passwordShort": "Password must be at least 8 characters.",
          "passwordMismatch": "Passwords do not match.",
          "termsRequired": "Please accept the Terms of Service.",
          "messageShort": "Your message should be at least 10 characters."
        }
      },
      "dashboard": {
        "welcome": "Welcome back",
        "nav": {
          "overview": "Overview",
          "profile": "Profile",
          "plans": "Saved Plans",
          "bookings": "Bookings",
          "wishlist": "Wishlist",
          "budget": "Budget Summary",
          "notifications": "Notifications",
          "settings": "Settings"
        },
        "overview": {
          "title": "Overview",
          "daysToGo": "Days to Go",
          "totalBudget": "Total Budget",
          "vendorsBooked": "Vendors Booked",
          "wishlistCount": "Wishlisted"
        },
        "profile": {
          "title": "Profile",
          "subtitle": "Keep your details up to date so vendors can reach you.",
          "partnerName": "Partner's Name",
          "weddingCity": "Wedding City",
          "guestCount": "Expected Guests",
          "saveChanges": "Save Changes"
        },
        "plans": {
          "title": "Saved Plans",
          "subtitle": "Wedding plans you've built with our planning tool.",
          "empty": "You haven't saved a wedding plan yet.",
          "emptyCta": "Start Planning",
          "createdOn": "Created on",
          "estBudget": "Estimated Budget",
          "viewPlan": "View Plan",
          "deletePlan": "Delete"
        },
        "bookings": {
          "title": "Bookings",
          "subtitle": "Track every venue and vendor you've booked.",
          "empty": "No bookings yet. Explore our venues and vendors to get started.",
          "colVendor": "Vendor / Venue",
          "colDate": "Date",
          "colAmount": "Amount",
          "colStatus": "Status",
          "colAction": "Action",
          "statusConfirmed": "Confirmed",
          "statusPending": "Pending",
          "statusCancelled": "Cancelled",
          "cancelBtn": "Cancel"
        },
        "wishlist": {
          "title": "Wishlist",
          "subtitle": "Venues and vendors you've saved for later.",
          "empty": "You haven't added anything to your wishlist yet."
        },
        "budget": {
          "title": "Budget Summary",
          "subtitle": "A live breakdown of your estimated wedding spend.",
          "totalEstimated": "Total Estimated Budget",
          "allocated": "Allocated",
          "remaining": "Remaining",
          "categoryBreakdown": "Category Breakdown"
        },
        "notifications": {
          "title": "Notifications",
          "subtitle": "Updates from your vendors and our planning team.",
          "empty": "You're all caught up!",
          "markAllRead": "Mark all as read"
        },
        "settings": {
          "title": "Settings",
          "subtitle": "Manage your preferences.",
          "language": "Language",
          "theme": "Appearance",
          "themeLight": "Light",
          "themeDark": "Dark",
          "emailNotif": "Email notifications",
          "smsNotif": "SMS notifications",
          "deleteAccount": "Delete Account",
          "deleteWarning": "This will permanently remove your account and saved data from this device."
        }
      },
      "planner": {
        "hero": {
          "eyebrow": "Design Your Celebration",
          "title": "Plan My Wedding",
          "subtitle": "Answer a few questions and watch your estimated budget update in real time."
        },
        "steps": {
          "type": "Wedding Type",
          "venue": "Venue",
          "food": "Food",
          "decoration": "Decoration",
          "music": "Music & DJ",
          "photography": "Photography",
          "bridal": "Bridal & Groom",
          "invitations": "Invitations",
          "guests": "Guests",
          "budget": "Review"
        },
        "type": {
          "title": "What kind of wedding are you planning?",
          "traditional": "Traditional Hindu",
          "destination": "Destination Wedding",
          "royal": "Royal / Rajwada",
          "modern": "Modern Minimal",
          "beach": "Beachside",
          "interfaith": "Interfaith / Fusion"
        },
        "venue": {
          "title": "Choose your venue style",
          "banquet": "Banquet Hall",
          "resort": "Resort",
          "palace": "Palace",
          "lawn": "Lawn / Garden",
          "beach": "Beachside",
          "hotel": "5-Star Hotel"
        },
        "food": {
          "title": "Select your catering style",
          "veg": "Pure Vegetarian",
          "nonveg": "Vegetarian + Non-Veg",
          "jain": "Jain",
          "vegan": "Vegan",
          "regional": "Regional Multi-Cuisine"
        },
        "decoration": {
          "title": "Pick a decoration style",
          "floral": "Floral Mandap",
          "royal": "Royal Rajwada",
          "modern": "Modern Minimal",
          "boho": "Beach Boho",
          "themed": "Custom Themed"
        },
        "music": {
          "title": "Choose your entertainment",
          "dj": "Professional DJ",
          "liveband": "Live Band",
          "classical": "Classical / Sufi",
          "choreographer": "Sangeet Choreographer",
          "none": "Not Required"
        },
        "photography": {
          "title": "Select photography & videography",
          "basic": "Candid Photography",
          "standard": "Photo + Cinematic Film",
          "premium": "Full Crew + Drone + Same-Day Edit",
          "none": "Not Required"
        },
        "bridal": {
          "title": "Bridal & groom services",
          "makeup": "Bridal Makeup",
          "mehendi": "Mehendi Artist",
          "styling": "Groom Styling",
          "jewellery": "Jewellery Consultation",
          "none": "Not Required"
        },
        "invitations": {
          "title": "Choose your invitations",
          "digital": "Digital E-Invites",
          "printed": "Printed Cards",
          "boxed": "Hand-Crafted Boxed Invites",
          "none": "Not Required"
        },
        "guests": {
          "title": "How many guests are you expecting?",
          "subtitle": "This helps us estimate venue and catering costs accurately.",
          "label": "Guest Count"
        },
        "budget": {
          "title": "Your Estimated Budget",
          "subtitle": "Here's how your selections add up. Adjust any step to see the total change.",
          "total": "Estimated Total",
          "disclaimer": "This is an estimate based on average Tier-1 city pricing. Final quotes may vary by vendor and season.",
          "saveBtn": "Save This Plan",
          "savedTitle": "Plan Saved!",
          "savedDesc": "Your wedding plan has been added to your dashboard.",
          "goToDashboard": "Go to Dashboard",
          "loginPrompt": "Log in to save this plan to your dashboard.",
          "loginBtn": "Log In to Save"
        }
      }
    },
    hi:
    {
      "meta": {
        "siteName": "विवाह",
        "tagline": "जहाँ हर रस्म को उसकी जगह मिलती है"
      },
      "nav": {
        "home": "होम",
        "about": "हमारे बारे में",
        "services": "सेवाएं",
        "packages": "पैकेज",
        "venues": "वेन्यू",
        "vendors": "वेंडर्स",
        "gallery": "गैलरी",
        "contact": "संपर्क करें",
        "login": "लॉग इन",
        "register": "साइन अप",
        "dashboard": "डैशबोर्ड",
        "planMyWedding": "मेरी शादी प्लान करें",
        "logout": "लॉग आउट"
      },
      "common": {
        "learnMore": "और जानें",
        "viewDetails": "विवरण देखें",
        "bookNow": "अभी बुक करें",
        "addToWishlist": "विशलिस्ट में जोड़ें",
        "removeWishlist": "विशलिस्ट से हटाएं",
        "viewAll": "सभी देखें",
        "submit": "सबमिट करें",
        "sendMessage": "संदेश भेजें",
        "getStarted": "शुरू करें",
        "save": "सेव करें",
        "cancel": "रद्द करें",
        "edit": "संपादित करें",
        "delete": "हटाएं",
        "apply": "फ़िल्टर लागू करें",
        "clear": "हटाएं",
        "search": "खोजें",
        "next": "आगे",
        "previous": "पीछे",
        "back": "वापस",
        "finish": "पूरा करें और प्लान सेव करें",
        "seeFullGallery": "पूरी गैलरी देखें",
        "subscribe": "सब्सक्राइब करें",
        "savePlan": "यह प्लान सेव करें",
        "tryAgain": "फिर से कोशिश करें",
        "from": "शुरुआत",
        "perGuest": "प्रति मेहमान",
        "onwards": "से शुरू",
        "guests": "मेहमान",
        "capacity": "क्षमता",
        "rating": "रेटिंग",
        "reviews": "रिव्यू",
        "allCategories": "सभी",
        "noResults": "कोई परिणाम नहीं मिला। अपने फ़िल्टर बदलकर देखें।",
        "loading": "लोड हो रहा है…",
        "required": "यह फ़ील्ड आवश्यक है।",
        "currencySymbol": "₹",
        "readMore": "और पढ़ें",
        "close": "बंद करें",
        "yes": "हाँ",
        "no": "नहीं",
        "wishlistEmpty": "आपकी विशलिस्ट खाली है।",
        "min": "न्यूनतम",
        "max": "अधिकतम"
      },
      "toast": {
        "languageChanged": "भाषा हिंदी में बदल गई",
        "addedWishlist": "आपकी विशलिस्ट में जोड़ा गया",
        "removedWishlist": "आपकी विशलिस्ट से हटाया गया",
        "loginSuccess": "वापसी पर स्वागत है! डैशबोर्ड पर भेजा जा रहा है…",
        "loginError": "ईमेल या पासवर्ड गलत है।",
        "registerSuccess": "खाता बन गया! कृपया लॉग इन करें।",
        "registerError": "इस ईमेल से पहले से ही एक खाता मौजूद है।",
        "contactSuccess": "आपका संदेश भेज दिया गया है। हम जल्द ही संपर्क करेंगे!",
        "planSaved": "आपकी शादी की योजना आपके डैशबोर्ड में सेव कर दी गई है।",
        "bookingRequested": "बुकिंग रिक्वेस्ट भेज दी गई! इसे अपने डैशबोर्ड से ट्रैक करें।",
        "profileSaved": "प्रोफ़ाइल सफलतापूर्वक अपडेट हुई।",
        "loginRequired": "जारी रखने के लिए कृपया लॉग इन करें।",
        "logoutSuccess": "आप लॉग आउट हो गए हैं।",
        "bookingCancelled": "बुकिंग रद्द कर दी गई।",
        "subscribed": "आप सब्सक्राइब हो गए हैं! शादी की प्रेरणा के लिए अपना इनबॉक्स देखें।"
      },
      "footer": {
        "about": "विवाह भारत का प्रमुख वेडिंग प्लानिंग प्लेटफ़ॉर्म है — वेन्यू, वेंडर्स और रीति-रिवाजों को एक सहज उत्सव में जोड़ते हुए।",
        "quickLinks": "क्विक लिंक्स",
        "ourServices": "हमारी सेवाएं",
        "getInTouch": "संपर्क करें",
        "address": "तीसरी मंज़िल, आइवरी हाउस, बांद्रा वेस्ट, मुंबई, महाराष्ट्र 400050",
        "phone": "+91 98765 43210",
        "email": "hello@vivaha.in",
        "newsletterTitle": "हमारी वेडिंग जर्नल से जुड़ें",
        "newsletterPlaceholder": "आपका ईमेल पता",
        "rights": "सर्वाधिकार सुरक्षित।",
        "privacy": "प्राइवेसी पॉलिसी",
        "terms": "सेवा की शर्तें",
        "sitemap": "साइटमैप"
      },
      "home": {
        "hero": {
          "eyebrow": "40 फ़ोन कॉल से एक डैशबोर्ड तक",
          "title": "हर रस्म, हर रुपया, खूबसूरती से व्यवस्थित",
          "subtitle": "पहली हल्दी से आख़िरी विदाई तक, हम वेन्यू, वेंडर्स और कारीगरों को व्यवस्थित करते हैं — ताकि आपका अपना परिवार आख़िरकार इस शादी में मेहमान बनकर शामिल हो सके, स्टाफ़ बनकर नहीं।",
          "cta1": "मेरी शादी प्लान करें",
          "cta2": "वेन्यू देखें",
          "scriptTag": "तो, शुरू करें?",
          "stat1Num": "1,200+",
          "stat1Label": "शादियां प्लान की गईं",
          "stat2Num": "480+",
          "stat2Label": "विश्वसनीय वेंडर्स",
          "stat3Num": "60+",
          "stat3Label": "शहर कवर किए गए",
          "stat4Num": "4.9/5",
          "stat4Label": "औसत रेटिंग"
        },
        "search": {
          "title": "कुछ ही सेकंड में प्लानिंग शुरू करें",
          "destinationLabel": "शहर",
          "typeLabel": "शादी का प्रकार",
          "dateLabel": "शादी की तारीख",
          "guestsLabel": "मेहमान",
          "searchBtn": "खोजें"
        },
        "categories": {
          "eyebrow": "नौ वेंडर्स, शून्य स्प्रेडशीट",
          "title": "आपकी शादी की हर ज़रूरत",
          "subtitle": "नौ सेवाएं, एक समन्वित योजना — ताकि रात 11 बजे वेंडर कॉल्स संभालने वाले आप न हों।",
          "venues": "वेन्यू",
          "venuesDesc": "महल, रिज़ॉर्ट, बैंक्वेट और बीच लॉन",
          "catering": "केटरिंग",
          "cateringDesc": "वेज, नॉन-वेज, जैन, वीगन और क्षेत्रीय व्यंजन",
          "decoration": "डेकोरेशन",
          "decorationDesc": "फूलों के मंडप से मॉडर्न मिनिमल थीम तक",
          "photography": "फोटोग्राफी",
          "photographyDesc": "कैंडिड, सिनेमैटिक और पारंपरिक कवरेज",
          "music": "म्यूज़िक और डीजे",
          "musicDesc": "लाइव बैंड, डीजे, संगीत कोरियोग्राफी",
          "bridal": "दुल्हन और दुल्हा सेवाएं",
          "bridalDesc": "मेकअप, मेहंदी, शेरवानी और ज्वेलरी स्टाइलिंग",
          "invitations": "निमंत्रण कार्ड",
          "invitationsDesc": "डिजिटल ई-निमंत्रण से हाथ से बने बॉक्स तक",
          "guests": "गेस्ट मैनेजमेंट",
          "guestsDesc": "आरएसवीपी, सीटिंग और यात्रा समन्वय",
          "budget": "बजट प्लानिंग",
          "budgetDesc": "प्लानिंग करते समय रीयल-टाइम लागत अनुमान"
        },
        "venues": {
          "eyebrow": "पहले से जांचे गए, पहले से पसंद किए गए",
          "title": "फीचर्ड वेन्यू",
          "subtitle": "हमारी टीम द्वारा साइट-विज़िट किए गए, आपसे पहले के कपल्स द्वारा पसंद किए गए।"
        },
        "caterers": {
          "eyebrow": "परंपरा का स्वाद",
          "title": "लोकप्रिय केटरर्स",
          "subtitle": "मेन्यू जो भारत के हर क्षेत्र को आपकी थाली में ला देते हैं।"
        },
        "decoration": {
          "eyebrow": "माहौल तैयार करें",
          "title": "डेकोरेशन स्टाइल",
          "subtitle": "शाही राजवाड़ा ड्रेप्स से लेकर हल्के बीचसाइड फूलों तक।"
        },
        "music": {
          "eyebrow": "मूड सेट करें",
          "title": "म्यूज़िक और एंटरटेनमेंट",
          "subtitle": "ऐसे कलाकार जो जानते हैं कब धीमा करना है — और कब ढोल बजाना है।"
        },
        "packages": {
          "eyebrow": "आसान, पारदर्शी मूल्य निर्धारण",
          "title": "वेडिंग पैकेज",
          "subtitle": "एक पैकेज से शुरू करें, फिर हर विवरण को अपने अनुसार बनाएं।"
        },
        "testimonials": {
          "eyebrow": "असली शादियां, असली कहानियां",
          "title": "हमारे कपल्स क्या कहते हैं"
        },
        "gallery": {
          "eyebrow": "हमने रचे पल",
          "title": "हमारे वेडिंग एल्बम से",
          "subtitle": "उन शादियों की एक झलक जिन्हें साथ लाने का आनंद हमें मिला।"
        },
        "cta": {
          "title": "जोड़-तोड़ बंद करके प्लानिंग शुरू करने के लिए तैयार हैं?",
          "subtitle": "हमें तारीख़ और शहर बताएं — वेन्यू, वेंडर्स और चेकलिस्ट हम लाएंगे।",
          "btn": "अभी प्लानिंग शुरू करें"
        }
      },
      "about": {
        "hero": {
          "eyebrow": "हमारी कहानी",
          "title": "हर शादी को अब भी आपकी अपनी लगनी चाहिए"
        },
        "story": {
          "eyebrow": "विवाह की शुरुआत कैसे हुई",
          "title": "1,000 परिवारों की शादियों से जन्मा एक प्लेटफ़ॉर्म",
          "p1": "विवाह की शुरुआत 2019 में हुई, जब तीन दोस्तों — एक वेडिंग फ़ोटोग्राफ़र, एक इवेंट प्लानर और एक सॉफ्टवेयर इंजीनियर — ने हर परिवार से एक ही शिकायत सुनी: भारतीय शादी प्लान करने का मतलब था चालीस फ़ोन कॉल, दर्जनों स्प्रेडशीट, और यह कभी ठीक से न पता चलना कि बजट वाकई सही है या नहीं।",
          "p2": "इसलिए हमने वह प्लेटफ़ॉर्म बनाया जिसकी हमें ख़ुद ज़रूरत थी: वेन्यू खोजने, वेंडर्स की तुलना करने, हर रस्म की योजना बनाने और बजट ट्रैक करने के लिए एक ही जगह — अंग्रेज़ी या हिंदी में, फ़ोन या लैपटॉप से।",
          "p3": "आज हमारे प्लानर्स और इंजीनियर 60 से ज़्यादा शहरों के परिवारों के साथ काम करते हैं। लक्ष्य एक इंच भी नहीं बदला है: हर कपल को इतनी स्पष्टता देना कि वे वाकई अपनी शादी का आनंद ले सकें।"
        },
        "values": {
          "eyebrow": "हमारा मार्गदर्शन",
          "title": "हमारे मूल्य",
          "v1Title": "रीति-रिवाजों में गहराई से जुड़े",
          "v1Desc": "हम आपकी परंपराओं के अनुसार डिज़ाइन करते हैं, किसी टेम्प्लेट के अनुसार नहीं।",
          "v2Title": "पूर्ण पारदर्शिता",
          "v2Desc": "हर रुपया इटमाइज़ किया जाता है। कोई छिपा हुआ वेंडर कमीशन कभी नहीं।",
          "v3Title": "सत्यापित पार्टनर",
          "v3Desc": "हर वेन्यू और वेंडर की साइट विज़िट और बैकग्राउंड जांच होती है।",
          "v4Title": "हमेशा उपलब्ध",
          "v4Desc": "एक समर्पित प्लानर सिर्फ़ एक मैसेज दूर है, आपके बड़े दिन तक।"
        },
        "team": {
          "eyebrow": "टीम से मिलें",
          "title": "आपके उत्सव के पीछे की टीम",
          "subtitle": "प्लानर्स, डिज़ाइनर्स और रिलेशनशिप मैनेजर्स की एक करीबी टीम।"
        },
        "why": {
          "eyebrow": "विवाह ही क्यों",
          "title": "परिवार बार-बार वापस क्यों आते हैं",
          "w1": "सत्यापित वेन्यू और वेंडर्स का संपूर्ण भारत नेटवर्क",
          "w2": "रीयल-टाइम में पारदर्शी, इटमाइज़्ड बजटिंग",
          "w3": "द्विभाषी प्लानिंग अनुभव — अंग्रेज़ी और हिंदी",
          "w4": "हर बुकिंग के लिए समर्पित रिलेशनशिप मैनेजर",
          "w5": "माइलस्टोन-आधारित सुरक्षित पेमेंट",
          "w6": "आपकी शादी से पहले के आख़िरी हफ़्ते में 24x7 सहायता"
        }
      },
      "services": {
        "hero": {
          "eyebrow": "नौ काम, एक टीम",
          "title": "वेडिंग सेवाएं",
          "subtitle": "आपके उत्सव की हर ज़रूरत — एक ही टीम द्वारा समन्वित।"
        },
        "s1Title": "वेन्यू सोर्सिंग",
        "s1Desc": "महल, फ़ाइव-स्टार बैंक्वेट, डेस्टिनेशन रिज़ॉर्ट और आत्मीय लॉन, आपके मेहमानों की संख्या, शहर और बजट के अनुसार शॉर्टलिस्ट किए गए।",
        "s2Title": "केटरिंग और व्यंजन",
        "s2Desc": "वेजिटेरियन, नॉन-वेजिटेरियन, जैन, वीगन और क्षेत्रीय मेन्यू, फ़ैसला लेने से पहले लाइव टेस्टिंग सेशन के साथ।",
        "s3Title": "डेकोर और स्टाइलिंग",
        "s3Desc": "मंडप डिज़ाइन, फ्लोरल इंस्टॉलेशन, लाइटिंग और थीम स्टाइलिंग — क्लासिक राजवाड़ा से मॉडर्न मिनिमल तक।",
        "s4Title": "फोटोग्राफी और फ़िल्में",
        "s4Desc": "कैंडिड फोटोग्राफी, सिनेमैटिक वेडिंग फ़िल्में, ड्रोन कवरेज और सेम-डे हाइलाइट रील्स।",
        "s5Title": "म्यूज़िक, डीजे और कोरियोग्राफी",
        "s5Desc": "लाइव सूफ़ी और लोक बैंड, प्रोफेशनल डीजे, और डांस फ़्लोर पर हर उम्र के लिए संगीत कोरियोग्राफर।",
        "s6Title": "दुल्हन और दुल्हा स्टाइलिंग",
        "s6Desc": "मेकअप आर्टिस्ट, मेहंदी डिज़ाइनर, शेरवानी व लहंगा स्टाइलिस्ट, और ज्वेलरी सलाहकार।",
        "s7Title": "निमंत्रण और गिफ़्ट्स",
        "s7Desc": "डिजिटल ई-निमंत्रण, हाथ से बने बॉक्स्ड निमंत्रण, और मेहमानों के लिए व्यक्तिगत रिटर्न गिफ़्ट्स।",
        "s8Title": "गेस्ट और ट्रैवल मैनेजमेंट",
        "s8Desc": "डिजिटल आरएसवीपी, सीटिंग चार्ट, होटल ब्लॉक और बाहर से आने वाले मेहमानों के लिए एयरपोर्ट ट्रांसफ़र।",
        "s9Title": "बजट और प्लानिंग टूल्स",
        "s9Desc": "रीयल-टाइम लागत ट्रैकिंग के साथ एक लाइव वेडिंग प्लानर, ताकि आप हमेशा जानें कि आप कहां खड़े हैं।",
        "process": {
          "eyebrow": "यह कैसे काम करता है",
          "title": "पहले क्लिक से आख़िरी वचन तक",
          "step1Title": "अपना विज़न बताएं",
          "step1Desc": "अपना शहर, तारीखें, मेहमानों की संख्या और स्टाइल पसंद साझा करें।",
          "step2Title": "अपनी शॉर्टलिस्ट देखें",
          "step2Desc": "हम वेन्यू और वेंडर्स को आपके बजट और आपकी पसंद के अनुसार मिलाते हैं — इसके उल्टा नहीं।",
          "step3Title": "अपने अनुसार बनाएं और पुष्टि करें",
          "step3Desc": "अपने समर्पित प्लानर के साथ हर विवरण को बेहतर बनाएं।",
          "step4Title": "बिना तनाव के जश्न मनाएं",
          "step4Desc": "हम दिन में हर वेंडर का समन्वय करते हैं ताकि आपको न करना पड़े।"
        }
      },
      "packages": {
        "hero": {
          "eyebrow": "चार शुरुआती बिंदु, अनगिनत संयोजन",
          "title": "वेडिंग पैकेज",
          "subtitle": "सबसे नज़दीकी विकल्प चुनें, फिर उसे अपना बनाएं।"
        },
        "billing": {
          "perDay": "टियर-1 शहर में 300 मेहमानों के उत्सव के लिए प्रति-दिन मूल्य दिखाया गया है। अंतिम लागत आपके अनुसार बदलाव पर निर्भर करती है।",
          "customCta": "आपके अनुसार कुछ नहीं मिला? पूरी तरह कस्टम प्लान बनाएं।",
          "customBtn": "कस्टम प्लान बनाएं"
        },
        "silver": {
          "name": "सिल्वर रीति",
          "desc": "आत्मीय शादियों के लिए एक सुंदर, आवश्यक उत्सव।",
          "f1": "बैंक्वेट हॉल या लॉन वेन्यू",
          "f2": "स्टैंडर्ड वेज और नॉन-वेज मेन्यू",
          "f3": "क्लासिक फ्लोरल मंडप डेकोर",
          "f4": "कैंडिड फोटोग्राफी (1 दिन)",
          "f5": "साउंड और लाइटिंग के साथ डीजे",
          "f6": "डिजिटल ई-निमंत्रण"
        },
        "gold": {
          "name": "गोल्ड सेलिब्रेशन",
          "badge": "सबसे लोकप्रिय",
          "desc": "हमारा सबसे पसंदीदा पैकेज — संतुलित, सुंदर, संपूर्ण।",
          "f1": "प्रीमियम बैंक्वेट या रिज़ॉर्ट वेन्यू",
          "f2": "मल्टी-क्यूज़ीन लाइव काउंटर",
          "f3": "डिज़ाइनर मंडप और एंट्रेंस डेकोर",
          "f4": "फोटोग्राफी + सिनेमैटिक फ़िल्म (2 दिन)",
          "f5": "लाइव बैंड + डीजे + संगीत कोरियोग्राफी",
          "f6": "बॉक्स्ड निमंत्रण + रिटर्न गिफ़्ट्स",
          "f7": "समर्पित वेडिंग प्लानर"
        },
        "platinum": {
          "name": "प्लैटिनम अफ़ेयर",
          "desc": "सभी रस्मों में फैला एक भव्य, बहु-दिवसीय उत्सव।",
          "f1": "लक्ज़री रिज़ॉर्ट या हेरिटेज प्रॉपर्टी",
          "f2": "सेलिब्रिटी शेफ़ द्वारा क्यूरेटेड मल्टी-क्यूज़ीन मेन्यू",
          "f3": "सभी कार्यक्रमों में प्रीमियम थीम डेकोर",
          "f4": "पूरी फ़िल्म क्रू + ड्रोन + सेम-डे एडिट",
          "f5": "लाइव बैंड, सेलिब्रिटी डीजे और कोरियोग्राफी",
          "f6": "व्यक्तिगत दुल्हन और दुल्हा स्टाइलिंग",
          "f7": "मेहमानों की यात्रा और होटल प्रबंधन"
        },
        "royal": {
          "name": "रॉयल विवाह",
          "desc": "एक बेलगाम, महल-स्तरीय उत्सव — कुछ भी संयोग पर नहीं छोड़ा गया।",
          "f1": "महल या फ़ाइव-स्टार डेस्टिनेशन वेन्यू",
          "f2": "बेस्पोक मल्टी-क्यूज़ीन और लाइव ग्लोबल काउंटर",
          "f3": "सिग्नेचर कॉउचर डेकोर और लाइटिंग डिज़ाइन",
          "f4": "फ़ीचर-लेंथ वेडिंग फ़िल्म + पूरा एल्बम",
          "f5": "हेडलाइन कलाकार और प्रोडक्शन टीम",
          "f6": "संपूर्ण ब्राइडल ट्रौसो स्टाइलिंग",
          "f7": "हर कार्यक्रम के लिए समर्पित ऑन-ग्राउंड टीम",
          "f8": "सभी बाहरी मेहमानों के लिए कॉन्सियर्ज"
        }
      },
      "venues": {
        "hero": {
          "eyebrow": "अपनी जगह खोजें",
          "title": "वेडिंग वेन्यू",
          "subtitle": "भारत भर के महल, रिज़ॉर्ट, बैंक्वेट और लॉन, सत्यापित और बुकिंग के लिए तैयार।"
        },
        "filters": {
          "city": "शहर",
          "type": "वेन्यू का प्रकार",
          "capacity": "मेहमानों की क्षमता",
          "budget": "बजट रेंज",
          "search": "नाम या शहर से वेन्यू खोजें…"
        },
        "types": {
          "banquet": "बैंक्वेट हॉल",
          "resort": "रिज़ॉर्ट",
          "palace": "महल",
          "lawn": "लॉन / गार्डन",
          "beach": "बीचसाइड",
          "hotel": "5-स्टार होटल"
        }
      },
      "vendors": {
        "hero": {
          "eyebrow": "हमारे पार्टनर्स से मिलें",
          "title": "वेडिंग वेंडर्स",
          "subtitle": "हर वेंडर की साइट विज़िट, बैकग्राउंड जांच होती है और असली कपल्स द्वारा रेटिंग की जाती है।"
        },
        "categories": {
          "all": "सभी वेंडर्स",
          "caterers": "केटरर्स",
          "decorators": "डेकोरेटर्स",
          "photographers": "फोटोग्राफर्स",
          "music": "म्यूज़िक और डीजे",
          "makeup": "मेकअप आर्टिस्ट",
          "invitations": "निमंत्रण डिज़ाइनर्स"
        },
        "filters": {
          "city": "शहर",
          "priceRange": "प्राइस रेंज",
          "search": "वेंडर्स खोजें…"
        }
      },
      "gallery": {
        "hero": {
          "eyebrow": "वादे नहीं, सबूत",
          "title": "वेडिंग गैलरी",
          "subtitle": "असली उत्सव, असली रंग, असली खुशी।"
        },
        "filters": {
          "all": "सभी",
          "decoration": "डेकोरेशन",
          "mehendi": "मेहंदी",
          "sangeet": "संगीत",
          "ceremony": "समारोह",
          "reception": "रिसेप्शन",
          "bridal": "ब्राइडल"
        }
      },
      "contact": {
        "hero": {
          "eyebrow": "हमें आपसे सुनना अच्छा लगेगा",
          "title": "संपर्क करें",
          "subtitle": "अपनी शादी की प्लानिंग के बारे में सवाल हैं? हमारी टीम एक कार्यदिवस के भीतर जवाब देती है।"
        },
        "info": {
          "visitTitle": "हमसे मिलें",
          "callTitle": "हमें कॉल करें",
          "emailTitle": "हमें ईमेल करें",
          "hoursTitle": "कार्य समय",
          "hours": "सोम – शनि, सुबह 10:00 – शाम 7:00 IST"
        },
        "form": {
          "title": "हमें संदेश भेजें",
          "name": "पूरा नाम",
          "email": "ईमेल पता",
          "phone": "फ़ोन नंबर",
          "city": "शादी का शहर",
          "subject": "विषय",
          "message": "आपका संदेश",
          "namePlaceholder": "जैसे अनन्या शर्मा",
          "emailPlaceholder": "you@example.com",
          "phonePlaceholder": "+91 98765 43210",
          "cityPlaceholder": "जैसे जयपुर",
          "subjectPlaceholder": "जैसे दिसंबर के लिए वेन्यू उपलब्धता",
          "messagePlaceholder": "अपनी शादी की योजनाओं के बारे में बताएं…",
          "submit": "संदेश भेजें"
        },
        "faq": {
          "eyebrow": "अक्सर पूछे जाने वाले",
          "title": "सामान्य प्रश्न",
          "q1": "हमें कितनी पहले प्लानिंग शुरू करनी चाहिए?",
          "a1": "बेहतरीन वेन्यू और वेंडर्स चुनने के लिए हम शादी की तारीख़ से 6–9 महीने पहले शुरू करने की सलाह देते हैं, हालांकि हमने सिर्फ़ 6 हफ़्तों में भी सफलतापूर्वक उत्सव प्लान किए हैं।",
          "q2": "क्या विवाह कपल्स से प्लानिंग फ़ीस लेता है?",
          "a2": "हमारे वेन्यू और वेंडर खोजने के टूल पूरी तरह मुफ़्त हैं। प्लानिंग फ़ीस केवल तब लागू होती है जब आप पूर्ण-सेवा समन्वय के लिए एक समर्पित विवाह प्लानर चुनते हैं।",
          "q3": "क्या मैं बुकिंग के बाद पैकेज को कस्टमाइज़ कर सकता हूं?",
          "a3": "हां — हर पैकेज एक शुरुआती बिंदु है। आप अपने अंतिम पेमेंट माइलस्टोन से पहले कभी भी कोई भी सेवा जोड़ सकते हैं, हटा सकते हैं या अपग्रेड कर सकते हैं।",
          "q4": "विवाह किन शहरों में काम करता है?",
          "a4": "हम वर्तमान में भारत के 60+ शहरों में काम करते हैं, जिनमें सभी प्रमुख मेट्रो और जयपुर, उदयपुर और गोवा जैसे लोकप्रिय डेस्टिनेशन-वेडिंग स्थान शामिल हैं।",
          "q5": "क्या मेरा पेमेंट सुरक्षित है?",
          "a5": "सभी पेमेंट एस्क्रो में रखे जाते हैं और केवल सहमति के माइलस्टोन पर वेंडर्स को जारी किए जाते हैं, इसलिए आप हमेशा सुरक्षित रहते हैं।"
        }
      },
      "auth": {
        "login": {
          "eyebrow": "वापसी पर स्वागत है",
          "title": "अपने अकाउंट में लॉग इन करें",
          "subtitle": "अपनी सपनों की शादी की प्लानिंग जारी रखें।",
          "email": "ईमेल पता",
          "password": "पासवर्ड",
          "remember": "मुझे याद रखें",
          "forgot": "पासवर्ड भूल गए?",
          "submit": "लॉग इन करें",
          "noAccount": "अकाउंट नहीं है?",
          "signupLink": "साइन अप करें",
          "visualTitle": "आपकी शादी, सुंदरता से व्यवस्थित",
          "visualDesc": "वेन्यू, वेंडर्स, बजट और गेस्ट लिस्ट को एक शांत, सुंदर डैशबोर्ड में ट्रैक करें।"
        },
        "register": {
          "eyebrow": "विवाह से जुड़ें",
          "title": "अपना अकाउंट बनाएं",
          "subtitle": "प्लानिंग शुरू करने में एक मिनट से भी कम समय लगता है।",
          "fullName": "पूरा नाम",
          "email": "ईमेल पता",
          "phone": "फ़ोन नंबर",
          "weddingDate": "अनुमानित शादी की तारीख़",
          "password": "पासवर्ड",
          "confirmPassword": "पासवर्ड की पुष्टि करें",
          "terms": "मैं सेवा की शर्तों और प्राइवेसी पॉलिसी से सहमत हूं",
          "submit": "अकाउंट बनाएं",
          "haveAccount": "पहले से अकाउंट है?",
          "loginLink": "लॉग इन करें",
          "visualTitle": "1,200+ खुश कपल्स से जुड़ें",
          "visualDesc": "अपने बजट और स्टाइल के अनुसार चुने गए सत्यापित वेन्यू और वेंडर्स से मिलें।"
        },
        "errors": {
          "nameRequired": "कृपया अपना पूरा नाम दर्ज करें।",
          "emailInvalid": "कृपया एक मान्य ईमेल पता दर्ज करें।",
          "phoneInvalid": "कृपया एक मान्य 10-अंकों का फ़ोन नंबर दर्ज करें।",
          "passwordShort": "पासवर्ड कम से कम 8 अक्षरों का होना चाहिए।",
          "passwordMismatch": "पासवर्ड मेल नहीं खाते।",
          "termsRequired": "कृपया सेवा की शर्तें स्वीकार करें।",
          "messageShort": "आपका संदेश कम से कम 10 अक्षरों का होना चाहिए।"
        }
      },
      "dashboard": {
        "welcome": "वापसी पर स्वागत है",
        "nav": {
          "overview": "ओवरव्यू",
          "profile": "प्रोफ़ाइल",
          "plans": "सेव किए प्लान",
          "bookings": "बुकिंग्स",
          "wishlist": "विशलिस्ट",
          "budget": "बजट समरी",
          "notifications": "सूचनाएं",
          "settings": "सेटिंग्स"
        },
        "overview": {
          "title": "ओवरव्यू",
          "daysToGo": "बचे हुए दिन",
          "totalBudget": "कुल बजट",
          "vendorsBooked": "बुक किए वेंडर्स",
          "wishlistCount": "विशलिस्ट में"
        },
        "profile": {
          "title": "प्रोफ़ाइल",
          "subtitle": "अपनी जानकारी अपडेट रखें ताकि वेंडर्स आप तक पहुंच सकें।",
          "partnerName": "पार्टनर का नाम",
          "weddingCity": "शादी का शहर",
          "guestCount": "अनुमानित मेहमान",
          "saveChanges": "बदलाव सेव करें"
        },
        "plans": {
          "title": "सेव किए प्लान",
          "subtitle": "हमारे प्लानिंग टूल से बनाई गई शादी की योजनाएं।",
          "empty": "आपने अभी तक कोई वेडिंग प्लान सेव नहीं किया है।",
          "emptyCta": "प्लानिंग शुरू करें",
          "createdOn": "बनाया गया",
          "estBudget": "अनुमानित बजट",
          "viewPlan": "प्लान देखें",
          "deletePlan": "हटाएं"
        },
        "bookings": {
          "title": "बुकिंग्स",
          "subtitle": "अपने द्वारा बुक किए हर वेन्यू और वेंडर को ट्रैक करें।",
          "empty": "अभी तक कोई बुकिंग नहीं है। शुरू करने के लिए हमारे वेन्यू और वेंडर्स देखें।",
          "colVendor": "वेंडर / वेन्यू",
          "colDate": "तारीख़",
          "colAmount": "राशि",
          "colStatus": "स्थिति",
          "colAction": "कार्रवाई",
          "statusConfirmed": "पुष्टि हुई",
          "statusPending": "लंबित",
          "statusCancelled": "रद्द",
          "cancelBtn": "रद्द करें"
        },
        "wishlist": {
          "title": "विशलिस्ट",
          "subtitle": "वेन्यू और वेंडर्स जो आपने बाद के लिए सेव किए हैं।",
          "empty": "आपने अभी तक अपनी विशलिस्ट में कुछ नहीं जोड़ा है।"
        },
        "budget": {
          "title": "बजट समरी",
          "subtitle": "आपकी अनुमानित शादी के खर्च का लाइव विवरण।",
          "totalEstimated": "कुल अनुमानित बजट",
          "allocated": "आवंटित",
          "remaining": "शेष",
          "categoryBreakdown": "श्रेणी अनुसार विवरण"
        },
        "notifications": {
          "title": "सूचनाएं",
          "subtitle": "आपके वेंडर्स और हमारी प्लानिंग टीम से अपडेट।",
          "empty": "आप पूरी तरह अपडेट हैं!",
          "markAllRead": "सभी को पढ़ा हुआ चिह्नित करें"
        },
        "settings": {
          "title": "सेटिंग्स",
          "subtitle": "अपनी प्राथमिकताएं प्रबंधित करें।",
          "language": "भाषा",
          "theme": "थीम",
          "themeLight": "लाइट",
          "themeDark": "डार्क",
          "emailNotif": "ईमेल सूचनाएं",
          "smsNotif": "एसएमएस सूचनाएं",
          "deleteAccount": "अकाउंट हटाएं",
          "deleteWarning": "यह इस डिवाइस से आपका अकाउंट और सेव किया डेटा स्थायी रूप से हटा देगा।"
        }
      },
      "planner": {
        "hero": {
          "eyebrow": "अपना उत्सव डिज़ाइन करें",
          "title": "मेरी शादी प्लान करें",
          "subtitle": "कुछ सवालों के जवाब दें और अपने अनुमानित बजट को रीयल-टाइम में बदलते देखें।"
        },
        "steps": {
          "type": "शादी का प्रकार",
          "venue": "वेन्यू",
          "food": "भोजन",
          "decoration": "डेकोरेशन",
          "music": "म्यूज़िक और डीजे",
          "photography": "फोटोग्राफी",
          "bridal": "दुल्हन और दुल्हा",
          "invitations": "निमंत्रण",
          "guests": "मेहमान",
          "budget": "समीक्षा"
        },
        "type": {
          "title": "आप किस तरह की शादी प्लान कर रहे हैं?",
          "traditional": "पारंपरिक हिंदू",
          "destination": "डेस्टिनेशन वेडिंग",
          "royal": "रॉयल / राजवाड़ा",
          "modern": "मॉडर्न मिनिमल",
          "beach": "बीचसाइड",
          "interfaith": "अंतर-धार्मिक / फ्यूज़न"
        },
        "venue": {
          "title": "अपना वेन्यू स्टाइल चुनें",
          "banquet": "बैंक्वेट हॉल",
          "resort": "रिज़ॉर्ट",
          "palace": "महल",
          "lawn": "लॉन / गार्डन",
          "beach": "बीचसाइड",
          "hotel": "5-स्टार होटल"
        },
        "food": {
          "title": "अपनी केटरिंग स्टाइल चुनें",
          "veg": "शुद्ध शाकाहारी",
          "nonveg": "शाकाहारी + मांसाहारी",
          "jain": "जैन",
          "vegan": "वीगन",
          "regional": "क्षेत्रीय मल्टी-क्यूज़ीन"
        },
        "decoration": {
          "title": "डेकोरेशन स्टाइल चुनें",
          "floral": "फ्लोरल मंडप",
          "royal": "रॉयल राजवाड़ा",
          "modern": "मॉडर्न मिनिमल",
          "boho": "बीच बोहो",
          "themed": "कस्टम थीम"
        },
        "music": {
          "title": "अपना एंटरटेनमेंट चुनें",
          "dj": "प्रोफेशनल डीजे",
          "liveband": "लाइव बैंड",
          "classical": "शास्त्रीय / सूफ़ी",
          "choreographer": "संगीत कोरियोग्राफर",
          "none": "आवश्यक नहीं"
        },
        "photography": {
          "title": "फोटोग्राफी और वीडियोग्राफी चुनें",
          "basic": "कैंडिड फोटोग्राफी",
          "standard": "फ़ोटो + सिनेमैटिक फ़िल्म",
          "premium": "पूरी क्रू + ड्रोन + सेम-डे एडिट",
          "none": "आवश्यक नहीं"
        },
        "bridal": {
          "title": "दुल्हन और दुल्हा सेवाएं",
          "makeup": "ब्राइडल मेकअप",
          "mehendi": "मेहंदी आर्टिस्ट",
          "styling": "दुल्हा स्टाइलिंग",
          "jewellery": "ज्वेलरी सलाह",
          "none": "आवश्यक नहीं"
        },
        "invitations": {
          "title": "अपने निमंत्रण चुनें",
          "digital": "डिजिटल ई-निमंत्रण",
          "printed": "प्रिंटेड कार्ड",
          "boxed": "हाथ से बने बॉक्स्ड निमंत्रण",
          "none": "आवश्यक नहीं"
        },
        "guests": {
          "title": "आप कितने मेहमानों की उम्मीद कर रहे हैं?",
          "subtitle": "यह हमें वेन्यू और केटरिंग की लागत का सटीक अनुमान लगाने में मदद करता है।",
          "label": "मेहमानों की संख्या"
        },
        "budget": {
          "title": "आपका अनुमानित बजट",
          "subtitle": "यहां देखें कि आपकी पसंद कैसे जुड़ती है। बदलाव देखने के लिए कोई भी स्टेप बदलें।",
          "total": "अनुमानित कुल",
          "disclaimer": "यह टियर-1 शहर के औसत मूल्य पर आधारित अनुमान है। अंतिम कीमत वेंडर और मौसम के अनुसार बदल सकती है।",
          "saveBtn": "यह प्लान सेव करें",
          "savedTitle": "प्लान सेव हो गया!",
          "savedDesc": "आपकी शादी की योजना आपके डैशबोर्ड में जोड़ दी गई है।",
          "goToDashboard": "डैशबोर्ड पर जाएं",
          "loginPrompt": "इस प्लान को अपने डैशबोर्ड में सेव करने के लिए लॉग इन करें।",
          "loginBtn": "सेव करने के लिए लॉग इन करें"
        }
      }
    }
  };

  let currentLang = localStorage.getItem(STORAGE_KEY) || "en";
  let dict = {};
  const listeners = [];

  async function loadDict() {
    try {
      const res = await fetch(`locales/${currentLang}.json`, { cache: "no-store" });
      if (!res.ok) throw new Error("Network response not OK");
      dict = await res.json();
    } catch (err) {
      console.warn("[i18n] Could not fetch locale JSON over the network (this is normal if the page was opened via file:// instead of a local server). Using the built-in embedded translations instead — the site will still render fully.", err);
      dict = FALLBACK_STRINGS[currentLang] || FALLBACK_STRINGS.en;
    }
  }

  function get(path, fallback = "") {
    const parts = path.split(".");
    let node = dict;
    for (const p of parts) {
      if (node && typeof node === "object" && p in node) {
        node = node[p];
      } else {
        return fallback || path;
      }
    }
    return typeof node === "string" ? node : fallback || path;
  }

  function applyToDom(root = document) {
    root.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.textContent = get(key);
    });
    root.querySelectorAll("[data-i18n-html]").forEach(el => {
      const key = el.getAttribute("data-i18n-html");
      el.innerHTML = get(key);
    });
    root.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      el.setAttribute("placeholder", get(el.getAttribute("data-i18n-placeholder")));
    });
    root.querySelectorAll("[data-i18n-title]").forEach(el => {
      el.setAttribute("title", get(el.getAttribute("data-i18n-title")));
    });
    root.querySelectorAll("[data-i18n-aria]").forEach(el => {
      el.setAttribute("aria-label", get(el.getAttribute("data-i18n-aria")));
    });
    document.documentElement.setAttribute("lang", currentLang);
    document.documentElement.setAttribute("dir", "ltr"); // Hindi (Devanagari) is LTR too
    document.querySelectorAll(".lang-switch button, .mobile-drawer .lang-switch button").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });
  }

  async function setLang(lang) {
    if (lang === currentLang) return;
    currentLang = SUPPORTED.includes(lang) ? lang : "en";
    localStorage.setItem(STORAGE_KEY, currentLang);
    await loadDict();
    applyToDom();
    listeners.forEach(fn => fn(currentLang));
    document.dispatchEvent(new CustomEvent("vivaha:langchange", { detail: { lang: currentLang } }));
  }

  function onChange(fn) { listeners.push(fn); }
  function t(path, fallback) { return get(path, fallback); }
  function lang() { return currentLang; }

  async function init() {
    await loadDict();
    applyToDom();
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lang]");
      if (btn) setLang(btn.dataset.lang);
    });
  }

  return { init, setLang, t, lang, applyToDom, onChange };
})();
