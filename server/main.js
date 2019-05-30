import { Meteor } from 'meteor/meteor';
import "/imports/collections";//추가
import "./publications/Content";//추가
import './methods/Content';
import './methods/Creator';
import './methods/Invest';
import './methods/Usage';


// sight-stock-meteor > meteor npm install faker
import faker from 'faker';
faker.locale = "ko";

Meteor.startup(() => {
  // code to run on server at startup

    if(Content.find().count()==0) {

        let contentResourceUrlArr = [
            {url:"https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/206448/pexels-photo-206448.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/870711/pexels-photo-870711.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/449627/pexels-photo-449627.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/5390/sunset-hands-love-woman.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/234510/pexels-photo-234510.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/414102/pexels-photo-414102.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/273136/pexels-photo-273136.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/1181181/pexels-photo-1181181.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/40192/woman-happiness-sunrise-silhouette-40192.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/1237119/pexels-photo-1237119.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/1937394/pexels-photo-1937394.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/53184/peacock-bird-plumage-color-53184.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/1089855/pexels-photo-1089855.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/235734/pexels-photo-235734.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/258112/pexels-photo-258112.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/1647214/pexels-photo-1647214.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/1047051/pexels-photo-1047051.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
            ,{url:"https://images.pexels.com/photos/1076429/pexels-photo-1076429.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
        ];

        let fundThumbnail = [
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/782f8331-cab4-46fc-aadc-6c778df213dc/d9vif0i-2d16bbb8-c691-4d5c-a6c9-da76e008afb9.jpg/v1/fill/w_370,h_250,q_70,strp/s_basavaraj_ireland___pure_relaxation_beautiful_by_sbasavarajireland_d9vif0i-250t.jpg",
            "http://raagaholidays.com/img/packages/BeautifulBali.jpg",
            "https://piktoclub.com/wp-content/plugins/download-manager/cache/beautiful-blooming-bright-5815-370x250.jpg",
            "https://yellowstoneclub.com/wp-content/uploads/ewpt_cache/370x250_100_1_c_FFFFFF_552efd5991b4cbc354d35d5b42dd2678_golf-110.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFCJRSdMMiynQqVnD3CjOuEA3vi33q5YlUgqzLDa0lEydCLHka",
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2e4426f4-edfe-45f3-99c7-c376dd3336bd/d6lx6q0-81afa76d-e6a5-4fcb-b367-6f6ee56deec4.jpg/v1/fill/w_370,h_250,q_70,strp/t01_by_la_child_d6lx6q0-250t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDA2IiwicGF0aCI6IlwvZlwvMmU0NDI2ZjQtZWRmZS00NWYzLTk5YzctYzM3NmRkMzMzNmJkXC9kNmx4NnEwLTgxYWZhNzZkLWU2YTUtNGZjYi1iMzY3LTZmNmVlNTZkZWVjNC5qcGciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.UvljTWFNF1gROKjs73epnCa61mA9xkxGvE--eitALZ0",
            "http://1.bp.blogspot.com/-PzVvgQ_1odw/VYUG808deWI/AAAAAAAAAfo/XPR2MnAuDMk/w370-h250-c/beauty-house.jpg",
            "http://escapetoursamana.com/escape-tours-excursions-samana-tour-operator-and-agency-370px.jpg",
            "https://www.northmayo.ie/wp-content/uploads/2016/05/Ceide-Fields-FI-Content-Pool-370x250.jpg",
            "https://www.whatagreenlife.com/wp-content/uploads/2014/11/roof-terrace-design-lawn-boxwood-hedges-wooden-furniture-370x250.jpg",
            "https://www.hotelcasablanca.net.br/media/fotos/370_250/2113.jpg",
            "http://www.dolomitesadventure.com/wp/wp-content/uploads/2014/04/Cima-Scotoni-Enrosadira2-370x250.jpg"
        ]

        for(let i = 0 ; i<12 ; i++){

            let dummyContent = {
                contentStatus:faker.random.arrayElement(['진행중','완료'])
                ,contentThumbnail: fundThumbnail[i]
                ,contentResourceList:shuffle(contentResourceUrlArr)
                ,contentId:""
                ,contentCreator: {
                    userId: "chuck@gmail.com",
                    job: "사진작가",
                    desc: "빛을 담으려고 노력하는 사진작가 입니다.",
                    name: 'Chuck',
                    creatorCareerList: [
                        {career: "세계 영화제 독립영화 연출상 수상", at: faker.date.between('2019-10-30', '2019-12-25')},
                        {career: "세계 사진 페스티벌 금상 수상", at: faker.date.between('2019-10-30', '2019-12-25')},
                        {career: "이재진 광고 기획 회사에서 3년 근무", at: faker.date.between('2019-10-30', '2019-12-25')},
                        {career: "카피라이터 글로벌 콘테스트 은상 수상", at: faker.date.between('2019-10-30', '2019-12-25')}
                    ],
                    creatorThumbnail: "https://mdbootstrap.com/img/Photos/Avatars/img%20(32).jpg",
                    klaytnAddress: "0x4Ab3cC00872F9Ec8142B02f5893834393eA1020B"
                }
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
                    "신생아로 태어나 죽음까지, 다큐 이미지",
                    "나이지리아의 원주민과 함께하는 자연의 삶",
                    "세계의 여러 결혼식을 기록하다",
                    "유럽 국가들의 클럽클럽클럽 흔들어"
                ])
                ,investedKlay:faker.random.number(1000)
                ,investedStock:faker.random.number(1000)
                ,contentReturn:faker.random.number(10)
                ,contentReplyList:[
                    {name:faker.fake("{{name.lastName}}{{name.firstName}}"),text:faker.lorem.sentence()}
                    ,{name:faker.fake("{{name.lastName}}{{name.firstName}}"),text:faker.lorem.sentence()}
                    ,{name:faker.fake("{{name.lastName}}{{name.firstName}}"),text:faker.lorem.sentence()}
                ]
                ,contentScore:faker.random.number(10)
                ,contentDesc:faker.random.arrayElement([
                    "보홀의 푸른 바닷속에 펼쳐지는 풍경 /\n/\r" +
                    "그 속에 사는 수많은 생물들을 수중 카메라에 담기위해 떠나는 여행/<br>/g " +
                    "그 어떤 사진과도 비교할 수 없는 작품을 만들것입니다.",

                    "일본의 교토의 일상을 담을 것입니다./<br>/g " +
                    "가깝지만 멀고도 먼 일본 교토.../<br>/g " +
                    "조용하고 아늑하지만 그들만의 특색을 보존하고 있는 아름다운 도시\n" +
                    "그 곳의 일상을 사진으로 담을 것입니다.",

                    "상공에서 보이는 하얀 구름세상/<br>/g " +
                    "상공에서 특수 카메라와 함께 하늘에서 바라보는 하늘의 모습을 앵글에 담고\n" +
                    "스카이 다이빙 전문가들의 다양한 묘기를/<br>/g " +
                    "한 순간의 이미지로 담아 올 것입니다.",

                    "신생아로 태어나 죽음에 이르기 까지/<br>/g " +
                    "일생을 다룬 다큐 이미지 모음/<br>/g " +
                    "그 누구도 시도 하지 않았던, 인간의 처음부터 끝까지의 시간을/<br>/g " +
                    "대담한 프로젝트의 일환으로 제작하고자 합니다.",

                    "나이지리아의 원주민과 함께하는 자연의 삶을 통해 만들 작품/<br>/g " +
                    "원주민들과의 3개월간 거친 동거를 통해 도시인들이 겪어볼수 없을/<br>/g " +
                    "태초의 경험들을 이미지로 담아올 것입니다./<br>/g " +
                    "해당 제품은 후진국 국민들을 돕는 필수품 지원을 위한 금액도 일부 포함되어 있습니다.",

                    "세계의 여러 결혼식을 기록하다/<br>/g " +
                    "우리는 대한민국이라는 결혼식에 대해서만 알고있습니다./<br>/g " +
                    "하지만 세상에는 수많은 결혼식이 저만의 방식으로 존재하고 있습니다.",

                    "유럽 국가들의 클럽클럽클럽 흔들어/<br>/g " +
                    "과연 유럽의 클럽은 어떠한 특색들을 가지고 있을까요?/<br>/g " +
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
                ,contentTags: faker.random.arrayElement([["해변","바닷속"],["하늘","푸르른","해외"],["특색","인물","풍경"]])
                ,purchaceModuleAddr: ""
                ,investModuleAddr: ""
                ,distributeModuleAddr: ""
            };
            Content.insert(dummyContent);
        }

    }

    if(Meteor.users.find().count()==0) {

        let email = "chuck@gmail.com";
        let password = "0xefbe469ae09b15bbe22823d66200d93771632e7914584bd0f067697cf02eaeae";

        let job = "사진작가",
            desc = faker.random.arrayElement(["빛을 담으려고 노력하는 사진작가 입니다.","유일한 작품을 만들어 냅니다."]),
            name = "Chuck",
            creatorCareerList = [
                {career: "세계 영화제 독립영화 연출상 수상", at: faker.date.between('2019-10-30', '2019-12-25')},
                {career: "세계 사진 페스티벌 금상 수상", at: faker.date.between('2019-10-30', '2019-12-25')},
                {career: "이재진 광고 기획 회사에서 3년 근무", at: faker.date.between('2019-10-30', '2019-12-25')},
                {career: "카피라이터 글로벌 콘테스트 은상 수상", at: faker.date.between('2019-10-30', '2019-12-25')}
                ],
            creatorThumbnail = "https://mdbootstrap.com/img/Photos/Avatars/img%20(32).jpg",
            klaytnAddress = "0x39bf8A6ca150d9858D2BfE67DA37440Fb0d1F02b";

        let userInfo = { email, password, profile : { job, name , desc, creatorCareerList, creatorThumbnail, klaytnAddress} };


        try {
            Accounts.createUser(userInfo,function(error){
                console.log(error);
            });
        } catch (err) {
            console.log(err);
        }

    }

    if(Usage.find().count()==0) {


    }

    if(Invest.find().count()==0) {
		// var test = Content.find({}).fetch()
		// for(var i = 0; i < 12; i++){
		// 	let dummyInvest={
		// 		contentId: test[i]._id,
        //         investorId: faker.random.arrayElement(["charles@gmail.com", "chuck@gmail.com", "joe@gmail.com", "pai@gmail.com"]),
		// 		investorWalletAddr: faker.random.arrayElement(["AAA", "BBB", "CCC", "DDD"]),
		// 		contentName: test[i].contentName,
		// 		parValue: test[i].contentParValue,
        //         klayVal: 20,
		// 		shareNum: faker.random.number(10),
        //         sharePer: 2,
		// 		score: test[i].contentScore
		// 	}
		// 	Invest.insert(dummyInvest)
		// }
    }


});


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
