import React, { Component } from 'react';
import Tooltip from 'app/components/Tooltip//Tooltip';
import './VerbsPage.scss';

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
                    key={ answer + index + '-input' }
                    className={ 'VerbWord-input' }
                    type='text'
                    maxLength={ answer.length }
                    size={ answer.length }
                    onChange={ ((event) => this.handleInputChange(event, answer)).bind(this) }
                />,
                <span
                    key={ answer + index + '-placeholder' }
                    className={ `placeholder ${inputState}` }
                >{ text }</span>
            )
        } else {
            word.push(<span key={ text + index + '-text'}>{ text }</span>);
        }

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

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        const firstInput = this.refs.sentence.querySelector('input');
        firstInput.focus();
    }

    render() {
        const { text, wordList, translations, index } = this.props;

        return (
            <div
                className='VerbExercise'
                onClick={ this.handleClick }
            >

                <Tooltip
                    show={ this.state.showTranslationTooltip }
                    className='translation'
                >
                    <div>{ translations.eng }</div>
                </Tooltip>

                <Tooltip
                    show={ this.state.showAnswerTooltip }
                    className='answer'
                >
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
                        className='wr-ico wr-ico-eye wr-ico-fw'
                    />
                </div>

                <div
                    className='VerbExercise-sentence'
                    ref='sentence'
                >
                    {
                        wordList.map((word, wordIndex) => {
                            const props = Object.assign(word, {
                                index: wordIndex,
                                key: word.answer + wordIndex
                            });
                            return (<VerbWord { ...props } />);
                        })
                    }
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
                            <div className='column small-11 small-centered'>
                                <h1>{ this.props.title }</h1>
                                <hr />
                                { this.renderExercises() }
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        );
    }

    renderExercises() {
        return this.props.exercises.map((item, index) => {
            const props = Object.assign(item, { index, key: item.text });
            return (<VerbExercise { ...props } />);
        });
    }

}

export default Verbs;
