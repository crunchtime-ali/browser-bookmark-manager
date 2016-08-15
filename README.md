# Browser Bookmark Manager

[![dependencies](https://david-dm.org/dj-hedgehog/browser-bookmark-manager.svg)](https://david-dm.org/dj-hedgehog/browser-bookmark-manager)
[![npm](https://img.shields.io/npm/v/browser-bookmark-manager.svg?maxAge=2592000)](https://www.npmjs.com/package/browser-bookmark-manager)
[![npm2](https://img.shields.io/npm/dt/browser-bookmark-manager.svg?maxAge=2592000)](https://www.npmjs.com/package/browser-bookmark-manager)

A CLI to help you (fuzzily) find and manage your browser bookmarks.

![](assets/bbm-search.png)

## Installation

Via NPM:
```
npm install -g browser-bookmark-manager
```

## Usage

```
bbm <searchterm>
```

### Options


```
-b, --browser <browsername>
```
Searches for bookmarks on this browser. Currently only Google Chrome and Firefox are supported

Default: `chrome`


```
-p, --profile <profilename>
```
Search for bookmarks using this profile.

Default: `Default`

## Browser Support

- [x] Google Chrome
- [x] Firefox
- [ ] Opera
- [ ] Safari
- [ ] Microsoft Edge

## OS Support

- [x] OS X
- [x] Windows
- [ ] Linux

## To-Do

- [ ] Linux-Support
- [ ] Delete bookmarks
- [ ] * Any ideas ?*
