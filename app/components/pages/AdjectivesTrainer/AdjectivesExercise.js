import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import AdjectivesExerciseItem from './AdjectivesExerciseItem';
import './AdjectivesExercise.scss';

export default class AdjectivesExercise extends Component {

    static get propTypes() {
        return {
            phrases: PropTypes.arrayOf(PropTypes.shape),
            replace: PropTypes.func.isRequired
        };
    }

    constructor () {
        super();
        this.state = {
            focusedKey: null
        };
    }

    componentWillReceiveProps (props) {
        if (this.state.focusedKey !== null) return;

        this.setState({
            focusedKey: props.phrases[0].key
        });
    }

    renderPhrase (phrase, uid) {
        const { key } = phrase;
        const props = {
            key, phrase, uid,
            shouldFocus: this.state.focusedKey === key,
            setFocusedItem: this.setFocusedItem.bind(this),
            replace: this.props.replace
        };

        return (<AdjectivesExerciseItem { ...props } />);
    }

    render () {
        return (
            <div className='AdjectivesExercise'>
                <ReactCSSTransitionGroup
                    transitionName='example'
                    component='ul'
                    transitionEnterTimeout={ 300 }
                    transitionLeaveTimeout={ 300 }
                >
                    { this.props.phrases.map(this.renderPhrase.bind(this)) }
                </ReactCSSTransitionGroup>
            </div>
        );
    }

    setFocusedItem (key) {
        this.setState({
            focusedKey: key
        });
    }

}
