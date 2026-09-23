const fs = require('fs');
const path = require('path');

const toursData = require('../src/data/elmiadmc-tours.json');

const tourMetaMap = {
  'american-legends': {
    slug: 'american-legends',
    title: 'American Legends',
    duration: '10 Days / 9 Nights',
    destination: 'New York, Los Angeles, Las Vegas',
    heroImage: '/images/new-york-hero.jpg',
    thumbnailImage: '/images/tours/new-york-thumb.jpg',
    category: 'Tours'
  },
  'pearls-of-america': {
    slug: 'pearls-of-america',
    title: 'Pearls of America',
    duration: '13 Days / 12 Nights',
    destination: 'Washington, New York, Los Angeles, Las Vegas, San Francisco',
    heroImage: '/images/washington-hero.jpg',
    thumbnailImage: '/images/tours/washington-thumb.jpg',
    category: 'Tours'
  },
  'coast-to-coast-america': {
    slug: 'coast-to-coast-america',
    title: 'Coast to Coast America 16 Days 15 Nights',
    duration: '16 Days / 15 Nights',
    destination: 'New York, Niagara, Washington, San Francisco, Las Vegas, Los Angeles, Miami',
    heroImage: '/images/slide-global.jpg',
    thumbnailImage: '/images/tours/miami-thumbnail2.jpg',
    category: 'Tours'
  },
  'coast-to-coast-us-tour': {
    slug: 'coast-to-coast-us-tour',
    title: 'Coast to Coast US Tour 14 Days 13 Nights',
    duration: '14 Days / 13 Nights',
    destination: 'New York, Niagara, Washington, San Francisco, Las Vegas, Los Angeles',
    heroImage: '/images/chicago-hero.jpg',
    thumbnailImage: '/images/tours/miami-thumbnail2.jpg',
    category: 'Tours'
  },
  'western-united-states': {
    slug: 'western-united-states',
    title: 'Western United States',
    duration: '9 Days / 8 Nights',
    destination: 'Los Angeles, Las Vegas, San Francisco',
    heroImage: '/images/los-angeles-hero.jpg',
    thumbnailImage: '/images/tours/los-angeles-thumb.jpg',
    category: 'Tours'
  },
  'grand-america-tour': {
    slug: 'grand-america-tour',
    title: 'Grand America Tour',
    duration: '8 Days / 7 Nights',
    destination: 'New York, Boston, Niagara, Washington',
    heroImage: '/images/boston-hero.jpg',
    thumbnailImage: '/images/tours/new-york-thumb.jpg',
    category: 'Tours'
  },
  'east-coasts-of-america': {
    slug: 'east-coasts-of-america',
    title: 'East Coasts of America',
    duration: '10 Days / 9 Nights',
    destination: 'New York, Orlando, Miami',
    heroImage: '/images/orlando-hero.jpg',
    thumbnailImage: '/images/tours/orlando-thumb.jpg',
    category: 'Tours'
  },
  'florida-dream-miami-orlando': {
    slug: 'florida-dream-miami-orlando',
    title: 'Florida Dream',
    duration: '8 Days / 7 Nights',
    destination: 'Miami, Orlando, Key West, Everglades',
    heroImage: '/images/miami-hero.jpg',
    thumbnailImage: '/images/tours/miami-thumbnail2.jpg',
    category: 'Tours'
  },
  'western-usa-tour': {
    slug: 'western-usa-tour',
    title: 'Western USA Tour',
    duration: '9 Days / 8 Nights',
    destination: 'San Francisco, Las Vegas, Los Angeles',
    heroImage: '/images/san-francisco-hero.jpg',
    thumbnailImage: '/images/tours/san-francisco-thumb.jpg',
    category: 'Tours'
  },
  'best-west': {
    slug: 'best-west',
    title: 'Best West',
    duration: '7 Days / 6 Nights',
    destination: 'Los Angeles, Las Vegas, Santa Monica, Hollywood',
    heroImage: '/images/las-vegas-hero.jpg',
    thumbnailImage: '/images/tours/las-vegas-thumb.jpg',
    category: 'Tours'
  }
};

function parseItineraryFromParagraphs(paragraphs) {
  const days = [];
  let currentDay = null;
  let dayNum = 1;

  for (const p of paragraphs) {
    const dayHeaderMatch = p.match(/^(?:Day|Gün)\s*(\d+)[\s\|-\-\:]+([^\n\r]+)/i);
    if (dayHeaderMatch) {
      if (currentDay) {
        days.push(currentDay);
      }
      const num = parseInt(dayHeaderMatch[1], 10) || dayNum;
      const title = dayHeaderMatch[2].trim();
      const locParts = title.split(/[-\--|]/);
      const loc = locParts[locParts.length - 1].trim() || 'United States';

      currentDay = {
        day: num,
        title: title,
        location: loc,
        description: '',
        highlights: [],
        meals: 'Breakfast included',
        hotel: 'Luxury 4/5-Star Partner Hotel'
      };
      dayNum = num + 1;
    } else if (currentDay) {
      if (currentDay.description) {
        currentDay.description += '\n\n' + p;
      } else {
        currentDay.description = p;
      }
    }
  }
  if (currentDay) {
    days.push(currentDay);
  }

  // extract highlights from descriptions
  for (const d of days) {
    const sentences = d.description.split(/\.\s+/);
    const hl = [];
    for (const s of sentences) {
      if (s.includes('visit') || s.includes('see') || s.includes('tour') || s.includes('Stop') || s.includes('stop')) {
        const cleanS = s.replace(/We will |We then |Our next stop is |We visit |We begin our tour by |Next, we visit /gi, '').trim();
        if (cleanS.length > 5 && cleanS.length < 80) {
          hl.push(cleanS);
          if (hl.length >= 3) break;
        }
      }
    }
    d.highlights = hl.length > 0 ? hl : ['VIP Guided Sightseeing', 'Private Executive Transit', 'Dedicated Guide Support'];
  }

  return days;
}

const experiences = [];

for (const t of toursData) {
  const meta = tourMetaMap[t.slug];
  if (!meta) continue;

  const itinerary = parseItineraryFromParagraphs(t.paragraphs);
  
  let overview = '';
  if (itinerary.length > 0) {
    overview = itinerary[0].description.slice(0, 350) + '...';
  }

  const topHighlights = [
    'Private executive airport transfers and intercity transportation',
    'Accompanied by professional bilingual travel directors and guides',
    'Centrally located Five-Star and Four-Star luxury hotels',
    'Bespoke city introduction excursions and panoramic sightseeing',
    'Full luggage handling and 24/7 ELMIA dispatch operations desk'
  ];

  const standardInclusions = [
    'Private executive airport transfers and intercity transportation',
    'Accompanied by professional bilingual travel directors and guides',
    'Centrally located Five-Star and Four-Star luxury hotels',
    'Bespoke city introduction excursions and panoramic sightseeing',
    'Full luggage handling and 24/7 ELMIA dispatch operations desk',
    'All state taxes, road tolls, and commercial transit permits'
  ];

  const standardExclusions = [
    'International transatlantic airfare (available upon request)',
    'Personal expenditures and optional evening event admissions',
    'Travel insurance and medical contingency coverage',
    'Discretionary gratuities for local chauffeurs and guides'
  ];

  const cityStops = meta.destination.split(',').map(c => c.trim());
  const accommodations = cityStops.map(city => ({
    city: city,
    name: 'Luxury 4/5-Star Partner Hotel (' + city + ')',
    stars: 5,
    description: 'Centrally located luxury accommodation with full executive concierge amenities.'
  }));

  experiences.push({
    slug: meta.slug,
    title: meta.title,
    subtitle: t.subtitle || meta.destination,
    destination: meta.destination,
    duration: meta.duration,
    category: meta.category,
    heroImage: meta.heroImage,
    thumbnailImage: meta.thumbnailImage,
    overview: overview || ('Comprehensive luxury journey across ' + meta.destination + ' curated by ELMIA DMC.'),
    highlights: topHighlights,
    itinerary: itinerary,
    inclusions: standardInclusions,
    exclusions: standardExclusions,
    accommodations: accommodations,
    includedServices: [
      'Private air-conditioned luxury motorcoach & executive sprinters',
      'Accommodations at luxury partner hotels throughout the itinerary',
      'Daily breakfast & select chef-curated delegation lunches',
      'Professional bilingual tour director & local historic guides',
      'All airport & train station private luggage transfers',
      '24/7 dedicated dispatch operations desk & guest assistance'
    ],
    metaTitle: meta.title + ' | Curated USA Tours - ELMIA DMC',
    metaDescription: 'Explore ' + meta.title + ' (' + (t.subtitle || meta.destination) + ') with ELMIA DMC. Luxury corporate and group travel itineraries with 24/7 executive ground support.'
  });
}

const tsContent = `export interface ExperienceDay {
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

export const EXPERIENCES: Experience[] = ` + JSON.stringify(experiences, null, 2) + `;\n`;

fs.writeFileSync(path.join(__dirname, '../src/data/experiences.ts'), tsContent);
console.log('Successfully generated src/data/experiences.ts with', experiences.length, 'experiences!');
