import { Meteor } from 'meteor/meteor';
import "/imports/collections";//추가


Meteor.startup(() => {
  // code to run on server at startup

    if(Content.find().count()==0) {
        Content.insert({
            title : "스위스의 아름다운 풍경담기" ,
            url : "https://summer.pes.edu/wp-content/uploads/2019/02/default-2.jpg" ,
            context : "",
            atDate : new Date()
        });
        Content.insert({
                title : "필리핀 세부의 바닷속" ,
                url : "https://summer.pes.edu/wp-content/uploads/2019/02/default-2.jpg",
                context : "이렇게 재미있다니 !!",
                atDate : new Date()
            });
        Content.insert({
            title : "필리핀 세부의 바닷속" ,
            url : "https://summer.pes.edu/wp-content/uploads/2019/02/default-2.jpg",
            context : "이렇게 재미있다니 !!",
            atDate : new Date()
        });
        Content.insert({
            title : "필리핀 세부의 바닷속" ,
            url : "https://summer.pes.edu/wp-content/uploads/2019/02/default-2.jpg",
            context : "이렇게 재미있다니 !!",
            atDate : new Date()
        });
        Content.insert({
            title : "필리핀 세부의 바닷속" ,
            url : "https://summer.pes.edu/wp-content/uploads/2019/02/default-2.jpg",
            context : "이렇게 재미있다니 !!",
            atDate : new Date()
        });
        Content.insert({
            title : "필리핀 세부의 바닷속" ,
            url : "https://summer.pes.edu/wp-content/uploads/2019/02/default-2.jpg",
            context : "이렇게 재미있다니 !!",
            atDate : new Date()
        });
        Content.insert({
            title : "필리핀 세부의 바닷속" ,
            url : "https://summer.pes.edu/wp-content/uploads/2019/02/default-2.jpg",
            context : "이렇게 재미있다니 !!",
            atDate : new Date()
        });
        Content.insert({
            title : "필리핀 세부의 바닷속" ,
            url : "https://summer.pes.edu/wp-content/uploads/2019/02/default-2.jpg",
            context : "이렇게 재미있다니 !!",
            atDate : new Date()
        });
        Content.insert({
            title : "필리핀 세부의 바닷속" ,
            url : "https://summer.pes.edu/wp-content/uploads/2019/02/default-2.jpg",
            context : "이렇게 재미있다니 !!",
            atDate : new Date()
        });
    }

    if(User.find().count()==0) {
        // User.insert({
        //
        // });
    }

    if(Usage.find().count()==0) {
        // Usage.insert({
        //
        // });
    }

    if(Invest.find().count()==0) {
        // Invest.insert({
        //
        // });
    }


});



