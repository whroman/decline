# [Decline](http://whroman.github.io/decline)

This is the code for a browser app that helps you practice German adjective declensions.

Most adjectives were scraped from [byki.com](http://www.byki.com/lists/german/greg's-basic-german-adjectives.html).

All nouns have been entered manually.

## Non-Technical Overview

- [Interface](#interface)
- [Generator](#generator)
- [Tables](#tables)
- [How Do These Components Interact?](#how-do-these-components-interact)


#### [`Interface`](#interface)

`./app` contains the code for [the interface](http://whroman.github.io/decline). It interprets the computer-readable format of a Sentence returned by `Generator` and makes it human-readable.

#### [`Generator`](#generator)

`./generator` contains the language-data-model-ish code for generating random German sentences. The program randomly selects parameters required to create a German sentence and then returns a sentence in a computer-readable format.

##### Example of a computer-readable phrase

```json
[{
    "type": "article",
    "text": "Ein"
}, {
    "type": "space",
    "text": " "
}, {
    "type": "noun",
    "text": "Neffe",
    "gender": "0",
    "translations": {
        "eng": ["nephew"]
    }
}]
```


#### [`Tables`](#tables)

##### Which Tables Currently Exist?

- Words
    - Nouns
    - Adjectives


- Grammar
    - Possible Genders
    - Article Suffixes
    - Adjective Suffixes

- Implementation-specific
    - Noun Categories


#### [How Do These Components Interact?](#how-do-these-components-interact)
1. `Interface` asks `Generator` for a `Sentence`.
2. `Generator` randomly decides three variables.

    - object gender
    - article type
    - grammar case

3. `Generator` grabs random items from `Tables` that comply with these variables.
4. `Generator` organizes these items and gives them back to `Interface`.
5. `Interface` renders `Sentence` in a human-legible way.


## Roadmap
- [ ] Kasus
    - [ ] NOM
        - [x] Statements
        - [ ] Commands
        - [ ] Y/N Questions
            - Ist das deine kluge Tochter?

        - [ ] SUBJ Questions
            - Welchen hast du gekauft?

    - [x] AKK
        - [x] Statements
        - [ ] Y/N Questions
                - Kann deine kluge Tochter gute Deutsch sprechen?

        - [ ] SUBJ Questions
                - Welchen Sprachen kann deine kluge Tochter sprechen?

    - [ ] DAT
        - [x] Statements
        - [ ] Y/N Questions
        - [ ] SUBJ Questions

    - [ ] GEN
        - [x] Statements
        - [ ] Y/N Questions
        - [ ] SUBJ Questions

- [ ] Conjunctions
    - [ ] Coordinating
    - [ ] Subordinating

- [ ] Verbs
    - [x] Modalverben
    - [ ] Adverbs
    - [ ] Jemandem verben
    - [ ] Etwas verben
    - [ ] Seperable verbs
    - [ ] Adverbial Inversion
        - "Ich laufe schnell. Schnell laufe ich."

- [ ] Comparative Adjectives
    - "Deine kleine Tochter. Deine kleinere Tochter. Deine kleinste Tochter."


## Development

Requires Node.js `>=22.12.0`; CI uses Node.js 22 from `.node-version`.

#### Executables

```bash
npm install # Install project dependencies
npm start   # Run a dev server at http://localhost:8000
npm test    # Run unit tests once
npm lint    # Lint all JS files
npm tdd     # Run unit tests when a JS file is changed
npm build   # Compile the production site into `./dist`
npm preview # Preview the production build locally
npm run test:e2e:local # Build and run the Playwright smoke test locally
```

## Cloudflare delivery

The site is deployed as Cloudflare Workers Static Assets. Pull requests build a
disposable preview and smoke-test it with Playwright. Commits on `master` build the
site once, deploy that artifact to staging, run the smoke test, and then promote
the exact same artifact to production after the production environment gate.

The delivery design and invariants are documented in
[`ARCHITECTURE.md`](./ARCHITECTURE.md).

### One-time Cloudflare bootstrap

Authenticate Wrangler locally, then create each named Worker once:

```bash
npm run deploy:bootstrap:preview
npm run deploy:bootstrap:staging
npm run deploy:bootstrap:production
```

These create `decline-web-preview`, `decline-web-staging`, and
`decline-web-production`. Normal releases use immutable Worker versions rather
than `wrangler deploy`.

### GitHub environments

Create `preview`, `staging`, and `production` environments. Give each environment
the `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` secrets. Set a
`WEB_BASE_URL` variable on staging and production to the corresponding deployed
URL, and configure the desired reviewer/policy gate on production.
