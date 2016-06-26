import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { create, load } from 'app/dux/adjectiveTrainer';
import CreationForm from './CreationForm';

import foo from 'tables/conjugationTable/data';
import articleTypes from 'tables/articles/types/data';
import genders from 'tables/nouns/genders/data';
import kasusTable from 'app/data/kasus';

console.log(foo);
const tables = foo.adjSuffixes.list.reduce((memo, { articleType, grammarCase, objectGender, text }) => {
    const processedArticleType = (articleType === '3') ? '1' : articleType;
    const rowKey = grammarCase;
    const col1Key = processedArticleType;
    const col2Key = objectGender;

    if (!memo[rowKey]) memo[rowKey] = [];
    if (!memo[rowKey][col1Key]) memo[rowKey][col1Key] = [];
    if (!memo[rowKey][col1Key][col2Key]) memo[rowKey][col1Key][col2Key] = text;
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

    renderAdjectiveDeclensionTable() {
        return (
            <div>
                <div className='row'>
                    <div className='row-header'></div>
                    { tables[0].map((col1, col1Index) => (
                        <div key={ col1Index } className='col-header'>
                            <div className='col1-header'>{ articleTypes[col1Index].translations.deu }</div>
                            { col1.map((col2, col2Index) => (
                                <div key={ col2Index } className='col2-header'>{ genders[col2Index] }</div>
                            )) }
                        </div>
                    )) }
                </div>

                { tables.map((row, rowIndex) => (
                    <div key={ rowIndex }>
                        <div className='row'>
                            <div className='row-header'>{ kasusTable[rowIndex].name }</div>
                            { row.map((col1, col1Index) => (
                                <div key={ col1Index } className='col1'>
                                    { col1.map((col2, col2Index) => (
                                        <div key={ col2Index } className='col2'>
                                            { `-${col2}` }
                                        </div>
                                    )) }
                                </div>
                            )) }
                        </div>
                    </div>
                )) }
            </div>
        );

    }

    render () {
        const { create, kasus, nounKategorie, adjectiveKategorie, gender } = this.props;
        const creationFormProps = { create, kasus, nounKategorie, adjectiveKategorie, gender };

        return (
            <div>
                <div className='row'>
                    <div className='modal column small-10 small-centered  '>
                        <div className='row'>
                            <div className='column small-11 small-centered'>
                                { this.renderAdjectiveDeclensionTable() }
                                <br/>
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
