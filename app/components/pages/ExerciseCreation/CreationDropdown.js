import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-dropdown';

class CreationDropdown extends Component {

    static get propTypes() {
        return {
            label: PropTypes.string.isRequired,
            options: PropTypes.array.isRequired,
            namespace: PropTypes.string.isRequired,
            initialValue: PropTypes.shape({}).isRequired,
            updateDropdownValue: PropTypes.func.isRequired,
        };
    }

    handleChange() {
        const { updateDropdownValue, namespace } = this.props;
        return (event) => updateDropdownValue(event, namespace);
    }

    render() {
        const { label, options, initialValue } = this.props;
        return (
            <div className='dropdown'>
                <div className='name'>
                    <div>{ label }</div>
                </div>
                <div className='ReactDropdown'>
                    <Dropdown
                        options={ options }
                        onChange={ this.handleChange() }
                        value={ initialValue }
                    />
                </div>
            </div>
        );
    }
}

export default CreationDropdown;