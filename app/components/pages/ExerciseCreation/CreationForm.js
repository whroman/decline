import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-dropdown'
import { hashHistory } from 'react-router'
import { find } from 'lodash';

import './CreationForm.scss';

const KASUS_OPTIONS = [
    {
        label: 'Gemischt',
        value: null
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

const KATEGORIE_OPTIONS = [
    {
        label: 'Alles',
        value: null
    },
    {
        label: 'Menschen',
        value: 0
    },
    {
        label: 'Familie',
        value: 1
    },
    {
        label: 'Tiere',
        value: 2
    },
    {
        label: 'Körper',
        value: 3
    },
    {
        label: 'Kinder aufziehen',
        value: 4
    }
];

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
            kategorie: null
        };
    }

    componentWillMount () {
        const { kasus, kategorie } = this.props;
        this.setState({
            kasus: kasus,
            kategorie: kategorie
        });

    }

  render () {
    const { kasus, kategorie } = this.state;
    const initialKasus = find(KASUS_OPTIONS, { value: kasus }) || KASUS_OPTIONS[0];
    const initialKategorie = find(KATEGORIE_OPTIONS, { value: kategorie }) || KATEGORIE_OPTIONS[0];

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
                    <div
                        className='ReactDropdown'
                    >
                        <Dropdown
                            options={ KASUS_OPTIONS }
                            onChange={ this.handleKasusDropdownChange.bind(this) }
                            value={ initialKasus }
                        />
                    </div>
                </div>
                <div className='dropdown'>
                    <div className='name'>
                        <div>Kategorie</div>
                    </div>
                    <div
                        className='ReactDropdown'
                    >
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
    this.setState({
        kasus: event.value
    });
  }

  handleKategorieDropdownChange (event) {
    this.setState({
        kategorie: event.value
    });
  }

  handleClick () {
    const { kasus, kategorie } = this.state;
    this.props.create({
        amount: 8,
        kasus, kategorie
    });

    hashHistory.push('#');
  }

}
