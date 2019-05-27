// Global template helper replacing "zimme:active-route"
// only used to check actives routes using FlowRouter
import {Template} from "meteor/templating";

import Caver from 'caver-js';
import "./KlaytnLoginButton.html";

/**
 * isActiveRoute: check if the route name in params options is the current route
 * @param: options
 *     name: route name, has priority to check over regex. Used for exact match.
 *     regex: a regular expression to check against route name
 * @return boolean
 */
const isActiveRoute = function(options) {
    let currentRoute = FlowRouter.getRouteName();
    if (options.name) {
        return currentRoute === options.name;
    } else {
        let reg = new RegExp(options.regex);
        return reg.test(currentRoute);
    }
}

// Examples:
// <li class="{{isActiveRoute name='grid'}}">...
// <li class="{{isActiveRoute regex='grid'}}">...
// <li class="{{isActiveRoute regex='grid' className="something"}}">...
Template.registerHelper('isActiveRoute', function(params) {
    console.log("check : " ,params);
    let className = params.hash.className || 'active';
    let options = {
        name: params.hash.name,
        regex: params.hash.regex
    };
    return isActiveRoute(options) ? className : '';
});

// Template helper to read the path for a route name
Template.registerHelper('pathFor', function(routeName) {
    return FlowRouter.path(routeName)
});


Template.registerHelper('caver', function() {
    return new Caver({rpcURL : Constant.KLAYTN_BAOBAB_URL});
})