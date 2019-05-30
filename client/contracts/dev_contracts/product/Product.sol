pragma solidity >=0.4.24;

import "../interface/InterfaceProduct.sol";
import "../interface/InterfaceInvestModule.sol";
import "../interface/InterfacePurchaseModule.sol";
import "../library/SafeMath.sol";
import "../interface/InterfaceSigStockRegistry.sol";

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
