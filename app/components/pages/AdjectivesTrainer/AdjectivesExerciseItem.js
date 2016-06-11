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
            replace: PropTypes.func.isRequired,
            setFocusedItem: PropTypes.func.isRequired,
            shouldFocus: PropTypes.bool.isRequired,
            uid: PropTypes.number.isRequired,
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
        const { statement, key } = phrase;

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
                    { statement.map(this.renderStatementItem.bind(this)) }
                </div>
                { this.renderExerciseActions(uid) }
            </div>
        );
    }

    renderStatementItem (item, index) {
        const { type, text, translations, gender } = item;
        switch (type) {
            case 'noun':
                return (
                    <DirectObject
                        key={ index }
                        text={ text }
                        translations={ translations.eng }
                        gender={ gender }
                    />
                );

            case 'adjectiveRoot':
                return (
                    <AdjectiveRoot
                        key={ index }
                        text={ text }
                        translations={ translations.eng }
                    />
                );

            case 'input':
                return this.renderInput(item.text, index);

            default:
                return (
                    <span key={ index }>{ text }</span>
                );
        }
    }

    renderInput (text, key) {
        const { uid, setFocusedItem } = this.props;
        const numOfChars = text.length;

        return (
            <strong
                key={ key }
                className='input-wrapper'
            >
                <input
                    autoFocus={ uid === 0 ? true : false }
                    type='text'
                    maxLength={ numOfChars }
                    size={ numOfChars }
                    onChange={ ((event) => this.handleInputChange(event, key)).bind(this) }
                    onKeyPress={ this.handleInputKeyPress.bind(this) }
                    onFocus={ () => setFocusedItem(key) }
                    onBlur={ ((event) => this.handleInputBlur(event, key)).bind(this) }
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

    handleInputChange (event, key) {
        const { value } = event.target;
        const stubbedValue = this.props.phrase.values[key];
        const isCorrect = value.toLowerCase() === stubbedValue.toLowerCase();
        const isFilled = areSameLength(value, stubbedValue);
        this.setState({ isCorrect, isFilled });
    }

    handleInputBlur (event, key) {
        const { value } = event.target;
        const { uid, phrase, replace } = this.props;
        const isFilled = areSameLength(value, this.props.phrase.values[key]);
        if (uid >= 3 && isFilled) replace(1);
    }

}

function areSameLength (str1, str2) {
    return str1.length === str2.length;
}
