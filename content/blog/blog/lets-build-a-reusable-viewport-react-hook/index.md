---
title: Let's Make A React Hook to Track Window Size
date: "2020-04-30"
description: "Let's use React Hooks and Context API to create a reusable hook to get our users screen size"
---

Without fail there comes a time in every app where I need to write some kind of logic to programatically track the width of the browser window. Whether it's to show/hide components or add/remove classes from elements. Today we're going to use React's context API and hooks to create a single event listener at the top of our app that our components can use to determine whether the current screen size is small, medium or large.

Our app is pretty straightforward right now. We have an App component and a component called ReportScreenSize

```js
// App.js
import React from "react"
import ReportScreenSize from "./ReportScreenSize"

export default function App() {
  return <ReportScreenSize />
}
```

```js
// ReportScreenSize.js
import React from "react"

export default function ReportScreenSize() {
  return <p>Your screen size is</p>
}
```

We're going to borrow a pattern for consuming our context from our friend Kent C Dodds. If you haven't, you should check out his blog post on [How To Use React Context Effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively)

Let's start with creating our context in a new file called useScreen.

```js
// useScreen
import React from "react"

const ViewContext = React.createContext({
  isSmall: false,
  isMedium: false,
  isLarge: false,
})
```

Now, just underneat that, we're going to create our context provider that will wrap our entire app.

```js
const smallScreenMaxWidth = 579
const mediumScreenMaxWidth = 768

function getCurrentView() {
  const width = window.innerWidth
  return {
    isSmall: width <= smallScreenMaxWidth,
    isMedium: width > smallScreenMaxWidth && width <= mediumScreenMaxWidth,
    isLarge: width > mediumScreenMaxWidth,
  }
}

function ViewProvider({ children }) {
  const [screen, setscreen] = React.useState(getCurrentView)

  return <ViewContext.Provider value={screen}>{children}</ViewContext.Provider>
}
```

If you're unfamiliar with how React.useState works, I'll provide a link to the React docs for useState at the end of this post. I like to think of it as creating a 'getter' and a 'setter' with some initial value. Our initial value is going to be an object created based on the value of window.innerWidth.

Finally, we need to create the hook that is going to allow our components to consume this context.

```js
function useScreen() {
  const context = React.useContext(ViewContext)
  if (context === undefined) {
    throw new Error("useScreen must be used inside of a ViewProvider")
  }
  return context
}
```

We'll likely never seen that error thrown since our ViewProvider is going to sit at the top of our app, but it's good to have just in case!

To Recap, here's our useScreen file at this stage:

```js
// useScreen
import React from "react"

const ViewContext = React.createContext({
  isSmall: false,
  isMedium: false,
  isLarge: false,
})

const smallScreenMaxWidth = 579
const mediumScreenMaxWidth = 768

function getCurrentView() {
  const width = window.innerWidth
  return {
    isSmall: width <= smallScreenMaxWidth,
    isMedium: width > smallScreenMaxWidth && width <= mediumScreenMaxWidth,
    isLarge: width > mediumScreenMaxWidth,
  }
}

function ViewProvider({ children }) {
  const [screen, setScreen] = React.useState(getCurrentView)

  return <ViewContext.Provider value={screen}>{children}</ViewContext.Provider>
}

function useScreen() {
  const context = React.useContext(ViewContext)
  if (context === undefined) {
    throw new Error("useScreen must be used inside of a ViewProvider")
  }
  return context
}

export { ViewProvider, useScreen }
```

Now that we've created our ViewProvider and useScreen hook, let's go ahead and put them in our app. First, in our App component, let's wrap our App in our new ViewProvider.

```js
// App.js
import React from "react"
import { ViewProvider } from "./useScreen"
import ReportScreenSize from "./ReportScreenSize"

export default function App() {
  return (
    <ViewProvider>
      <ReportScreenSize />
    </ViewProvider>
  )
}
```

Then let's start using our new useScreen hook inside of our ReportScreenSize component.

```js
// ReportScreenSize.js
import React from "react"
import { useScreen } from "./useScreen"

export default function ReportScreenSize() {
  const screen = useScreen()
  let screenSize = "small"
  if (screen.isMedium) screenSize = "medium"
  if (screen.isLarge) screenSize = "large"

  return <p>Your screen size is {screenSize}</p>
}
```

If you haven't noticed already, we have a problem. When you first load the page, you should see that the correct screen size is being reported based on the width of your browser. However, if you resize your window that value never changes. That's because our ViewProvider has nothing running the 'setter' in our useState to update the value. Let's fix that.

```js
function getCurrentView() {
  const width = window.innerWidth
  return {
    isSmall: width <= smallScreenMaxWidth,
    isMedium: width > smallScreenMaxWidth && width <= mediumScreenMaxWidth,
    isLarge: width > mediumScreenMaxWidth,
  }
}

function ViewProvider({ children }) {
  const [screen, setScreen] = React.useState(getCurrentView)

  React.useEffect(() => {
    const resizer = () => setScreen(getCurrentView)
    window.addEventListener("resize", resizer)
    return () => window.removeEventListener("resize", resizer)
  }, [])

  return <ViewContext.Provider value={screen}>{children}</ViewContext.Provider>
}
```

Again, if you're unfamiliar with useEffect a link to the docs will be at the bottom of this post. Essentially what we're doing is saying "Hey React, when our ViewProvider is mounted, please add an event listener to the window object so that when our user resizes their window, we can update our screen size state. Oh, and when this component is no longer needed, can you do us a favor and remove that event listener? Thanks React. You're the best."

Sweet! Everything should be working now. Our ReportScreenSize component should correctly report the screen size. We're not done just yet though. I usually avoid trying to preimptively optimize for performance, and since we're rendering a single component this is probably fine as it is. Still, I think we can do better!

Our eventListener is really good at its job and is going to update our state many times when our user resizes their screen. This update will go out to all of the components consuming our useScreen hook causing a ton of unecessary updates. Let's fix that with a debouncer around our event listener.

```js
React.useEffect(() => {
  // debounce mechanism intialized to null
  let resizeTimeoutId = null
  const resizer = () => {
    // prevents return of previous timeout
    clearTimeout(resizeTimeoutId)
    // sets the new timeout
    resizeTimeoutId = setTimeout(() => setScreen(getCurrentView()), 150)
  }
  window.addEventListener("resize", resizer)
  return () => window.removeEventListener("resize", resizer)
}, [])
```

You can learn a lot more about debouncing from [this article by David Walsh](https://davidwalsh.name/javascript-debounce-function).

Cool, now that we're debouncing, we shouldn't be calling our setScreen nearly as often... but I think we can do even better without too much extra work. Let's try and take it just ONE step further. There's still a really high chance that the value of our current view hasn't changed when we run setScreen. What if we could quickly compare the newly proposed state values to the current state values and only run setScreen if the new value is different than the current value?

Let's write our comparison function

```js
function differenceBetweenCurrentAndNewView(currentView, newView) {
  return Object.keys(newView).filter(key => currentView[key] !== newView[key])
}
```

We'll pass the current value of screen and the value of our getCurrentView() function. We'll then extract the keys from the value of getCurrentView which should always return an array with these values: `['isSmall', 'isMedium', 'isLarge']`. Next, we will filter that array and only return instances where the values in currentView and newView do not match. Now all we need to do is put that inside of our resizer function like this:

```js
const smallScreenMaxWidth = 579
const mediumScreenMaxWidth = 768

function getCurrentView() {
  const width = window.innerWidth
  return {
    isSmall: width <= smallScreenMaxWidth,
    isMedium: width > smallScreenMaxWidth && width <= mediumScreenMaxWidth,
    isLarge: width > mediumScreenMaxWidth,
  }
}

function differenceBetweenCurrentAndNewView(currentView, newView) {
  return Object.keys(newView).filter(key => currentView[key] !== newView[key])
}

function ViewProvider({ children }) {
  const [screen, setScreen] = React.useState(getCurrentView)

  React.useEffect(() => {
    // debounce mechanism initialized to null
    let resizeTimeoutId = null
    // Will only call setScreen if there are changes from the current value of screen
    const resizer = () => {
      // prevents return of previous timeout
      clearTimeout(resizeTimeoutId)
      // sets the new timout
      resizeTimeoutId = setTimeout(() => {
        // returns an array of differences between current state and proposed new state
        const numberOfChanges = differenceBetweenCurrentAndNewView(
          screen,
          getCurrentView()
        )
        // update the state only if there are any changes in it.
        if (numberOfChanges.length > 0) {
          return setScreen(getCurrentView())
        }
      }, 150)
    }

    window.addEventListener("resize", resizer)
    return () => window.removeEventListener("resize", resizer)
  }, [screen])
  return <ViewContext.Provider value={screen}>{children}</ViewContext.Provider>
}
```

Notice that now that we're passing the current state value of screen to our comparison function, we need to add it to the dependancy array of the effect.

Bringing it all together this is what my useScreen file looks like now:

```js
// useScreen.js
import React from "react"

const ViewContext = React.createContext({
  small: false,
  medium: false,
  large: false,
})

const smallScreenMaxWidth = 579
const mediumScreenMaxWidth = 768

function getCurrentView() {
  const width = window.innerWidth
  return {
    isSmall: width <= smallScreenMaxWidth,
    isMedium: width > smallScreenMaxWidth && width <= mediumScreenMaxWidth,
    isLarge: width > mediumScreenMaxWidth,
  }
}

function differenceBetweenCurrentAndNewView(currentView, newView) {
  return Object.keys(newView).filter(key => currentView[key] !== newView[key])
}

function ViewProvider({ children }) {
  const [screen, setScreen] = React.useState(getCurrentView)

  React.useEffect(() => {
    // debounce mechanism initialized to null
    let resizeTimeoutId = null
    // Will only call setScreen if there are changes from the current value of screen
    const resizer = () => {
      // prevents return of previous timeout
      clearTimeout(resizeTimeoutId)
      // sets the new timout
      resizeTimeoutId = setTimeout(() => {
        const numberOfChanges = differenceBetweenCurrentAndNewView(
          screen,
          getCurrentView()
        )
        // update the state only if there are any changes in it.
        if (numberOfChanges.length > 0) {
          return setScreen(getCurrentView())
        }
      }, 150)
    }

    window.addEventListener("resize", resizer)
    return () => window.removeEventListener("resize", resizer)
  }, [screen])
  return <ViewContext.Provider value={screen}>{children}</ViewContext.Provider>
}

function useScreen() {
  const context = React.useContext(ViewContext)
  if (context === undefined) {
    throw new Error("useScreen must be used inside of a ViewProvider")
  }
  return context
}

export { ViewProvider, useScreen }
```

You can of course change the values of smallScreenMaxWidth and mediumScreenMaxWidth if you have different values in mind or even add additionally breakpoints if you need to. Just keep in mind that if you add too many breakpoints, it will take longer to run our comparison function.

Feel free to take a look at the [CodeSandbox](https://codesandbox.io/s/reusable-view-hook-yv1d1) and play around with it here.

[React Official Docs for createContext and useContext](https://reactjs.org/docs/context.html)

[React Official Docs for useState](https://reactjs.org/docs/hooks-reference.html#usestate)

[React Official Docs for useEffect](https://reactjs.org/docs/hooks-effect.html)
