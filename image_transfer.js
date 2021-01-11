var fs = require('fs');

fs.copyFileSync('src/icon2.png', 'dist/icon2.png', (err) => {
    if (err) 
        throw err;
    console.log('source.txt was copied to destination.txt');
});

let manifest = JSON.parse( fs.readFileSync('dist/manifest.json') )
manifest.name = 'CFThisWeek'

fs.writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, 4))