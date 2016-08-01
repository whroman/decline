import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { create, load, replace } from 'app/dux/adjectiveTrainer';

import AdjectivesExercise from './AdjectivesExercise';

export class AdjectivesTrainer extends Component {

    static get propTypes() {
        return {
            phrases: PropTypes.arrayOf(PropTypes.shape),
            create: PropTypes.func.isRequired,
            replace: PropTypes.func.isRequired,
            load: PropTypes.func.isRequired,
        };
    }

    componentWillMount () {
        const { phrases, create, load } = this.props;
        load();
        if (phrases.length > 0) return;
        create({ amount: 8 });
    }

    render () {
        const { replace, phrases } = this.props;

        return (
            <div className='row'>
                <div className='modal column small-10 small-centered  '>
                    <br/>
                    <div className='row'>
                        <div className='column small-11 small-centered Adjective-header'>
                            <h1>{ 'Adjective Declension' }</h1>
                            <Link
                                to='practice/adjective-declension/settings'
                                className='Adjective-settings-link '
                            >
                                <i className='wr-ico wr-ico-cogs' />
                            </Link>
                            <hr/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='column small-12'>
                            <AdjectivesExercise
                                phrases={ phrases }
                                replace={ replace }
                            />
                        </div>
                    </div>
                    <br/>
                </div>
            </div>
        );
    }

}

export function mapStateToProps(state) {
    return { phrases: state.adjectiveTrainer.collection };
}

const mapDispatchToProps = {
    create, load, replace
};

export default connect(mapStateToProps, mapDispatchToProps)(AdjectivesTrainer);
