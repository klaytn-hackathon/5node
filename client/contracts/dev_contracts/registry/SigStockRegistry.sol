pragma solidity >=0.4.24;

import "../interface/InterfaceSigStockRegistry.sol";
import "../product/Product.sol";

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
