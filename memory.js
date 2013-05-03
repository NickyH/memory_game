var images = new Array();
var current_images = new Array();

images[0] = 'images/1.jpg' ;
images[1] = 'images/2.jpg' ;
images[2] = 'images/3.jpg' ;
images[3] = 'images/4.jpg' ;
images[4] = 'images/5.jpg' ;
images[5] = 'images/6.jpg' ;
images[6] = 'images/7.jpg' ;
images[7] = 'images/8.jpg' ;
images[8] = 'images/9.jpg' ;
images[9] = 'images/10.jpg' ;

function createTable()
{
  get_images();
  randomize_images();
  var table_space = document.getElementById('show_table');
  table_space.innerHTML = '';
  var num_rows = document.getElementById('rows').value;
  var num_cols = document.getElementById('cols').value;
  var new_table = document.createElement("table");
  var new_row, new_col;
  var img_index = 0
  for( var row = 0; row < num_rows; row++ )
  {
    new_row = document.createElement("tr");
    new_row.className = "tr"+row;
    new_table.appendChild(new_row);
    for( var col = 0; col < num_cols; col++ )
    {
    new_col = document.createElement("td");
    new_col.className = "td"+col;
    new_col.innerHTML = "<img src=" + current_images[img_index + col] + ">";
    console.log(img_index + col);
    new_row.appendChild(new_col);
    }
    img_index = parseInt(img_index) + parseInt(num_rows);

  }

  table_space.appendChild(new_table);
  fade_images();

}

function get_images()
{
  var num_rows = document.getElementById('rows').value;
  total_needed = ((num_rows * num_rows)/2);
  current_images = images.slice(0,total_needed);
  current_images = current_images.concat(current_images);
}

function randomize_images()
{
    for (var i = current_images.length - 1; i > 0; i--)
    {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = current_images[i];
      current_images[i] = current_images[j];
      current_images[j] = temp;
    }
    return current_images;
}

function fade_images()
{

  $("img").each(function() {
   $(this).fadeOut(1000).fadeIn().addClass("opaque");
});

}

