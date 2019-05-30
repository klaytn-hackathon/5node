pragma solidity >=0.4.24;

import "../../interface/InterfaceInvestModule.sol";
import "../../library/ReentrancyGuard.sol";
import "../../ERC721/ERC721.sol";
import "../../ERC721/ERC721Enumerable.sol";
import "../../interface/InterfaceDivideModule.sol";
/**
* @dev 기본적인 투자 모듈 ( 투자자를 위한 )
*
* 
* 
* 
 */

contract BasicInvestModule is InterfaceInvestModule, ReentrancyGuard, ERC721, ERC721Enumerable {
    using SafeMath for uint256;

    constructor (address _product, address _registry) public
    InterfaceModule(_product, _registry)
    {
        
    }
    modifier checkGranularity(uint256 _amount) {
        require(_amount % granularity == 0, "Unable to modify token balances at this granularity");
        _;
    }
    

    function changeGranularity(uint256 _granularity) public returns(bool) {
        
        require(_granularity != 0, "Granularity can not be 0");
        
        emit LogGranularityChanged(granularity, _granularity);
        
        granularity = _granularity;

        return true;
    }
    
    //TODO : 제어자 추가 컨피규어 설정값 변경
    function configure(
        uint256 _startTime,
        uint256 _endTime,
        uint256 _cap,
        uint256 _max_investors,
        address _from
    )
    public
    onlyProduct
    returns (bool)
    {
        require(_startTime >= now && _endTime > _startTime, "Date parameters are not valid");
        require(_cap > 0, "Cap should be greater than 0");
        
        startTime = _startTime;
        endTime = _endTime;
        cap = _cap;
        max_investors = _max_investors;
        
        emit RegisterdBasicInvestConfig(_from, _cap,  _max_investors, _startTime,  _endTime);
        
        return true;

    }

    function () external payable {
        investProduct(msg.sender);
    }

    function investProduct(address _investor) public payable nonReentrant returns(bool) {
        
        uint256 klayAmount = msg.value;

        _processTx(_investor, klayAmount);

        return true;
    }

    function _processTx(address _beneficiary, uint256 _investedAmount) internal {

        _preValidateInvest(_beneficiary, _investedAmount);
        // calculate token amount to be created
        uint256 klays = _investedAmount;

        // update state
        fundsRaised = fundsRaised.add(_investedAmount);
        
        productSold = productSold.add(_investedAmount.mul(rate));

        _processInvest(_beneficiary, klays);

        _forwardFunds();

        emit ProductInvest(msg.sender, _beneficiary, _investedAmount, klays);

    }

    function _preValidateInvest(address _beneficiary, uint256 _investedAmount) internal view {
        require(_beneficiary != address(0), "Beneficiary address should not be 0x");
        require(_investedAmount != 0, "Amount invested should not be equal to 0");
        require(productSold.add(_investedAmount) <= cap, "Investment more than cap is not allowed");
        require(now >= startTime && now <= endTime, "Offering is closed/Not yet started");
    }

    /**
    * @notice Executed when a purchase has been validated and is ready to be executed. Not necessarily emits/sends tokens.
    * @param _beneficiary Address receiving the tokens
    * @param _tokenAmount Number of tokens to be purchased
    */
    function _processInvest(address _beneficiary, uint256 _tokenAmount) internal {
        
        if (investors[_beneficiary] == 0) {
            investorCount = investorCount + 1;
        }
    
        investors[_beneficiary] = investors[_beneficiary].add(_tokenAmount);

        _deliverProductStock(_beneficiary, _tokenAmount);
    }

    function _forwardFunds() internal {
        
        address divideModule = InterfaceProduct(sigStockProduct).module(DIVIDE_KEY);
        
        InterfaceDivideModule(divideModule).invest(msg.sender);

        // InterfaceDivideModule(divideModule).invest2(msg.sender, msg.value);

        
    }
    
    // @TODO : ERC721로 해당 사용자에게 민트 시켜주는 것 구현하기 
    function _deliverProductStock(address _beneficiary, uint256 _tokenAmount) internal {
            
            uint256 tokenId = totalSupply() + 1;

            _mint(_beneficiary, tokenId);
            
            InvestData memory newData = InvestData(tokenId, _beneficiary, _tokenAmount, block.timestamp);

            investList[tokenId] = newData;

            emit DeliveredStock(tokenId, _beneficiary, _tokenAmount);

    }

    function getNumberInvestors() public view returns (uint256) {
        return investorCount;
    }

    function getRaisedKlay() public view returns (uint256) {       
        return fundsRaised;
    }

    function capReached() public view returns (bool) {
        return fundsRaised >= cap;
    }

    function getType() public view returns(uint8) {
        return 1;
    }
    
    function getName() public view returns(bytes32) {
        return "BasicInvestModule";
    }
}