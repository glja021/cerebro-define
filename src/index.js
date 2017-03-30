'use strict';
const React = require('react');
const icon = require('./Preview/assets/img/cerebro-define-icon.png');
const Preview = require('./Preview').default;
const { memoize } = require('cerebro-tools');

/**
 *
 * @desc Function that requests a word from Pearson dictionary API
 * @param  {Function} query
 * @return {Promise}
 */
const fetchWord = query => {
  return fetch(`http://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=${encodeURIComponent(query)}`)  
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson.results;
  })
  .catch((error) => {
    console.error(error);
  });
};

/**
 * 
 * @desc Fetch words with caching
 * @type {Function}
 */
const cachedFetchWord = memoize(fetchWord);

/**
 * 
 * @desc Cerebro plugin to define words, cross-platform
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const plugin = (scope) => {
  let match = scope.term.match(/^define\s(.+)/);
  if (match) {
    cachedFetchWord(match[1]).then(items => {
      if (!items) {
        return;
      }
      const response = items.map(item => ({
        icon,
        id: item.id,
        title: item.headword,
        subtitle: item.part_of_speech,
        
        getPreview: () => <Preview word={ item } />,
      }));
      scope.display(response);
    })
  }
};

module.exports = {
  fn: plugin,
  icon,
  name: 'Define a word',
  keyword: 'define'
}
