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

export default class CreationForm extends Component {

  static get propTypes() {
    return {
      create: PropTypes.func,
    };
  }

  handleKasusDropdownChange (event) {
    this.props.create({
        amount: 10,
        kasus: event.value
    });
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
                    </tr>
                </tbody>
            </table>
        </div>
    );
  }

}
