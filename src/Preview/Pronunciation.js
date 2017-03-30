const React = require('react');
const SoundButton = require('./SoundButton').default;
const styles = require('./assets/css/styles.css');

export default class Pronunciation extends React.Component {

  render() {

    const senses = this.props;
    const pronunciation = senses.pronunciations[0].ipa ? parsePronunciation(senses.pronunciations, senses.lang) : '' ;
    const pronunciation_sound_url = senses.pronunciations[0].audio ? parseAudioURL(senses.pronunciations, senses.lang) : '' ;
    
    return (
      <div>
        <p className={styles.ipa}> /{pronunciation}/{'  '} 
          {pronunciation_sound_url &&
            <SoundButton url={pronunciation_sound_url} />}
        </p>
      </div>);
  }
  
};

function parsePronunciation(pronunciations,lang){
  switch(lang){
      case 'en_GB':
        return pronunciations[0].ipa;
      case 'en_US':
        return pronunciations[1] ? pronunciations[1].ipa : pronunciations[0].ipa;
    }
};

function parseAudioURL(pronunciations,lang){
  const entrypoint = 'http://api.pearson.com'; 
  switch(lang){
    case 'en_GB':
      return entrypoint + pronunciations[0].audio[0].url; 
      break;
    case 'en_US':
      if(pronunciations[1]){
        return entrypoint + pronunciations[1].audio[0].url
      }else if(pronunciations[0].audio[1]){
        return entrypoint + pronunciations[0].audio[1].url
      }else{
        return entrypoint +  pronunciations[0].audio[0].url;
      }
      break;
  }
};