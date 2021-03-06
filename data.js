var templates = {}

// template.list = [
// "<section class='list-wrapper'>"
//   "<h1 class='title'>todos</h1>"
//   "<div class='list-wrapper'>"
//     "<div class='list'>"
//       "<div class='input-wrapper'>"
//         "<div class='type-list'>"
//           "<div class='down-button'><span class='mega-octicon octicon-chevron-down'></span></div>"
//           "<input type='text' placeholder='What needs to be done?'>"
//         "</div>"
//       "</div>"
//       "<div class='item-wrapper'>"
//         "<ul class='insert-item'>"
// ///////////////////////// insert item here
//         "</ul>"
//       "</div>"
//     ].join("")

templates.item = [
  "<li class='line-item' data-id= '<%= _id%>'>",
    "<div class='check'><span class='octicon octicon-check'></span> </div>",
    "<p><%=item%></p>",
    "<div class='delete-wrapper'>",
      "<button type='button' name='delete'>Delete</button>",
    "</div>",
  "</li>"
].join("");
