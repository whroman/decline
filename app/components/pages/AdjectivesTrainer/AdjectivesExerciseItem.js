import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import AdjectiveRoot from './words/AdjectiveRoot';
import DirectObject from './words/DirectObject';

const componentClassName = 'AdjectivesExerciseItem';

const getInput = (tabindex) => document.querySelector(`.${componentClassName} [tabindex='${tabindex}']`);

export default class AdjectivesExerciseItem extends Component {

    static get propTypes() {
        return {
            phrase: PropTypes.shape(),
            replace: PropTypes.func,
            setFocusedItem: PropTypes.func.required,
            shouldFocus: PropTypes.func.required,
            uid: PropTypes.number.required,
        };
    }

    constructor () {
        super();

        this.state = {
            isCorrect: false,
            isFilled: false
        };
    }

    render () {
        const { phrase, uid, setFocusedItem, shouldFocus } = this.props;
        const { untilAdj, key, adjective, noun } = phrase;

        const { isFilled, isCorrect } = this.state;
        let inputState = '';
        if (isFilled) inputState = isCorrect ? 'isCorrect' : 'isIncorrect';

        const componentClassNames = [ componentClassName, inputState ];
        if (shouldFocus) componentClassNames.push('isFocused');

        return (
            <div
                className={ componentClassNames.join(' ') }
                onClick={ this.handleClick.bind(this) }
                onMouseEnter={ () => setFocusedItem(key) }
            >
                <div className='text'>
                    <span>{ untilAdj }</span>
                    <span>&nbsp;</span>
                    <AdjectiveRoot
                        text={ adjective.text }
                        translations={ adjective.translations.eng }
                    />
                    { this.renderInput() }
                    <span>&nbsp;</span>
                    <DirectObject
                        text={ noun.text }
                        translations={ noun.translations.eng }
                        gender={ noun.gender }
                    />
                    <span>{ '.' }</span>
                </div>
                { this.renderExerciseActions(uid) }
            </div>
        );
    }

    renderInput () {
        const { phrase, uid, setFocusedItem } = this.props;
        const { stub, key } = phrase;
        const numOfChars = stub.length;

        return (
            <strong className='input-wrapper'>
                <input
                    autoFocus={ uid === 0 ? true : false }
                    type='text'
                    maxLength={ numOfChars }
                    size={ numOfChars }
                    onChange={ this.handleInputChange.bind(this) }
                    onKeyPress={ this.handleInputKeyPress.bind(this) }
                    onFocus={ () => setFocusedItem(key) }
                    onBlur={ this.handleInputBlur.bind(this) }
                    tabIndex={ uid + 1 }
                />
                <div className='placeholder'>{ Array(numOfChars + 1).join('_') }</div>
            </strong>
        );
    }

    renderExerciseActions(uid) {
        return (
            <div className='actions'>
                <Link
                    to={ `detail/${uid}` }
                    className='detail-link'
                >
                    <i className='wr-ico wr-ico-info-circle wr-ico-fw' />
                </Link>
            </div>
        );
    }

    handleClick () {
        getInput(this.props.uid + 1).focus();
    }

    handleInputKeyPress (event) {
        if (event.key.toLowerCase() === 'enter') {
            let nextInput = getInput(this.props.uid + 2);
            if (!nextInput) nextInput = getInput(1);
            nextInput.focus();
        }
    }

    handleInputChange (event) {
        const { value } = event.target;
        const { stubbedValue } = this.props.phrase;

        const isCorrect = value.toLowerCase() === stubbedValue.toLowerCase();
        const isFilled = areSameLength(value, stubbedValue);
        this.setState({ isCorrect, isFilled });
    }

    handleInputBlur (event) {
        const { value } = event.target;
        const { uid, phrase, replace } = this.props;
        const isFilled = areSameLength(value, phrase.stubbedValue);
        if (uid >= 3 && isFilled) replace(1);
        this.toggleTooltip(false);
    }

    toggleTooltip (show, tooltipJSX=null) {
        this.setState({
            tooltipShow: show,
            tooltipJSX
        });
    }

}

function areSameLength (str1, str2) {
    return str1.length === str2.length;
}
