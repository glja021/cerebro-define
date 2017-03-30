const React = require('react');
const Sound = require('react-sound');
const styles = require('./assets/css/styles.css');
const playIcon = require('./assets/img/play.png');

export default class  SoundButton extends React.Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.state = {isPlaying: Sound.status.STOPPED};
  }

  play() {
    this.setState({isPlaying: Sound.status.PLAYING});
  }

  stop() {
    this.setState({isPlaying: Sound.status.STOPPED});
  }

  render() { 
    const isPlaying = this.state.isPlaying;
    const url = this.props.url;

    let button = null;
    if (isPlaying == Sound.status.PLAYING) {
      button = <button className={styles.button} onClick={this.stop}><img className={styles.icon} src={playIcon} /></button>;
    } else {
      button = <button className={styles.button} onClick={this.play}><img className={styles.icon} src={playIcon} /></button>;
    }

    return (
    	<div className = {styles.soundbutton}>
	        {button}
	        <Sound url={url} playStatus={isPlaying} />
    	</div>);
  }
}