import { Meteor } from 'meteor/meteor';
import "/imports/collections";//추가

// sight-stock-meteor > meteor npm install faker
import faker from 'faker';
faker.locale = "ko";

Meteor.startup(() => {
  // code to run on server at startup

    if(Content.find().count()==0) {


        for(let i = 0 ; i<12 ; i++){

            let dummyContent = {
                contentStatus:faker.random.arrayElement(['진행중','완료'])
                ,contentThumbnail:faker.image.image(370, 250)
                ,contentResourceList:[
                    {type:"image",url:faker.image.image(370, 250)},
                    {type:"image",url:faker.image.image(370, 250)},
                    {type:"image",url:faker.image.image(370, 250)},
                ]
                ,contentId:""
                ,contentCreatorId:"charles@gmail.com"
                ,contentTag:faker.fake([
					{
						"tag" : "여행"
					},
					{
						"tag" : "필리"
					},
					{
						"tag" : "심해"
					}
				])
                ,contentName:faker.fake("{{name.lastName}}{{name.firstName}}")
                ,investedKlay:faker.random.number(100)
                ,contentReturn:faker.random.number(10)
                ,contentReplyList:[
                    {name:faker.fake("{{name.lastName}}{{name.firstName}}"),text:faker.lorem.sentence()}
                    ,{name:faker.fake("{{name.lastName}}{{name.firstName}}"),text:faker.lorem.sentence()}
                    ,{name:faker.fake("{{name.lastName}}{{name.firstName}}"),text:faker.lorem.sentence()}
                ]
                ,contentScore:faker.random.number(100)
                ,contentDesc:faker.random.words()
                ,contentProdCost:faker.random.number({min:100,max:300,precision:1})
                ,contentUsingCost:faker.random.number({min:1,max:10,precision:1})
                ,contentTotalSupply:faker.random.number({min:1000,max:3000,precision:1000})
                ,contentParValue:faker.random.number({min:1,max:10,precision:1})
                ,contentFundingFinishDay:faker.date.between('2019-08-01','2019-10-01')
                ,FundingFinishDay:faker.date.between('2019-10-30','2019-12-25')
                ,ProdFinishDay:faker.date.between('2020-01-01','2020-01-31')
                ,contentInvestorCnt:faker.random.number({min:1,max:40})
            };
            Content.insert(dummyContent);
        }

    }

    if(User.find().count()==0) {
        for (let i=0; i<4; i++) {
            let dummyUser = {
                userId: faker.random.arrayElement(["charles@gmail.com", "chuck@gmail.com", "joe@gmail.com", "pai@gmail.com"]),
                //creatorName: faker.name.fake("{{name.lastName}}{{name.firstName}}"),
                creatorCareerList: faker.random.arrayElement([
                    {career: faker.hacker.phrase(), at: faker.date.between('2019-10-30', '2019-12-25')},
                    {career: faker.hacker.phrase(), at: faker.date.between('2019-10-30', '2019-12-25')},
                    {career: faker.hacker.phrase(), at: faker.date.between('2019-10-30', '2019-12-25')},
                    {career: faker.hacker.phrase(), at: faker.date.between('2019-10-30', '2019-12-25')}
                ]),
                creatorThumbnail: faker.image.avatar()
            };
        }

    }

    if(Usage.find().count()==0) {


    }

});
