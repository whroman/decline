# Conjugate

`./src` contains the language-data-model-ish code for generating random German sentences.

`./app` contains the code for [the interface that you may use to practice your German adjectives and their declensions](http://whroman.github.io/conjugate).

Most adjectives were scraped from [byki.com](http://www.byki.com/lists/german/greg's-basic-german-adjectives.html).

All nouns have been entered manually.


## Executables

```bash
npm install # Install project dependencies
npm start   # Run a dev server at http://localhost:8080
npm test    # Run unit tests once
npm lint    # Lint all JS files
npm tdd     # Run unit tests when a JS file is changed
npm build   # Compile JS and CSS and dump them into `./dist`
```