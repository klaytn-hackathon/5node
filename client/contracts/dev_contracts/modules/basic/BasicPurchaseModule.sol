pragma solidity >=0.4.24;

import "../../interface/InterfacePurchaseModule.sol";
import "../../library/ReentrancyGuard.sol";
import "../../library/SafeMath.sol";
import "../../interface/InterfaceDivideModule.sol";
/**
* @dev 기본적인 구매 모듈  ( 추후 구매자를 위한 )
*
 */

contract BasicPurchaseModule is InterfacePurchaseModule, ReentrancyGuard {
    using SafeMath for uint256;
    event RegisterdBasicPurchaseConfig(address _from, address _wallet, uint256 _startTime, uint256 _endTime);
    event ProductPurchase(address indexed sigStockProduct, address indexed beneficiary, uint256 amount);
    event LogGranularityChanged(uint256 _oldGranularity, uint256 _newGranularity);

    uint public granularity;
    uint256 public purchaserCount;
    uint256 public productSold;
    address public fundsWallet;
    uint256 public startTime;
    uint256 public endTime;

    function configure(
        uint256 _startTime,
        uint256 _endTime,
        address _fundsReceiver,
        address _from
    )
    public
    onlyProduct
    returns (bool)
    {
        require(_fundsReceiver != address(0), "Zero address is not permitted");
        require(_startTime >= now && _endTime > _startTime, "Date parameters are not valid");
        startTime = _startTime;
        endTime = _endTime;
        fundsWallet = _fundsReceiver;
        
        emit RegisterdBasicPurchaseConfig(_from, _fundsReceiver, _startTime, _endTime);
        
        return true;

    }

    mapping (address => uint256) public purchasers;
    
    constructor (address _product, address _registry) public
    InterfaceModule(_product, _registry)
    {
        
    }

    function () external payable {
        purchaseProduct(msg.sender);
    }

    modifier checkGranularity(uint256 _amount) {
        require(granularity == _amount, "Unable to modify token balances at this granularity");
        _;
    }
    
    function changeGranularity(uint256 _granularity) public returns(bool) {
        
        require(_granularity != 0, "Granularity can not be 0");
        
        emit LogGranularityChanged(granularity, _granularity);
        
        granularity = _granularity;

        return true;
    }

    // msg.value와 granularity 값이 같아야 한다.
    function purchaseProduct(address _investor) public payable nonReentrant checkGranularity(msg.value) returns (bool) {
        
        uint256 klayAmount = msg.value;

        _processTx(_investor, klayAmount);

        return true;
    }

    function _processTx(address _beneficiary, uint256 _investedAmount) internal {

        _preValidatePurchase(_beneficiary, _investedAmount);
        // calculate token amount to be created
        uint256 klays = _investedAmount;

        // update state
        productSold = productSold.add(_investedAmount);

        _processPurchase(_beneficiary, klays);

        _forwardFunds();
        
        emit ProductPurchase(sigStockProduct, _beneficiary,  klays);

    }
    
    function _preValidatePurchase(address _beneficiary, uint256 _investedAmount)  internal pure  {
        require(_beneficiary != address(0), "Beneficiary address should not be 0x");
        require(_investedAmount != 0, "Amount invested should not be equal to 0");
        
    }
    /**
    * @notice Executed when a purchase has been validated and is ready to be executed. Not necessarily emits/sends tokens.
    * @param _beneficiary Address receiving the tokens
    * @param _tokenAmount Number of tokens to be purchased
    */
    function _processPurchase(address _beneficiary, uint256 _tokenAmount) internal {
        
        if (purchasers[_beneficiary] == 0) {
            purchaserCount = purchaserCount + 1;
        }
        
        purchasers[_beneficiary] = purchasers[_beneficiary].add(_tokenAmount);

    }

    function isPurchaser(address _purchaser) public view returns (bool) {
        
        bool result = false;
        if(purchasers[_purchaser] > 0) {
            result = true;
        }

        return result;
    }
    function getNumberPurchasers() public view returns (uint256) {
        return purchaserCount;
    }

    function getRaisedKlay() public view returns (uint256) {       
        return productSold;
    }

    function _forwardFunds() internal {
        address divideModule = InterfaceProduct(sigStockProduct).module(DIVIDE_KEY);
        
        InterfaceDivideModule(divideModule).purchase(msg.sender);
        
    }
    

    function getType() public view returns(uint8) {
        return 2;
    }
    

    function getName() public view returns(bytes32) {
        return "BasicPurchaseModule";
    }
}