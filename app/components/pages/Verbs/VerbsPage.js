import React, { Component } from 'react';
import { shuffle } from 'lodash';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';
import Tooltip from 'app/components/Tooltip//Tooltip';
import './VerbsPage.scss';

const forViewConsumption = shuffle(verbsWithPrepositions.map((sentence) => {
  const wordList = sentence.text.split(' ').map((word, index) => {
    const wordConstruct = {
      answer: word,
      text: word
    };
    if (sentence.stubs.includes(index)) {
      wordConstruct.text = word.replace(/./gi, '_')
    }
    return wordConstruct;
  });

  return Object.assign(sentence, { wordList });
}));

class VerbWord extends Component {

    constructor () {
        super();

        this.state = {
            isFilled: false,
            isCorrect: false
        };
    }

    render() {
        const { isFilled, isCorrect } = this.state;
        let inputState = '';
        if (isFilled) inputState = isCorrect ? 'isCorrect' : 'isIncorrect';


        const { text, answer, index } = this.props;
        const word = [];

        if (text !== answer) {
            word.push(
                <input
                    className={ 'verb-word-input' }
                    type='text'
                    maxLength={ answer.length }
                    size={ answer.length }
                    onChange={ ((event) => this.handleInputChange(event, answer)).bind(this) }
                />,
                <span className={ `placeholder ${inputState}` } >{ text }</span>
            )
        } else {
            word.push(<span>{ text }</span>);
        }

        if (index > 0) word.unshift(<span> </span>);

        return (<span>{ word }</span>);
    }

    handleInputChange (event, expectedValue) {
        const { value } = event.target;
        const isCorrect = value.toLowerCase() === expectedValue.toLowerCase();
        const isFilled = value.length === expectedValue.length;
        this.setState({ isCorrect, isFilled });
        console.log(this.state);
    }

}

class VerbSentence extends Component {

    constructor() {
        super();
        this.state = {
            showTooltip: false
        };
    }

    render() {
        const { wordList, translations, index } = this.props;

        return (
            <div className='VerbSentence'>

                <Tooltip show={ this.state.showTooltip } >
                    <div>{ translations.eng }</div>
                </Tooltip>

                <span>{ `${index + 1 }.` }</span>

                <i
                    onMouseOver={ this.handleMouseOver.bind(this) }
                    onMouseOut={ this.handleMouseOut.bind(this) }
                    className='wr-ico wr-ico-info-circle wr-ico-fw'
                />

                {
                    wordList.map((word, wordIndex) => (
                        <VerbWord { ...Object.assign(word, { index: wordIndex }) } />
                    ))
                }
                <span>{ '.' }</span>
            </div>
        );
    }

    handleMouseOver() {
        console.log('in')
        this.setState({ showTooltip: true });
    }

    handleMouseOut() {
        console.log('out')
        this.setState({ showTooltip: false });
    }

}

export class About extends Component {

    render() {
        return (
            <div className='About'>
                <div className='row'>
                    <div className='modal column small-10 small-centered  '>
                        <br />
                        <div className='row'>
                            { this.renderContent() }
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        );
    }

    renderContent() {
        return (
            <div className='column small-11 small-centered'>
                <h1>{ 'Verbs' }</h1>
                <hr />
                {
                    forViewConsumption.map((item, index) => (
                        <VerbSentence { ...Object.assign(item, { index }) } />
                    ))
                }
            </div>
        );
    }

}

export default About;
