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

library SafeMath {

  /**
  * @dev Multiplies two numbers, throws on overflow.
  */
  function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
    // Gas optimization: this is cheaper than asserting 'a' not being zero, but the
    // benefit is lost if 'b' is also tested.
    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
    if (a == 0) {
      return 0;
    }

    c = a * b;
    assert(c / a == b);
    return c;
  }

  /**
  * @dev Integer division of two numbers, truncating the quotient.
  */
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    // uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return a / b;
  }

  /**
  * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  /**
  * @dev Adds two numbers, throws on overflow.
  */
  function add(uint256 a, uint256 b) internal pure returns (uint256 c) {
    c = a + b;
    assert(c >= a);
    return c;
  }
}

/**
*
*		
 */
//인베스트 왈렛은 창작가에게 귀속된다.
//비율에 따라 구매 왈렛은 창작가 + 투자자에게 귀속된다. 
contract Product is InterfaceProduct {
    using SafeMath for uint256;
    

    constructor(string _title, string _description, uint256 _creatorRate, uint256 _maxDivideValue) public {

        productTitle = _title;
        productDescription = _description;
        creatorRate = _creatorRate;
        maxDivideValue = _maxDivideValue;
    }

    struct ModuleInfo {
        bytes32 key;
        address moduleAddr;
    }
    mapping (uint8 => ModuleInfo[]) public modules;
    uint8 public constant MAX_MODULES = 10;
    
    event SetConfigure(address _from, string _productTitle, string _productDescription);
    event AddedContent(address _from, bytes _contentKey, string _mainTitle, string _subTitle, uint256 _createdTime);
    event DeletedContent(address _from, uint8 _num);
    event LogModuleAdded(
        uint8 indexed _type,
        bytes32 _name,
        address _module,
        uint256 _timestamp
    );
    event LogModuleRemoved(uint8 indexed _type, address _module, uint256 _timestamp);
    //@ TODO : addContent - 제어자 추가해야한다.
    
    function addContent(
        bytes _contentKey,
        string _mainTitle,
        string _subTitle,
        string _description,
        string _recital
    ) public onlyOwner returns(bool) {
        uint256 _createdTime = block.timestamp;

        productItems[contentCount] = ContentData(_contentKey, 
        _mainTitle, 
        _subTitle, 
        _description,
        _recital,
        _createdTime
         );

        contentCount++;

        return true;
    }
    //@ TODO  : deleteContent 제어자 추개해야한다.
    function deleteContent(
        uint8 _num
    ) public onlyOwner returns (bool) {
        require(_num != 0, "fn:deleteContent - _num is 0");
        
        productItems[_num] = ContentData("","","","","",0);
        contentCount--;
        
        return true;
    }

    function setConfigure(string _title, string _description) public onlyOwner returns(bool) {
        
        productTitle = _title;
        productDescription = _description;
        
        emit SetConfigure(msg.sender, productTitle, productDescription);
    }
    /**
    * @dev invest 모듈에서 해당 값을 불러온다. 
     */ 
    function getInvestorsLength() public view returns (uint256) {
        uint256 investorsLength = InterfaceInvestModule(module[INVEST_KEY]).getNumberInvestors();
        return investorsLength;

    }
    
    /**
    * @dev purchase 모듈에서 해당 값을 불러온다.
     */

    function getPurchasersLength() public view returns (uint256) {
        uint256 purchasersLength = InterfacePurchaseModule(module[PURCHASE_KEY]).getNumberPurchasers();
         
        return purchasersLength;
    }
    function addModule(
        address _moduleAddress
    ) external onlyOwner returns(bool) {
        uint8 moduleType = InterfaceModule(_moduleAddress).getType();
        bytes32 moduleName = InterfaceModule(_moduleAddress).getName();
        
        require(modules[moduleType].length < MAX_MODULES, "Limit of MAX MODULES is reached");
        modules[moduleType].push(ModuleInfo(moduleName, _moduleAddress));
        
        module[moduleType] = _moduleAddress;

        emit LogModuleAdded(moduleType, moduleName, _moduleAddress, block.timestamp);

        return true;
    }
    /**
    * @dev 모듈 정보를 불러온다.
     */

    function getModule(uint8 _moduleType, uint8 _moduleIndex) public view returns (bytes32, address) {
        if (modules[_moduleType].length > 0) {
            return (
                modules[_moduleType][_moduleIndex].key,
                modules[_moduleType][_moduleIndex].moduleAddr
            );
        } else {
            return ("", address(0));
        }
    }
    function removeModule(uint8 _moduleType, uint8 _moduleIndex) external onlyOwner returns(bool) {
        require(_moduleIndex < modules[_moduleType].length,
        "Module index doesn't exist as per the choosen module type");
        require(module[_moduleType] != address(0), "is not address(0)");
        require(modules[_moduleType][_moduleIndex].moduleAddr != address(0),
        "Module contract address should not be 0x");
        //Take the last member of the list, and replace _moduleIndex with this, then shorten the list by one
        
        if(modules[_moduleType][_moduleIndex].moduleAddr == module[_moduleType]) {
            module[_moduleType] = address(0);
        }

        emit LogModuleRemoved(_moduleType, modules[_moduleType][_moduleIndex].moduleAddr, now);
        
        modules[_moduleType][_moduleIndex] = modules[_moduleType][modules[_moduleType].length - 1];
        
        modules[_moduleType].length = modules[_moduleType].length - 1;
        
        return true;
    }
    
    // @ TODO : 제어자 추가해야한다.
    function setInvestConfigure(
        uint256 _startTime, 
        uint256 _endTime, 
        uint256 _cap, 
        uint256 _max_investors)
    public onlyOwner returns (bool) {
        
        InterfaceInvestModule(module[INVEST_KEY]).configure(_startTime, _endTime, _cap, _max_investors, msg.sender);

        return true;
    }

    // @ TODO : 제어자 추가해야한다.
    function setPurchaseConfigure(
        uint256 _startTime, 
        uint256 _endTime,  
        address _fundsReceiver)
    public onlyOwner returns (bool) {
        
        InterfacePurchaseModule(module[PURCHASE_KEY]).configure(_startTime, _endTime, _fundsReceiver, msg.sender);
        
        return true;
    }

    function getRaiseKlayFromInvest() public view returns (uint256) {
        uint256 _getKlay = InterfaceInvestModule(module[INVEST_KEY]).getRaisedKlay();

        return _getKlay;
    }
    
    function getRaiseKlayFromPurchase() public view returns (uint256) {
        
        uint256 _getKlay = InterfacePurchaseModule(module[PURCHASE_KEY]).getRaisedKlay();
        
        return _getKlay;
    }


}

/**
* 부모 컨트랙트		
1. 크리에이터 설정이 가능하다. onlyAdmin		
2. 크리에이터는 작품 컨트랙트를 만들 수 있다. onlyCreater   		
3. 크리에이터 판별 여부 함수를 보유한다. public		
4. (투자자 / 구매자) 상태 내역 저장할 것인가?		
5. product 추가 하기
 */



contract SigStockRegistry is InterfaceSigStockRegistry {
    
    mapping(address => address[]) public creatorProducts;
    
    event CreatedProduct(address indexed _from, address indexed _product);
    event AddedCustomProduct(address indexed _from, address indexed _product);
    
    modifier onlyCreator() {
        require(true == isCreator[msg.sender], "is not creator");
        _;
    }

    // modifier onlyAdmin() {
    //     require(true == SIGSTOCK_ADMINS[msg.sender], "is not admin");
    //     _;
    // }
    function getNumCreatorProduct(address _creator) public view returns(uint) {
        
        uint productNum = creatorProducts[_creator].length;
        
        return productNum;
    }

    // 수동 추가
    function addCustomProduct(address _productAddress) public onlySigStockAdmin returns (bool) {
                
        creatorProducts[msg.sender].push(_productAddress);
        emit AddedCustomProduct(msg.sender, _productAddress);

        return true;
    }
    // 자동 추가
    function createProduct(string _title, string _description, uint256 _creatorRate, uint256 _maxDivideValue) 
    public 
    onlyCreator 
    returns (address) {
        
        Product product = new Product(_title, _description, _creatorRate, _maxDivideValue);

        creatorProducts[msg.sender].push(address(product)); 
        
        Product(product).transferOwnership(msg.sender);

        emit CreatedProduct(msg.sender, address(product));
        
        return address(product);
    }

    function changeSigStockOwnership(address _sigStockOwner) public onlySigStockOwner returns (bool) {
        
        SIGSTOCK_OWNER = _sigStockOwner;
        
        emit ChangedSigStockOwner(SIGSTOCK_OWNER);
        
        return true;
    }
    
    function addSigStockAdmin(address _admin, uint8 _num) public onlySigStockOwner returns (bool) {
        
        require(_num < MAX_ADMIN, "num is bigger tan MAX_ADMIN");
        require(_admin != address(0), "_admin is address(0)");
        require(adminGroup[_num] == address(0), "adminGroup[num] is not address(0)");
        require(SIGSTOCK_ADMINS[_admin] == false, "SIGSTOCK_ADMINS[_admin] is not false");
    
        SIGSTOCK_ADMINS[_admin] = true;

        adminGroup[_num] = _admin;

        emit AddedAdmin(_admin);

        return true;
    }
    
    function deleteSigStockAdmin(address _admin, uint8 _num) public onlySigStockOwner returns (bool) {
        require(_num < MAX_ADMIN, "num is bigger tan MAX_ADMIN");
        require(_admin != address(0), "_admin is address(0)");
        require(adminGroup[_num] == _admin, "adminGroup[num] is not _admin");
        require(SIGSTOCK_ADMINS[_admin] == true, "SIGSTOCK_ADMINS[_admin] is not true");

        SIGSTOCK_ADMINS[_admin] = false;

        adminGroup[_num] = address(0);

        emit DeletedAdmin(_admin);

        return true;
    }


    function addCreator(address _toAddCreator) public onlySigStockAdmin returns (bool) {
        
        require(isCreator[_toAddCreator] == false, "has already creator's role");

        isCreator[_toAddCreator] = true;

        emit AddedCreator(_toAddCreator);

        return true;
    }

    function deleteCreator(address _toDeleteCreator) public onlySigStockAdmin returns (bool) {
        
        require(isCreator[_toDeleteCreator] == true, "dont have creator's role");

        isCreator[_toDeleteCreator] = false;

        emit DeletedCreator(_toDeleteCreator);

        return true;
    }
    
}