---
title: Component local reducer
date: "2018-11-01T00:00:00.000Z"
---

# Component local reducers

The reducer pattern, popularized in the Javascript ecosystem by Redux, is
awesome!

Reducers let you restructure state transitions, which tends to be tricky bits of
your application, as pure functions that take state and return state. This has a
huge benefit in terms of making testing and reasoning about state a lot simpler,
despite some boilerplate.

```js
function someReducer(state, action) {
  switch (action.type) {
    case "SOME_ACTION": {
      return {
        ...state,
        someFlag: true
      };
    }
    default:
      return state;
  }
}
```

Unfortunately, I think reducers have become synonymous with Redux. And I think
there is now the common misconception that the reducer pattern is _exclusive_ to
Redux. I want to dispel this, because I think it's a pattern that's useful
outside of Redux global store, such as React's component local state.

If we decompose Redux into its essential parts, it comes down to 3 things.

1.  A `dispatch` method to drive state change through actions.
2.  A reducer function that models state changes as pure functions.
3.  Mechanism to subscribe a React component to state changes.

Note that the reducer is just _independent_ sub-component of Redux.

Reducers are just regular Javascript functions! And by virtue of being just a
function, it is a very useful, generic idea that readily cross framework and
language boundaries.

https://twitter.com/dan_abramov/status/1046147094099243008

The good news here is that there's a really easy way to take advantage of them
in regular React components.

```js
// Hello world
```

And component local reducers bring the same benefit that reducers in Redux does!
It lets you tease apart state transitions logic out of components by moving it
outside to a reducer function that can be tested and reasoned about
independently. And I think that's a huge win!

Note that I'm not advocating converting all your component local state from
regular `this.setState()` to this pattern tomorrow. But I think taking advantage
of the reducer pattern in a few select components that have complicated state is
a good idea can be a good idea.

Update: Looks like there will be a first class API for this with the upcoming
hooks proposal in the form of `userReducer` :tada:.