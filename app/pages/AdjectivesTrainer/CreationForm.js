import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-dropdown'
import './CreationForm.scss';

const KASUS_DROPDOWN_OPTIONS = [
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

const KATEGORIE_DROPDOWN_OPTIONS = [
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
        }
    }


  render () {
    return (
        <div className='CreationForm' >
            <table>
                <tbody>
                    <tr>
                        <td className='name'>
                            <div>Kasus</div>
                        </td>
                        <td
                            className='KasusDropdown'
                        >
                            <Dropdown
                                options={ KASUS_DROPDOWN_OPTIONS }
                                onChange={ this.handleKasusDropdownChange.bind(this) }
                                value={ KASUS_DROPDOWN_OPTIONS[0] }
                            />
                        </td>

                        <td className='name'>
                            <div>Kategorie</div>
                        </td>
                        <td
                            className='KasusDropdown'
                        >
                            <Dropdown
                                options={ KATEGORIE_DROPDOWN_OPTIONS }
                                onChange={ this.handleKategorieDropdownChange.bind(this) }
                                value={ KATEGORIE_DROPDOWN_OPTIONS[0] }
                            />
                        </td>
                        <td>
                            <div
                                className='button'
                                onClick={ this.handleClick.bind(this) }
                            >
                                Neue Sätze
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
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
        amount: 10,
        kasus, kategorie
    });
  }


}
