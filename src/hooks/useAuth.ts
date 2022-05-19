import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { connectorLocalStorageKey, injectedConnector, walletconnect } from "../utils/connectors"

let connector = null;
connector = injectedConnector;

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()

  const login = useCallback(async (walletId = 0) => {
    let key = "injectedConnector";
    if (walletId === 1) {
      connector = injectedConnector;
      key = "injectedConnector";
    } else if (walletId === 2) {
      connector = walletconnect;
      key = "walletconnect";
    }

    await activate(connector);
    window.localStorage.setItem(connectorLocalStorageKey, key);
  }, [activate])

  const logout = useCallback(() => {
    deactivate()
    window.localStorage.setItem(connectorLocalStorageKey, "");
  }, [deactivate])

  return { login, logout }
}

export default useAuth
