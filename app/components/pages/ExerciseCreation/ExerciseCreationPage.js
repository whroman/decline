import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { create, load } from 'app/dux/adjectiveTrainer';

import CreationForm from './CreationForm';

export class ExerciseCreationPage extends Component {

    static get propTypes() {
        return {
            create: PropTypes.func,
            load: PropTypes.func,
            kasus: PropTypes.string,
            kategorie: PropTypes.string,
            gender: PropTypes.string
        };
    }

    componentWillMount() {
        this.props.load();
    }

    render () {
        const { create, kasus, kategorie, gender } = this.props;
        const creationFormProps = { create, kasus, kategorie, gender };

        return (
            <div>
                <div className='row'>
                    <div className='modal column small-10 small-centered  '>
                        <br/>
                        <div className='row'>
                            <div className='column small-11 small-centered'>
                                <CreationForm { ...creationFormProps } />
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>
                <br/>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const { kasus, kategorie, gender } = state.adjectiveTrainer;
    return { kasus, kategorie, gender };
}

const mapDispatchToProps = {
    create, load
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseCreationPage);
