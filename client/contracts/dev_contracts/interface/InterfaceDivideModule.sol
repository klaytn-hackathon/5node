pragma solidity >=0.4.24;

import "./InterfaceModule.sol";
import "../ERC20/ERC20Basic.sol";


/**
* @dev 기초 지갑 인터페이스 ( 추후 구매자를 위한 )
*
* 
————————
왈렛 모듈 
————————
1. 투자자가 지분별로 금액을 인출하는 경우    [ 구매 ]    
2. 크리에이터가 지분별로 금액을 인출하는 경우 [ 구매 ] 
3. 크리에이터가 투자한 금액을 인출하는 경우  [ 투자 ]

투자모듈에 돈을 투자하면 돈이 왈렛 모듈로 날아간다 
왈렛 모듈에서 투자 정보를 기록한다.
투자금액 / 캡으로 나눠서 투자자의 비율이 설정된다. 

+필요한 것 - 캡은 투자 모듈이므로 프로덕트에서 최신의 투자모듈의 캡을 가져온다.
++ 투자자 주소 && 투자 금액 && 투자한 프로덕트 
투자금액은 개인지갑주소로 설정하되, 빼는건 관리자 허락이 필요하다.



구매모듈에 돈을 투자하면
돈이 구매모듈로 날아간다.
왈렛 모듈에서 구매정보를 기록한다.
구매금액은 왈렛 모듈에서 설정한 컨트랙트 자체에서 보관한다.
인출 요청을 했을 때 특정 단위 별로 인출이 가능하다.
인출 버튼을 눌렀을 때, 
자기 몫 만큼 인출이 가능하다. 
* 
* 
 */

contract InterfaceDivideModule is InterfaceModule {
    
    event Invested(address _from, uint256 _klayAmount, uint256 _timestamp);
    event Purchased(address _from, uint256 _klayAmount, uint256 _timestamp);
    event WithdrawedInvestedKLAYFromCreator(address _from, uint256 _klay);
    event WithdrawedPurchasedKLAYFromCreator(address _from, uint256 _klay);
    event WithdrawedPurchasedKLAYFromInvestor(address _from, uint256 _klay);
    event IsCleared(address _from, uint256 _timestamp);
    
    bool isCleared = false;
    //투자 모듈에서 투자하면 해당 wallet으로 받게 된다.
    address public Wallet = address(this);   
    mapping (address => uint256) public invested;
    mapping (address => uint256) public purchased;
    mapping (address => uint256) public purchasedForInvestor;
    
    function clearedMission() external returns(bool);

    function invest(address _from) public payable returns (bool); 

    function invest2(address _from, uint256 _value) public payable returns (bool); 

    function purchase(address _from) public payable returns(bool);
    
    //onlyCreator // onlyClearedMission 
    function withdrawInvestedKLAYFromCreator() public payable returns(bool);
    
    // 1 ether / 10 ether / 50 ether units
    function withdrawPurchasedKLAYFromCreator() public payable returns(bool);
    
    function withdrawPurchasedKLAYFromInvestor() public payable returns(bool);

    function reclaimERC20(address _tokenContract) external onlyRegistryAdmin {
        
        require(_tokenContract != address(0),"is address(0)");
        
        ERC20Basic token = ERC20Basic(_tokenContract);
        uint256 balance = token.balanceOf(address(this));
        
        require(token.transfer(msg.sender, balance), "fn:reclaimERC20 transfer error");
    }

}