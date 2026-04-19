import fs from 'fs';

const existingShelters = JSON.parse(fs.readFileSync('src/data/shelters.json', 'utf8'));
// Filter out old approximate/custom shelters to start fresh, but keep original 39 LARAP ones
const baseShelters = existingShelters.filter(s => s.id < 900);

const files = [
    { name: 'BRT 03A', path: 'public/docs/BRT 03A.txt', color: '#ef4444' },
    { name: 'BRT 03B', path: 'public/docs/BRT 03B.txt', color: '#ec4899' },
    { name: 'BRT 10', path: 'public/docs/BRT10.txt', color: '#f59e0b' }
];

const shelterMap = new Map();
// Seed with LARAP base
baseShelters.forEach(s => shelterMap.set(s.name.toLowerCase(), s));

const routes = [];
let nextId = 3000;

const typeMap = { 'BS': 'Big Shelter', 'MS': 'Medium Shelter', 'BP': 'Bus Pole', 'OC': 'On Corridor' };

files.forEach(file => {
    const content = fs.readFileSync(file.path, 'utf8');
    const lines = content.split('\n');
    const stopIds = [];
    const routeId = file.name.replace(' ', '');

    lines.forEach(line => {
        if (!line.includes(' - ')) return;
        
        const parts = line.split(' - ');
        const typeCode = parts[0].trim();
        const namePart = parts[1].trim();
        
        let name = namePart;
        let coords = null;
        let shouldUpdate = false;

        // Extract coordinates if present
        const coordMatch = line.match(/\((-?\d+\.\d+),\s*(-?\d+\.\d+)\)/);
        if (coordMatch) {
            coords = [parseFloat(coordMatch[1]), parseFloat(coordMatch[2])];
        } else {
             // Try secondary coordinate format without parentheses
             const altMatch = line.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
             if (altMatch) coords = [parseFloat(altMatch[1]), parseFloat(altMatch[2])];
        }

        if (namePart.includes('Sudah ada di LARAP') || namePart.includes('Pakai yg LARAP') || namePart.includes('Ada di LARAP')) {
            name = namePart.split('(')[0].trim();
            if (namePart.includes('update ke')) shouldUpdate = true;
        }

        const key = name.toLowerCase();
        let shelter = shelterMap.get(key);

        if (shelter) {
            if (shouldUpdate && coords) {
                shelter.coords = coords;
                shelter.status = 'Approximate'; // Mark as modified
            }
            if (!shelter.routes.includes(routeId)) shelter.routes.push(routeId);
            stopIds.push(shelter.id);
        } else if (coords) {
            shelter = {
                id: nextId++,
                name: name,
                type: typeMap[typeCode] || 'Medium Shelter',
                status: 'Approximate',
                coords: coords,
                routes: [routeId],
                description: `Position mapped by user for ${routeId}`,
                recommendation: 'Approximate location.',
                landOwnership: 'Unknown',
                impacts: []
            };
            shelterMap.set(key, shelter);
            stopIds.push(shelter.id);
        }
    });

    routes.push({
        id: routeId,
        name: routeId === 'BRT10' ? 'BRT 10: Tegalluar - Leuwipanjang - Cibeureum' : `${file.name}: Leuwi Panjang - Dago`,
        color: file.color,
        stop_ids: stopIds
    });
});

fs.writeFileSync('src/data/shelters.json', JSON.stringify(Array.from(shelterMap.values()), null, 2));
fs.writeFileSync('src/data/routes.json', JSON.stringify(routes, null, 2));

console.log(`Processed ${shelterMap.size} shelters across ${routes.length} routes.`);
