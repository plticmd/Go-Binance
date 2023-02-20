import { ChainId } from './chainIds'
const Shibuya =
  '/Shiden.png'
const Shiden =
  '/Shiden.png'
const Astar =
 '/Astar.png'
const Mainnet =
   '/Metamask_Fox 2.png'

export const NETWORK_ICON = {
  [ChainId.SBY]: Shibuya,
  [ChainId.SDN]: Shiden,
  [ChainId.ASTR]: Astar,
  [ChainId.ETHEREUM]: Mainnet,
}

export const NETWORK_LABEL: { [chainId in ChainId]?: string } = {
  [ChainId.SBY]: 'Shibuya',
  [ChainId.SDN]: 'Shiden',
  [ChainId.ASTR]: 'Astar',
  [ChainId.ETHEREUM]: '---',
}
