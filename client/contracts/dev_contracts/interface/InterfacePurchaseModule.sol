pragma solidity >=0.4.24;

import "./InterfaceModule.sol";
import "../ERC20/ERC20Basic.sol";

/**
* @dev 기초 구매 인터페이스 ( 추후 구매자를 위한 )
*
* 
* 
* 
 */

contract InterfacePurchaseModule is InterfaceModule {
    
    function configure(
        uint256 _startTime, 
        uint256 _endTime,  
        address _fundsReceiver,
        address _from
        )
    public returns (bool);

    function getNumberPurchasers() public view returns (uint256);
    
    function getRaisedKlay() public view returns (uint256);

    function reclaimERC20(address _tokenContract) external onlyRegistryAdmin {
        
        require(_tokenContract != address(0),"is address(0)");
        
        ERC20Basic token = ERC20Basic(_tokenContract);
        uint256 balance = token.balanceOf(address(this));
        
        require(token.transfer(msg.sender, balance), "fn:reclaimERC20 transfer error");
    }
    
    
}