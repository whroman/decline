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
            <table>
                <tbody>
                    <tr>
                        <td className='name'>
                            <div>Kasus</div>
                        </td>
                        <td
                            className='ReactDropdown'
                        >
                            <Dropdown
                                options={ KASUS_OPTIONS }
                                onChange={ this.handleKasusDropdownChange.bind(this) }
                                value={ initialKasus }
                            />
                        </td>

                        <td className='name'>
                            <div>Kategorie</div>
                        </td>
                        <td
                            className='ReactDropdown'
                        >
                            <Dropdown
                                options={ KATEGORIE_OPTIONS }
                                onChange={ this.handleKategorieDropdownChange.bind(this) }
                                value={ initialKategorie }
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
            <br />
            <div className='text-center'>
                <div
                    className='button'
                    onClick={ this.handleClick.bind(this) }
                >
                    Create Exercises
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
