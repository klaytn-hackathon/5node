import { Meteor } from 'meteor/meteor';
import "/imports/collections";//추가


Meteor.startup(() => {
  // code to run on server at startup

    if(Content.find().count()==0) {
        Content.insert({
            title : "만화로 배우는 리눅스 시스템 관리 1" ,
            url : "https://summer.pes.edu/wp-content/uploads/2019/02/default-2.jpg" ,
            context : "정말 어마어마 하군요",
            atDate : new Date()
        });
        Content.insert({
                title : "만화로 배우는 리눅스 시스템 관리 2" ,
                url : "https://summer.pes.edu/wp-content/uploads/2019/02/default-2.jpg",
                context : "이렇게 재미있다니 !!",
                atDate : new Date()
            });
    }

});



