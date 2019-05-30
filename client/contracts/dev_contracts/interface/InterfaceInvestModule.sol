pragma solidity >=0.4.24;

import "./InterfaceModule.sol";
import "../ERC20/ERC20Basic.sol";
/**
* @dev 기초 투자 인터페이스 ( 투자자를 위한 )
*
* 
* 
* 
 */

contract InterfaceInvestModule is InterfaceModule {
    
    event ProductInvest(address indexed investor, address indexed beneficiary, uint256 value, uint256 amount);
    event DeliveredStock(uint256 tokenId, address indexed beneficiary, uint256 amount);
    event LogGranularityChanged(uint256 _oldGranularity, uint256 _newGranularity);
    event RegisterdBasicInvestConfig(address _from, uint256 _cap, uint256 _maxInvestors, uint256 _startTime, uint256 _endTime);
    
    struct InvestData {
        uint256 tokenId;
        address owner;
        uint256 amount;
        uint256 timeStamp;
    }
    uint public granularity;
    uint public constant rate = 1;
    uint256 public investorCount;
    uint256 public productSold;
    uint256 public fundsRaised;
    
    //configure 설정 값
    uint public startTime;
    uint public endTime;
    uint256 public cap;
    uint256 public max_investors;

    mapping (address => uint256) public investors;
    mapping (uint256 => InvestData) public investList;

    function getNumberInvestors() public view returns (uint256);
    
    function getRaisedKlay() public view returns (uint256);

    function configure(
        uint256 _startTime,
        uint256 _endTime,
        uint256 _cap,
        uint256 _max_investors,
        address _from
    )
    public
    returns (bool);

    function reclaimERC20(address _tokenContract) external onlyRegistryAdmin {
        
        require(_tokenContract != address(0),"is address(0)");
        
        ERC20Basic token = ERC20Basic(_tokenContract);
        uint256 balance = token.balanceOf(address(this));
        
        require(token.transfer(msg.sender, balance), "fn:reclaimERC20 transfer error");
    }

}