# **Part 7**

# Solutions

- [bloglist (backend and frontend)](./blogslist/)

- [country-hook](./country-hook/)

- [routed-anecdotes](./routed-anecdotes/)

- [ultimate-hooks](./ultimate-hooks/)

# Exercises

## 7.1: routed anecdotes, step1

Add React Router to the application so that by clicking links in the Menu component the view can be changed.

At the root of the application, meaning the path /, show the list of anecdotes:

![fullstack content](https://fullstackopen.com/static/57c61f000e5eddce42c3a345c2819b77/5a190/40.png)

The Footer component should always be visible at the bottom.

The creation of a new anecdote should happen e.g. in the path create:

![fullstack content](https://fullstackopen.com/static/c393db40b64e8eadd1220bdfccc8eede/5a190/41.png)

## 7.2: routed anecdotes, step2

Implement a view for showing a single anecdote:

![fullstack content](https://fullstackopen.com/static/3287ad77ebb90dfac2d734d9801b20b0/5a190/42.png)

Navigating to the page showing the single anecdote is done by clicking the name of that anecdote:

![fullstack content](https://fullstackopen.com/static/116f966d64a03287b86a6e6a03f6ba81/5a190/43.png)

## 7.3: routed anecdotes, step3

The default functionality of the creation form is quite confusing, because nothing seems to be happening after creating a new anecdote using the form.

Improve the functionality such that after creating a new anecdote the application transitions automatically to showing the view for all anecdotes and the user is shown a notification informing them of this successful creation for the next five seconds:

![fullstack content](https://fullstackopen.com/static/7640caca8b2a611c4f6203f343b996f9/5a190/44.png)

## 7.4: anecdotes and hooks step1

Simplify the anecdote creation form of your application with the useField custom hook we defined earlier.

One natural place to save the custom hooks of your application is in the /src/hooks/index.js file.

If you use the named export instead of the default export:

``` javascript
import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// modules can have several named exports
export const useAnotherHook = () => {
  // ...
}
Then importing happens in the following way:

import  { useField } from './hooks'

const App = () => {
  // ...
  const username = useField('text')
  // ...
}
```

## 7.5: anecdotes and hooks step2

Add a button to the form that you can use to clear all the input fields:

![fullstack content](https://fullstackopen.com/static/1bce1cdac08279ba132f61a614900b94/5a190/61ea.png)

Expand the functionality of the useField hook so that it offers a new reset operation for clearing the field.

Depending on your solution, you may see the following warning in your console:

![fullstack content](https://fullstackopen.com/static/c4f6d266117f4d881d1df60a4ca3b9f5/5a190/62ea.png)

We will return to this warning in the next exercise.

## 7.6: anecdotes and hooks step3

If your solution did not cause a warning to appear in the console, you have already finished this exercise.

If you see the warning in the console, make the necessary changes to get rid of the Invalid value for prop `reset` on <input> tag console warning.

The reason for this warning is that after making the changes to your application, the following expression:

``` javascript
<input {...content}/>
Essentially, is the same as this:

<input
  value={content.value}
  type={content.type}
  onChange={content.onChange}
  reset={content.reset}
/>
The input element should not be given a reset attribute.

One simple fix would be to not use the spread syntax and write all of the forms like this:

<input
  value={username.value}
  type={username.type}
  onChange={username.onChange}
/>
```

If we were to do this, we would lose much of the benefit provided by the useField hook. Instead, come up with a solution that fixes the issue, but is still easy to use with spread syntax.

## 7.7: country hook

Let's return to the exercises 2.12-14.

Use the code from <https://github.com/fullstack-hy2020/country-hook> as your starting point.

The application can be used to search for a country's details from the <https://restcountries.com/> interface. If a country is found, the details of the country are displayed:

![fullstack content](https://fullstackopen.com/static/b705259ca07b94ce736ac882dbbce776/5a190/69ea.png)

If no country is found, a message is displayed to the user:

![fullstack content](https://fullstackopen.com/static/b8f3f1b250a195526cc2816eb8f69c41/5a190/70ea.png)

The application is otherwise complete, but in this exercise you have to implement a custom hook useCountry, which can be used to search for the details of the country given to the hook as a parameter.

Use the api endpoint full name to fetch a country's details in a useEffect hook within your custom hook.

Note that in this exercise it is essential to use useEffect's second parameter array to control when the effect function is executed.

## 7.8: ultimate hooks

The code of the application responsible for communicating with the backend of the note application of the previous parts looks like this:

``` javascript
import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${ baseUrl } /${id}`, newObject)
  return response.data
}

export default { getAll, create, update, setToken }
```

We notice that the code is in no way specific to the fact that our application deals with notes. Excluding the value of the baseUrl variable, the same code could be reused in the blog post application for dealing with the communication with the backend.

Extract the code for communicating with the backend into its own useResource hook. It is sufficient to implement fetching all resources and creating a new resource.

You can do the exercise for the project found in the <https://github.com/fullstack-hy2020/ultimate-hooks> repository. The App component for the project is the following:

``` javascript
const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}
```

The useResource custom hook returns an array of two items just like the state hooks. The first item of the array contains all of the individual resources and the second item of the array is an object that can be used for manipulating the resource collection, like creating new ones.

If you implement the hook correctly, it can be used for both notes and phone numbers (start the server with the npm run server command at the port 3005).

![fullstack content](https://fullstackopen.com/static/101f0d62e315b6b8a02a14365cd3652d/5a190/21e.png)

## 7.9: automatic code formatting

In the previous parts we used ESLint to ensure that code to follows the defined conventions. Prettier is yet another approach for the same. According to the documentation Prettier is an opinionated code formatter, that is, Prettier does not only control the code style but it also formats the code according to the definition.

Prettier is easy to integrate to the code editor, so that when the code is saved, it is automatically formatted correctly.

Take Prettier to use in your app and configure it to work with your editor.

## 7.10: redux, step1

Refactor the application from using internal React component state to using Redux for the application's state management.

Change the application's notifications to use Redux at this point of the exercise set.

## 7.11: redux, step2

Note that this and the next two exercises are quite laborious but incredibly educational.

Store the information about blog posts in the Redux store. In this exercise, it is enough that you can see the blogs in the backend and create a new blog.

You are free to manage the state for logging in and creating new blog posts by using the internal state of React components.

## 7.12: redux, step3

Expand your solution so that it is again possible to like and delete a blog.

## 7.13: redux, step4

Store the information about the signed-in user in the Redux store.

## 7.14: Users view

Implement a view to the application that displays all of the basic information related to users:

![fullstack content](https://fullstackopen.com/static/84f414833029834ab295d900b4506288/5a190/41.png)

## 7.15: Individual user view

Implement a view for individual users that displays all of the blog posts added by that user:

![fullstack content](https://fullstackopen.com/static/734b72fb3dbef4f7aea9d59792deefbb/5a190/44.png)

You can access the view by clicking the name of the user in the view that lists all users:

![fullstack content](https://fullstackopen.com/static/5b65931c400b7b6ffb12f98292443ca7/5a190/43.png)

NB: you will almost certainly stumble across the following error message during this exercise:

![fullstack content](https://fullstackopen.com/static/234cc8fff2ab768e6be37dce49577ce8/5a190/42ea.png)

The error message will occur if you refresh the page for an individual user.

The cause of the issue is that, when we navigate directly to the page of an individual user, the React application has not yet received the data from the backend. One solution for fixing the problem is to use conditional rendering:

```javascript
const User = () => {
  const user = ...
  if (!user) {
    return null
  }

  return (
    <div>
      // ...
    </div>
  )
}
```

## 7.16: Blog view

Implement a separate view for blog posts. You can model the layout of your view after the following example:

![fullstack content](https://fullstackopen.com/static/905fa91b8e113f0ad6d27208ee323b48/5a190/45.png)

Users should be able to access the view by clicking the name of the blog post in the view that lists all of the blog posts.

![fullstack content](https://fullstackopen.com/static/c09f5edd6f34e77cd390864bd7156790/5a190/46.png)

After you're done with this exercise, the functionality that was implemented in exercise 5.7 is no longer necessary. Clicking a blog post no longer needs to expand the item in the list and display the details of the blog post.

## 7.17: Navigation

Implement a navigation menu for the application:

![fullstack content](https://fullstackopen.com/static/2d374d8414645cb6f50293298e00d189/5a190/47.png)

## 7.18: comments, step1

Implement the functionality for commenting on blog posts:

![fullstack content](https://fullstackopen.com/static/8021a34f357d8764c0b01c8549b43d40/5a190/48.png)

Comments should be anonymous, meaning that they are not associated to the user who left the comment.

In this exercise, it is enough for the frontend to only display the comments that the application receives from the backend.

An appropriate mechanism for adding comments to a blog post would be an HTTP POST request to the api/blogs/:id/comments endpoint.

## 7.19: comments, step2

Extend your application so that users can add comments to blog posts from the frontend:

![fullstack content](https://fullstackopen.com/static/caed74a4c6e3833de7cd7bb6b224c67c/5a190/49.png)

## 7.20: Styles, step1

Improve the appearance of your application by applying one of the methods shown in the course material.

## 7.21: Styles, step2

You can mark this exercise as finished if you use an hour or more for styling your application.

This was the last exercise for this part of the course and it's time to push your code to GitHub and mark all of your finished exercises to the exercise submission system.
