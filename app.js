$('document').ready(function() {
  console.log("working");
  $("button").click(function() {
    console.log("yo!");
    // grab the user input
    var userInput = $('#userInput').val()
    console.log(userInput);
    // make the get request
    $.getJSON("https://www.googleapis.com/books/v1/volumes?q=" + userInput)
      .done(function(data){
        var output = "";
        console.log("array: ", data.items);
        for (var i = 0; i < data.items.length; i++) {
          var outputElement = "<div>";
          var title = data.items[i].volumeInfo.title;
          var authors = "";
          var description = data.items[i].volumeInfo.description;
          var image = "";
          if(data.items[i].volumeInfo.imageLinks){
            image = data.items[i].volumeInfo.imageLinks.thumbnail;
          }
          // console.log("Recipe for getting title: ", data.items[i].volumeInfo.title);

          for (var j = 0; j < data.items[i].volumeInfo.authors.length; j++) {
            if(authors){
              authors += (", " + data.items[i].volumeInfo.authors[j]);
            } else {
              authors += data.items[i].volumeInfo.authors[j];
            }
            // console.log("Recipe for getting author: ", data.items[i].volumeInfo.authors[j]);
          }

          if(image){
            outputElement += "<img src='" + image + "'>"
          }
          outputElement += "<h3>" + title + "</h3><h4>" + authors + "</h4>";
          if(description){
            outputElement += "<p>" + description + "</p>";
          }
          outputElement += "</div><hr>"
          output += outputElement

          // console.log(title);
          // console.log(authors);
          // console.log(description);
          // console.log("Recipe for getting description: ", data.items[i].volumeInfo.title);

        }
        $("#results").append(output);
      })
  })
});
