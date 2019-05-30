// 미니 몽고 저장소 (몽고디비에서만 다루는 데이터)
OnlyMini = new Mongo.Collection(null);

// 컨텐츠 (
Content = new Mongo.Collection("Content");

// 사용자 (일반 사용자, 제작자)
// Creator = new Mongo.Collection("Creator");
// User = new Mongo.Collection("users");

// 투자내역, 사용내역
Invest = new Mongo.Collection("Invest");
Usage = new Mongo.Collection("Usage");