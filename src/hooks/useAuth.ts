import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { injectedConnector, walletConnector } from "../utils/connectors"

let connector = null;
connector = injectedConnector;

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()

  const login = useCallback(async (walletId = 0) => {
    if (walletId === 1) {
      connector = injectedConnector;
    } else if (walletId === 2) {
      connector = walletConnector;
    }

    await activate(connector);
  }, [activate])

  const logout = useCallback(() => {
    deactivate()
  }, [deactivate])

  return { login, logout }
}

export default useAuth
