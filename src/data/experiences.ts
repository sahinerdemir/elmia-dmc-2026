export interface ExperienceDay {
  day: number;
  title: string;
  location: string;
  description: string;
  highlights: string[];
  meals?: string;
  hotel?: string;
}

export interface Accommodation {
  city: string;
  name: string;
  stars: number;
  description?: string;
  link?: string;
}

export interface Experience {
  slug: string;
  title: string;
  subtitle: string;
  destination: string;
  duration: string;
  category: string;
  heroImage: string;
  thumbnailImage: string;
  overview: string;
  highlights: string[];
  itinerary: ExperienceDay[];
  inclusions: string[];
  exclusions: string[];
  accommodations: Accommodation[];
  includedServices: string[];
  metaTitle: string;
  metaDescription: string;
}

export const EXPERIENCES: Experience[] = [
  {
    "slug": "american-legends",
    "title": "American Legends",
    "subtitle": "New York - California - Nevada",
    "destination": "New York, California, Nevada",
    "duration": "10 Days / 9 Nights",
    "category": "Tours",
    "heroImage": "/images/new-york-hero.jpg",
    "thumbnailImage": "/images/tours/new-york-thumb.jpg",
    "overview": "Meeting at Istanbul Airport at 04:00. Following passport control, check-in and customs procedures, departure to New York, one of the most important cities in the United States, with Turkish Airlines flight TK003 at 06:45. After an approximately 10-hour flight, arrival in New York at 10:45. Upon arrival, meeting with our guide at the airport and tra...",
    "highlights": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Istanbul - New York",
        "location": "New York",
        "description": "Meeting at Istanbul Airport at 04:00. Following passport control, check-in and customs procedures, departure to New York, one of the most important cities in the United States, with Turkish Airlines flight TK003 at 06:45. After an approximately 10-hour flight, arrival in New York at 10:45. Upon arrival, meeting with our guide at the airport and transfer to our hotel by private vehicle. As hotel rooms cannot be checked in before 15:00, guests who wish may participate in the optional New York City Introduction Tour organized by our guide. During this two-day tour, you will explore New York extensively.\n\nOn the first day;We begin our tour by arriving at Manhattan Island, the most popular and important area of New York City. We will see Central Park, the most expensive apartment buildings of New York, Museum Mile, the Metropolitan Museum, Columbus Circle, Trump Hotel, The Plaza Hotel, the iconic Apple Store, Trump Tower, St. Patrick’s Cathedral, Rockefeller Center, New York Public Library, Flatiron Building, Madison Square Park, Washington Square Park in Greenwich Village, and New York University. In the later part of the tour, passing through SoHo, we reach the Civic Center and financial district. We will pass through Wall Street, the center of the financial world, and the World Trade Center area. Proceeding along the Hudson River, we return to the city center and see Times Square, where LED billboards turn night into day. At the end of the tour, we return to our hotel. After room allocation, a short rest break is followed by a walk or metro ride to Central Park. After a pleasant walk in the park and a short break at the Apple Store, we return to our hotel. Overnight at the hotel.",
        "highlights": [
          "During this two-day tour, you will explore New York extensively",
          "At the end of the tour, we return to our hotel"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 2,
        "title": "New York",
        "location": "New York",
        "description": "Free time for guests not joining the tour. Guests joining the tour will participate in the New York Icons Tour. First, we travel by metro to Battery Park, located at the southern tip of Manhattan, a circular building where historical cannons used for New York’s defense were placed. While seeing the war memorials in the park, we complete ticket and entrance procedures and take a ferry to Liberty Island, home to the Statue of Liberty. During the ferry ride, we take photos of the Statue of Liberty with a magnificent Manhattan view. Upon arrival, we tour the island, listen to the story of the statue and immigrants, and during free time provided by the guide, visit the museum or enjoy coffee. (The program may change depending on weather conditions and ferry queues.) We return to Battery Park by ferry. After seeing the monument where New York’s founding story begins, a pleasant walking route awaits us. We visit the Financial District, Wall Street, the Charging Bull Statue, the Stock Exchange Building, the 9/11 Memorial, the new World Trade Center Tower (Freedom Tower), and the Oculus structure, then travel by metro to the Dumbo area. After taking photos with the Brooklyn Bridge view and listening to its story, we go to the Empire State Building. Guests who wish may go up to view Manhattan from above (tickets approximately USD 52-65). Depending on availability, the guide may direct guests to One Vanderbilt. Afterward, free time for shopping, dinner, and coffee. Overnight at the hotel.",
        "highlights": [
          "Free time for guests not joining the tour",
          "Guests joining the tour will participate in the New York Icons Tour"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 3,
        "title": "New York",
        "location": "New York",
        "description": "Free time in the morning. Guests who wish may join the optional “Hidden Legends of New York” tour. The tour begins in the early morning hours in the lively streets of Chinatown. A short walk takes you to Little Italy, where espresso and fresh bread aromas fill the air. During the exploration, you may feel as if you are reliving scenes from The Godfather. We continue with a walk through SoHo, known for its cast-iron buildings and cobblestone streets, where modern luxury meets historical architecture. The day continues at Carrie Bradshaw’s house from Sex and the City and Perry Street in West Village, a perfect photo stop. Lunch at Chelsea Market, formerly the Oreo factory, followed by a walk along the High Line, witnessing the architecture of Manhattan’s West Side and Hudson River views. The adventure continues at Vessel in Hudson Yards. In the afternoon, enjoy a peaceful moment at Bryant Park. As evening lights illuminate the city, we visit Grand Central Terminal, famous for its celestial ceiling and iconic architecture. Return to the hotel and overnight stay.",
        "highlights": [
          "Guests who wish may join the optional “Hidden Legends of New York” tour",
          "The tour begins in the early morning hours in the lively streets of Chinatown"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 4,
        "title": "New York - Los Angeles",
        "location": "Los Angeles",
        "description": "Transfer to New York Airport in the morning. After an approximately 5.5-hour domestic flight, arrival in Los Angeles. Transfer to the hotel by private vehicle. As rooms will be available after 15:00, guests may rest in the lobby or join the optional Los Angeles &amp; Santa Monica Tour. Visit Hollywood Boulevard, Dolby Theater, Chinese Theater, Walk of Fame, Hollywood Sign photo stop, Sunset Strip, Beverly Hills, Rodeo Drive, Beverly Wilshire Hotel, and Downtown Los Angeles including Olvera Street. After the tour, transfer to the hotel and free time. Optional Santa Monica evening tour. Overnight at the hotel.",
        "highlights": [
          "After the tour, transfer to the hotel and free time",
          "Optional Santa Monica evening tour"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 5,
        "title": "Los Angeles",
        "location": "Los Angeles",
        "description": "Free time in the morning. Optional San Diego Tour. Visit La Jolla, Old Town, Seaport Village, Midway Aircraft Carrier (photo stop only), Unconditional Surrender Statue, Coronado Island, and Hotel Del Coronado. Return to the hotel and overnight stay.Note: Midway Aircraft Carrier visit is external photo stop only.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 6,
        "title": "Los Angeles",
        "location": "Los Angeles",
        "description": "Free time in the morning. Optional Universal Studios Tour. Visit one of the world’s largest theme parks and film studios. After the tour, free time. Overnight at the hotel.",
        "highlights": [
          "After the tour, free time"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 7,
        "title": "Los Angeles - Las Vegas",
        "location": "Las Vegas",
        "description": "Departure to Las Vegas. Stop at Calico Ghost Town if group participation allows. After approximately 4.5 hours, arrival in Las Vegas and hotel transfer. Rooms available after 16:00. Optional Las Vegas Combo Tours including Strip, Mall, The Sphere, Downtown, and Fremont Street Experience. Return to the hotel. Overnight stay.",
        "highlights": [
          "Stop at Calico Ghost Town if group participation allows"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 8,
        "title": "Las Vegas",
        "location": "Las Vegas",
        "description": "Free time in the morning. Optional Grand Canyon Tour. Visit Eagle Point and Guano Point. Optional Helicopter Tour USD 350. Evening Strip walk and optional shows. Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 9,
        "title": "Las Vegas",
        "location": "Las Vegas",
        "description": "Free time. Optional Premium Outlet Tour. Return to the hotel. Overnight stay.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 10,
        "title": "Las Vegas - Los Angeles - Istanbul",
        "location": "Istanbul",
        "description": "Departure at 11:00 to Los Angeles Airport. Flight to Istanbul with Turkish Airlines TK10 at 18:25.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 11,
        "title": "Istanbul",
        "location": "Istanbul",
        "description": "Arrival in Istanbul at 18:25 local time. End of tour.\n\nINCLUDED SERVICES\n\nEXCLUDED SERVICES\n\nCANCELLATION CONDITIONS",
        "highlights": [
          "End of tour"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      }
    ],
    "inclusions": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk",
      "All state taxes, road tolls, and commercial transit permits"
    ],
    "exclusions": [
      "International transatlantic airfare (available upon request)",
      "Personal expenditures and optional evening event admissions",
      "Travel insurance and medical contingency coverage",
      "Discretionary gratuities for local chauffeurs and guides"
    ],
    "accommodations": [
      {
        "city": "New York",
        "name": "Baccarat Hotel New York",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.baccarathotels.com/"
      },
      {
        "city": "Los Angeles",
        "name": "The Beverly Hills Hotel",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.dorchestercollection.com/los-angeles/the-beverly-hills-hotel"
      },
      {
        "city": "Las Vegas",
        "name": "Wynn Las Vegas",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.wynnlasvegas.com/"
      }
    ],
    "includedServices": [
      "Private air-conditioned luxury motorcoach & executive sprinters",
      "Accommodations at luxury partner hotels throughout the itinerary",
      "Daily breakfast & select chef-curated delegation lunches",
      "Professional bilingual tour director & local historic guides",
      "All airport & train station private luggage transfers",
      "24/7 dedicated dispatch operations desk & guest assistance"
    ],
    "metaTitle": "American Legends | Curated USA Tours - ELMIA DMC",
    "metaDescription": "Explore American Legends across New York, California, and Nevada with ELMIA DMC. Luxury corporate and group travel itineraries with 24/7 executive ground support."
  },
  {
    "slug": "pearls-of-america",
    "title": "Pearls of America",
    "subtitle": "New York - Washington D.C. - California - Nevada",
    "destination": "New York, Washington D.C., California, Nevada",
    "duration": "13 Days / 12 Nights",
    "category": "Tours",
    "heroImage": "/images/washington-hero.jpg",
    "thumbnailImage": "/images/tours/washington-thumb.jpg",
    "overview": "After gathering at Istanbul Airport at 05:00, departure to Washington, the capital of the United States, with Turkish Airlines flight TK187 at 08:15. Arrival at 12:10 local time and meeting with your guide. Welcome by our guide at the airport and transfer to our hotel by private vehicle. As hotel rooms will not be available before 16:00, guests may...",
    "highlights": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Istanbul - Washington",
        "location": "Washington",
        "description": "After gathering at Istanbul Airport at 05:00, departure to Washington, the capital of the United States, with Turkish Airlines flight TK187 at 08:15. Arrival at 12:10 local time and meeting with your guide. Welcome by our guide at the airport and transfer to our hotel by private vehicle. As hotel rooms will not be available before 16:00, guests may choose to join the optional Washington City Introduction Tour organized by our guide to both explore the city and make efficient use of time.\n\nThis tour, which will last for two days, will allow you to discover Washington in depth. Our first stop is The Pentagon. Although entry is not permitted, we will visit a panoramic viewpoint overlooking the headquarters of the U.S. Department of Defense, where we will also see which wing was hit during the September 11 attacks. Our next stop is the Korean War Veterans Memorial, built in memory of those who lost their lives and veterans of the Korean War, which also holds importance for Turkish history. We then continue to Arlington National Cemetery.\n\nAfter the tour, transfer to the hotel and free time. Overnight at the hotel.",
        "highlights": [
          "Our first stop is The Pentagon",
          "After the tour, transfer to the hotel and free time"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 2,
        "title": "Washington, DC",
        "location": "Washington, DC",
        "description": "Free time for guests not participating in the tour. Guests joining the tour will begin discovering this magnificent city, which serves as the federal capital of the United States and stands out with its architecture, history, and culture. Established on special federal land between the states of Virginia and Maryland along the Potomac River, Washington hosts numerous government institutions.\n\nSites to be visited include the U.S. Capitol, home to the Senate and the House of Representatives; the Library of Congress, the world’s largest library; Union Station; and the National Mall. We will see iconic landmarks such as the Lincoln Memorial and the Washington Monument, perfectly aligned to allow visitors to view three monumental structures simultaneously. During our walk along the National Mall, we will also see memorials dedicated to American soldiers who were martyred or became veterans in wars.\n\nNext, we visit the Washington Monument, built in honor of George Washington, the first President of the United States. When completed, it was the tallest structure in the world and today stands at the very heart of the city. We then proceed to the World War II Memorial, which symbolically depicts the Atlantic and Pacific fronts and was inaugurated in 2001.\n\nFollowing the Thomas Jefferson Memorial, we head to the White House, the official residence of the U.S. President. We will approach the front area, where visitors can observe people protesting 24/7 and security snipers positioned on rooftops. Originally burned by the British during the War of 1812, the White House was later rebuilt while preserving its original modest design.\n\nBefore returning to the hotel, we visit M Street and Georgetown University. Along this lively avenue, we will have the opportunity to experience local life among shops, restaurants, and cafés, and see one of America’s most prestigious universities. Free time upon arrival at the hotel. Overnight at the hotel.",
        "highlights": [
          "Free time for guests not participating in the tour",
          "Sites to be visited include the U.S",
          "Before returning to the hotel, M Street and Georgetown University"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 3,
        "title": "Washington, DC - New York",
        "location": "New York",
        "description": "Early morning departure from the hotel to New York. Arrival around noon and transfer to the hotel, where we will meet the group arriving from Turkey. As rooms will not be available before 16:00, guests may join the optional New York City Introduction Tour, which will span two days and offer a comprehensive exploration of the city.\n\nFirst Day:We begin our tour on Manhattan Island, the most popular and important part of New York City. We will see Central Park, luxury residential buildings, Museum Mile, the Metropolitan Museum, Columbus Circle, Trump Hotel, The Plaza Hotel, the iconic Apple Store, Trump Tower, St. Patrick’s Cathedral, Rockefeller Center, the New York Public Library, Flatiron Building, Madison Square Park, Washington Square Park, and New York University.\n\nLater, we pass through SoHo, reach the Civic Center and Financial District, see Wall Street and the World Trade Center, and drive along the Hudson River. We then visit Times Square, famous for its LED billboards illuminating the night like daylight.\n\nAfter returning to the hotel and room distribution, we take a short rest and later walk or take the subway to Central Park for a pleasant stroll, followed by a short break at the Apple Store. Return to the hotel. Overnight stay.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 4,
        "title": "New York",
        "location": "New York",
        "description": "Free time for guests not joining the tour. Participants will join the New York Icons Tour. We first take the subway to Battery Park, then board a ferry to Liberty Island to visit the Statue of Liberty. After touring the island and hearing stories of immigration, free time is given to visit the museum or enjoy coffee.\n\nWe return by ferry to Battery Park and continue on foot to the Financial District, Wall Street, Charging Bull, Stock Exchange Building, 9/11 Memorial, Freedom Tower, and Oculus. We then travel by subway to DUMBO, photograph the Brooklyn Bridge, and continue to the Empire State Building (optional observation deck visit; tickets approx. USD 52-65). Depending on availability, guests may be directed to One Vanderbilt.\n\nFree time for shopping, dinner, and coffee. Overnight at the hotel.",
        "highlights": [
          "Free time for guests not joining the tour"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 5,
        "title": "New York",
        "location": "New York",
        "description": "Morning free time. Optional Hidden Legends of New York Tour begins in Chinatown, continues to Little Italy, SoHo, West Village, Carrie Bradshaw’s House, Chelsea Market, High Line, Hudson Yards &amp; Vessel, Bryant Park, and concludes at Grand Central Terminal. Return to the hotel. Overnight stay.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 6,
        "title": "New York - Los Angeles",
        "location": "Los Angeles",
        "description": "Transfer to the airport and flight to Los Angeles (approx. 5.5 hours). Transfer to the hotel. Optional Los Angeles &amp; Santa Monica Tour including Hollywood Boulevard, Dolby Theatre, Chinese Theatre, Walk of Fame, Hollywood Sign, Sunset Strip, Beverly Hills, Rodeo Drive, Beverly Wilshire Hotel, Downtown LA, Olvera Street, and Santa Monica. Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 7,
        "title": "Los Angeles",
        "location": "Los Angeles",
        "description": "Free time or optional San Diego Tour, including La Jolla, Old Town, Seaport Village, USS Midway (external visit), Unconditional Surrender Statue, and Coronado Island. Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 8,
        "title": "Los Angeles",
        "location": "Los Angeles",
        "description": "Free time or optional Universal Studios Tour, featuring over 40 shows, film sets, and attractions. Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 9,
        "title": "Los Angeles - Las Vegas",
        "location": "Las Vegas",
        "description": "Departure to Las Vegas with a stop at Calico Ghost Town (subject to participation). Arrival, hotel transfer, optional Las Vegas Combo Tour, Las Vegas Strip, The Sphere, Fremont Street Experience. Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 10,
        "title": "Las Vegas",
        "location": "Las Vegas",
        "description": "Free time or optional Grand Canyon Tour, including Eagle Point, Guano Point, Hualapai cultural experience, and optional Helicopter Tour (USD 300). Evening Las Vegas Strip walk and optional shows. Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 11,
        "title": "Las Vegas - San Francisco",
        "location": "San Francisco",
        "description": "Flight to San Francisco. Optional San Francisco City Tour including Civic Center, Golden Gate Bridge, Fisherman’s Wharf, Chinatown, Twin Peaks, Haight-Ashbury, Palace of Fine Arts, and Lombard Street. Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 12,
        "title": "San Francisco",
        "location": "San Francisco",
        "description": "Free time or optional Muir Woods National Park &amp; Premium Outlet Tour. Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 13,
        "title": "San Francisco - Istanbul",
        "location": "Istanbul",
        "description": "Free time or optional Sausalito - Alcatraz (by boat) - Fisherman’s Wharf - Cable Car - Union Square Tour. Transfer to San Francisco Airport and departure to Istanbul with Turkish Airlines flight TK080 at 18:45. Overnight on the plane.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 14,
        "title": "Istanbul",
        "location": "Istanbul",
        "description": "Arrival at Istanbul Airport at 18:15 local time. End of the tour.\n\nServices Included\n\nServices Not Included",
        "highlights": [
          "End of the tour"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      }
    ],
    "inclusions": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk",
      "All state taxes, road tolls, and commercial transit permits"
    ],
    "exclusions": [
      "International transatlantic airfare (available upon request)",
      "Personal expenditures and optional evening event admissions",
      "Travel insurance and medical contingency coverage",
      "Discretionary gratuities for local chauffeurs and guides"
    ],
    "accommodations": [
      {
        "city": "Washington",
        "name": "Waldorf Astoria Washington DC",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.hilton.com/en/hotels/dcawawa-waldorf-astoria-washington-dc/"
      },
      {
        "city": "New York",
        "name": "Baccarat Hotel New York",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.baccarathotels.com/"
      },
      {
        "city": "Los Angeles",
        "name": "The Beverly Hills Hotel",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.dorchestercollection.com/los-angeles/the-beverly-hills-hotel"
      },
      {
        "city": "Las Vegas",
        "name": "Wynn Las Vegas",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.wynnlasvegas.com/"
      },
      {
        "city": "San Francisco",
        "name": "Fairmont San Francisco",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.fairmont.com/san-francisco/"
      }
    ],
    "includedServices": [
      "Private air-conditioned luxury motorcoach & executive sprinters",
      "Accommodations at luxury partner hotels throughout the itinerary",
      "Daily breakfast & select chef-curated delegation lunches",
      "Professional bilingual tour director & local historic guides",
      "All airport & train station private luggage transfers",
      "24/7 dedicated dispatch operations desk & guest assistance"
    ],
    "metaTitle": "Pearls of America | Curated USA Tours - ELMIA DMC",
    "metaDescription": "Explore Pearls of America across New York, Washington D.C., California, and Nevada with ELMIA DMC. Luxury corporate and group travel itineraries with 24/7 executive ground support."
  },
  {
    "slug": "coast-to-coast-america",
    "title": "Coast to Coast America",
    "subtitle": "Florida - Washington D.C. - New York - California - Nevada",
    "destination": "Florida, Washington D.C., New York, California, Nevada",
    "duration": "16 Days / 15 Nights",
    "category": "Tours",
    "heroImage": "/images/slide-global.jpg",
    "thumbnailImage": "/images/tours/miami-thumbnail2.jpg",
    "overview": "Meeting at Istanbul Airport at 22:30 on the evening prior to the tour departure date. After passport control, check-in and customs procedures, departure to Miami, one of the most famous coastal cities in the United States, with Turkish Airlines flight TK157 at 00:40. Arrival in Miami at 06:00 after an approximately 12-hour flight.\n\nMeeting with you...",
    "highlights": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Istanbul - Miami",
        "location": "Miami",
        "description": "Meeting at Istanbul Airport at 22:30 on the evening prior to the tour departure date. After passport control, check-in and customs procedures, departure to Miami, one of the most famous coastal cities in the United States, with Turkish Airlines flight TK157 at 00:40. Arrival in Miami at 06:00 after an approximately 12-hour flight.\n\nMeeting with your guide at the airport and transfer to the hotel. As hotel rooms will not be available before 16:00, guests may join the optional Miami &amp; Star Island Tour, organized by the guide, in order to explore the city with a professional guide and make the most of their time.\n\nWe first proceed to Miami Beach for a morning walk. Depending on preference, a short break for breakfast or coffee will be given before starting our city tour by coach. During the tour, we will see Miami Beach, Lincoln Road, the Versace Mansion (one of Miami Beach’s iconic landmarks), the luxury residential districts, Little Havana (home to Cuban immigrants), the Wynwood district, once a derelict area and now transformed into a massive open-air art gallery by world-famous street artists, Coconut Grove, the former Pan American Airways seaplane terminal (now City Hall), and the marina with a photo stop.\n\nWe then continue to Coral Gables, known for its beautiful residences, the famous Coral Gables Venetian Pool (formerly a coral quarry), and the historic Biltmore Hotel. Lunch break at Bayside Marketplace. In the afternoon, we board our boat for the Star Island Tour, visiting the most exclusive residential islands of Miami, where you will see the homes of world-famous celebrities such as Gloria Estefan, Julio Iglesias, Madonna, Frank Sinatra, and many others.\n\nAfter the tour, transfer to the hotel. Room allocation and free time. Overnight at the hotel.",
        "highlights": [
          "After the tour, transfer to the hotel"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 2,
        "title": "Miami",
        "location": "Miami",
        "description": "After breakfast, free time for shopping, relaxation, swimming, and exploring the surroundings. Guests who wish may join the optional Florida Keys &amp; Key West Tour.\n\nOn this full-day tour, we depart Miami early in the morning by private vehicle and travel to Key West, the southernmost town on the east coast of the United States. During the scenic journey, with the Atlantic Ocean on our left and the Gulf of Mexico on our right, we pass numerous islands known as the Florida Keys and cross long bridges offering spectacular ocean views and photo opportunities. Various surprises will be offered along the way.\n\nUpon arrival in Key West, we enjoy a short panoramic city tour, including Southernmost Point, the home of famous writer Ernest Hemingway, the winter residence of former President Harry S. Truman, and Duval Street with its many bars and restaurants overlooking the marina.\n\nIn the evening, we head to Islamorada to watch the sunset accompanied by torches and live music. After this unforgettable experience, return to the hotel. Overnight stay.\n\nNote: During winter months, sunset may take place in Key West due to earlier sunset times.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 3,
        "title": "Miami - Washington DC",
        "location": "Washington DC",
        "description": "After breakfast, transfer to Miami Airport for our domestic flight to Washington DC, the capital of the United States. Upon arrival, meeting with the vehicle waiting for us and transfer to the hotel. Here, we join the group arriving from Istanbul.\n\nAs hotel rooms will not be available before 16:00, guests who wish may join the optional Washington DC Introductory Tour, organized by the guide, to explore the city efficiently. This tour lasts two days and offers a comprehensive overview of Washington DC.\n\nOur first stop is the Pentagon. Although entry is not permitted, we visit a panoramic viewpoint overlooking the headquarters of the U.S. Department of Defense, where we can see which wing was struck during the September 11 attacks. Our next stop is the Korean War Veterans Memorial, an important site also significant to Turkish history. We then continue to Arlington National Cemetery. After the tour, transfer to the hotel and free time. Overnight at the hotel.",
        "highlights": [
          "This tour lasts two days and offers a comprehensive overview of Washington DC",
          "Our first stop is the Pentagon",
          "After the tour, transfer to the hotel and free time"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 4,
        "title": "Washington DC",
        "location": "Washington DC",
        "description": "Free time for guests not participating in the tour. With participating guests, we begin exploring this magnificent city, rich in architecture, history, and culture, and serving as the federal capital of the United States.\n\nWashington DC, with its special status, is located along the Potomac River between Virginia and Maryland and hosts numerous government institutions. Places to be visited include the U.S. Capitol (home to the Senate and House of Representatives), the Library of Congress (the largest library in the world), Union Station, and the National Mall.\n\nWe will see iconic symbols of Washington DC and the United States, including the Lincoln Memorial and the Washington Monument, perfectly aligned to offer views of three major landmarks simultaneously. Along the National Mall, we also see memorials dedicated to American soldiers who died or served in wars.\n\nNext stops include the World War II Memorial, symbolizing victory on land, sea, and air, and the Thomas Jefferson Memorial. We then visit the White House, the official residence of the U.S. President, where we will observe protestors and security measures.\n\nBefore returning to the hotel, we visit M Street and Georgetown University. Along this vibrant avenue, guests can experience local life, enjoy shops, cafés, and restaurants, and see one of America’s most prestigious universities. Free time upon return to the hotel. Overnight stay.",
        "highlights": [
          "Free time for guests not participating in the tour",
          "Places to be visited include the U.S",
          "visit the White House, the official residence of the U.S"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 5,
        "title": "Washington DC - New York",
        "location": "New York",
        "description": "Early morning departure from the hotel and travel to New York. Arrival around noon and transfer to the hotel, where we join the group arriving from Turkey.\n\nAs rooms will not be available before 16:00, guests may join the optional New York Introductory Tour, which lasts two days and provides an in-depth exploration of the city.\n\nDay One:We begin on Manhattan Island, the most important and popular area of New York City. Visits include Central Park, luxury residential buildings, Museum Mile, the Metropolitan Museum of Art, Columbus Circle, Trump Hotel, The Plaza Hotel, the iconic Apple Store, Trump Tower, St. Patrick’s Cathedral, Rockefeller Center, the New York Public Library, Flatiron Building, Madison Square Park, Washington Square Park in Greenwich Village, and New York University.\n\nContinuing through SoHo, we reach the Civic Center and Financial District, passing Wall Street and the World Trade Center area. Following the Hudson River, we return to the city center to see Times Square, where LED screens illuminate the night like daylight.\n\nAfter the tour, return to the hotel, room allocation, a short rest, and then a walk or metro ride to Central Park for a pleasant stroll, followed by a short stop at the Apple Store. Return to the hotel. Overnight stay.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 6,
        "title": "New York",
        "location": "New York",
        "description": "Free time for guests not participating in the tour. With participating guests, we enjoy the New York Icons Tour.\n\nWe travel by metro to Battery Park, located at the southern tip of Manhattan. After completing ticket and entry procedures, we take a ferry to Liberty Island. During the ferry ride, enjoy magnificent views of Manhattan and photograph the Statue of Liberty.\n\nUpon arrival, we tour the island, listen to the story of the statue and immigrants, and enjoy free time to visit the museum or have coffee.(The program may be modified according to weather conditions and ferry availability.)\n\nReturning to Battery Park, we walk through the Financial District, seeing Wall Street, the Charging Bull statue, the Stock Exchange Building, the 9/11 Memorial, the Freedom Tower, and the Oculus structure. We then take the metro to DUMBO to photograph the Brooklyn Bridge and continue to the Empire State Building. Guests may optionally visit the observation deck (approx. USD 52-65). Depending on availability, the guide may suggest One Vanderbilt. Free time for shopping, dinner, and coffee. Overnight stay.",
        "highlights": [
          "Free time for guests not participating in the tour",
          "Guests may optionally visit the observation deck (approx"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 7,
        "title": "New York",
        "location": "New York",
        "description": "Free time in the morning. Guests who wish may join the optional Hidden Legends of New York Tour. The tour begins at dawn in Chinatown, continues to Little Italy, SoHo, West Village (including Carrie Bradshaw’s house), Chelsea Market, High Line, Hudson Yards (Vessel), Bryant Park, and concludes at the magnificent Grand Central Terminal, famous for its celestial ceiling and cinematic history. Return to the hotel and overnight stay.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 8,
        "title": "New York - Los Angeles",
        "location": "Los Angeles",
        "description": "Transfer to New York Airport and domestic flight to Los Angeles (approx. 5.5 hours). Upon arrival, meeting with our private vehicle and transfer to the hotel. As rooms will be available after 15:00, guests may relax in the lobby or join the optional Los Angeles &amp; Santa Monica Tour.\n\nVisits include Hollywood Boulevard, Dolby Theatre, Chinese Theatre, Walk of Fame, views of the Hollywood Sign, Sunset Strip, Beverly Hills, Rodeo Drive, Beverly Wilshire Hotel, Downtown Los Angeles, and Olvera Street. Optional evening visit to Santa Monica. Overnight stay.",
        "highlights": [
          "Optional evening visit to Santa Monica"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 9,
        "title": "Los Angeles",
        "location": "Los Angeles",
        "description": "Free time in the morning. Optional San Diego Tour, including La Jolla, Old Town, Seaport Village, USS Midway (exterior visit), Unconditional Surrender Statue, and Coronado Island. Return to the hotel. Overnight stay.Note: USS Midway visit is exterior only.",
        "highlights": [
          "Overnight stay.Note: USS Midway visit is exterior only."
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 10,
        "title": "Los Angeles",
        "location": "Los Angeles",
        "description": "Free time in the morning. Optional Universal Studios Tour, visiting film studios and theme park attractions. Free time after the tour. Overnight stay.",
        "highlights": [
          "Free time after the tour"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 11,
        "title": "Los Angeles - Las Vegas",
        "location": "Las Vegas",
        "description": "Departure from the hotel to Las Vegas, Nevada. En route, if there is sufficient participation, visit Calico Ghost Town. After an approximately 4.5-hour journey, arrival and transfer to the hotel. Rooms available after 16:00.\n\nOptional Las Vegas Combination Tour, including the Las Vegas Strip, shopping malls, The Sphere, and Fremont Street Experience. Return to the hotel. Overnight stay.",
        "highlights": [
          "En route, if there is sufficient participation, visit Calico Ghost Town"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 12,
        "title": "Las Vegas",
        "location": "Las Vegas",
        "description": "Free time. Optional Grand Canyon Tour, visiting Eagle Point and Guano Point, with breathtaking views and encounters with the Hualapai Native Americans.\n\nOptional Helicopter Tour - USD 350: descent to the Colorado River and boat ride.\n\nIn the evening, walk along the Las Vegas Strip and optional attendance at world-famous shows. Overnight stay.Note: During summer, the tour starts earlier due to high temperatures.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 13,
        "title": "Las Vegas - San Francisco",
        "location": "San Francisco",
        "description": "Transfer to Las Vegas Airport and domestic flight to San Francisco. Meeting with the guide and transfer to the hotel. Rooms available after 15:00. Optional San Francisco Introductory Tour, including Civic Center, Golden Gate Bridge, Fisherman’s Wharf, Chinatown, Twin Peaks, Haight-Ashbury, Palace of Fine Arts, and Lombard Street. Overnight stay.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 14,
        "title": "San Francisco",
        "location": "San Francisco",
        "description": "Free time. Optional Muir Woods National Park &amp; San Francisco Premium Outlets Tour. Return to the hotel and overnight stay.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 15,
        "title": "San Francisco - Istanbul",
        "location": "Istanbul",
        "description": "Check-out in the morning and free time until flight departure. Optional Sausalito - Alcatraz (by boat) - Fisherman’s Wharf - Cable Car - Union Square Tour. Transfer to San Francisco Airport and departure to Istanbul with Turkish Airlines flight TK080 at 18:45. Overnight on board.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 16,
        "title": "Istanbul",
        "location": "Istanbul",
        "description": "Arrival at Istanbul Airport at 18:15 local time. End of the tour.\n\nDaily programs may be modified in day and time, while maintaining the same content, according to the guide’s recommendation and operational convenience.\n\nServices Included\n\nServices Not Included",
        "highlights": [
          "End of the tour"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      }
    ],
    "inclusions": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk",
      "All state taxes, road tolls, and commercial transit permits"
    ],
    "exclusions": [
      "International transatlantic airfare (available upon request)",
      "Personal expenditures and optional evening event admissions",
      "Travel insurance and medical contingency coverage",
      "Discretionary gratuities for local chauffeurs and guides"
    ],
    "accommodations": [
      {
        "city": "New York",
        "name": "Baccarat Hotel New York",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.baccarathotels.com/"
      },
      {
        "city": "Niagara",
        "name": "Seneca Niagara Resort & Casino",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://senecaniagaracasino.com/"
      },
      {
        "city": "Washington",
        "name": "Waldorf Astoria Washington DC",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.hilton.com/en/hotels/dcawawa-waldorf-astoria-washington-dc/"
      },
      {
        "city": "San Francisco",
        "name": "Fairmont San Francisco",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.fairmont.com/san-francisco/"
      },
      {
        "city": "Las Vegas",
        "name": "Wynn Las Vegas",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.wynnlasvegas.com/"
      },
      {
        "city": "Los Angeles",
        "name": "The Beverly Hills Hotel",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.dorchestercollection.com/los-angeles/the-beverly-hills-hotel"
      },
      {
        "city": "Miami",
        "name": "The Setai, Miami Beach",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.thesetaihotel.com"
      }
    ],
    "includedServices": [
      "Private air-conditioned luxury motorcoach & executive sprinters",
      "Accommodations at luxury partner hotels throughout the itinerary",
      "Daily breakfast & select chef-curated delegation lunches",
      "Professional bilingual tour director & local historic guides",
      "All airport & train station private luggage transfers",
      "24/7 dedicated dispatch operations desk & guest assistance"
    ],
    "metaTitle": "Coast to Coast America | Curated USA Tours - ELMIA DMC",
    "metaDescription": "Explore Coast to Coast America across Florida, Washington D.C., New York, California, and Nevada with ELMIA DMC. Luxury corporate and group travel itineraries with 24/7 executive ground support."
  },
  {
    "slug": "coast-to-coast-us-tour",
    "title": "Coast to Coast US Tour",
    "subtitle": "Florida - New York - California - Nevada",
    "destination": "Florida, New York, California, Nevada",
    "duration": "14 Days / 13 Nights",
    "category": "Tours",
    "heroImage": "/images/chicago-hero.jpg",
    "thumbnailImage": "/images/tours/miami-thumbnail2.jpg",
    "overview": "Participants are required to be at Istanbul Airport at 22:30 on the evening prior to the tour departure date. Following passport control, check-in and customs procedures, departure to Miami, one of the most famous coastal cities in the United States, with Turkish Airlines flight TK157 at 00:40. Arrival in Miami at 06:00 after an approximately 12-ho...",
    "highlights": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Istanbul - Miami",
        "location": "Miami",
        "description": "Participants are required to be at Istanbul Airport at 22:30 on the evening prior to the tour departure date. Following passport control, check-in and customs procedures, departure to Miami, one of the most famous coastal cities in the United States, with Turkish Airlines flight TK157 at 00:40. Arrival in Miami at 06:00 after an approximately 12-hour flight.\n\nMeeting with your guide at the airport and transfer to the hotel. As hotel rooms will not be available before 16:00, guests may choose to join the optional Miami &amp; Star Island Tour, organized to make efficient use of time while discovering the city with a professional guide.\n\nFirst, we proceed to Miami Beach for a morning walk. Depending on your preference, a short break for breakfast or coffee will be given before starting the tour by vehicle. During the tour, we will see Miami Beach, Lincoln Road, and take photos in front of Versace Mansion, one of Miami Beach’s iconic landmarks. We will visit the affluent residential areas, Little Havana, home to Cuban immigrants, and the Wynwood district, once a rundown area and now transformed into a massive open-air art gallery through global street art projects.\n\nWe continue to Coconut Grove, view the former Pan American Airways seaplane terminal (now City Hall), and take a photo break at the marina. We will see Coral Gables, the famous Venetian Pool (formerly a coral quarry, now a public pool), and the historic Biltmore Hotel. Lunch break will be given at Bayside.\n\nIn the afternoon, we board our boat for the Star Island Tour, visiting one of Miami’s most exclusive areas, where you will see the homes of world-famous celebrities such as Gloria Estefan, Julio Iglesias, Madonna, Frank Sinatra, and many others. After the tour, transfer to the hotel. Room distribution and free time. Overnight at the hotel.",
        "highlights": [
          "After the tour, transfer to the hotel"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 2,
        "title": "Miami",
        "location": "Miami",
        "description": "After breakfast, free time for shopping, relaxation, swimming, and exploring the surroundings. Guests who wish may join the optional Florida Keys &amp; Key West Tour.\n\nThis full-day tour departs early from Miami by private vehicle to Key West, the southernmost town on the U.S. East Coast. During the journey, with the Atlantic Ocean on one side and the Gulf of Mexico on the other, we will pass through numerous islands known as the Florida Keys, connected by long bridges offering spectacular ocean views and photo opportunities. Various surprises will be arranged along the route.\n\nUpon arrival in Key West, we enjoy a short panoramic city tour, seeing Southernmost Point, the home of Ernest Hemingway, former President Harry S. Truman’s winter residence, Duval Street, and Key West Marina, known for its bars and restaurants.\n\nIn the evening, we travel to Islamorada to watch the sunset accompanied by torches and live music. After this unforgettable experience, return to the hotel. Overnight stay.\n\nNote: During winter months, due to earlier sunset times, sunset viewing may take place in Key West.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 3,
        "title": "Miami - New York",
        "location": "New York",
        "description": "After breakfast, transfer to Miami Airport for our domestic flight. Arrival in New York around noon and transfer to the hotel. Here, we join the group arriving from Turkey. As rooms will not be available before 16:00, guests may participate in the optional New York City Introduction Tour, which will span two days and provide a comprehensive exploration of the city.\n\nFirst Day:We begin the tour on Manhattan Island, the most important and popular part of New York City. We will see Central Park, luxury apartment buildings, Museum Mile, the Metropolitan Museum, Columbus Circle, Trump Hotel, The Plaza Hotel, the iconic Apple Store, Trump Tower, St. Patrick’s Cathedral, Rockefeller Center, the New York Public Library, Flatiron Building, Madison Square Park, Washington Square Park, and New York University in Greenwich Village.\n\nContinuing through SoHo, we reach the Civic Center and Financial District, passing Wall Street and the World Trade Center area. Driving along the Hudson River, we return to the city center and visit Times Square, illuminated by its famous LED billboards.\n\nAt the end of the tour, return to the hotel for room allocation and a short rest. Later, we walk or take the subway to Central Park for a pleasant stroll, followed by a brief stop at the Apple Store before returning to the hotel. Overnight stay.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 4,
        "title": "New York",
        "location": "New York",
        "description": "Free time for guests not joining the tour. Participants will take part in the New York Landmarks Tour. First, we travel by subway to Battery Park, located at the southern tip of Manhattan. After completing ticket and entry procedures, we take a ferry to Liberty Island, home of the Statue of Liberty.\n\nEnjoying panoramic views of Manhattan, we photograph the statue and tour the island upon arrival. Guests may visit the museum or enjoy coffee during free time.(Program may change depending on weather conditions and ferry schedules.)\n\nWe return to Battery Park by ferry and continue on foot through the Financial District, seeing Wall Street, the Charging Bull Statue, the Stock Exchange Building, the 9/11 Memorial, Freedom Tower, and the architecturally striking Oculus. We then travel by subway to DUMBO, take photos of the Brooklyn Bridge, and proceed to the Empire State Building. Guests may optionally visit the observation deck (approx. USD 52-65). Depending on availability, the guide may suggest One Vanderbilt.\n\nFree time for shopping, dinner, and coffee. Overnight at the hotel.",
        "highlights": [
          "Free time for guests not joining the tour",
          "Guests may optionally visit the observation deck (approx"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 5,
        "title": "New York",
        "location": "New York",
        "description": "Morning free time. Guests may join the optional Hidden Legends of New York Tour. The tour begins in Chinatown, continues to Little Italy, SoHo, West Village, Carrie Bradshaw’s House, Chelsea Market, the High Line, Hudson Yards &amp; Vessel, Bryant Park, and concludes at Grand Central Terminal, a historic landmark famous for its celestial ceiling and cinematic legacy. Return to the hotel. Overnight stay.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 6,
        "title": "New York - Los Angeles",
        "location": "Los Angeles",
        "description": "Transfer to New York Airport and domestic flight to Los Angeles (approx. 5.5 hours). Arrival and transfer to the hotel. Rooms will be available after 15:00. Guests may relax in the lobby or join the optional Los Angeles &amp; Santa Monica Tour.\n\nTour highlights include Hollywood Boulevard, Dolby Theatre, Chinese Theatre, Walk of Fame, views of the Hollywood Sign, Sunset Strip, Beverly Hills, Rodeo Drive, Beverly Wilshire Hotel, Downtown Los Angeles, and Olvera Street. Optional evening visit to Santa Monica. Overnight at the hotel.\n\nNote: Guides may operate the Santa Monica tour before hotel check-in to maximize time efficiency.",
        "highlights": [
          "Optional evening visit to Santa Monica"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 7,
        "title": "Los Angeles",
        "location": "Los Angeles",
        "description": "Free time or participation in the optional San Diego Tour, including La Jolla, Old Town, Seaport Village, USS Midway (external visit), Unconditional Surrender Statue, and Coronado Island. Return to the hotel. Overnight stay.\n\nNote: USS Midway visit is for external photography only.",
        "highlights": [
          "Note: USS Midway visit is for external photography only."
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 8,
        "title": "Los Angeles",
        "location": "Los Angeles",
        "description": "Free time or participation in the optional Universal Studios Tour, featuring film studios, sets, and over 40 attractions and shows. Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 9,
        "title": "Los Angeles - Las Vegas",
        "location": "Las Vegas",
        "description": "Departure from the hotel to Las Vegas, Nevada. En route, if group participation allows, visit Calico Ghost Town, an old silver mining town. After an approximately 4.5-hour journey, arrival and hotel transfer. Rooms available after 16:00.\n\nOptional Las Vegas Combo Tour, including Las Vegas Strip, shopping malls, The Sphere, and Fremont Street Experience. Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 10,
        "title": "Las Vegas",
        "location": "Las Vegas",
        "description": "Free time or participation in the optional Grand Canyon Tour. After a 2-hour drive, visit Eagle Point and Guano Point, with breathtaking canyon views and encounters with Hualapai Native Americans.\n\nOptional Helicopter Tour - USD 350, including descent to the Colorado River and boat ride.\n\nEvening walk along the Las Vegas Strip and optional show attendance. Overnight at the hotel.\n\nNote: During summer months, the tour may start earlier due to extreme midday heat.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 11,
        "title": "Las Vegas - San Francisco",
        "location": "San Francisco",
        "description": "Transfer to Las Vegas Airport and flight to San Francisco. Meeting with the guide and transfer to the hotel. Rooms available after 15:00. Optional San Francisco City Tour, including Civic Center, Golden Gate Bridge, Fisherman’s Wharf, Chinatown, Twin Peaks, Haight-Ashbury, Palace of Fine Arts, and Lombard Street. Overnight stay.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 12,
        "title": "San Francisco",
        "location": "San Francisco",
        "description": "Free time or participation in the optional Muir Woods National Park &amp; San Francisco Premium Outlet Tour. Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 13,
        "title": "San Francisco - Istanbul",
        "location": "Istanbul",
        "description": "Check-out and free time until flight. Optional Sausalito - Alcatraz (by boat) - Fisherman’s Wharf - Cable Car - Union Square Tour. Transfer to San Francisco Airport and departure to Istanbul with Turkish Airlines flight TK080 at 18:45. Overnight on board.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 14,
        "title": "Istanbul",
        "location": "Istanbul",
        "description": "Arrival at Istanbul Airport at 18:15 local time. End of the tour.\n\nDaily tour programs may be adjusted in terms of day and time, provided the content remains unchanged, based on guide recommendations and operational convenience.\n\nServices Included\n\nServices Not Included",
        "highlights": [
          "End of the tour"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      }
    ],
    "inclusions": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk",
      "All state taxes, road tolls, and commercial transit permits"
    ],
    "exclusions": [
      "International transatlantic airfare (available upon request)",
      "Personal expenditures and optional evening event admissions",
      "Travel insurance and medical contingency coverage",
      "Discretionary gratuities for local chauffeurs and guides"
    ],
    "accommodations": [
      {
        "city": "New York",
        "name": "Baccarat Hotel New York",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.baccarathotels.com/"
      },
      {
        "city": "Niagara",
        "name": "Seneca Niagara Resort & Casino",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://senecaniagaracasino.com/"
      },
      {
        "city": "Washington",
        "name": "Waldorf Astoria Washington DC",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.hilton.com/en/hotels/dcawawa-waldorf-astoria-washington-dc/"
      },
      {
        "city": "San Francisco",
        "name": "Fairmont San Francisco",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.fairmont.com/san-francisco/"
      },
      {
        "city": "Las Vegas",
        "name": "Wynn Las Vegas",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.wynnlasvegas.com/"
      },
      {
        "city": "Los Angeles",
        "name": "The Beverly Hills Hotel",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.dorchestercollection.com/los-angeles/the-beverly-hills-hotel"
      }
    ],
    "includedServices": [
      "Private air-conditioned luxury motorcoach & executive sprinters",
      "Accommodations at luxury partner hotels throughout the itinerary",
      "Daily breakfast & select chef-curated delegation lunches",
      "Professional bilingual tour director & local historic guides",
      "All airport & train station private luggage transfers",
      "24/7 dedicated dispatch operations desk & guest assistance"
    ],
    "metaTitle": "Coast to Coast US Tour | Curated USA Tours - ELMIA DMC",
    "metaDescription": "Explore Coast to Coast US Tour across Florida, New York, California, and Nevada with ELMIA DMC. Luxury corporate and group travel itineraries with 24/7 executive ground support."
  },
  {
    "slug": "western-united-states",
    "title": "Western United States",
    "subtitle": "California - Nevada",
    "destination": "California, Nevada",
    "duration": "9 Days / 8 Nights",
    "category": "Tours",
    "heroImage": "/images/los-angeles-hero.jpg",
    "thumbnailImage": "/images/tours/los-angeles-thumb.jpg",
    "overview": "Meeting at Istanbul Airport at 05:00. After passport control, check-in and customs procedures, departure to Los Angeles, one of the largest cities in the United States, with Turkish Airlines flight TK 179 at 08:25.After an approximately 11-hour flight, arrival in Los Angeles at 11:55. Upon arrival, meeting with our private vehicle waiting at the ai...",
    "highlights": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Istanbul - Los Angeles",
        "location": "Los Angeles",
        "description": "Meeting at Istanbul Airport at 05:00. After passport control, check-in and customs procedures, departure to Los Angeles, one of the largest cities in the United States, with Turkish Airlines flight TK 179 at 08:25.After an approximately 11-hour flight, arrival in Los Angeles at 11:55. Upon arrival, meeting with our private vehicle waiting at the airport and transfer to the hotel.\n\nAs hotel rooms will be available after 15:00, guests may relax in the lobby or optionally join the Los Angeles &amp; Santa Monica Tour, organized by the guide.\n\nOur first stop will be Hollywood Boulevard, familiar from many movies. Here we will see the Kodak Theatre (now known as the Dolby Theatre), where the Academy Awards are held; the Chinese Theatre, famous for movie premieres; the hand and footprint impressions of cinema and music stars; and the Walk of Fame. From this area, you will also have the opportunity to photograph the iconic Hollywood Sign.\n\nWe then proceed via the famous Sunset Strip to Santa Monica Boulevard and arrive in Beverly Hills, where we will see its well-known symbol. Afterwards, we will take a short walk along the famous Rodeo Drive, home to the world’s most luxurious stores and filming location of the movie Pretty Woman, and see the Beverly Wilshire Hotel, where stars such as Elvis Presley and John Lennon once resided.\n\nAfter leaving Rodeo Drive, we head to Downtown Los Angeles, the city center. Sites to be seen include Olvera Street, the skyscrapers forming the city skyline, and the historic areas dating back to the city’s foundation.\n\nFollowing the tour, transfer to the hotel, room allocation, and free time for rest. In the evening, guests may optionally join the Santa Monica Tour, where they can enjoy drinks at stylish cafés, watch street performers, and have dinner at one of the local restaurants.Overnight at the hotel.",
        "highlights": [
          "Our first stop will be Hollywood Boulevard, familiar from many movies"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 2,
        "title": "Los Angeles",
        "location": "Los Angeles",
        "description": "Free time in the morning. Guests who wish may join the optional San Diego Tour organized by the guide.\n\nIn San Diego, frequently voted as one of America’s most beautiful cities, our first stop will be La Jolla, famous for its seal beaches and coastline. Here you will witness the harmony of nature and luxury residences and enjoy photo opportunities.\n\nWe then continue to Old Town, the birthplace of California, where you will experience an atmosphere reminiscent of Mexico. After Old Town, we visit Seaport Village, the USS Midway Aircraft Carrier (photo stop only), the Unconditional Surrender Statue symbolizing World War II, and Coronado Island, home to the historic Hotel Del Coronado, the largest wooden building in the United States and filming location of Some Like It Hot.\n\nReturn to the hotel and overnight stay.\n\nNote: The USS Midway aircraft carrier will be visited from the outside only for photography.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 3,
        "title": "Los Angeles",
        "location": "Los Angeles",
        "description": "Free time in the morning. Guests may optionally join the Universal Studios Tour, offering the opportunity to explore the heart of the American film industry.\n\nDuring this tour, you will visit one of the world’s largest theme parks and learn how iconic films that shaped the American dream were produced, while enjoying thrilling rides and attractions. Universal Studios, with creative consultancy by renowned director Steven Spielberg, is recognized as the world’s leading studio and theme park.\n\nWith over 40 shows, movie sets, and attractions, the park provides an immersive experience that makes you feel as if you are inside the movies themselves.Free time after the tour.Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 4,
        "title": "Los Angeles - Las Vegas",
        "location": "Las Vegas",
        "description": "Departure from the hotel in the morning toward Las Vegas, the entertainment capital of Nevada and home to the world’s largest hotels.\n\nIf there is sufficient group participation, we will stop en route at Calico Ghost Town, a former silver mining town and a classic example of the cowboy towns often seen in American movies.\n\nAfter an approximately 4.5-hour journey, arrival and transfer to the hotel. Rooms will be available after 16:00. Guests may optionally join the Las Vegas Combination Tour organized by the guide.\n\nThis tour includes a visit to the Las Vegas Strip, followed by a shopping stop at a mall and a visit to The Sphere, a newly completed attraction that has gained worldwide fame. We then proceed to Downtown Las Vegas to experience the vibrant Fremont Street Experience, where guests may enjoy zip-lining, dining, or shopping during free time.\n\nReturn to the hotel and overnight stay.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 5,
        "title": "Las Vegas",
        "location": "Las Vegas",
        "description": "Free time in the morning. Guests may join the optional Grand Canyon Tour, a must-see experience.\n\nAfter approximately 2 hours of travel, arrival at the Grand Canyon. Boarding shuttle buses for sightseeing. At Eagle Point, guests will have the opportunity to take spectacular photos from beside an 800-meter cliff and see traditional Hualapai Native American dwellings.\n\nWe then proceed to Guano Point, where we enjoy another breathtaking view while tasting meals prepared by the Hualapai people. Afterward, return to Las Vegas.\n\nGuests will also have the opportunity to meet the Hualapai Native Americans, guardians of this natural wonder, one of the Seven Natural Wonders of the World.\n\nOptional Helicopter Tour - USD 300:Guests wishing to enhance their experience may descend by helicopter to the Colorado River. After landing, a boat tour on the river is included, followed by a return flight with stunning canyon views.\n\nNote: Helicopter tours must be requested at least a few days before departure to be guaranteed.\n\nIn the evening, enjoy a walk along the Las Vegas Strip and watch outdoor hotel shows. Transfers will be arranged for guests wishing to attend world-famous Las Vegas shows. Casinos with thousands of tables and slot machines await those who wish to try their luck.Overnight at the hotel.\n\nNote: During summer, the Grand Canyon tour departs earlier due to high midday temperatures.",
        "highlights": [
          "Guests may join the optional Grand Canyon Tour, a must-see experience",
          "Boarding shuttle buses for sightseeing"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 6,
        "title": "Las Vegas - San Francisco",
        "location": "San Francisco",
        "description": "Transfer to Las Vegas Airport in the morning and domestic flight to San Francisco. Upon arrival, meeting with the guide and transfer to the hotel.\n\nAs rooms will be available after 15:00, guests may relax in the lobby or optionally join the San Francisco City Tour. Sites include Civic Center, Golden Gate Bridge, Fisherman’s Wharf, Chinatown, Twin Peaks, Haight &amp; Ashbury, Palace of Fine Arts, and Lombard Street.\n\nAfter free time for dinner, return to the hotel.Overnight stay.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 7,
        "title": "San Francisco",
        "location": "San Francisco",
        "description": "Free time in the morning. Guests may optionally join the Muir Woods National Park &amp; San Francisco Premium Outlet Tour.\n\nMuir Woods National Monument, part of the Golden Gate National Recreation Area, is famous for its towering ancient redwood trees. Walking paths wind through Cathedral Grove and Bohemian Grove along Redwood Creek, offering a glimpse into America’s national parks.\n\nAfterward, shopping time at the Premium Outlet. Return to the hotel and free time.Overnight stay.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 8,
        "title": "San Francisco - Istanbul",
        "location": "Istanbul",
        "description": "Check-out in the morning and free time until the flight. Guests may optionally join the Sausalito - Alcatraz (by boat) - Fisherman’s Wharf - Cable Car - Union Square Tour.\n\nTravel to Sausalito, once home to high-ranking officials and now one of the wealthiest residential areas, by vehicle or boat depending on seasonal conditions. Enjoy a waterfront walk and coffee with San Francisco views.\n\nOn the return boat trip, photograph Alcatraz Island, once considered the world’s most inescapable prison. The boat docks at Pier 39, where sea lions can be observed. After free lunch, enjoy a scenic ride on the iconic Cable Cars to Union Square, followed by free time in the Fashion District and Chinatown.\n\nTransfer to San Francisco Airport in the late afternoon and departure to Istanbul with Turkish Airlines flight TK 080 at 18:45.Overnight on board.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 9,
        "title": "Istanbul",
        "location": "Istanbul",
        "description": "Arrival at Istanbul Airport at 18:15 local time.End of the tour.\n\nImportant Note\n\nDaily tour schedules may be adjusted by the guide in terms of day and time, provided the content remains unchanged, for operational convenience and participant comfort.\n\nServices Included\n\nServices Not Included",
        "highlights": [
          "Arrival at Istanbul Airport at 18:15 local time.End of the tour"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      }
    ],
    "inclusions": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk",
      "All state taxes, road tolls, and commercial transit permits"
    ],
    "exclusions": [
      "International transatlantic airfare (available upon request)",
      "Personal expenditures and optional evening event admissions",
      "Travel insurance and medical contingency coverage",
      "Discretionary gratuities for local chauffeurs and guides"
    ],
    "accommodations": [
      {
        "city": "Los Angeles",
        "name": "The Beverly Hills Hotel",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.dorchestercollection.com/los-angeles/the-beverly-hills-hotel"
      },
      {
        "city": "Las Vegas",
        "name": "Wynn Las Vegas",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.wynnlasvegas.com/"
      },
      {
        "city": "San Francisco",
        "name": "Fairmont San Francisco",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.fairmont.com/san-francisco/"
      }
    ],
    "includedServices": [
      "Private air-conditioned luxury motorcoach & executive sprinters",
      "Accommodations at luxury partner hotels throughout the itinerary",
      "Daily breakfast & select chef-curated delegation lunches",
      "Professional bilingual tour director & local historic guides",
      "All airport & train station private luggage transfers",
      "24/7 dedicated dispatch operations desk & guest assistance"
    ],
    "metaTitle": "Western United States | Curated USA Tours - ELMIA DMC",
    "metaDescription": "Explore Western United States across California and Nevada with ELMIA DMC. Luxury corporate and group travel itineraries with 24/7 executive ground support."
  },
  {
    "slug": "grand-america-tour",
    "title": "Grand America Tour",
    "subtitle": "New York - Massachusetts - Washington D.C.",
    "destination": "New York, Massachusetts, Washington D.C.",
    "duration": "8 Days / 7 Nights",
    "category": "Tours",
    "heroImage": "/images/boston-hero.jpg",
    "thumbnailImage": "/images/tours/new-york-thumb.jpg",
    "overview": "Meeting at Istanbul Airport at 04:00. After passport control, check-in and customs procedures, departure to New York, one of the most important cities in the United States, with Turkish Airlines flight TK003 at 07:05. Following an approximately 10-hour flight, arrival in New York at 10:45 local time.\n\nUpon arrival, meeting with our guide at the air...",
    "highlights": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Istanbul - New York",
        "location": "New York",
        "description": "Meeting at Istanbul Airport at 04:00. After passport control, check-in and customs procedures, departure to New York, one of the most important cities in the United States, with Turkish Airlines flight TK003 at 07:05. Following an approximately 10-hour flight, arrival in New York at 10:45 local time.\n\nUpon arrival, meeting with our guide at the airport and transfer to our hotel by private vehicle. (Hotel check-in will be available after 15:00.)\n\nGuests who wish may join the optional New York City Introduction Tour, organized by our guide. During this two-day tour, you will explore New York extensively.\n\nFirst Day Program:We begin our tour by reaching Manhattan Island, the most popular and significant area of New York City. We will see Central Park, luxury residential buildings, Museum Mile, the Metropolitan Museum of Art, Columbus Circle, Trump Hotel, The Plaza Hotel, the iconic Apple Store, Trump Tower, St. Patrick’s Cathedral, Rockefeller Center, New York Public Library, Flatiron Building, Madison Square Park, Washington Square Park in Greenwich Village, and New York University.\n\nContinuing the tour, we pass through SoHo and reach the Civic Center and Financial District. We will see Wall Street and the World Trade Center area, then continue along the Hudson River and return to the city center. Here, we will visit Times Square, where giant LED billboards illuminate the night like daylight.\n\nAt the end of the tour, we return to our hotel, receive room assignments, take a short rest, and then head to Central Park either on foot or by subway. After a pleasant walk in the park and a short break at the Apple Store, we return to the hotel.Overnight at the hotel.",
        "highlights": [
          "During this two-day tour, you will explore New York extensively"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 2,
        "title": "New York",
        "location": "New York",
        "description": "Free time for guests who do not join the tour. Guests joining the tour will participate in the New York Landmarks Tour.\n\nWe first travel by subway to Battery Park, located at the southern tip of Manhattan, home to historic cannons once used for New York’s defense. After seeing the war memorials, we complete ticket and boarding procedures and take a ferry to Liberty Island.\n\nDuring the ferry ride, enjoy stunning Manhattan views and take photos of the Statue of Liberty. Upon arrival, we tour the island, listen to the history of the Statue of Liberty and immigration stories, and enjoy free time to visit the museum or have coffee. (The program may change depending on weather conditions and ferry availability.)\n\nWe return to Battery Park by ferry, see the monument where New York’s founding story began, and then walk through the Financial District. We visit Wall Street, the Charging Bull Statue, the New York Stock Exchange building, the 9/11 Memorial, One World Trade Center (Freedom Tower), and the architecturally impressive Oculus structure.\n\nWe then take the subway to the Dumbo area, take photos with the Brooklyn Bridge view, and listen to its history. Afterwards, we go to the Empire State Building. Guests who wish may go up to the observation deck (ticket prices range approximately between USD 52-65). Depending on availability, the guide may alternatively suggest One Vanderbilt.\n\nAfterwards, free time for shopping, dinner, and coffee.Overnight at the hotel.",
        "highlights": [
          "Free time for guests who do not join the tour",
          "Guests joining the tour will participate in the New York Landmarks Tour"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 3,
        "title": "New York",
        "location": "New York",
        "description": "Free time in the morning. Guests who wish may join the optional Hidden Legends of New York Tour.\n\nThe tour begins in the lively streets of Chinatown while the city is waking up. A short walk leads to Little Italy, where the aroma of espresso and fresh bread fills the air. During the walk, you may feel as if you are reliving scenes from The Godfather.\n\nWe then explore SoHo, known for its cast-iron buildings and cobblestone streets, where modern luxury blends with historical architecture. The tour continues to Carrie Bradshaw’s house from Sex and the City on Perry Street in West Village, a perfect photo stop.\n\nLunch break at Chelsea Market, followed by a walk along the High Line with views of Manhattan’s West Side architecture and the Hudson River. The tour continues at Hudson Yards and the Vessel.\n\nIn the afternoon, enjoy a peaceful moment at Bryant Park with views of the New York Public Library. In the evening, visit the magnificent Grand Central Terminal, famous for its celestial ceiling and cinematic history.\n\nReturn to the hotel after the tour.Overnight at the hotel.",
        "highlights": [
          "The tour begins in the lively streets of Chinatown while the city is waking up",
          "The tour continues at Hudson Yards and the Vessel",
          "Return to the hotel after the tour.Overnight at the hotel."
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 4,
        "title": "New York - Los Angeles",
        "location": "Los Angeles",
        "description": "Transfer to New York Airport in the morning. After an approximately 5.5-hour domestic flight, arrival in Los Angeles. Transfer to the hotel by private vehicle.\n\nSince hotel rooms will be available after 15:00, guests may rest in the lobby or join the optional Los Angeles &amp; Santa Monica Tour.\n\nWe first visit Hollywood Boulevard, including Dolby Theatre, Chinese Theatre, celebrity handprints, and the Walk of Fame. Photo stop at the famous Hollywood Sign.\n\nWe then drive through Sunset Strip to Beverly Hills, see its iconic landmark, take a walk along Rodeo Drive, and view the Beverly Wilshire Hotel. Continue to Downtown Los Angeles to see Olvera Street, skyscrapers, and historic districts.\n\nOptional evening Santa Monica visit with free time for dining and leisure.Overnight at the hotel.",
        "highlights": [
          "Photo stop at the famous Hollywood Sign"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 5,
        "title": "Los Angeles",
        "location": "Los Angeles",
        "description": "Free time in the morning. Guests may join the optional San Diego Tour.\n\nWe visit La Jolla, famous for its beaches and sea lions, then Old Town, the birthplace of California. Afterwards, visit Seaport Village, USS Midway (external visit only), Unconditional Surrender Statue, and Coronado Island, including Hotel del Coronado.\n\nReturn to the hotel.Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 6,
        "title": "Los Angeles",
        "location": "Los Angeles",
        "description": "Free time. Guests may join the optional Universal Studios Tour, visiting one of the world’s largest theme parks and film studios. Enjoy more than 40 attractions, shows, and rides.\n\nOvernight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 7,
        "title": "Los Angeles - Las Vegas",
        "location": "Las Vegas",
        "description": "Departure for Las Vegas in the morning. En route, visit Calico Ghost Town if group participation allows. Arrival in Las Vegas after approximately 4.5 hours.\n\nOptional Las Vegas Combination Tour, including the Strip, shopping mall, The Sphere, and Fremont Street Experience.Overnight at the hotel.",
        "highlights": [
          "En route, visit Calico Ghost Town if group participation allows"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 8,
        "title": "Las Vegas",
        "location": "Las Vegas",
        "description": "Free time. Optional Grand Canyon Tour. Visit Eagle Point and Guano Point, enjoy breathtaking views, and learn about the Hualapai Native Americans.\n\nOptional Helicopter Tour (USD 300).\n\nEvening free time on the Las Vegas Strip.Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 9,
        "title": "Las Vegas - San Francisco",
        "location": "San Francisco",
        "description": "Flight to San Francisco. Optional San Francisco City Tour, including Civic Center, Golden Gate Bridge, Fisherman’s Wharf, Chinatown, Twin Peaks, Haight-Ashbury, Palace of Fine Arts, and Lombard Street.Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 10,
        "title": "San Francisco",
        "location": "San Francisco",
        "description": "Free time. Optional Muir Woods National Park &amp; Premium Outlet Tour.Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 11,
        "title": "San Francisco - Istanbul",
        "location": "Istanbul",
        "description": "Free time until transfer to San Francisco Airport. Optional Sausalito - Alcatraz (from boat) - Fisherman’s Wharf - Cable Car - Union Square Tour.\n\nDeparture to Istanbul with Turkish Airlines flight TK080 at 18:45.Overnight on board.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 12,
        "title": "Istanbul",
        "location": "Istanbul",
        "description": "Arrival at Istanbul Airport at 18:15 local time. End of the tour.\n\nIncluded Services\n\nExcluded Services",
        "highlights": [
          "End of the tour"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      }
    ],
    "inclusions": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk",
      "All state taxes, road tolls, and commercial transit permits"
    ],
    "exclusions": [
      "International transatlantic airfare (available upon request)",
      "Personal expenditures and optional evening event admissions",
      "Travel insurance and medical contingency coverage",
      "Discretionary gratuities for local chauffeurs and guides"
    ],
    "accommodations": [
      {
        "city": "New York",
        "name": "Baccarat Hotel New York",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.baccarathotels.com/"
      },
      {
        "city": "Boston",
        "name": "The Newbury Boston",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.thenewburyboston.com/"
      },
      {
        "city": "Niagara",
        "name": "Seneca Niagara Resort & Casino",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://senecaniagaracasino.com/"
      },
      {
        "city": "Washington",
        "name": "Waldorf Astoria Washington DC",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.hilton.com/en/hotels/dcawawa-waldorf-astoria-washington-dc/"
      }
    ],
    "includedServices": [
      "Private air-conditioned luxury motorcoach & executive sprinters",
      "Accommodations at luxury partner hotels throughout the itinerary",
      "Daily breakfast & select chef-curated delegation lunches",
      "Professional bilingual tour director & local historic guides",
      "All airport & train station private luggage transfers",
      "24/7 dedicated dispatch operations desk & guest assistance"
    ],
    "metaTitle": "Grand America Tour | Curated USA Tours - ELMIA DMC",
    "metaDescription": "Explore Grand America Tour across New York, Massachusetts, and Washington D.C. with ELMIA DMC. Luxury corporate and group travel itineraries with 24/7 executive ground support."
  },
  {
    "slug": "east-coasts-of-america",
    "title": "East Coasts of America",
    "subtitle": "Florida - New York",
    "destination": "Florida, New York",
    "duration": "10 Days / 9 Nights",
    "category": "Tours",
    "heroImage": "/images/orlando-hero.jpg",
    "thumbnailImage": "/images/tours/orlando-thumb.jpg",
    "overview": "Meeting at Istanbul Airport at 22:30 on the evening prior to the tour departure date. After passport control, check-in, and customs procedures, departure to Miami, one of the most famous coastal cities in the United States, with Turkish Airlines flight TK157 at 00:40. Following an approximately 12-hour flight, arrival in Miami at 06:00.\n\nUpon arriv...",
    "highlights": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Istanbul - Miami",
        "location": "Miami",
        "description": "Meeting at Istanbul Airport at 22:30 on the evening prior to the tour departure date. After passport control, check-in, and customs procedures, departure to Miami, one of the most famous coastal cities in the United States, with Turkish Airlines flight TK157 at 00:40. Following an approximately 12-hour flight, arrival in Miami at 06:00.\n\nUpon arrival, meeting with your guide at the airport and transfer to the hotel. As hotel rooms will not be available before 16:00, guests may join the optional Miami &amp; Star Island Tour, organized to make the most efficient use of time while discovering the city with a professional guide.\n\nThe tour begins with a visit to Miami Beach, where we enjoy a morning walk. Depending on preference, a short break for breakfast or coffee will be given before continuing the tour by vehicle. During the tour, we will see Miami Beach, Lincoln Road, the iconic Versace Mansion (photo stop), upscale residential areas, Little Havana (home to Cuban immigrants), the Wynwood district, once an industrial area and now transformed into a world-famous open-air art gallery, Coconut Grove, and the former Pan American Airways seaplane terminal, now used as City Hall. A photo stop will be made at the marina.\n\nWe will continue through Coral Gables, see the famous Coral Gables Venetian Pool (formerly a coral quarry, now a public swimming pool), and the historic Biltmore Hotel. Lunch break will be at Bayside Marketplace.\n\nIn the afternoon, we board our boat for the Star Island Tour. We visit the most exclusive islands of Miami, where you will have the opportunity to see the homes of world-famous celebrities from the film and music industries, including Gloria Estefan, Julio Iglesias, Madonna, Frank Sinatra, and many others.\n\nAfter the Star Island tour, transfer to the hotel. Room allocation and free time.Overnight at the hotel.",
        "highlights": [
          "The tour begins with a visit to Miami Beach, where we enjoy a morning walk",
          "A photo stop will be made at the marina",
          "After the Star Island tour, transfer to the hotel"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 2,
        "title": "Miami",
        "location": "Miami",
        "description": "After breakfast, free time for shopping, relaxation, swimming, and exploring the surroundings. Guests who wish may join the optional Florida Keys &amp; Key West Tour.\n\nWe depart Miami early in the morning by private vehicle for a full-day excursion to Key West, the southernmost town in the continental United States. During the scenic drive, with the Atlantic Ocean on one side and the Gulf of Mexico on the other, we pass through the islands known as the Florida Keys, connected by miles of bridges offering breathtaking ocean views.\n\nUpon arrival in Key West, we take a short panoramic city tour, including Southernmost Point, the former home of famous author Ernest Hemingway, the winter residence of former U.S. President Harry S. Truman, Duval Street, and the Key West Marina.\n\nIn the evening, we travel to Islamorada to watch the sunset accompanied by live music and a festive atmosphere. After this memorable experience, return to the hotel.Overnight at the hotel.\n\nNote: During winter months, sunset viewing may take place in Key West due to earlier sunset times.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 3,
        "title": "Miami",
        "location": "Miami",
        "description": "After breakfast, free time for leisure activities. Guests who wish may join the optional American Riviera Tour.\n\n“This is Palm Beach, and there is no place more glamorous than this in the world.” - Jacqueline Kennedy\n\nWe begin the tour by traveling approximately 1.5 hours from Miami to Palm Beach, known as the wealthiest ZIP code in the United States. We see The Breakers Palm Beach Hotel and Mar-a-Lago, the residence of former U.S. President Donald Trump, followed by a coffee and photo break on the famous Worth Avenue.\n\nContinuing along the Florida Riviera, we arrive in Fort Lauderdale, passing through South Ocean Boulevard and the renowned “Billionaire’s Row,” where dozens of billionaires live side by side. Free time for lunch along Fort Lauderdale’s beautiful coastline.\n\nOur final coastal stop is Hollywood Beach, famous for its white sands and lively boardwalk restaurants. The tour concludes with a stop at the Miami Design District before returning to the hotel.Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 4,
        "title": "Miami - Orlando",
        "location": "Orlando",
        "description": "Morning departure for Orlando. After approximately a 3.5-hour journey, arrival in Orlando. As hotel rooms will not be available before 16:00, guests may join the optional Winter Park &amp; Historic Orlando &amp; Millenia Tour.\n\nWe explore the interconnected lakes of Virginia, Osceola, and Mizell, see waterfront vacation homes of wealthy residents, visit Rollins College, and enjoy free time on Park Avenue, known for its boutique shops, cafés, and restaurants.\n\nContinuing through historic neighborhoods, we see downtown Orlando, Church Street, Amway Center (home of the Orlando Magic), and take a photo stop at Lake Eola. The tour concludes at The Mall at Millenia, Orlando’s most luxurious shopping center. Transfer to the hotel.Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 5,
        "title": "Orlando",
        "location": "Orlando",
        "description": "Free day for relaxation and exploration. Guests may join the optional Kennedy Space Center &amp; Disney Springs Tour.\n\nWe visit the Kennedy Space Center, one of the world’s most fascinating destinations, featuring rockets, launch pads, space shuttles, and a full-scale Saturn V rocket from the Apollo program. After the visit, return to Orlando and enjoy an evening tour at Disney Springs, offering shopping, dining, and entertainment year-round.\n\nTransfer back to the hotel.Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 6,
        "title": "Orlando",
        "location": "Orlando",
        "description": "Free day. Guests may choose to visit SeaWorld or Universal Studios.\n\nOvernight at the hotel.",
        "highlights": [
          "Guests may choose to visit SeaWorld or Universal Studios"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 7,
        "title": "Orlando - New York",
        "location": "New York",
        "description": "Transfer to Orlando Airport and flight to New York. Upon arrival, meeting with the guide and transfer to the hotel. As rooms will not be available before 16:00, guests may join the optional New York City Introduction Tour.\n\nWe begin in Manhattan, visiting Central Park, Museum Mile, Metropolitan Museum of Art, Columbus Circle, Trump Tower, The Plaza Hotel, St. Patrick’s Cathedral, Rockefeller Center, New York Public Library, Flatiron Building, Madison Square Park, Washington Square Park, and New York University. Continue through SoHo, Civic Center, Wall Street, World Trade Center area, Hudson River, and Times Square.\n\nReturn to the hotel, room allocation, short rest, followed by a walk or subway ride to Central Park.Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 8,
        "title": "New York",
        "location": "New York",
        "description": "Free time for guests not joining the tour. Participants will enjoy the New York Landmarks Tour, including Battery Park, Liberty Island (Statue of Liberty), Wall Street, Charging Bull, 9/11 Memorial, One World Trade Center, Oculus, DUMBO, Brooklyn Bridge, and Empire State Building (optional observation deck).\n\nFree time for shopping and dinner.Overnight at the hotel.",
        "highlights": [
          "Free time for guests not joining the tour"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 9,
        "title": "New York - Istanbul",
        "location": "Istanbul",
        "description": "After check-out, free time until departure. Guests may join the optional Hidden Legends of New York Tour, including Chinatown, Little Italy, SoHo, West Village, Chelsea Market, High Line, Hudson Yards, Bryant Park, and Grand Central Terminal.\n\nEvening transfer to New York Airport and departure to Istanbul with Turkish Airlines flight TK012 at 23:55.Overnight on board.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 10,
        "title": "Istanbul",
        "location": "Istanbul",
        "description": "Arrival in Istanbul at 17:15 local time. End of the tour.\n\nIncluded Services\n\nExcluded Services",
        "highlights": [
          "End of the tour"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      }
    ],
    "inclusions": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk",
      "All state taxes, road tolls, and commercial transit permits"
    ],
    "exclusions": [
      "International transatlantic airfare (available upon request)",
      "Personal expenditures and optional evening event admissions",
      "Travel insurance and medical contingency coverage",
      "Discretionary gratuities for local chauffeurs and guides"
    ],
    "accommodations": [
      {
        "city": "New York",
        "name": "Baccarat Hotel New York",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.baccarathotels.com/"
      },
      {
        "city": "Orlando",
        "name": "Four Seasons Resort Orlando",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.fourseasons.com/orlando/"
      },
      {
        "city": "Miami",
        "name": "The Setai, Miami Beach",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.thesetaihotel.com"
      }
    ],
    "includedServices": [
      "Private air-conditioned luxury motorcoach & executive sprinters",
      "Accommodations at luxury partner hotels throughout the itinerary",
      "Daily breakfast & select chef-curated delegation lunches",
      "Professional bilingual tour director & local historic guides",
      "All airport & train station private luggage transfers",
      "24/7 dedicated dispatch operations desk & guest assistance"
    ],
    "metaTitle": "East Coasts of America | Curated USA Tours - ELMIA DMC",
    "metaDescription": "Explore East Coasts of America across Florida and New York with ELMIA DMC. Luxury corporate and group travel itineraries with 24/7 executive ground support."
  },
  {
    "slug": "florida-dream-miami-orlando",
    "title": "Florida Dream",
    "subtitle": "Florida",
    "destination": "Florida",
    "duration": "8 Days / 7 Nights",
    "category": "Tours",
    "heroImage": "/images/miami-hero.jpg",
    "thumbnailImage": "/images/tours/miami-thumbnail2.jpg",
    "overview": "Participants are required to be at Istanbul Airport at 22:30 on the evening prior to the departure date. Following passport control, check-in, and customs procedures, departure to Miami, one of America’s most famous coastal cities, will be with Turkish Airlines flight TK157 at 00:40.After an approximately 12-hour flight, arrival in Miami is scheduled...",
    "highlights": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Istanbul - Miami",
        "location": "Miami",
        "description": "Participants are required to be at Istanbul Airport at 22:30 on the evening prior to the departure date. Following passport control, check-in, and customs procedures, departure to Miami, one of America’s most famous coastal cities, will be with Turkish Airlines flight TK157 at 00:40.After an approximately 12-hour flight, arrival in Miami is scheduled for 06:00 local time. Upon arrival, you will meet your professional tour guide at the airport.\n\nBefore transferring to the hotel, we proceed to Miami Beach for a morning walk. Depending on personal preference, a short break will be given for breakfast or coffee. Afterwards, we begin our panoramic Miami city tour. Highlights include Miami Beach, Lincoln Road, Versace Mansion, Little Havana, Wynwood District, Coconut Grove, Coral Gables, and the Miami Design District.\n\nFollowing the city tour, transfer to the hotel. As hotel rooms will not be available before 15:00, guests may optionally join the Gator Park &amp; Star Island Tour organized by the guide at an additional cost.\n\nThe tour begins with a visit to Star Island, Miami’s most exclusive area, where you will see the homes of world-famous celebrities from the film and music industries, including Gloria Estefan, Julio Iglesias, Madonna, Frank Sinatra, and many others.\n\nAfter Star Island, we continue to Gator Park, where we will take an airboat tour through the marshlands. During this experience, you will observe alligators in their natural habitat as they sunbathe or hunt. After the airboat ride, there will be an opportunity to see alligators up close and receive informative commentary.At the end of the tours, transfer back to the hotel. Overnight at the hotel.",
        "highlights": [
          "Upon arrival, you will meet your professional tour guide at the airport",
          "Afterwards, we begin our panoramic Miami city tour",
          "Following the city tour, transfer to the hotel"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 2,
        "title": "Miami",
        "location": "Miami",
        "description": "After breakfast, the day is free for shopping, relaxation, swimming, and personal exploration.\n\nGuests may optionally join the Florida Keys &amp; Key West Full-Day Tour. We depart early in the morning by private vehicle towards Key West, the southernmost town in the continental United States. During this scenic journey, the Atlantic Ocean will be on one side and the Gulf of Mexico on the other, passing numerous small islands known as the Florida Keys, connected by spectacular bridges offering excellent photo opportunities.\n\nUpon arrival in Key West, we enjoy a short panoramic city tour including Southernmost Point, the Ernest Hemingway House, former President Harry S. Truman’s Winter White House, Key West Marina, and Duval Street, famous for its bars and restaurants.\n\nIn the evening, we head towards Islamorada to watch the sunset accompanied by live music and torch lighting. After this memorable experience, return to the hotel. Overnight in Miami.\n\nNote: During winter months, due to earlier sunset times, the sunset experience may take place in Key West instead of Islamorada.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 3,
        "title": "Miami",
        "location": "Miami",
        "description": "After breakfast, the day is free for leisure activities.\n\nGuests may optionally participate in the American Riviera Tour.\n\n“This is Palm Beach, and there is nothing more glamorous in the world.” - Jacqueline Kennedy\n\nWe begin the tour with a visit to Palm Beach, located approximately 1.5 hours from Miami and known as the wealthiest ZIP code in the United States. We will see The Breakers Palm Beach Hotel and Mar-a-Lago, the private residence of former U.S. President Donald Trump.\n\nA photo and coffee break will be given on Worth Avenue, famous for its luxury boutiques, charming architecture, and elegant courtyards. Continuing along the Florida Riviera, we reach Fort Lauderdale, driving along South Ocean Boulevard, where the renowned Billionaire’s Row is located, home to 52 billionaires living side by side.\n\nFree time for lunch will be provided on Fort Lauderdale’s beautiful beach. Our final coastal stop is Hollywood Beach, known for its white sands, wooden boardwalk, and lively beachfront restaurants.After a final stop at the Miami Design District, return to the hotel. Overnight in Miami.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 4,
        "title": "Miami - Orlando",
        "location": "Orlando",
        "description": "In the morning, departure for Orlando. After an approximately 3.5-hour journey, arrival in Orlando.\n\nAs hotel rooms will not be available before 16:00, guests may optionally join the Winter Park &amp; Historic Orlando &amp; Mall at Millenia Tour.\n\nThis tour includes a scenic boat ride through the interconnected Virginia, Osceola, and Mizell Lakes, offering views of lakeside mansions belonging to affluent American and Canadian residents. We will also see Rollins College and enjoy free time on Park Avenue, famous for its boutique shops, cafés, and restaurants.\n\nContinuing the tour, we pass through Orlando’s historic district, see Church Street, the Amway Center (home of the Orlando Magic basketball team), and stop for photos at Lake Eola.The final stop is The Mall at Millenia, Orlando’s most luxurious shopping mall, featuring brands such as Apple Store and Cheesecake Factory.After the tour, transfer to the hotel. Overnight in Orlando.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 5,
        "title": "Orlando",
        "location": "Orlando",
        "description": "The day is free for relaxation and personal exploration.\n\nGuests may optionally join the Kennedy Space Center &amp; Disney Springs Tour. At the Kennedy Space Center, one of the world’s most fascinating sites, you will explore exhibits featuring rockets, launch pads, space shuttles, and a real Apollo rocket. Visitors can also experience a realistic launch simulation and explore NASA’s historic missions.\n\nAfter returning to Orlando, we continue to Disney Springs (Downtown Disney) for an evening tour. This entertainment district offers year-round events, numerous restaurants, bars, and excellent shopping opportunities at competitive prices.After the tour, transfer back to the hotel. Overnight in Orlando.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 6,
        "title": "Orlando",
        "location": "Orlando",
        "description": "The day is free.\n\nGuests may choose to visit SeaWorld or Universal Studios independently.\n\nOvernight in Orlando.",
        "highlights": [
          "Guests may choose to visit SeaWorld or Universal Studios independently"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 7,
        "title": "Orlando - Miami - Istanbul",
        "location": "Istanbul",
        "description": "At the time determined by the guide, departure from the hotel and transfer to Miami International Airport. After an approximately 3.5-hour drive, arrival at the airport. Following check-in, passport, and customs procedures, departure to Istanbul with Turkish Airlines flight TK78 at 21:45.Overnight on board.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 8,
        "title": "Istanbul",
        "location": "Istanbul",
        "description": "Arrival in Istanbul at 16:25 local time.End of the tour.\n\nImportant Note\n\nDaily tour schedules may be adjusted by the guide for operational convenience, provided that the content of the program remains unchanged.\n\nServices Included\n\nServices Not Included",
        "highlights": [
          "Arrival in Istanbul at 16:25 local time.End of the tour"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      }
    ],
    "inclusions": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk",
      "All state taxes, road tolls, and commercial transit permits"
    ],
    "exclusions": [
      "International transatlantic airfare (available upon request)",
      "Personal expenditures and optional evening event admissions",
      "Travel insurance and medical contingency coverage",
      "Discretionary gratuities for local chauffeurs and guides"
    ],
    "accommodations": [
      {
        "city": "Miami",
        "name": "The Setai, Miami Beach",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.thesetaihotel.com"
      },
      {
        "city": "Orlando",
        "name": "Four Seasons Resort Orlando",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.fourseasons.com/orlando/"
      },
      {
        "city": "Key West",
        "name": "The Marker Key West Harbor Resort",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.themarkerkeywest.com/"
      },
      {
        "city": "Everglades",
        "name": "JW Marriott Marco Island Beach Resort",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.marriott.com/en-us/hotels/mrkfl-jw-marriott-marco-island-beach-resort/overview/"
      }
    ],
    "includedServices": [
      "Private air-conditioned luxury motorcoach & executive sprinters",
      "Accommodations at luxury partner hotels throughout the itinerary",
      "Daily breakfast & select chef-curated delegation lunches",
      "Professional bilingual tour director & local historic guides",
      "All airport & train station private luggage transfers",
      "24/7 dedicated dispatch operations desk & guest assistance"
    ],
    "metaTitle": "Florida Dream | Curated USA Tours - ELMIA DMC",
    "metaDescription": "Explore Florida Dream across Florida with ELMIA DMC. Luxury corporate and group travel itineraries with 24/7 executive ground support."
  },
  {
    "slug": "western-usa-tour",
    "title": "Western USA Tour",
    "subtitle": "California - Nevada",
    "destination": "California, Nevada",
    "duration": "9 Days / 8 Nights",
    "category": "Tours",
    "heroImage": "/images/san-francisco-hero.jpg",
    "thumbnailImage": "/images/tours/san-francisco-thumb.jpg",
    "overview": "Following our meeting at Istanbul Airport International Terminal, after completing baggage and ticket procedures at the Turkish Airlines counter, we depart for Los Angeles with Turkish Airlines. Upon arrival, we meet our private vehicle and guide waiting for us at the airport and transfer to our hotel. After room allocation, free time for rest. In ...",
    "highlights": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "ISTANBUL - LOS ANGELES",
        "location": "LOS ANGELES",
        "description": "Following our meeting at Istanbul Airport International Terminal, after completing baggage and ticket procedures at the Turkish Airlines counter, we depart for Los Angeles with Turkish Airlines. Upon arrival, we meet our private vehicle and guide waiting for us at the airport and transfer to our hotel. After room allocation, free time for rest. In the evening, guests who wish may participate in the optional Santa Monica Tour (USD 50) organized by our guide. In Santa Monica, full of street artists and bright lights, you may relax at stylish cafés and have dinner at one of the local restaurants. Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 2,
        "title": "LOS ANGELES",
        "location": "LOS ANGELES",
        "description": "Free day. Guests who wish may participate in the optional Universal Studios Tour (USD 250). This park, one of the largest in the world, offers the opportunity to closely see how films that shaped the American dream were made.\n\nWith creative consultancy by world-famous director Steven Spielberg, you will better understand why Universal Studios is the number one studio and entertainment park in the world. The park is not only entertainment but also a product of over a century of cinema history and technology. More than 40 shows, film sets and attractions will immerse you in the world of cinema. After the tour, transfer to the hotel and overnight stay.\n\nAccommodation: 3* Holiday Inn LAX Airport",
        "highlights": [
          "After the tour, transfer to the hotel and overnight stay"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 3,
        "title": "LOS ANGELES",
        "location": "LOS ANGELES",
        "description": "Free day. Guests who wish may participate in the optional San Diego Tour (USD 150). First stop is La Jolla, famous for its seal beach and coastline. You will witness the harmony of nature and luxury residences and take plenty of photos. Next, we visit Old Town, the birthplace of California, where you will feel as if you are in Mexico. Following Old Town, visits include Seaport Village, the Midway Aircraft Carrier (external visit only), the Unconditional Surrender Statue symbolizing World War II, the U.S. Navy base area, and Coronado Island, home to the historic Hotel Del Coronado, featured in the movie “Some Like It Hot.” Return to the hotel and overnight.\n\nAccommodation: 3* Holiday Inn LAX Airport",
        "highlights": [
          "First stop is La Jolla, famous for its seal beach and coastline"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 4,
        "title": "LOS ANGELES - LAS VEGAS",
        "location": "LAS VEGAS",
        "description": "After departing from the hotel in the morning, guests who wish may participate in the optional Los Angeles City Tour (USD 80). During this tour, we explore Los Angeles, known as the City of Angels and the second-largest city in the USA. Stops include Hollywood Boulevard, Dolby Theater, Chinese Theatre, Walk of Fame, Hollywood Sign photo stop, Sunset Strip, Beverly Hills, Rodeo Drive, Beverly Wilshire Hotel, and Downtown Los Angeles including Olvera Street and historic districts. After the tour, we depart for Las Vegas, the most important touristic center of Nevada and home to the world’s largest hotels. Overnight at the hotel.\n\nAccommodation: 3* The D Hotel Downtown or similar",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 5,
        "title": "LAS VEGAS",
        "location": "LAS VEGAS",
        "description": "Free day. Guests who wish may participate in the optional Grand Canyon Tour (USD 250). Departure to Grand Canyon in Arizona by private vehicle. After approximately 2 hours, arrival at Grand Canyon. Visit Eagle Point and Guano Point, photographing breathtaking canyon views from cliffs approximately 800 meters high. Opportunity to see Hualapai Native American settlements. Return to Las Vegas. Overnight at the hotel.\n\nAccommodation: 3* The D Hotel Downtown or similar",
        "highlights": [
          "Opportunity to see Hualapai Native American settlements"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 6,
        "title": "LAS VEGAS - SAN FRANCISCO",
        "location": "SAN FRANCISCO",
        "description": "Transfer to Las Vegas Airport for flight to San Francisco. Upon arrival, transfer to the hotel. Guests who wish may participate in the optional San Francisco City Tour (USD 80). Visits include Civic Center, Golden Gate Bridge, Fisherman’s Wharf, Chinatown, Twin Peaks, Haight &amp; Ashbury, Palace of Fine Arts, Lombard Street. After free time for dinner, return to hotel. Overnight.\n\nAccommodation: 3* Hampton Inn SFO Airport by Hilton or similar DAY 7 - SAN FRANCISCO\n\nFree day. Guests who wish may participate in the optional Sausalito - Alcatraz (boat exterior view) - Fisherman’s Wharf - Cable Car - Union Square Tour (USD 120). Visit Sausalito, return by boat with Alcatraz photo opportunity, Pier 39 sea lions, Cable Car ride to Union Square, Fashion District and Chinatown. Overnight at the hotel.\n\nAccommodation: 3* Hampton Inn SFO Airport by Hilton or similar",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 8,
        "title": "SAN FRANCISCO - ISTANBUL",
        "location": "ISTANBUL",
        "description": "Check-out from hotel. Free time until evening. Optional Outlet Shopping Tour (USD 50). Transfer to San Francisco Airport and departure to Istanbul with Turkish Airlines. Overnight on board.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 9,
        "title": "ISTANBUL",
        "location": "ISTANBUL",
        "description": "Arrival at Istanbul Airport.\n\nSERVICES INCLUDED IN THE PACKAGE\n\nRound-trip economy class flights with Turkish Airlines (IST-LAX / SFO-IST)\n\nEconomy class local flight Las Vegas - San Francisco\n\nAirport taxes\n\n7 nights accommodation in specified hotels\n\nAirport-hotel-airport transfers\n\nAll transfers by private bus\n\nTurkish-speaking assistance and driver service\n\nHotel and city taxes\n\nTURSAB compulsory professional liability insurance\n\nTravel and health insurance (surcharge applies for ages 65+)\n\nBaggage allowance as specified\n\nSERVICES NOT INCLUDED IN THE PACKAGE\n\nVisa fee and service charges\n\nDomestic connection flights\n\nBreakfasts, lunches, dinners and beverages\n\nPersonal expenses and hotel extras\n\nOverseas departure tax\n\nMuseum and site entrance fees not specified\n\nDriver tips and gratuities\n\nOptional tours\n\nDomestic baggage fees within the USA\n\nGENERAL INFORMATION - VISA - HEALTH - FLIGHTS - OPTIONAL TOURS - ACCOMMODATION - CURRENCY - TIME ZONE - TELEPHONE - CLOTHING - FOOD - ELECTRICITY - SHOPPING - IMPORTANT NOTES\n\nParticipation condition: Minimum 20 participants required. In case of insufficient participation, the tour may be cancelled up to 20 days prior to departure.\n\nVisa: Visa required for all passport types. Passport must be valid for at least 6 months.\n\nAll other legal notices, health warnings, accommodation rules, optional tour conditions, and liability clauses apply as stated in the original Turkish document.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      }
    ],
    "inclusions": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk",
      "All state taxes, road tolls, and commercial transit permits"
    ],
    "exclusions": [
      "International transatlantic airfare (available upon request)",
      "Personal expenditures and optional evening event admissions",
      "Travel insurance and medical contingency coverage",
      "Discretionary gratuities for local chauffeurs and guides"
    ],
    "accommodations": [
      {
        "city": "San Francisco",
        "name": "Fairmont San Francisco",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.fairmont.com/san-francisco/"
      },
      {
        "city": "Las Vegas",
        "name": "Wynn Las Vegas",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.wynnlasvegas.com/"
      },
      {
        "city": "Los Angeles",
        "name": "The Beverly Hills Hotel",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.dorchestercollection.com/los-angeles/the-beverly-hills-hotel"
      }
    ],
    "includedServices": [
      "Private air-conditioned luxury motorcoach & executive sprinters",
      "Accommodations at luxury partner hotels throughout the itinerary",
      "Daily breakfast & select chef-curated delegation lunches",
      "Professional bilingual tour director & local historic guides",
      "All airport & train station private luggage transfers",
      "24/7 dedicated dispatch operations desk & guest assistance"
    ],
    "metaTitle": "Western USA Tour | Curated USA Tours - ELMIA DMC",
    "metaDescription": "Explore Western USA Tour across California and Nevada with ELMIA DMC. Luxury corporate and group travel itineraries with 24/7 executive ground support."
  },
  {
    "slug": "best-west",
    "title": "Best West",
    "subtitle": "California - Nevada",
    "destination": "California, Nevada",
    "duration": "7 Days / 6 Nights",
    "category": "Tours",
    "heroImage": "/images/las-vegas-hero.jpg",
    "thumbnailImage": "/images/tours/las-vegas-thumb.jpg",
    "overview": "Meeting with our guide at Istanbul Airport at 02:30. Following passport control, check-in and customs procedures, departure to Paris with Air France flight AF1391 at 04:50. Arrival in Paris at 06:55 local time. After the connecting flight, departure to Los Angeles with Air France flight AF022 at 10:20. Arrival in Los Angeles at 13:10 local time.\n\nU...",
    "highlights": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Istanbul - Los Angeles",
        "location": "Los Angeles",
        "description": "Meeting with our guide at Istanbul Airport at 02:30. Following passport control, check-in and customs procedures, departure to Paris with Air France flight AF1391 at 04:50. Arrival in Paris at 06:55 local time. After the connecting flight, departure to Los Angeles with Air France flight AF022 at 10:20. Arrival in Los Angeles at 13:10 local time.\n\nUpon arrival, transfer by private vehicle and participation in the Los Angeles city tour organized by our guide (INCLUDED). Our tour begins with an introduction to Los Angeles, known as the “City of Angels” and the second-largest city in the United States.\n\nOur first stop is Hollywood Boulevard, famous from numerous movies. We will see the Dolby Theatre (formerly Kodak Theatre), where the Academy Awards are held, the Chinese Theatre, hand and footprints of famous movie stars, and the Hollywood Walk of Fame. From this area, you will also have the opportunity to photograph the iconic Hollywood Sign.\n\nWe then proceed via Sunset Strip to Santa Monica Boulevard and arrive in Beverly Hills. Here we will see the famous Beverly Hills sign. Afterwards, we take a short walk along Rodeo Drive, one of the world’s most luxurious shopping streets and a filming location for the movie Pretty Woman. We will also see the Beverly Wilshire Hotel, where celebrities such as Elvis Presley and John Lennon stayed for many years.\n\nAfter Rodeo Drive, we continue to Downtown Los Angeles. The places to be seen include Olvera Street, the city’s skyline with its skyscrapers, and the historic districts dating back to the city’s foundation. After the tour, transfer to our hotel, room allocation, and free time to rest. Overnight at the hotel.",
        "highlights": [
          "Our first stop is Hollywood Boulevard, famous from numerous movies",
          "Here see the famous Beverly Hills sign",
          "After the tour, transfer to our hotel, room allocation, and free time to rest"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 2,
        "title": "Los Angeles - San Diego Tour",
        "location": "San Diego Tour",
        "description": "In the morning, departure for a full-day San Diego tour, which has been selected as one of America’s most beautiful cities for many years (INCLUDED).\n\nOur first stop is La Jolla, famous for its seal beach and coastline. Here, you will observe the harmony of nature and luxury residences and have plenty of opportunities for photography.\n\nWe then proceed to Old Town, the birthplace of California, where you will feel as if you are in Mexico due to its unique atmosphere.\n\nAfter Old Town, we visit Seaport Village, the Midway Aircraft Carrier (photo stop only), the Unconditional Surrender statue symbolizing World War II, and Coronado Island, where the U.S. Navy base is located and where the historic Hotel del Coronado stands. This hotel is also known as the filming location of the movie Some Like It Hot and is the largest wooden building in the United States.\n\nReturn to the hotel after the tour. Overnight at the hotel.Note: The Midway Aircraft Carrier will be viewed from the outside for photo purposes only.",
        "highlights": [
          "Our first stop is La Jolla, famous for its seal beach and coastline",
          "Return to the hotel after the tour"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 3,
        "title": "Los Angeles - Coastal Cities Tour",
        "location": "Coastal Cities Tour",
        "description": "In the morning, we organize a tour to California’s famous coastal towns (INCLUDED). Departure from the hotel and travel to Laguna Beach, the southernmost point of our tour. Arrival after approximately 45 minutes.\n\nIn this elegant seaside town, we enjoy our morning coffee while watching beach volleyball players and surfers along the shore. We then visit the most famous art gallery in Laguna Beach, the Wyland Gallery. Mr. Wyland is a sculptor, painter, and professional diver; therefore, his works are inspired by underwater life. Dolphin-based tables, turtle sculptures, and oil paintings with changing color tones will attract your interest.\n\nWe continue to Corona del Mar, known for its luxurious residences, and take a photo break. You will have difficulty deciding whether to photograph the magnificent houses or the stunning sea views.\n\nPassing through Newport Beach, Bayside, and Balboa Island, we proceed to Huntington Beach, where international surfing competitions are held. Walking along the long pier, you will enjoy the fresh ocean air and watch professional surfers.\n\nAfter passing Sunset Beach and Seal Beach, home to the U.S. Navy SEAL base, we arrive in Long Beach. Here we will see the Queen Mary, the sister ship of the Titanic, now operating as a hotel and restaurant, as well as the Formula 1 race track (Grand Prix of Long Beach).\n\nLunch will be taken at Shoreline Village, part of the Long Beach Marina. Afterwards, we continue to Santa Monica. We visit the pedestrian-only 3rd Street Promenade shopping area and enjoy street performances and dining options. Santa Monica is one of California’s most iconic locations and frequently used in Hollywood films.\n\nReturn to the hotel after the tour. Overnight at the hotel.",
        "highlights": [
          "visit the most famous art gallery in Laguna Beach, the Wyland Gallery",
          "Return to the hotel after the tour"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 4,
        "title": "Los Angeles - Las Vegas",
        "location": "Las Vegas",
        "description": "After breakfast, departure from the hotel and travel to Las Vegas, the most important tourist center of Nevada and home to the world’s largest hotels.\n\nUpon arrival, we enjoy a panoramic city tour along the famous Las Vegas Boulevard (INCLUDED). After the tour, check-in at the hotel and orientation.\n\nIn the evening, our guides will assist guests who wish to purchase tickets for the Sphere experience. The Sphere is an entertainment arena located on the eastern side of the Las Vegas Strip, featuring an 18,600-seat auditorium, a fully immersive 16K resolution LED screen, advanced audio technology, and 4D physical effects. The exterior is covered with a 580,000 ft² LED display. Standing 112 meters high and 157 meters wide, the Sphere cost USD 2.3 billion, making it the most expensive entertainment venue ever built in Las Vegas. This experience takes you from underwater worlds to space and deserts, offering a once-in-a-lifetime visual journey. Overnight at the hotel.",
        "highlights": [
          "After the tour, check-in at the hotel and orientation"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 5,
        "title": "Las Vegas",
        "location": "Las Vegas",
        "description": "Free time in the morning. Guests who wish may join the optional Grand Canyon tour organized by our guide.\n\nEarly morning departure from Las Vegas to the Grand Canyon in Arizona by private vehicle. After approximately 2 hours, arrival at the Grand Canyon. Helicopter staff escort us to the helicopters. During the descent toward the Colorado River, you will be amazed by breathtaking canyon views. After a photo stop, the helicopters return to the upper level.\n\nWe then board sightseeing buses and proceed to Eagle Point, where you can take stunning photos from the edge of an 800-meter cliff and see traditional Hualapai Native American dwellings. Afterwards, we continue to Guano Point, where we enjoy a meal prepared by the Hualapai people while admiring another spectacular view.\n\nReturn to the terminal and drive back to Las Vegas. This unforgettable tour offers the opportunity to visit one of the world’s seven natural wonders and meet the Hualapai Native Americans.\n\nIn the evening, free time to walk along the Las Vegas Strip and watch outdoor hotel shows. Transfers will be arranged for guests wishing to attend world-famous Las Vegas shows. Overnight at the hotel.(Grand Canyon tour: USD 300 - helicopter fee not included.)",
        "highlights": [
          "Guests who wish may join the optional Grand Canyon tour organized by our guide",
          "After a photo stop, the helicopters return to the upper level"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 6,
        "title": "Las Vegas",
        "location": "Las Vegas",
        "description": "In the morning, transfer to Las Vegas North Premium Outlet, featuring more than 200 stores and a food court offering international cuisine. Guests may spend the entire day shopping. Return to the hotel at a designated time.\n\nIn the evening, departure for the famous Fremont Street tour in downtown Las Vegas, known for its covered, illuminated pedestrian area (INCLUDED). You may enjoy drinks while walking and experience the zip-line above the street. Transfer back to the hotel. Overnight at the hotel.",
        "highlights": [
          "VIP Guided Sightseeing",
          "Private Executive Transit",
          "Dedicated Guide Support"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 7,
        "title": "Las Vegas - Los Angeles - Paris",
        "location": "Paris",
        "description": "Early departure from the hotel toward Los Angeles. En route, we stop at Calico Ghost Town, a former silver mining town from the 1850s. After silver lost its value, the mines closed, and Calico was later transformed into a tourist attraction. This authentic Old West town allows you to feel like you are in a classic Western movie.\n\nAfter the visit, transfer to Los Angeles International Airport. Following check-in and passport procedures, departure to Paris with Air France flight AF025 at 18:20. Arrival at Paris Charles de Gaulle Airport at 14:10.",
        "highlights": [
          "After the visit, transfer to Los Angeles International Airport"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      },
      {
        "day": 8,
        "title": "Paris - Istanbul",
        "location": "Istanbul",
        "description": "Arrival in Paris at 14:10 local time. After the connecting flight, departure to Istanbul with Air France flight AF1390. Arrival in Istanbul at 03:50.End of the tour.\n\nSERVICES INCLUDED IN THE PRICE\n\nSERVICES NOT INCLUDED IN THE PRICE",
        "highlights": [
          "Arrival in Istanbul at 03:50.End of the tour"
        ],
        "meals": "Breakfast included",
        "hotel": "Luxury 4/5-Star Partner Hotel"
      }
    ],
    "inclusions": [
      "Private executive airport transfers and intercity transportation",
      "Accompanied by professional bilingual travel directors and guides",
      "Centrally located Five-Star and Four-Star luxury hotels",
      "Bespoke city introduction excursions and panoramic sightseeing",
      "Full luggage handling and 24/7 ELMIA dispatch operations desk",
      "All state taxes, road tolls, and commercial transit permits"
    ],
    "exclusions": [
      "International transatlantic airfare (available upon request)",
      "Personal expenditures and optional evening event admissions",
      "Travel insurance and medical contingency coverage",
      "Discretionary gratuities for local chauffeurs and guides"
    ],
    "accommodations": [
      {
        "city": "Los Angeles",
        "name": "The Beverly Hills Hotel",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.dorchestercollection.com/los-angeles/the-beverly-hills-hotel"
      },
      {
        "city": "Las Vegas",
        "name": "Wynn Las Vegas",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.wynnlasvegas.com/"
      },
      {
        "city": "Santa Monica",
        "name": "Shutters on the Beach",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.shuttersonthebeach.com/"
      },
      {
        "city": "Hollywood",
        "name": "The West Hollywood EDITION",
        "stars": 5,
        "description": "Centrally located luxury accommodation with full executive concierge amenities.",
        "link": "https://www.editionhotels.com/weho/"
      }
    ],
    "includedServices": [
      "Private air-conditioned luxury motorcoach & executive sprinters",
      "Accommodations at luxury partner hotels throughout the itinerary",
      "Daily breakfast & select chef-curated delegation lunches",
      "Professional bilingual tour director & local historic guides",
      "All airport & train station private luggage transfers",
      "24/7 dedicated dispatch operations desk & guest assistance"
    ],
    "metaTitle": "Best West | Curated USA Tours - ELMIA DMC",
    "metaDescription": "Explore Best West across California and Nevada with ELMIA DMC. Luxury corporate and group travel itineraries with 24/7 executive ground support."
  }
];
