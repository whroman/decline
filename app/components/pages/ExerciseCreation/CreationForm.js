import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { find } from 'lodash';

import nounCategories from 'tables/nouns/categories/data';
import adjectiveCategories from 'tables/adjectives/categories/data';
import CreationDropdown from './CreationDropdown';
import './CreationForm.scss';

const GENDER_OPTIONS = [
    {
        label: 'Gemischt',
        value: ' '
    },
    {
        label: 'Maskulin',
        value: '0'
    },
    {
        label: 'Feminin',
        value: '1'
    },
    {
        label: 'Neutrum',
        value: '2'
    },
    {
        label: 'Pluralisch',
        value: '3'
    }
];

const KASUS_OPTIONS = [
    {
        label: 'Gemischt',
        value: ' '
    },
    {
        label: 'Nominativ',
        value: 'nominative'
    },
    {
        label: 'Akkusativ',
        value: 'accusative'
    },
    {
        label: 'Dativ',
        value: 'dative'
    },
    {
        label: 'Genitiv',
        value: 'genitive'
    },
];

const NOUN_KATEGORIE_OPTIONS = nounCategories
    .map(({ uid, translations }) => {
        return {
            label: translations.deu,
            value: uid
        };
    });

NOUN_KATEGORIE_OPTIONS.unshift({
    label: 'Gemischt',
    value: ' '
});


const ADJECTIVE_KATEGORIE_OPTIONS = adjectiveCategories
    .map(({ uid, translations }) => {
        return {
            label: translations.eng,
            value: uid
        };
    });

ADJECTIVE_KATEGORIE_OPTIONS.unshift({
    label: 'Gemischt',
    value: ' '
});

function getInitialValue (options, value) {
    return find(options, { value }) || options[0];
}

export default class CreationForm extends Component {

    static get propTypes() {
        return {
            create: PropTypes.func,
            kasus:  PropTypes.string,
            nounKategorie:  PropTypes.string,
            gender:  PropTypes.string,
        };
    }

    constructor () {
        super();
        this.state = {
            kasus: ' ',
            nounKategorie: ' ',
            gender: ' ',
        };

        this.updateDropdownValue = this.updateDropdownValue.bind(this);
    }

    componentWillMount (props) {
        const { kasus, nounKategorie, adjectiveKategorie, gender } = props || this.props;
        const update = {
            kasus,
            nounKategorie: typeof nounKategorie === 'string' ? nounKategorie : ' ',
            adjectiveKategorie: typeof adjectiveKategorie === 'string' ? adjectiveKategorie : ' ',
            gender: typeof gender === 'string' ? gender : ' '
        };
        this.setState(update);
    }

    componentWillReceiveProps (nextProps) {
        this.componentWillMount(nextProps);
    }

    render () {
        const { kasus, nounKategorie, adjectiveKategorie, gender } = this.state;
        const initialKasus = getInitialValue(KASUS_OPTIONS, kasus);
        const initialNounKategorie = getInitialValue(NOUN_KATEGORIE_OPTIONS, nounKategorie);
        const initialAdjectiveKategorie = getInitialValue(ADJECTIVE_KATEGORIE_OPTIONS, adjectiveKategorie);
        const initialGender = getInitialValue(GENDER_OPTIONS, gender);

        return (
            <div className='CreationForm' >
                <h1>{ 'Configure' }</h1>
                <hr />
                <br />
                <div className='dropdowns row'>
                    <div className='column small-6'>
                        <CreationDropdown
                            label='Kasus'
                            options={ KASUS_OPTIONS }
                            namespace={ 'kasus' }
                            updateDropdownValue={ this.updateDropdownValue }
                            initialValue={ initialKasus }
                        />
                    </div>

                    <div className='column small-6'>
                        <CreationDropdown
                            label='Genus'
                            options={ GENDER_OPTIONS }
                            namespace={ 'gender' }
                            updateDropdownValue={ this.updateDropdownValue }
                            initialValue={ initialGender }
                        />
                    </div>

                    <div className='column small-6'>
                        <CreationDropdown
                            label='Nomen Kategorie'
                            options={ NOUN_KATEGORIE_OPTIONS }
                            namespace={ 'nounKategorie' }
                            updateDropdownValue={ this.updateDropdownValue }
                            initialValue={ initialNounKategorie }
                        />
                    </div>

                    <div className='column small-6'>
                        <CreationDropdown
                            label='Adjektiven Kategorie'
                            options={ ADJECTIVE_KATEGORIE_OPTIONS }
                            namespace={ 'adjectiveKategorie' }
                            updateDropdownValue={ this.updateDropdownValue }
                            initialValue={ initialAdjectiveKategorie }
                        />
                    </div>
                </div>
                <div className='text-center'>
                    <div
                        className='button'
                        onClick={ this.handleClick.bind(this) }
                    >
                        { 'Save & Create' }
                    </div>
                </div>
            </div>
        );
    }

    updateDropdownValue ({ value }, namespace) {
        this.setState({ [namespace]: value });
    }

    handleClick () {
        const { kasus, nounKategorie, adjectiveKategorie, gender } = this.state;

        const createParams = {
            amount: 8,
            kasus: kasus === ' ' ? null : kasus,
            nounKategorie: nounKategorie === ' ' ? null : nounKategorie,
            adjectiveKategorie: adjectiveKategorie === ' ' ? null : adjectiveKategorie,
            gender: gender === ' ' ? null : gender
        };

        this.props.create(createParams);
        hashHistory.push('#');
    }

}
