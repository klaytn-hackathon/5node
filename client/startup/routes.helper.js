
// Helpers to simplify template render for each layout
//  layout: name of the layout to render
//  view: name of the template view to render
//  body: name of the template to render in the 'bodyContent' region
const renderTemplate = (layout, view, body) => () => BlazeLayout.render(layout, { content: view, bodyContent: body });
const renderLayout  = (view, body) => renderTemplate('layout', view, body);


export {
    renderTemplate,
    renderLayout,
}