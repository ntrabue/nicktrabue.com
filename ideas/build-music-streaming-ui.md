---
title: Let's Build A Music Streaming UI
date: "2020-01-25"
description: "null"
---

We're going to flex our UI design skills by building a user interface for a music streaming app with React and Typescript. Let's get started:

```bash
npx create-react-app playlist --template typescript && cd playist
```

When create react app finishes it's job, go ahead and open the project in your favorite editor and we'll start cleaning house by delete the following files in the src directory:

- App.css
- App.test.tsx
- index.css
- logo.svg

Once that's done, we need to fix our App.tsx and index.tsx files.

App.tsx:

```tsx
import React from "react"

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
```

index.tsx:

```tsx
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"

ReactDOM.render(<App />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
```

Finally, Before we fire it up, let's go ahead and install some dependancies. From your terminal:

```bash
npm install @emotion/core @emotion/styled @material-ui/core
```

What did we just install?

- [Emotion](https://emotion.sh/docs/install) is a css-in-js library
- [Material UI](https://material-ui.com/) is a very popular UI Framework for React

At this point, your project should look like this:

```
| node_modules
| public
| src
    | App.tsx
    | index.tsx
    | react-app-env.d.ts
    | serviceWorker.ts
    | setupTests.ts
| .gitignore
| package-lock.json
| package.json
| README.md
| tsconfig.json
```

Finally, we can run our app. From your termainl

```bash
npm start
```

## Creating some fake data

If we were truly building a music streaming app, we would likely need a fancy api and well... some music. Fortunately for us, we're not. That being said, we will need to simulate some data. Create a new file in your src directory called data.json and paste in the following

```json
[
  {
    "id": 1,
    "name": "The Best Song Ever",
    "artist": "Mr. Pop",
    "duration": 65
  },
  {
    "id": 2,
    "name": "The Second Best Song Ever",
    "artist": "Dr. J",
    "duration": 80
  },
  {
    "id": 3,
    "name": "Something More Original",
    "artist": "Shawn Johnson",
    "duration": 45
  }
]
```

Now that we have some data in place, let's create a file called `Playlist.tsx`
