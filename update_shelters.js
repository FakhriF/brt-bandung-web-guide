import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/data/shelters.json', 'utf8'));

const enrichments = {
  1: { landOwnership: "Bandung City", impacts: ["9 Iron poles", "1 Concrete ball"] },
  2: { landOwnership: "Bandung City", impacts: ["2 Street vendors", "1 TPE"] },
  3: { landOwnership: "West Java Province", impacts: ["Illegal on-street parking"] },
  4: { landOwnership: "West Java Province", impacts: ["1 Road sign pole", "3 Potted plants"] },
  5: { landOwnership: "West Java Province", impacts: ["2 Trees", "Pedestrian bridge structure"] },
  6: { landOwnership: "National", impacts: ["1 Street vendor", "1 Road sign pole", "1 Bus stop"] },
  7: { landOwnership: "West Java Province", impacts: ["1 Tree", "1 Bus stop sign", "1 Street light"] },
  8: { landOwnership: "Bandung City", impacts: ["10 Potted plants"] },
  9: { landOwnership: "Bandung City", impacts: ["7 Iron poles"] },
  10: { landOwnership: "National", impacts: ["1 Tree", "6 Electricity/phone poles", "1 Indosat manhole"] },
  11: { landOwnership: "National", impacts: ["3 Trees", "1 Bus stop"] },
  12: { landOwnership: "Bandung City", impacts: ["1 Set of park benches"] },
  13: { landOwnership: "National", impacts: ["Potted plants"] },
  14: { landOwnership: "National", impacts: ["3 Trees", "1 Bus stop", "Park and name signage"] },
  15: { landOwnership: "National", impacts: ["4 Street vendors", "2 Trees", "5 Electric/phone poles", "1 Bus stop"] },
  16: { landOwnership: "Bandung City", impacts: ["1 Street vendor", "1 Tree", "6 Iron electricity/telephone poles", "1 Biznet manhole"] },
  17: { landOwnership: "West Java Province", impacts: ["3 Street vendors", "2 Trees", "2 Signs", "Potted plants", "1 Bus stop"] },
  18: { landOwnership: "West Java Province", impacts: ["7 Roadside workshop workers", "2 Trees"] },
  19: { landOwnership: "West Bandung Regency", impacts: ["1 Bus stop"] },
  20: { landOwnership: "West Bandung Regency", impacts: ["2 Palm trees", "Landscaped area"] },
  21: { landOwnership: "National", impacts: ["2 Potted plants"] },
  22: { landOwnership: "Cimahi City", impacts: ["1 Sign post", "2 Electricity poles", "1 Street light", "1 Bus stop"] },
  23: { landOwnership: "National", impacts: ["2 Potted plants", "1 Bench", "1 Bus stop"] },
  24: { landOwnership: "West Java Province", impacts: ["1 Street vendor", "1 Electricity pole", "1 Bus stop"] },
  25: { landOwnership: "West Java Province", impacts: ["Welcome signage"] },
  26: { landOwnership: "Bandung City", impacts: ["Park and plants"] },
  27: { landOwnership: "National", impacts: ["1 Angkot signpost"] },
  28: { landOwnership: "West Java Province", impacts: [] },
  29: { landOwnership: "West Java Province", impacts: [] },
  30: { landOwnership: "West Java Province", impacts: ["Illegal parking"] },
  31: { landOwnership: "West Java Province", impacts: ["1 Tree", "1 Telephone manhole"] },
  32: { landOwnership: "West Java Province", impacts: ["1 Street vendor"] },
  33: { landOwnership: "National", impacts: ["Illegal on-street parking"] },
  34: { landOwnership: "Bandung City", impacts: ["1 TPE Machine"] },
  35: { landOwnership: "National", impacts: ["1 Street vendor", "Angkot stop area"] },
  36: { landOwnership: "National", impacts: [] },
  37: { landOwnership: "National", impacts: [] },
  38: { landOwnership: "Bandung City", impacts: [] },
  39: { landOwnership: "Bandung City", impacts: ["2 Concrete balls", "Illegal parking"] }
};

const updatedData = data.map(shelter => {
  // Fix ID typo for Masjid Al-Jabbar 2
  let sid = shelter.id;
  if (shelter.name === "Masjid Al-Jabbar 2") {
    sid = 38;
    shelter.id = 38;
  }
  
  if (enrichments[sid]) {
    return { ...shelter, ...enrichments[sid] };
  }
  return shelter;
});

fs.writeFileSync('src/data/shelters.json', JSON.stringify(updatedData, null, 2));
console.log('Successfully updated shelters.json');
