$(document).ready(function(){
  page.init();
});


var page = {

  url: "http://tiy-fee-rest.herokuapp.com/collections/Davidtodo",

  init: function() {

    page.initEvents();
    page.initStyling();

  },

  initStyling: function() {

    page.loadItems();
    page.allItems();
    page.itemsLeft();

  },

  initEvents: function() {

    $('form').on('submit',  page.addItem);
    $('.footer a').on('click' ,page.navPages);
    $('input[type=checkbox]').on('click', page.checked);
  },


  addOneItemToDOM: function (item) {
    page.loadTemplate("item", item, $('.not-done'));
  },

  addAllItemsToDOM: function (itemCollection) {
  _.each(itemCollection, page.addOneItemToDOM);
  },

  loadItems: function () {

    $.ajax({
      url: page.url,
      method: 'GET',
      success: function (data) {
        ///need to add here
        console.log("success");
        console.log(data);
        page.addAllItemsToDOM(data);

      },
      error: function (err) {

      }
    });
  },

  createItem: function (newItem) {

    $.ajax({
      url: page.url,
      method: 'POST',
      data: newItem,
      success: function (data) {

        page.addOneItemToDOM(data);
        console.log("success!!: ", data);
      },
      error: function (err) {
        console.log("error ", err);
      }

    })
  },

  addItem: function(event) {
    event.preventDefault

    var newItem = {item: $('input[class="window"]').val()
  }

    // $('.notDone').append(newItem);

    page.createItem(newItem);

    $('input[class="window"]').val("")

  },

  navPages: function (event) {
      event.preventDefault();

      var clickedPage = $(this).attr('rel')
      $(clickedPage).siblings().hide();
      $(clickedPage).show();

      console.log($(clickedPage));
  },

  allItems: function(event) {
    // event.preventDefault();
  var ndAll = $('.not-done').children().clone();
  var cpltdAll = $('.completed').children().clone();



  $('.all').append(ndAll);
  $('.all').append(cpltdAll);

  console.log(ndAll);
  console.log(cpltdAll);


},

itemsLeft: function() {
  var leftArr = $('.not-done').find('li');
  var num = leftArr.length;
  var leftNum = $('#left-link').prepend(num + " ");
},

/////setTimeout on this?//////////
  checked: function(event) {
    event.preventDefault();
    var done = $(this).closest('li').html();
//////how would you get this back with the <li>
    var doner =  "<li>" + done + "</li>";
    var noInput = $(doner).remove('input[type="checkbox"]');
    $(doner).append('.completed')
    $('line-item').addClass('completedFont')


    page.loadItems();

    console.log(done);
    console.log(doner);
    console.log(noInput);

  },

  loadTemplate: function (tmplName, data, $target){
    var compiledTmpl = _.template(page.getTemplate(tmplName));

    $target.append(compiledTmpl(data));
  },

  getTemplate: function(name) {
    return templates[name];
  },

};//don't delete this it is for the Page
