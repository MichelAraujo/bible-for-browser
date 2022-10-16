// const fs = require('fs');
// const path = require('path');
const jsonData = require('../database/nvi');

const search = (eventData) => {
  // const jsonPath = path.join(__dirname, '../database/nvi.json');
  // const jsonBuffer = fs.readFileSync(jsonPath);

  const chapterToFind = eventData.split(' ');
  const verseToFind = chapterToFind[1].split(':');

  const book = jsonData.data.find((data) => data.abbrev === chapterToFind[0]);
  const chapter = book.chapters[verseToFind[0]-1];
  const verse = chapter[verseToFind[1]-1];

  const result = {
    verse,
    name: `${book.name} ${verseToFind[0]}:${verseToFind[1]}`,
  };

  return result;
};

module.exports = search;
