// index in each folder will match all route with that folder
// next.js use _app.js to initialize pages and taking routes
// _document.js run at the time server build the object
//Any <head> code, render logic, load fonts and style sheets should be moved to a custom _document.js
// Any shared layout between all pages should be moved to a custom _app.js.
// tailwind css start from small size screen, only need to set exception break point for large screen
const Home = () => (
  <div>
    <h1 className='text-3xl font-bold underline '>
        Hello World
    </h1>
  </div>
)

export default Home;