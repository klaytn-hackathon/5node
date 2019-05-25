import { renderLayout } from './routes.helper';

// Default route
FlowRouter.route('/', {
    name: '/',
    action: () => FlowRouter.go('/asset')
});

FlowRouter.route('/asset', {
    name: 'asset',
    action: renderLayout('asset')
});


FlowRouter.route('/funding', {
    name: 'funding',
    action: renderLayout('funding')
});


FlowRouter.route('/mypage', {
    name: 'mypage',
    action: renderLayout('mypage')
});


FlowRouter.route('/assetDetail', {
    name: 'assetDetail',
    action: renderLayout('assetDetail')
});


FlowRouter.route('/fundDetailPage', {
    name: 'fundDetailPage',
    action: renderLayout('fundDetailPage')
});



// Router transitions

Tracker.autorun(function() {
    FlowRouter.watchPathChange();
    // Hide sidebar
    $('body').removeClass('aside-toggled')

    // Animate page transitions
    var ANIMATION_CLASS = 'fadeIn'; // see animate.css
    var ANIMATION_EVENTS = 'animationend webkitAnimationEnd oanimationend MSAnimationEnd';
    var wrapper = $('.content-wrapper').addClass('animated')

    wrapper
    // detach previous events
        .off(ANIMATION_EVENTS)
        // attach new event
        .on(ANIMATION_EVENTS, function() {
            // remove animation and prepare for next transition
            wrapper.removeClass(ANIMATION_CLASS)
        })
        // start animation
        .addClass(ANIMATION_CLASS);

});