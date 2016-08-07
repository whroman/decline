import React, { PropTypes } from 'react';
import Tooltip from 'app/components/Tooltip//Tooltip';
import WithTooltip from './WithTooltip';

export default class AdjectiveRoot extends WithTooltip {

    static get propTypes() {
        return {
            text: PropTypes.string.isRequired,
            translations: PropTypes.arrayOf(PropTypes.string).isRequired,
        };
    }

    render() {
        const { text, translations } = this.props;

        return (
            <span
                className='triggersTooltip'
                onMouseEnter={ this.showTooltip.bind(this) }
                onMouseLeave={ this.hideTooltip.bind(this) }
            >
                <Tooltip show={ this.state.show } >
                    <strong>{ 'Adjektiv' }</strong>
                    {
                        translations.map((trans) => (
                            <div key={ trans }>{ trans }</div>
                        ))
                    }
                </Tooltip>
                <span>{ text }</span>
            </span>
        );
    }

}
