var fs = require('fs');

fs.copyFileSync('src/icon2.png', 'dist/icon2.png');
fs.copyFileSync('src/icon3.png', 'dist/icon3.png');
fs.copyFileSync('src/cfthisweek.svg', 'dist/cfthisweek.svg');

let manifest = JSON.parse( fs.readFileSync('dist/manifest.json') )
manifest.name = 'CFThisWeek'

fs.writeFileSync('dist/manifest.json', 
    JSON.stringify(manifest, null, 4))