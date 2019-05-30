pragma solidity >=0.4.24;

import "../../interface/InterfaceDivideModule.sol";
import "../../interface/InterfaceInvestModule.sol";
import "../../library/SafeMath.sol";

contract BasicDivideModule is InterfaceDivideModule {
    using SafeMath for uint256;
    uint256 public creatorRate = 0;
    uint256 public maxDivideValue = 0;
    constructor (address _product, address _registry) public
    InterfaceModule(_product, _registry)
    {
      creatorRate = InterfaceProduct(sigStockProduct).creatorRate();
      maxDivideValue = InterfaceProduct(sigStockProduct).maxDivideValue();
    }
    
    modifier isClearedMission {
        require(isCleared == true, "is not cleared");
        _;
    }

    function clearedMission() external onlyRegistryAdmin returns(bool) {
        
        isCleared = true;

        emit IsCleared(msg.sender, block.timestamp);

        return true;
    }
    
    function invest(address _from) public payable returns(bool) {
        
        invested[Wallet] += msg.value;

        Wallet.transfer(msg.value);

        emit Invested(_from, msg.value, block.timestamp);

        return true;
    }

    function invest2(address _from, uint256 _value) public payable returns(bool) {
        
        invested[Wallet] += _value;
        
        Wallet.transfer(msg.value);
        
        emit Invested(_from, _value, block.timestamp);

        return true;
    }
    
    function () external payable {
        
    }

    function purchase(address _from) public payable returns (bool) {
        
        purchased[Wallet] += msg.value;

        emit Purchased(_from, msg.value, block.timestamp);

        return true;
    }
    
    function withdrawInvestedKLAYFromCreator() public onlyProductOwner isClearedMission payable returns (bool) {
        
        uint256 allOfKlay = invested[Wallet];
        
        invested[Wallet] = 0;
        
        msg.sender.transfer(allOfKlay);
        
        emit WithdrawedInvestedKLAYFromCreator(msg.sender, allOfKlay);
        
        return true;
    }
    
    // 1 ether / 10 ether / 50 ether units
    function withdrawPurchasedKLAYFromCreator() public payable returns (bool) {
        require(purchasedForInvestor[Wallet] == 0, "is not completed investor's step");
        require(creatorRate > 0,"is not initialized");
        require(purchased[Wallet] >= maxDivideValue, "has not sufficient klay");
        //creatorRate는 현재 2 KLAY에 해당한다. 100 * 2 / 10
        uint256 rate = (creatorRate / 10 ether);
        uint klayValue = maxDivideValue * rate;
        
        purchased[Wallet] -= klayValue;
        purchasedForInvestor[Wallet] += purchased[Wallet];
        purchased[Wallet] = 0;

        msg.sender.transfer(klayValue);
        
        emit WithdrawedPurchasedKLAYFromCreator(msg.sender, klayValue);
        return true;
    }
    
    function withdrawPurchasedKLAYFromInvestor() public payable returns(bool) {
        require(creatorRate > 0,"is not initialized");
        require(purchased[Wallet] == 0, "is not completed creator's step");
        
        uint256 rate;
        //1. 캡 가져와야 한다.
        //2. 투자자 투자한 금액 가져와야한다.
        //3. 투자금액 / 캡 ==> 소유권 비율이 된다.
        //4. 구매해서 벌어들인 금액을 소유권 비율대로 나눠분배한다.
        uint klay = 10 ether * rate.div(creatorRate);
        
        address investModule = InterfaceProduct(sigStockProduct).module(INVEST_KEY);
        //cap이 1000KLAY인 경우
        uint256 _cap = InterfaceInvestModule(investModule).cap();
        //투자금액이 50KLAY인 경우
        uint256 _InvestorValue = InterfaceInvestModule(investModule).investors(msg.sender);
        
        rate = _InvestorValue.div(_cap); // 5% 비율을 가지고 있다.
        
        uint256 getValue = purchasedForInvestor[Wallet] * rate;
        
        purchasedForInvestor[Wallet].sub(getValue);

        msg.sender.transfer(getValue);
        
        emit WithdrawedPurchasedKLAYFromInvestor(msg.sender, klay);
        
        return true;
        
    }
    
    function getType() public view returns(uint8) {
        return 3;
    }
    
    function getName() public view returns(bytes32) {
        return "BasicDivideModule";
    }
}