import fs from 'fs';

const content = fs.readFileSync('public/docs/approx.txt', 'utf8');
const existingShelters = JSON.parse(fs.readFileSync('src/data/shelters.json', 'utf8'));

const lines = content.split('\n');
const newShelters = [];
const brt10StopIds = [];

const typeMap = {
    'BS': 'Big Shelter',
    'MS': 'Medium Shelter',
    'BP': 'Bus Pole',
    'OC': 'On Corridor'
};

let currentId = 2000;

lines.forEach(line => {
    if (!line.includes(' - ')) return;
    
    const parts = line.split(' - ');
    const typeCode = parts[0].trim();
    const namePart = parts[1].trim();
    
    // Check if name contains (Sudah ada di LARAP)
    if (namePart.includes('Sudah ada di LARAP') || namePart.includes('Ada di LARAP')) {
        const cleanName = namePart.split('(')[0].trim();
        const existing = existingShelters.find(s => s.name.includes(cleanName));
        if (existing) {
            brt10StopIds.push(existing.id);
            // Update coords if specified for Mengger Girang
            if (namePart.includes('ubah koordinat')) {
                const coordPart = line.match(/\(([^)]+)\)/g);
                if (coordPart && coordPart.length > 1) {
                     const coords = coordPart[1].replace(/[()]/g, '').split(',').map(Number);
                     existing.coords = coords;
                     existing.status = 'Approximate'; // Mark as tweaked
                }
            }
        }
        return;
    }

    const name = namePart;
    const coordMatch = line.match(/\((-?\d+\.\d+),\s*(-?\d+\.\d+)\)/);
    
    if (coordMatch) {
        const coords = [parseFloat(coordMatch[1]), parseFloat(coordMatch[2])];
        const shelter = {
            id: currentId++,
            name: name,
            type: typeMap[typeCode] || 'Medium Shelter',
            status: 'Approximate',
            coords: coords,
            routes: ['BRT10'],
            description: `Planned stop for BRT10: ${name}`,
            recommendation: 'Position estimated from user mapping.',
            landOwnership: 'Unknown',
            impacts: []
        };
        newShelters.push(shelter);
        brt10StopIds.push(shelter.id);
    }
});

// Remove old Approximate markers (ids 900+) to avoid duplicates from previous session
const baseShelters = existingShelters.filter(s => s.id < 900);

// Merge
const finalShelters = [...baseShelters, ...newShelters];
fs.writeFileSync('src/data/shelters.json', JSON.stringify(finalShelters, null, 2));

// Create BRT10 Route
const brt10Route = {
    id: "BRT10",
    name: "BRT 10: Tegalluar - Leuwi Panjang",
    color: "#f59e0b",
    stop_ids: brt10StopIds
};
fs.writeFileSync('src/data/routes.json', JSON.stringify([brt10Route], null, 2));

console.log(`Successfully added ${newShelters.length} approximate shelters and created BRT10 route.`);
