// Small manifest for command-level guarantees. Their native specifications remain authoritative.
export const engineering = [
    { allureId: 'delivery.architecture', contracts: ['web.delivery'], command: ['npm', 'run', 'architecture:check'] },
    { allureId: 'delivery.import-casing', contracts: ['web.imports'], command: ['npm', 'run', 'check:imports'] },
];
export const engineeringTitle = check => `${check.allureId} @allure.id:${check.allureId} ${check.contracts.map(id => `@allure.label.story:${id}`).join(' ')}`;
