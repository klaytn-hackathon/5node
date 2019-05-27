// 미니 몽고 저장소 (몽고디비에서만 다루는 데이터)
CurrentContent = new Mongo.Collection(null);

// 컨텐츠 (
Content = new Mongo.Collection("Content");

// 사용자 (일반 사용자, 제작자)
User = new Mongo.Collection("User");

// 투자내역, 사용내역
Invest = new Mongo.Collection("Invest");
Usage = new Mongo.Collection("Usage");