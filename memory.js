var images = new Array();
var current_images = new Array();
var selection_one = null;
var selection_two = null;
var total_needed = null;
var previous = false;
var clicks = 0;

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
images[10] = 'images/11.jpg' ;
images[11] = 'images/12.jpg' ;
images[12] = 'images/13.jpg' ;
images[13] = 'images/14.jpg' ;
images[14] = 'images/15.jpg' ;
images[15] = 'images/16.jpg' ;
images[16] = 'images/17.jpg' ;
images[17] = 'images/18.jpg' ;
images[18] = 'images/19.jpg' ;
images[19] = 'images/20.jpg' ;


function validate_table()
{
  var num_rows = document.getElementById('rows').value;
  var num_cols = document.getElementById('cols').value;
  if ((num_cols * num_rows)%2 == 0 && num_cols * num_rows <= images.length && num_cols * num_rows >= 12)
  {
    createTable();
  }
  else
  {
    var error = document.getElementById('error')
    $(error).slideDown().removeClass('hide');
    $('.instruct').hide();
    $('#rows').val('').attr('placeholder', "Rows");
    $('#cols').val('').attr('placeholder', "Columns");
  }
}

function createTable()
{
  clicks = 0
  $('.headspace').slideUp();
  $('#game').slideDown();
  $('#found').removeClass('hide').slideDown();
  $('#found').empty();
  $('#clicks').removeClass('hide').slideDown();
  $('#reset').removeClass('hide');
  $('#hint').removeClass('hide');
  randomize_images();
  get_images();
  var table_space = document.getElementById('show_table');
  table_space.innerHTML = '';
  var num_rows = document.getElementById('rows').value;
  var num_cols = document.getElementById('cols').value;
  var new_table = document.createElement("table");
  var img_index = 0;
  for( var row = 0; row < num_rows; row++ )
  {
    var new_row = document.createElement("tr");
    // new_row.className = "tr"+row;
    new_table.appendChild(new_row);
    for( var col = 0; col < num_cols; col++ )
    {
    var new_col = document.createElement("td");
    var flip_container = $("<div></div>").attr({'class': 'flip-container'}).appendTo($(new_col));
    new_col.setAttribute('id', img_index + col);
    var div_flipper = $("<div></div>").attr({'class': 'flipper'}).appendTo($(flip_container));
    var div_front = $('<div></div>').attr({"class": 'front side'});
    var div_back = $('<div></div>').attr({"class": 'back side'}).append("<img src=" + current_images[img_index + col] + ">");
    $(div_back).appendTo(div_flipper);
    $(div_front).appendTo(div_flipper);
    new_col.setAttribute('onclick', 'select_image(this)');
    new_row.appendChild(new_col);
    }
    img_index = parseInt(img_index) + parseInt(num_cols);
    }
  table_space.appendChild(new_table);
}

function get_images()
{
  var num_rows = document.getElementById('rows').value;
  var num_cols = document.getElementById('cols').value;
  total_needed = ((num_rows * num_cols)/2);
  current_images = images.slice(0, total_needed);
  current_images = current_images.concat(current_images);
  for (var i = current_images.length - 1; i > 0; i--)
    {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = current_images[i];
      current_images[i] = current_images[j];
      current_images[j] = temp;
    }
    return current_images;
}

function randomize_images()
{
    for (var i = images.length - 1; i > 0; i--)
    {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = images[i];
      images[i] = images[j];
      images[j] = temp;
    }
}

function fade_images()
{
  $("img").each(function() {
   $(this).fadeOut(1000).fadeIn().addClass("opaque");
});

}

function select_image(cell)
{
  clicks += 1
  var clicks_text = '<p>CLICKS</p>' + clicks;
  $('#clicks').empty().append(clicks_text);

  if (previous == false)
  {
    flip_all_images();
  }
  var select_id = cell.id;
  var select_img = cell.firstChild;
  var file_name = $(select_img).children().children().html();
  flip_img(cell);

  if (selection_one === null)
  {
    selection_one = file_name;
    selection_one_id = select_id;
    previous = true;
    selection_two = null;
    $(cell).attr('onclick', '');
  }
  else if (selection_two === null)
  {
    selection_two = file_name;
    selection_two_id = select_id;
    previous = false;
    $(cell).attr('onclick', '');

    if (selection_one === selection_two)
    {
      td1 = document.getElementById(selection_one_id);
      td2 = document.getElementById(selection_two_id);
      flash_cells(td1, td2);
      var found_img = file_name;
      $('#found').append(found_img);
      var selected_tds = document.getElementsByClassName('selected');
      if (selected_tds.length === ((total_needed -1) * 2))
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
  var add_onclick = document.getElementsByTagName('td');
    $(add_onclick).each(function() {
      if ($(this).attr('class') !== 'selected')
  {
    this.setAttribute('onclick', 'select_image(this)');
  }
});
}

function get_hint()
{
  var hint = document.getElementsByClassName('flipper');
  $(hint).each(function() {
  var td = $(this).parent().parent();
  if ($(td).attr('class') === undefined )
    {
    $(this).addClass('flipped');
    $(this).delay(1000).queue(function(next){
      $(this).removeClass("flipped");
        next();
      });
      }
    });
}

function show_all()
{
  var hint = document.getElementsByClassName('flipper');
  $(hint).each(function() {
  $(this).delay(1000).addClass('flipped');
  });
}

function flash_cells(td1, td2)
{
  $(td1).delay(100).queue(function(next){
    $(this).addClass("hit1");
    $(td2).addClass("hit1");
    next();
    });
  $(td1).delay(200).queue(function(next){
    $(this).removeClass("hit1");
    $(td2).removeClass("hit1");
    $(this).addClass("hit2");
    $(td2).addClass("hit2");
    next();
    });
  $(td1).delay(200).queue(function(next){
    $(this).removeClass("hit2");
    $(td2).removeClass("hit2");
    $(this).addClass("hit1");
    $(td2).addClass("hit1");
    next();
    });
  $(td1).delay(200).queue(function(next){
    $(this).removeClass("hit1");
    $(td2).removeClass("hit1");
    next();
    });
  $(td1).delay(200).queue(function(next){
    $(this).addClass("selected");
    $(td2).addClass("selected");
    next();
    });
}

function end_game()
{
  show_all();
  $('.headspace').delay(4000).slideDown();
  $('#game').delay(4000).slideUp();
  $('#rows').val('').attr('placeholder', "Rows");
  $('#cols').val('').attr('placeholder', "Columns");
  end_message();
}

function end_message()
{
  $('#congrats').removeClass('hide');
  $('#congrats').text('Nice work...That only took you ' + clicks + ' clicks');
  $('#congrats').delay(3000).queue(function(next){
    $('#congrats').fadeOut(3000).addClass('hide');
    next();
    });
}