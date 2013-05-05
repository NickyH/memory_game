var images = new Array();
var current_images = new Array();
var selection_one = null;
var selection_two = null;
var total_needed = null;
var previous = false;

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
    var flip_container = $("<div></div>").attr({'class': 'flip-container'}).appendTo($(new_col));
    new_col.setAttribute('id', img_index + col);
    var div_flipper = $("<div></div>").attr({'class': 'flipper'}).appendTo($(flip_container));
    var div_front = $('<div></div>').attr({"class": 'front side'});
    var div_back = $('<div></div>').attr({"class": 'back side'}).append("<img src=" + current_images[img_index + col] + ">");
    $(div_back).appendTo(div_flipper);
    $(div_front).appendTo(div_flipper);
    new_col.setAttribute('onclick', 'select_image(this)');
    console.log(img_index + col);
    new_row.appendChild(new_col);
    }
    img_index = parseInt(img_index) + parseInt(num_rows);

  }

  table_space.appendChild(new_table);
  // fade_images();
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

// function hide_images()
// {
//   $("img").each(function() {
//    $(this).addClass('opaque');
// });

// }

function select_image(cell)
{
  console.log(previous);

  if (previous == false)
  {
    flip_all_images();
  }
  var select_id = cell.id;
  var select_img = cell.firstChild;
  var filename = $(select_img).children().children().html();
  flip_img(cell);
  console.log(filename);
  console.log(select_img);

  if (selection_one === null)
  {
    selection_one = filename;
    selection_one_id = select_id;
    previous = true;
    selection_two = null;
  }
  else if (selection_two === null)
  {
    selection_two = filename;
    selection_two_id = select_id;
    previous = false;

    if (selection_one === selection_two)
    {
      console.log('match');
      td1 = document.getElementById(selection_one_id);
      td2 = document.getElementById(selection_two_id);
      $(td1).addClass('selected');
      $(td2).addClass('selected');
      var selected_tds = document.getElementsByClassName('selected');
      console.log(selected_tds);
      if (selected_tds.length == (total_needed * 2))
      {
        end_game();
      }

    }
    selection_one = null;

  }
}

function flip_img(cell)
{
  cell.firstChild.firstChild.className += ' flipped';
}

function flip_all_images()
{
  var all_flipped = document.getElementsByClassName('flipper');
  $(all_flipped).each(function() {
   $(this).removeClass('flipped');
});
}

function end_game()
{
  console.log('end');
}