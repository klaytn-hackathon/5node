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