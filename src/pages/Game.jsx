import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Questions from '../components/Questions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      source: '',
      score: 0,
    };
    this.newScore = this.newScore.bind(this);
  }

  componentDidMount() {
    this.fetchGravatar();
    const { token } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
  }

  convertEmailtoHash(email) {
    const hash = md5(email).toString();
    return hash;
  }

  async fetchGravatar() {
    const { email } = this.props;
    const hash = this.convertEmailtoHash(email);

    const source = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    this.setState({ source: source.url });
  }

  newScore(score) {
    console.log(score);
    this.setState((prev) => ({ score: prev.score + score }));
  }

  render() {
    const { nome } = this.props;
    const { source, score } = this.state;
    return (
      <>
        <header>
          <div data-testid="header-player-name">{ nome }</div>
          <img
            data-testid="header-profile-picture"
            src={ source }
            alt="gravatar"
          />
          <div data-testid="header-score">{ score }</div>
        </header>
        <Questions updateValue={ this.newScore } />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.player.name,
  email: state.player.email,
  token: state.token.success,
});

Game.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
