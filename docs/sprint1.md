# Tune.ly Sprint 1

## Overview

This sprint we will:
* focus on **Read**
* connect our _partially_ pre-built front-end to a back-end with hard-coded data.
* replace the hard-coded data with data stored in a MongoDB database


## Step 0:

Check your work from sprint 0 by referencing the solutions on GitHub. In particular, pay attention to:

* the updated links to JavaScript, CSS, and image files in `views/index.html` and `public/styles/styles.css`
* `package.json`
* `server.js`
* `models/`
* `controllers/`

## Step 1: Display hard-coded data.

Let's start on the outside and work our way in.  

1. Open `index.html` in your text editor and find the HTML for a single **album**.  This is a hard-coded sample set up for you to show the desired HTML structure.  Convert this into an html template named `albumHtml` inside the `renderAlbum` function in `app.js`. Replace the hardcoded album information with the album object's attributes.  Here's an example:

```js
    <li class='list-group-item'>
      <h4 class='inline-header'>Album Name:</h4>
      <span class='album-name'>${album.name}</span>
    </li>
```

Notice the object attribute is surrounded by curly braces and starts with a peso. This is a string literal.  When we wrap this entire string template in ticks.  Javascript automagically knows to populate these object 'placeholders' with your object attributes. Neato!


Leave the`div` with class `albums` in place.

Your element with template strings should look like this:


```javascript  
var albumHtml = (`
            <!-- one album -->
            <div class='row album' data-album-id='${album.id}'>
              <div class='col-md-10 col-md-offset-1'>
                <div class='panel panel-default'>
                  <div class='panel-body'>
                  <!-- begin album internal row -->
                    <div class='row'>
                      <div class='col-md-3 col-xs-12 thumbnail album-art'>
                         <img src='${album.image}' alt='album image'>
                      </div>
                      <div class='col-md-9 col-xs-12'>
                        <ul class='list-group'>
                          <li class='list-group-item'>
                            <h4 class='inline-header'>Album Name:</h4>
                            <span class='album-name'>${album.name}</span>
                        </li>
                          <li class='list-group-item'>
                            <h4 class='inline-header'>Artist Name:</h4>
                            <span class='artist-name'>${album.artistName}</span>
                          </li>
                       <li class='list-group-item'>
                            <h4 class='inline-header'>Released date:</h4>
                            <span class='album-name'>${album.releaseDate}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <!-- end of album internal row -->
                  </div>
                  <div class='panel-footer'>
                  </div>
                </div>
              </div>
              <!-- end one album -->
    `)

```
Inside the `renderAlbum` function, append this `albumHtml` string with the template strings populated  into your `#album` div tag with jQuery.


To render the **first** element of the array, try this out:


  ```js
  $(document).ready(function() {
    console.log('app.js loaded!');
    renderAlbum(sampleAlbums[0]);
  });
  ```

  </details>




  At this point you should see all the hard-coded albums from `app.js`'s `sampleAlbums` rendered on page.

2. Now, we're going to break this piece of code again, with the intention of fixing it by improving our server side routes. **Add an AJAX call** that will GET all of the albums from the path `/api/albums`. Upon a successful response from the server, this AJAX call should render the data to the page.

<details><summary>Click to see how to request and render all of the albums with a template string</summary>

```js
$(document).ready(function() {
  console.log('app.js loaded!');

  // make a get request for all albums
  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: handleSuccess,
    error: handleError
  });
});

function handleSuccess (albums) {
    albums.forEach(function(album) {
      renderAlbum(album);
    });
};

function handleError(err){
  console.log('There has been an error: ', err);
}

// this function takes in a single album and renders it to the page
function renderAlbum(album) {
  console.log('rendering album', album);
  var htmlToAppend = (`
    <div class='row'>
      <div class="col-md-3 col-xs-12 thumbnail album-art">
        <img src="images/800x800.png" alt="album image">
      </div>

      <div class="col-md-9 col-xs-12">
        <ul class="list-group">
          <li class="list-group-item">
            <h4 class='inline-header'>Album Name:</h4>
            <span class='album-name'>${album.name}</span>
          </li>

          <li class="list-group-item">
            <h4 class='inline-header'>Artist Name:</h4>
            <span class='artist-name'>${album.artistName}</span>
          </li>

          <li class="list-group-item">
            <h4 class='inline-header'>Released date:</h4>
            <span class='album-releaseDate'>${album.releaseDate}</span>
          </li>
        </ul>
      </div>

    </div>
  `);

  $('#albums').prepend(htmlToAppend);
};

```

</details>

Because the GET `/api/albums` route isn't configured yet, our site won't display data anymore. You should now see an error in your console:

![image](https://cloud.githubusercontent.com/assets/6520345/21326987/da46d312-c5e1-11e6-90ee-d352bdd65a4e.png)

Let's fix it by working on the server side to get that route working!


## Step 2: Albums Index

We're going to add the following _index_ api route on our server:

```
GET /api/albums
```

To better organize this app, we're going to be using "controllers" to separate out logic for different _resources_ (different kinds of data we store).  That means that when you create a route like `/api/albums/:id`, you'll put the server code to handle that in a separate file, grouped with all the other handlers for routes dealing with the albums resource.  

We'll use the module pattern to make these "controller" functions available in the server.  See also: [big explanation about controllers and the module pattern!](controllers_example.md).  

1. In `server.js`, you'll see a line that `require`s the controllers directory. Take a look at  `controllers/index.js` and `controllers/albumsController.js`.

1. Back in `server.js`, create a new route for `GET`  `/api/albums`.  Based on the controller pattern we'll use, this route's callback should be `controllers.albums.index`.

1. In `controllers/albumsController.js`, fill in the `index` function so that it returns all albums from the hard-coded data in this file.

1. Update the `index` function to respond with JSON for all the albums.

1. The `$.ajax` call in `app.js` should be functional now! Check in the browser to see that your server-side data is rendering and that the error messages aren't showing up anymore.

## Step 3: Database Setup


1. If you haven't yet, use `npm` to install `mongoose`.  Save it as a dependency of your project with `--save`.

1. In `models/album.js`, add a schema and a model for our albums.  Determine the attributes and data types for the schema based on the sample data we've been using.

1. Export the `Album` model in `models/album.js`.

1. Require the `Album` model in `models/index.js`.  Then add it into the `exports` object for `models/index.js`. Inside the `exports` object, the key should be "Album" and the value should be the `Album` model.


  <details><summary>click to see a completed models/albums.js</summary>

  ```js
  //models/album.js
  var AlbumSchema = new Schema({
    artistName: String,
    name: String,
    releaseDate: String,
    genres: [ String ]
  });

  var Album = mongoose.model('Album', AlbumSchema);

  module.exports = Album;
  ```

  </details>

  <details><summary>click to see a completed models/index.js</summary>

  ```js
  module.exports.Album = require("./album.js");
  ```

  </details>


## Step 4: Seeding the database.

1. Move the hard-coded album data from `controllers/albumControllers.js` into `seed.js`.  You'll note there's already an empty variable there for you to use.  

1. Strip out the pre-coded `_id` properties, as MongoDB will take care of creating these for us.

1. Make sure `mongod` is running in a tab of your terminal.

1. Run `node seed.js`.

1. Resolve any errors you encounter.

<details><summary>hint: <code>error connect ECONNREFUSED</code></summary>
If you see an error like:

```
process.nextTick(function() { throw err; })
                              ^
Error: connect ECONNREFUSED 127.0.0.1:27017
```

This error usually means that `mongod` is not running.
</details>


## Step 5: Working with database data.

Now that the database is seeded, let's transition to using the database in our `/api/albums` route.

1. Delete the hard-coded server data in `controllers/albumsController.js`.

1. Require `./models` in `controllers/albumsController.js`.

1. Edit the current function `index` so that it accesses the database and pulls out all albums.

1. Verify that you're getting the right data on your home page now.  Your AJAX should still work. If the attribute names in the data have changed at all, you'll have to resolve that.

<details><summary>hint: requiring ./models</summary>

```js
var db = require('./models');
```
</details>

## Sprint 1 Conclusion

**If you're stuck, take a look at the solutions branch for sprint 1**

If you've made it this far, then you've created an API that has an index route at `GET` `/api/albums`.

The app has a single-page view that makes a GET request to the API with AJAX and renders the information.  Our data is being **R**ead from the database by the server.

This completes the **Read** component of our **CRUD** app, for the moment.

**Good job!**
