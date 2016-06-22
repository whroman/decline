import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { create, load } from 'app/dux/adjectiveTrainer';
import CreationForm from './CreationForm';

import foo from 'tables/conjugationTable/data';
import articleTypes from 'tables/articles/types/data';
import genders from 'tables/nouns/genders/data';

console.log(foo);
const tables = foo.adjSuffixes.list.reduce((memo, { articleType, grammarCase, objectGender, text }) => {
    const processedArticleType = (articleType === '3') ? '1' : articleType;
    if (!memo[objectGender]) memo[objectGender] = [];
    if (!memo[objectGender][grammarCase]) memo[objectGender][grammarCase] = [];
    if (!memo[objectGender][grammarCase][processedArticleType]) memo[objectGender][grammarCase][processedArticleType] = text;
    return memo;
}, []);
console.log(tables);

export class ExerciseCreationPage extends Component {

    static get propTypes() {
        return {
            create: PropTypes.func,
            load: PropTypes.func,
            kasus: PropTypes.string,
            nounKategorie: PropTypes.string,
            adjectiveKategorie: PropTypes.string,
            gender: PropTypes.string
        };
    }

    componentWillMount() {
        this.props.load();
    }

    render () {
        const { create, kasus, nounKategorie, adjectiveKategorie, gender } = this.props;
        const creationFormProps = { create, kasus, nounKategorie, adjectiveKategorie, gender };

        return (
            <div>
                <div className='row'>
                    <div className='modal column small-10 small-centered  '>
                        <br/>
                        <div>
                            <div className='row'>
                                <div className='row-header'></div>
                                { tables[0].map((col1, col1Index) => (
                                    <div className='col-header'>
                                        <div className='col1-header'>{ col1Index }</div>
                                        { col1.map((col2, col2Index) => (
                                            <div className='col2-header'>{ articleTypes[col2Index].translations.deu }</div>
                                        )) }
                                    </div>
                                )) }
                            </div>

                            { tables.map((row, rowI) => (
                                <div>
                                    <div className='row'>
                                        <div className='row-header'>{ genders[rowI] }</div>
                                        { row.map((col1) => (
                                            <div className='col1'>
                                                { col1.map((col2) => (
                                                    <div className='col2'>
                                                        { col2 }
                                                    </div>
                                                )) }
                                            </div>
                                        )) }
                                    </div>
                                </div>
                            )) }
                        </div>
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
    const { kasus, nounKategorie, adjectiveKategorie, gender } = state.adjectiveTrainer;
    return { kasus, nounKategorie, adjectiveKategorie, gender };
}

const mapDispatchToProps = {
    create, load
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseCreationPage);
