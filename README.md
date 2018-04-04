# myapp

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


---

Good Practices:

* Use `Event` vue instance to communicate between 2 none related components by using `$emit`, `$on` or `$once`
* The model transmit data to childView using properties, and the childView emit event to their parents. 
