import React, { Component } from 'react';
import Tooltip from 'app/components/Tooltip//Tooltip';
import rawExercises from 'tables/rawExercises/verbsWithPrepositions';
import presentExercises from './presentExercises';
import './BasePage.scss';

const presentedExercises = presentExercises(rawExercises);

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
            showAnswerTooltip: false,
            isSelected: false
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

    componentWillReceiveProps(nextProps) {
        this.setState({ isSelected: this.props.index === nextProps.selectedExercise });
    }

    shouldComponentUpdate(nextProps, nextState) {
        const tooltipChanged = this.state.showAnswerTooltip !== nextState.showAnswerTooltip;
        if (tooltipChanged) return true;
        return this.state.isSelected !== nextState.isSelected;
    }

    componentDidUpdate() {
        const { index, selectedExercise } = this.props;
        if (index === selectedExercise)
            this.refs.sentence
                .querySelector('.VerbExercise-translation')
                .scrollIntoViewIfNeeded();
    }

    renderSentence() {
        const { wordList, translations, index, selectedExercise, selectExercise } = this.props;

        return (
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
        );
    }

    render() {
        const { text, index } = this.props;
        const selectedClass = this.state.isSelected ? 'selected' : '';
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
                { this.renderSentence.call(this) }
            </div>
        );
    }

    showAnswerTooltip(showAnswerTooltip) {
        this.setState({ showAnswerTooltip });
    }

}

export class BasePage extends Component {

    constructor() {
        super();

        this.state = {
            selectedExercise: null,
            exercises: []
        };

        this.selectExercise = this.selectExercise.bind(this);
    }

    componentWillMount() {
        const exercises = presentedExercises.filter(
            (exercise) => this.props.tags.some(
                (item) => {
                    if (typeof item === 'string') {
                        const result = exercise.tags.includes(item);
                        return result;
                    }

                    const result = item.every((dependantTag) => {
                        return exercise.tags.includes(dependantTag);
                    });

                    return result;
                }
            )
        );

        this.setState({ exercises });
    }

    selectExercise(selectedExercise) {
        this.setState({ selectedExercise });
    }

    render() {
        const { title, subtitle } = this.props;
        const subtitleElement = subtitle ? (<h3>{ subtitle }</h3>) : null;

        return (
            <div className='BasePage'>
                <div className='row'>
                    <div className='modal column small-10 small-centered  '>
                        <br />
                        <div className='row'>
                            <div className='column small-11 small-centered'>
                                <h1>{ title }</h1>
                                { subtitleElement }
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
        const {
            selectExercise,
            state: { selectedExercise, exercises }
        } = this;

        return exercises.map((item, index) => {
            const props = Object.assign(item, {
                index,
                selectExercise,
                selectedExercise,
                key: item.text
            });
            return (<VerbExercise { ...props } />);
        });
    }

}



export default BasePage;
