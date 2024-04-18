### Hexlet tests and linter status:
[![Actions Status](https://github.com/ivansneg2015/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ivansneg2015/frontend-project-11/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/47f16555e344757124bf/maintainability)](https://codeclimate.com/github/olya889/frontend-project-11/maintainability)

[![ESLint](https://github.com/ivansneg2015/frontend-project-11/actions/workflows/eslint.yml/badge.svg)](https://github.com/ivansneg2015/frontend-project-11/actions/workflows/eslint.yml)


https://frontend-project-11-2r85.vercel.app/

**RSS aggregator** - service for aggregating RSS feeds, allows to add an unlimited number of RSS feeds, updates them itself and adds new entries to the common stream.
## Description
Simple feed aggregator, which collect RSS feeds and then watched for a new posts.

## Acquired Skills
- Working with DOM API, asynchronous requests using axios.
- State management of the application (using the on-change library)
- Implementation of the package's ability to work as a library
- Working with higher-order functions
- Setting up project build using Webpack
- Following the application architecture pattern MVC, working with state
- Styling using Bootstrap
- Deployment on Vercel

*Technology Stack: JavaScript, Bootstrap, ESLint, GitHub Actions (CI), Webpack, Yup, on-change, i18next, Axios, All Origins, Lodash*

### install:
	npm ci
### lint:
	npx eslint .
### develop:
	npx webpack serve
### build:
	NODE_ENV=production npx webpack