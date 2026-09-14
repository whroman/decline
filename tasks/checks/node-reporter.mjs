import reporter from 'allure-node-test/reporter';
import output from './output.cjs';

export default async function* (source) {
    process.env.ALLURE_RESULTS_DIR ||= `${output.nativeOutput('node')}/allure-results`;
    yield* reporter(source);
}
