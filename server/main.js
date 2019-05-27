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
                ,contentName:faker.random.arrayElement([
                    "보홀의 푸른 바닷속 생물들과 함께",
                    "일본의 교토의 일상을 담는 카메라",
                    "상공에서 보이는 하얀 구름세상",
                    "신생아로 태어나 죽음에 이르기 까지/n 일생을 다룬 다큐 이미지",
                    "나이지리아의 원주민과 함께하는 자연의 삶",
                    "세계의 여러 결혼식을 기록하다",
                    "유럽 국가들의 클럽클럽클럽 흔들어"
                ])
                ,investedKlay:faker.random.number(100)
                ,contentReturn:faker.random.number(10)
                ,contentReplyList:[
                    {name:faker.fake("{{name.lastName}}{{name.firstName}}"),text:faker.lorem.sentence()}
                    ,{name:faker.fake("{{name.lastName}}{{name.firstName}}"),text:faker.lorem.sentence()}
                    ,{name:faker.fake("{{name.lastName}}{{name.firstName}}"),text:faker.lorem.sentence()}
                ]
                ,contentScore:faker.random.number(100)
                ,contentDesc:faker.random.arrayElement([
                    "보홀의 푸른 바닷속에 펼쳐지는 풍경\n" +
                    "그 속에 사는 수많은 생물들을 수중 카메라에 담기위해 떠나는 여행\n" +
                    "그 어떤 사진과도 비교할 수 없는 작품을 만들것입니다.",

                    "일본의 교토의 일상을 담을 것입니다.\n" +
                    "가깝지만 멀고도 먼 일본 교토...\n" +
                    "조용하고 아늑하지만 그들만의 특색을 보존하고 있는 아름다운 도시\n" +
                    "그 곳의 일상을 사진으로 담을 것입니다.",

                    "상공에서 보이는 하얀 구름세상\n" +
                    "상공에서 특수 카메라와 함께 하늘에서 바라보는 하늘의 모습을 앵글에 담고\n" +
                    "스카이 다이빙 전문가들의 다양한 묘기를\n" +
                    "한 순간의 이미지로 담아 올 것입니다.",

                    "신생아로 태어나 죽음에 이르기 까지/n" +
                    "일생을 다룬 다큐 이미지 모음\n" +
                    "그 누구도 시도 하지 않았던, 인간의 처음부터 끝까지의 시간을\n" +
                    "대담한 프로젝트의 일환으로 제작하고자 합니다.",

                    "나이지리아의 원주민과 함께하는 자연의 삶을 통해 만들 작품\n" +
                    "원주민들과의 3개월간 거친 동거를 통해 도시인들이 겪어볼수 없을\n" +
                    "태초의 경험들을 이미지로 담아올 것입니다.\n" +
                    "해당 제품은 후진국 국민들을 돕는 필수품 지원을 위한 금액도 일부 포함되어 있습니다.",

                    "세계의 여러 결혼식을 기록하다\n" +
                    "우리는 대한민국이라는 결혼식에 대해서만 알고있습니다.\n" +
                    "하지만 세상에는 수많은 결혼식이 저만의 방식으로 존재하고 있습니다.",

                    "유럽 국가들의 클럽클럽클럽 흔들어\n" +
                    "과연 유럽의 클럽은 어떠한 특색들을 가지고 있을까요?\n" +
                    "다양한 클럽 밤문화를 한순간의 이미지로 담고자 합니다."
                ])
                ,contentProdCost:faker.random.number({min:100,max:300,precision:1})
                ,contentUsingCost:faker.random.number({min:1,max:10,precision:1})
                ,contentTotalSupply:faker.random.number({min:1000,max:3000,precision:1000})
                ,contentParValue:faker.random.number({min:1,max:10,precision:1})
                ,contentFundingFinishDay:faker.date.between('2019-08-01','2019-10-01')
                ,FundingFinishDay:faker.date.between('2019-10-30','2019-12-25')
                ,ProdFinishDay:faker.date.between('2020-01-01','2020-01-31')
                ,contentInvestorCnt:faker.random.number({min:1,max:40})
                ,contentTags: faker.random.arrayElement(["해변","바닷속","하늘","푸르른","해외","특색","인물","풍경"])
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

    if(Invest.find().count()==0) {
		var test = Content.find({}).fetch()
		for(var i = 0; i < 12; i++){
			dummyInvest={
				contentId: test[i]._id,
				contentName: test[i].contentName,
				parValue: test[i].contentParValue,
				shareNum: faker.random.number(10),
				score: test[i].contentScore
			}
			Invest.insert(dummyInvest)
		}
    }


});
