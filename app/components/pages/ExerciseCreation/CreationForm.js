import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-dropdown'
import { hashHistory } from 'react-router'
import { find } from 'lodash';

import categories from './../../../../tables/categories/data';
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
        };
    }

    constructor () {
        super();
        this.state = {
            kasus: null,
            kategorie: null,
            gender: null
        };
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
            <h1>Configure</h1>
            <hr />
            <br />
            <div className='dropdowns'>
                <div className='dropdown'>
                    <div className='name'>
                        <div>Kasus</div>
                    </div>
                    <div className='ReactDropdown'>
                        <Dropdown
                            options={ KASUS_OPTIONS }
                            onChange={ this.handleKasusDropdownChange.bind(this) }
                            value={ initialKasus }
                        />
                    </div>
                </div>
                <div className='dropdown'>
                    <div className='name'>
                        <div>Genus</div>
                    </div>
                    <div className='ReactDropdown'>
                        <Dropdown
                            options={ GENDER_OPTIONS }
                            onChange={ this.handleGenderDropdownChange.bind(this) }
                            value={ initialGender }
                        />
                    </div>
                </div>
                <div className='dropdown'>
                    <div className='name'>
                        <div>Kategorie</div>
                    </div>
                    <div className='ReactDropdown'>
                        <Dropdown
                            options={ KATEGORIE_OPTIONS }
                            onChange={ this.handleKategorieDropdownChange.bind(this) }
                            value={ initialKategorie }
                        />
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <div
                    className='button'
                    onClick={ this.handleClick.bind(this) }
                >
                    Save & Create
                </div>
            </div>
        </div>
    );
  }

  handleKasusDropdownChange (event) {
    this.setState({ kasus: event.value });
  }

  handleKategorieDropdownChange (event) {
    this.setState({ kategorie: event.value });
  }

  handleGenderDropdownChange (event) {
    this.setState({ gender: event.value });
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
