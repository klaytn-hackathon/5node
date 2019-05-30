pragma solidity >=0.4.24;

import "./InterfaceSigStockRegistry.sol";
import "./InterfaceProduct.sol";
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