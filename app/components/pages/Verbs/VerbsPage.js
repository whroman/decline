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
                    className={ 'VerbWord-input' }
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

        return (<span className='VerbWord'>{ word }</span>);
    }

    handleInputChange (event, expectedValue) {
        const { value } = event.target;
        const isCorrect = value.toLowerCase() === expectedValue.toLowerCase();
        const isFilled = value.length === expectedValue.length;
        this.setState({ isCorrect, isFilled });
    }

}

class VerbExercise extends Component {

    constructor() {
        super();
        this.state = {
            showTranslationTooltip: false,
            showAnswerTooltip: false
        };
    }

    render() {
        const { text, wordList, translations, index } = this.props;

        return (
            <div className='VerbExercise'>

                <Tooltip show={ this.state.showTranslationTooltip } >
                    <div>{ translations.eng }</div>
                </Tooltip>

                <Tooltip show={ this.state.showAnswerTooltip } >
                    <div>{ text }</div>
                </Tooltip>

                <div className='VerbExercise-details'>
                    <span>{ `${index + 1 }.` }</span>

                    <i
                        onMouseOver={ this.showTranslationTooltip.bind(this, true) }
                        onMouseOut={ this.showTranslationTooltip.bind(this, false) }
                        className='wr-ico wr-ico-language wr-ico-fw'
                    />

                    <i
                        onMouseOver={ this.showAnswerTooltip.bind(this, true) }
                        onMouseOut={ this.showAnswerTooltip.bind(this, false) }
                        className='wr-ico wr-ico-unlock-alt wr-ico-fw'
                    />
                </div>

                <div className='VerbExercise-sentence'>
                    {
                        wordList.map((word, wordIndex) => (
                            <VerbWord { ...Object.assign(word, { index: wordIndex }) } />
                        ))
                    }
                    <span>{ '.' }</span>
                </div>
            </div>
        );
    }

    showTranslationTooltip(showTranslationTooltip) {
        this.setState({
            showTranslationTooltip,
            showAnswerTooltip: false
        });
    }

    showAnswerTooltip(showAnswerTooltip) {
        this.setState({
            showAnswerTooltip,
            showTranslationTooltip: false
        });
    }

}

export class Verbs extends Component {

    render() {
        return (
            <div className='Verbs'>
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
                <h1>{ 'Verbs & Prepositions' }</h1>
                <hr />
                {
                    forViewConsumption.map((item, index) => (
                        <VerbExercise { ...Object.assign(item, { index }) } />
                    ))
                }
            </div>
        );
    }

}

export default Verbs;
