import fs from 'fs';
import path from 'path';

const inputPath = path.join(process.cwd(), 'Game List.txt');
const outputPath = path.join(process.cwd(), 'data', 'games.json');

const content = fs.readFileSync(inputPath, 'utf8');

// First, get the mapping of titles to images
const imageMapping: Record<string, string> = {};
const lines = content.split('\n');
let i = 0;
while (i < lines.length && !lines[i].includes('List Screenshots:')) {
    const line = lines[i].trim();
    if (line.match(/\.(png|jpg|jpeg|avif)$/i)) {
        const parts = line.split('.');
        const title = parts.join('.');
        imageMapping[title.toLowerCase()] = line;
    }
    i++;
}

// Then parse the game details
const sections = content.split('---');
const games = [];

for (const section of sections) {
    const lines = section.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
    if (lines.length < 3) continue;

    const title = lines[0];
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Find genre/category (usually at the end, looking like "Games › Genre › Free")
    let genreStr = "";
    for (let j = lines.length - 1; j >= 0; j--) {
        if (lines[j].includes('›')) {
            genreStr = lines[j];
            break;
        }
    }
    const genres = genreStr.split('›').map(g => g.trim()).filter(g => g !== 'Games' && g !== 'Free' && g !== 'Report' && g !== 'Embed');
    
    // Simple description: take the first few lines after the subtitle
    let description = lines[2] || "";
    if (description.startsWith('"') && description.endsWith('"')) {
        description = description.slice(1, -1);
    }

    // Platform
    const platforms = [];
    if (section.toLowerCase().includes('windows')) platforms.push('Windows');
    if (section.toLowerCase().includes('mac')) platforms.push('macOS');
    if (section.toLowerCase().includes('web')) platforms.push('Web');
    if (platforms.length === 0) platforms.push('PC');

    // Developer
    let developer = "Unknown";
    const devMatch = section.match(/View all by ([\w\d\s]+)·/);
    if (devMatch) developer = devMatch[1].trim();

    games.push({
        id: Math.random().toString(36).substr(2, 9),
        title,
        slug,
        description: description.length > 200 ? description.substring(0, 197) + '...' : description,
        genre: genres.length > 0 ? genres : ["Action"],
        platform: platforms,
        releaseDate: "2025-01-01", // Placeholder
        developer,
        rating: 4 + Math.random(), // Random rating 4.0 - 5.0
        price: 0,
        thumbnail: imageMapping[title.toLowerCase()] || "placeholder.png",
        screenshots: [],
        features: []
    });
}

fs.writeFileSync(outputPath, JSON.stringify(games.slice(0, 35), null, 2));
console.log(`Generated ${games.length} games (capped at 35)`);
