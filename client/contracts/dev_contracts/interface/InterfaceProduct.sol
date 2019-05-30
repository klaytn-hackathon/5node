pragma solidity >=0.4.24;
import "../permission/SightStockOwnable.sol";
/**
* @dev 기초 작품 인터페이스
* 1. 
* 2.
* 3. 
* 4. 
 */


contract InterfaceProduct is SightStockOwnable {

    /**
     * @param content_key : 오프체인 해시 값
     * @param mainTitle : 대 제목
     * @param subTitle : 소 제목
     * @param description : 내용
     * @param createdTime : 만들어진 시간
     * @param recital : 비고
     */
    struct ContentData {
        bytes contentKey; 
        string mainTitle;
        string subTitle;
        string description;
        string recital;
        uint256 createdTime;
    }
    
    mapping(uint8 => ContentData) public productItems;
    
    mapping(uint8 => address) public module;
    
    //기초 정보
    uint256 public maxDivideValue;
    uint256 public creatorRate;
    uint8 public contentCount;
    string public productTitle;
    string public productDescription;

    //모듈 정보
    uint8 public constant INVEST_KEY = 1;
    uint8 public constant PURCHASE_KEY = 2;
    uint8 public constant DIVIDE_KEY = 3;
    // uint256 public investorCount;
    // uint256 public purchaserCount;

    // address[] public investors;
    // address[] public purchasers;

    
    function getModule(uint8 _moduleType, uint8 _moduleIndex) public view returns (bytes32, address);
    
    // function getInvestorsLength() public view returns(uint256);

    // function getPurchasersLength() public view returns(uint256);
    
    // function addMultiContents() public returns(bool);
    
    // function addContent() public returns(bool)
}