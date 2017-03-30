const React = require('react');
const styles = require('./assets/css/styles.css');

export default class Definition extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const senses = this.props.senses[0];
    const part_of_speech = this.props.part_of_speech ? this.props.part_of_speech : '';

    const definition = senses.definition ? senses.definition[0] : '';
    const example = senses.examples ? senses.examples[0].text : '';
    
    return (
      <div>
        <p className={styles.definition}> 
            { part_of_speech && 
              <span className={styles.bold}>({part_of_speech}){' '}</span> }
          {definition} </p>
        
        {example &&
         <p className={styles.examples}>e.g. '{example}' </p>} 
      
      </div>);
  }
};