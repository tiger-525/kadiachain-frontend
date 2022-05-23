import { Contract } from '@ethersproject/contracts'
import TokenABI from '../contracts/Token.json'
import NFTCollectionABI from '../contracts/NFTCollection.json'
import MarketABI from '../contracts/Market.json'
import AuctionABI from '../contracts/Auction.json'

import MintWithToken1ABI from '../contracts/MintWithToken1.json'
import MintWithCoin1ABI from '../contracts/MintWithCoin1.json'



export const currentNetwork = process.env.REACT_APP_NETWORK_ID;

export const CONTRACTS_BY_NETWORK = {
  [currentNetwork]: {
    NFTCollection: {
      address: "0x0cf3a5f7c25f1d69838f34b1a0e0700415fdb8ac",
      abi: NFTCollectionABI,
    },
    Market: {
      address: "0x7b0e602bbdc46b054f9db8459df2f19ba63637de",
      abi: MarketABI
    },
    Auction: {
      address: "0xcd501b818f5d901bf3a0b3808945d5cd4b6e5aca",
      abi: AuctionABI
    }
  },  
}

export const MINT_CONTRACTS = {  
  MintWithToken1: {
    address: "0xAAAd5C5a0F30DBcf78E5bf1Fe7737e949318E015",
    abi: MintWithToken1ABI,
    currency: 'ARKN'
  },
  MintWithToken2: {
    address: "0xc6c113eab9A59Ca9d6278800b9dD49bBfaB130AE",
    abi: MintWithToken1ABI,
    currency: 'ETH'
  },
  MintWithToken3: {
    address: "0x91BCA86B65705568eD6eCA1297Ec535138C381EC",
    abi: MintWithToken1ABI,
    currency: 'THG'
  },
  MintWithCoin1: {
    address: "0x968FFe31C1F27C96e27b9223250690ecc9847C3c",
    abi: MintWithCoin1ABI,
    currency: 'KAI'
  } 
}

export const currencies = [
  {symbol: 'KAI', address: '0x0000000000000000000000000000000000000000'},
  {symbol: 'ETH', address: '0x1540020a94aA8bc189aA97639Da213a4ca49d9a7'},
  {symbol: 'ARKN', address: '0xc8E2747916BeDcf91C17AB13F2E14E67f6aBe0Db'},
  {symbol: 'THG', address: '0xF0051fd4758147F1749D1696C9266d047B4c43Fa'}
];
export function getCurrencyInfo(_address){
  for (let index = 0; index < currencies.length; index++) {
    const currencyInfo = currencies[index];
    if (currencyInfo.address.toLowerCase() === _address.toLowerCase()) {
      return currencyInfo;
    }
  }
  return null;
}
export function getCurrencyInfoFromSymbol(symbol){
  for (let index = 0; index < currencies.length; index++) {
    const currencyInfo = currencies[index];
    if (currencyInfo.symbol.toLowerCase() === symbol.toLowerCase()) {
      return currencyInfo;
    }
  }
  return null;
}
export function getTokenContract(address, provider) {  
  return new Contract(address, TokenABI, provider);
}


export function getContractInfo(name, chainId = null) {
  if(!chainId) chainId = currentNetwork;

  const contracts = CONTRACTS_BY_NETWORK?.[chainId];  
  if(contracts) {
    return contracts?.[name];
  }else{
    return null;
  }
}
export function getContractObj(name, chainId, provider) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(info.address, info.abi, provider);
}


export function getCollectionContract(address, chainId, provider) {
  const info = getContractInfo('NFTCollection', chainId);
  return !!info && new Contract(address, info.abi, provider);
}


export function getMintInfo(name) {
  const info = MINT_CONTRACTS[name];
  return info;
}
export function getMintObj(name, provider) {
  const info = MINT_CONTRACTS[name];
  return !!info && new Contract(info.address, info.abi, provider);
}

export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str

export function formatNum(value) {
  let intValue = Math.floor(value)
  if (intValue < 10) {
    return ''+ parseFloat(value).toFixed(2)
  } else if (intValue < 1000){
    return '' + intValue
  } else if (intValue < 1000000) {
    return parseFloat(intValue/1000).toFixed(1) + 'K'
  } else if (intValue < 1000000000) {
    return parseFloat(intValue/1000000).toFixed(1) + 'M'
  } else {
    return parseFloat(intValue/1000000000).toFixed(1) + 'B'
  }
}
