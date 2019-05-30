pragma solidity >=0.4.24;

/**
* @dev 부모 컨트랙트		
1. 크리에이터 설정이 가능하다. onlyAdmin 리스트로 관리		
2. 크리에이터는 작품 컨트랙트를 만들 수 있다. onlyCreater 매핑 정보로
2-1. 코인 디플로이어 처럼 만들자. 발행자는 크리에이터가 된다.
2-2. 팩토리(상품팩토리, 프록시, 싱품)구조로 만들자.
3. 크리에이터 판별 여부 함수를 보유한다. public		
4. (투자자 / 구매자) 상태 내역 저장할 것인가?		
 */
// @import HasNoKlay.sol;


contract InterfaceSigStockRegistry {
    
    event AddedCreator(address indexed newCreator);
    event DeletedCreator(address indexed toDeleteCreator);
    event AddedAdmin(address indexed newAdmin);
    event DeletedAdmin(address indexed toDeleteAdmin);
    event ChangedSigStockOwner(address indexed _newOwner);
    address public SIGSTOCK_OWNER;
    uint8 constant MAX_ADMIN = 10;
    address[MAX_ADMIN] public adminGroup;

    mapping (address => bool) public SIGSTOCK_ADMINS; 
    mapping (address => bool) public isCreator;
    // mapping (address => bool) public isSigProduct;

    constructor () public {
        SIGSTOCK_OWNER = msg.sender;
    }

    modifier onlySigStockAdmin() {
        require(SIGSTOCK_ADMINS[msg.sender] == true, "is not Admin");
        _;
    }

    modifier onlySigStockOwner() {
        require(SIGSTOCK_OWNER == msg.sender, "is not owner");
        _;
    }

    function changeSigStockOwnership(address _sigStockOwner) public returns (bool);
    function addCreator(address _toAddCreator) public returns (bool);
    function deleteCreator(address _toDeleteCreator) public returns (bool);
    function addSigStockAdmin(address _admin, uint8 _num) public returns (bool);
    function deleteSigStockAdmin(address _admin, uint8 _num) public returns (bool);
}

contract SightStockOwnable {
    address public owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "is not owner");
        _;
    }
    function transferOwnership(address _newOwner) public onlyOwner {
        _transferOwnership(_newOwner);
    }

    function _transferOwnership(address _newOwner) internal {
        require(_newOwner != address(0), "is not address");
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }
}

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

/**
* @dev 기초 모듈 인터페이스
*
* 1. getName, getType을 갖는다.
* 2. 작품의 컨트랙트, 전체 레지스트리 컨트랙트 정보를 갖는다.
* 3. 특정 제어자를 갖는다.
 */

contract InterfaceModule {
    //작품 컨트랙트
    address public sigStockProduct;
    address public sigStockRegistry;
    
    uint8 public constant INVEST_KEY = 1;
    uint8 public constant PURCHASE_KEY = 2;
    uint8 public constant DIVIDE_KEY = 3;

    constructor (address _product, address _registry) public {
        sigStockProduct = _product;
        sigStockRegistry = _registry;
    }
    
    // 레지스트리의 관리자 확인 제어자
    modifier onlyRegistryAdmin {
        require(true == InterfaceSigStockRegistry(sigStockRegistry).SIGSTOCK_ADMINS(msg.sender), "msg.sender is not admin");
        _;
    }

    // 프로덕트의 상품 창작자 제어자
    modifier onlyProductOwner() {

        require(msg.sender == InterfaceProduct(sigStockProduct).owner(), "msg.sender is not owner");
        _;
    }
    // 프로덕트 컨트랙트 제어자
    modifier onlyProduct() {
        require(msg.sender == sigStockProduct, "is not product");
        _;
    }
    // 프로덕트 투자자 제어자 (will go to InvestModule)

    // 프로덕트 구매자 제어자 (will go to PurchaseModule)

    function getSig(bytes _data) internal pure returns (bytes4 sig) {
        uint len = _data.length < 4 ? _data.length : 4;
        
        for (uint i = 0; i < len; i++) {
            sig = bytes4(uint(sig) + uint(_data[i]) * (2 ** (8 * (len - 1 - i))));
        }
    }

    function getType() public view returns(uint8);
    
    function getName() public view returns(bytes32);

}

/**
 * @title ERC20Basic
 * @dev Simpler version of ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/179
 */
contract ERC20Basic {
  function totalSupply() public view returns (uint256);
  function balanceOf(address who) public view returns (uint256);
  function transfer(address to, uint256 value) public returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
}

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