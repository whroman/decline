import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { find } from 'lodash';

import categories from 'tables/categories/data';
import CreationDropdown from './CreationDropdown';
import './CreationForm.scss';

const GENDER_OPTIONS = [
    {
        label: 'Gemischt',
        value: Infinity
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
        value: Infinity
    },
    {
        label: 'Nominativ',
        value: 'nominative'
    },
    {
        label: 'Akkusativ',
        value: 'accusative'
    },
];

const KATEGORIE_OPTIONS = categories
    .map(({ uid, translations }) => {
        return {
            label: translations.deu,
            value: uid
        };
    });

KATEGORIE_OPTIONS.unshift({
    label: 'Alles',
    value: Infinity
});

function getInitialValue (options, value) {
    return find(options, { value }) || options[0];
}

export default class CreationForm extends Component {

    static get propTypes() {
        return {
            create: PropTypes.func,
            kasus:  PropTypes.string,
            kategorie:  PropTypes.string,
            gender:  PropTypes.string,
        };
    }

    constructor () {
        super();
        this.state = {
            kasus: null,
            kategorie: null,
            gender: null,
        };

        this.updateDropdownValue = this.updateDropdownValue.bind(this);
    }

    componentWillMount () {
        const { kasus, kategorie, gender } = this.props;
        this.setState({
            kasus,
            kategorie: typeof kategorie === 'string' ? kategorie : null,
            gender: typeof gender === 'string' ? gender : null
        });
    }

    render () {
        const { kasus, kategorie, gender } = this.state;
        const initialKasus = getInitialValue(KASUS_OPTIONS, kasus);
        const initialKategorie = getInitialValue(KATEGORIE_OPTIONS, kategorie);
        const initialGender = getInitialValue(GENDER_OPTIONS, gender);

        return (
            <div className='CreationForm' >
                <h1>{ 'Configure' }</h1>
                <hr />
                <br />
                <div className='dropdowns'>
                    <CreationDropdown
                        label='Kasus'
                        options={ KASUS_OPTIONS }
                        namespace={ 'kasus' }
                        updateDropdownValue={ this.updateDropdownValue }
                        initialValue={ initialKasus }
                    />
                    <CreationDropdown
                        label='Genus'
                        options={ GENDER_OPTIONS }
                        namespace={ 'gender' }
                        updateDropdownValue={ this.updateDropdownValue }
                        initialValue={ initialGender }
                    />
                    <CreationDropdown
                        label='Kategorie'
                        options={ KATEGORIE_OPTIONS }
                        namespace={ 'kategorie' }
                        updateDropdownValue={ this.updateDropdownValue }
                        initialValue={ initialKategorie }
                    />
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

    updateDropdownValue(event, namespace) {
        this.setState({ [namespace]: event.value });
    }

    handleClick () {
        const { kasus, kategorie, gender } = this.state;

        this.props.create({
            amount: 8,
            kasus, gender, kategorie
        });

        hashHistory.push('#');
    }

}
