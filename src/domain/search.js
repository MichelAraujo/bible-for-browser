const jsonData = require('../database/nvi');

const extractChapterAndVerse = (data) => {
  const dataArray = data.split(' ');
  const book = dataArray[0];

  const chapterAndVerse = dataArray[1].split(':');
  const chapter = chapterAndVerse[0];
  const verse = chapterAndVerse[1];

  const textToSearch = {
    book,
    chapter,
    verse,
  };
  return textToSearch;
};

const search = (eventData) => {
  const textToSearch = extractChapterAndVerse(eventData);

  const book = jsonData.data.find((data) => data.abbrev === textToSearch.book);
  const chapter = book.chapters[textToSearch.chapter-1];
  const verse = chapter[textToSearch.verse-1];

  const dataToShow = {
    verse,
    name: `${book.name} ${textToSearch.chapter}:${textToSearch.verse}`,
  };

  return dataToShow;
};

module.exports = search;
