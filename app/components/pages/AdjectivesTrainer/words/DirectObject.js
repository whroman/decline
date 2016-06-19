import React, { PropTypes } from 'react';
import nounGenders from 'tables/nouns/genders/data.js';
import Tooltip from 'app/components/Tooltip//Tooltip';
import WithTooltip from './WithTooltip';

export default class DirectObject extends WithTooltip {

    static get propTypes() {
        return {
            text: PropTypes.string.isRequired,
            gender: PropTypes.string.isRequired,
            translations: PropTypes.arrayOf(PropTypes.string).isRequired,
        };
    }

    renderTranslation(translation) {
        return (<div key={ translation }>{ translation }</div>);
    }

    render() {
        const { text, gender, translations } = this.props;

        return (
            <span
                className='triggersTooltip'
                onMouseEnter={ this.showTooltip.bind(this) }
                onMouseLeave={ this.hideTooltip.bind(this) }
            >
                <Tooltip show={ this.state.show } >
                    <strong>{ 'Direktes Objekt' }</strong>
                    <div>{ `{ ${nounGenders[gender]} }` }</div>
                    { translations.map(this.renderTranslation.bind(this)) }
                </Tooltip>
                <span>{ text }</span>
            </span>
        );
    }

}
