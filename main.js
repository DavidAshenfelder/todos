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



  },

  initEvents: function() {

    $('body').on('click', '#all', function(event){
      event.preventDefault();
    page.allItems()
    });


    $('form').on('submit',  page.addItem);
    $('.footer a').on('click' ,page.navPages);
    $('body').on('click', '.check', function(event) {
      event.preventDefault();
      var done = $(this).closest('li');
      var doner = $(done).find('.octicon').remove();
      var donerest = $(done).find('button').remove();
      $(done).appendTo('#completedList');
      console.log(done);
      page.itemsLeft();
    });

    $('.not-done').on('click', 'button[name="delete"]', function(event) {
      event.preventDefault();
      var deleteId = $(this).closest('.line-item').data('id');
      console.log(deleteId);
      page.deleteOneToDo(deleteId);

    })

  },

  addOneItemToDOM: function (item) {
    page.loadTemplate("item", item, $('#notDoneList'));
  },

  addAllItemsToDOM: function (itemCollection) {
  _.each(itemCollection, page.addOneItemToDOM);
  },

  loadItems: function () {

    $.ajax({
      url: page.url,
      method: 'GET',
      success: function (data) {
        console.log("success");
        $('#notDoneList').html('');
        page.addAllItemsToDOM(data);
        page.itemsLeft();
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

  deleteOneToDo: function (deleteId) {

    console.log(deleteId);
    $.ajax({
      url: page.url + "/" + deleteId ,
      method: 'DELETE',
      success: function (data) {
        $('#notDoneList').html("");
        page.loadItems();
      }
    });
  },

  addItem: function (event) {
    event.preventDefault();

    var newItem = {
      item: $('input[class="window"]').val(),
      // type: $('input[class="window"]').('').attr(''),
      list: $('.list-wrapper h1').text()
  }

    page.createItem(newItem);
    $('input[class="window"]').val("")
    page.loadItems();

  },

  navPages: function (event) {
      event.preventDefault();

      var clickedPage = $(this).attr('rel')
      $(clickedPage).siblings().hide();
      $(clickedPage).show();

      console.log($(clickedPage));
  },


  allItems: function () {
    $('.completed').show()
    $('.not-done').show()
},

itemsLeft: function() {
  var leftArr = $('.not-done').find('li');
  var num = leftArr.length;

  var leftNum = $('#left-link').html( num + " items left");
  return leftNum
},

loadTemplate: function(tmplName, data, $target) {
    var compiledTmpl = _.template(page.getTemplate(tmplName));

    $target.append(compiledTmpl(data));
  },

  getTemplate: function(name) {
    return templates[name];
  },

};
