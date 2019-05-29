import {ethers} from "ethers";
import Caver from "caver-js";
 
export const config = {
    rpcURL: 'https://api.baobab.klaytn.net:8651',
  }

export const provider = new ethers.providers.JsonRpcProvider('https://api.baobab.klaytn.net:8651');
// export const ethers = ethers;

export const caver = new Caver(config.rpcURL);


export default caver;