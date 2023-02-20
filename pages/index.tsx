import { useWeb3React } from '@web3-react/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import blockchains from '../config/blockchains.json'
import { ChainId } from '../config/chainIds'
import { NETWORK_ICON, NETWORK_LABEL } from '../config/networks'
import { injected, supportedChainIds, wallets } from '../config/wallets'
import useWeb3 from '../hooks/useWeb3'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { account, activate, chainId, deactivate } = useWeb3React()
  const [nativeBalance, setNativeBalance] = useState(0)
  const [sendAddress, setSendAddress] = useState('')
  const [sendAmount, setSendAmount] = useState('0')

  const { web3 } = useWeb3()
  // @ts-ignore TYPE NEEDS FIXING
  const chainData = blockchains[chainId]

  useEffect(() => {
    // @ts-ignore TYPE NEEDS FIXING
    if (window?.ethereum) {
      activate(injected)
    } else {
      alert('You need to install a crypto wallet to run this Dapp!!')
    }
  }, [activate])
  const fetchBalanceData = async () => {
    const eth = await web3.eth.getBalance(account as string)
    if (Number(eth) > 0) {
      const bal = web3.utils.fromWei(eth, 'ether')
      console.log({ eth, bal })
      setNativeBalance(Number(bal))
    }
  }
  useEffect(() => {
    if (account) {
      fetchBalanceData()
    }
  })
  const sendEth = async () => {
    const isValidAddress = web3.utils.isAddress(sendAddress)
    if (isValidAddress && Number(sendAmount) > 0 && account) {
      const tx = await web3.eth.sendTransaction({
        from: account,
        to: sendAddress,
        // @ts-ignore TYPE NEEDS FIXING

        value: web3.utils.toWei(sendAmount, 'ether'),
      })
      if (tx.transactionHash) {
        alert(`Transaction Success!! ${tx.transactionHash}`)
        fetchBalanceData()
      }
      console.log({ tx })
    } else {
      alert('Invalid Transaction Data')
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title></title>
      </Head>

      <main>
        {account ? (
          <>
            <div className="card">
              <h4>
                Connected : {NETWORK_LABEL[chainId as ChainId]}
              </h4>
              <h4>
                Remain Balance : {nativeBalance || 0}{' '}
                {chainData?.nativeCurrency?.symbol}
              </h4>
              <p>Metamask Address: {account}</p>
              <button className="btn" onClick={() => deactivate()}>
                Logout
              </button>
            </div>
            
          </>
        ) : (
          <div className="card">
            <h1>Connect Metamask Wallet</h1>
            {wallets?.map((wallet, idx) => {
              return (
                <button
                  key={wallet?.name}
                  className="btn"
                  onClick={() => activate(wallet?.connector)}
                >
                  {wallet?.name}
                </button>
              )
            })}
          </div>
        )}
        
        <div className="card">
       <h1><a href="address-converter"><u>Go</u> Binance to Metamask</a></h1>
          <div className="flex flex-wrap">
            {supportedChainIds?.map((chain, idx) =>
              // @ts-ignore TYPE NEEDS FIXING
              Number(chain) && NETWORK_ICON[Number(chain)] ? (
                <div
                  key={Number(chain)}
                  className="flex items-center rounded-md"
                  style={{
                    //background: 'black',
                    padding: '0.1em 0.25em',
                    margin: '1em 0.5em',
                  }}
                >
                  <Image
                    // @ts-ignore TYPE NEEDS FIXING

                    src={NETWORK_ICON[Number(chain)]}
                    width={50}
                    height={50}
                    alt=""
                    className="rounded-md"
                  />
                  <p
                    style={{
                      //marginLeft: '0.5em',
                      //fontSize: '12px',
                      //padding: '0em 0em',
                    }}
                  >
                    {/* @ts-ignore TYPE NEEDS FIXING */}
                    {NETWORK_LABEL[Number(chain)]}
                  </p>
                </div>
              ) : null
            )}
            
          </div>
          <h4>You can receive Astar tokens on Metamask from Binance.com without Gox.</h4>
        </div>

        <div className="card">
              <h2>Send EVM {chainData?.nativeCurrency?.symbol}</h2>
              <div className="my-1">
                <label htmlFor="sendAddress">to Address</label>
                <input
                  id="sendAddress"
                  className="mx-1"
                  type="text"
                  value={sendAddress}
                  onChange={(e) => setSendAddress(e?.target?.value)}
                />
              </div>
              <div className="my-1">
                <label htmlFor="sendAmount">Amount</label>

                <input
                  id="sendAmount"
                  className="mx-1"
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e?.target?.value)}
                />
              </div>
              <h4>
                Remain Balance : {nativeBalance || 0}{' '}
                {chainData?.nativeCurrency?.symbol}
              </h4>

              <button className="btn" onClick={sendEth}>
                Send {chainData?.nativeCurrency?.symbol}{' '}
              </button>
            </div>

      </main>
    </div>
  )
}

export default Home
