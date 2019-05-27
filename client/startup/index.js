// Templates
import '/client/templates';
// Styles

// Routes
import './routes.js';


Meteor.startup(function(){
    const walletFromSession = sessionStorage.getItem("walletInstance");
    if(walletFromSession){
        try{
            caver.klay.accounts.wallet.add(JSON.parse(walletFromSession));
        }catch(e){
            sessionStorage.removeItem("walletInstance");
        }
    }
});