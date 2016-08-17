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

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
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
                    onChange={ this.handleInputChange }
                    onFocus={ this.handleInputFocus }
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

    handleInputChange (event) {
        const { answer } = this.props;
        const { value } = event.target;
        const isCorrect = value.toLowerCase() === answer.toLowerCase();
        const isFilled = value.length === answer.length;
        this.setState({ isCorrect, isFilled });
    }

    handleInputFocus () {
        const { exerciseIndex, selectedExercise, selectExercise } = this.props;
        if (exerciseIndex !== selectedExercise) selectExercise(exerciseIndex);
    }

}

class VerbExercise extends Component {

    constructor() {
        super();
        this.state = {
            showTranslationTooltip: false,
            showAnswerTooltip: false
        };

        this.showAnswerTooltip = this.showAnswerTooltip.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        if (event && event.target.tagName === 'INPUT') return;
        this.refs.sentence
            .querySelector('input')
            .focus();

        const { selectExercise, index } = this.props;
        selectExercise(index);
    }

    render() {
        const { text, wordList, translations, index, selectedExercise, selectExercise } = this.props;
        const selectedClass = index === selectedExercise ? 'selected' : '';
        const props = {
            className: `VerbExercise ${selectedClass}`,
            onClick: this.handleClick
        };

        return (
            <div { ...props } >
                <Tooltip
                    show={ this.state.showAnswerTooltip }
                    className='answer'
                >
                    <div>{ text }</div>
                </Tooltip>

                <div className='VerbExercise-details'>
                    <span>{ `${index + 1 }.` }</span>
                    <i
                        className='wr-ico wr-ico-language wr-ico-fw'
                        onMouseOver={ () => this.showAnswerTooltip(true) }
                        onMouseOut={ () => this.showAnswerTooltip(false) }
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
                                exerciseIndex: index,
                                key: word.answer + wordIndex,
                                selectExercise,
                                selectedExercise
                            });
                            return (<VerbWord { ...props } />);
                        })
                    }
                    <div className='VerbExercise-translation'> { translations.eng } </div>
                </div>
            </div>
        );
    }

    showAnswerTooltip(showAnswerTooltip) {
        this.setState({ showAnswerTooltip });
    }

}

export class Verbs extends Component {

    constructor() {
        super();
        this.state = { selectedExercise: null };
        this.selectExercise = this.selectExercise.bind(this);
    }

    selectExercise(index) {
        this.setState({ selectedExercise: index });
    }

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
                                { this.renderExercises.call(this) }
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        );
    }

    renderExercises() {
        const { props, selectExercise } = this;
        const { selectedExercise } = this.state;
        return props.exercises.map((item, index) => {
            const props = Object.assign(item, {
                index,
                selectedExercise,
                selectExercise,
                key: item.text
            });
            return (<VerbExercise { ...props } />);
        });
    }

}

export default Verbs;
