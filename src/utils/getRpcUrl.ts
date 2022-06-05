import random from "lodash/random";

// Array of available nodes to connect to
//export const nodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2]  //VLX Mainnet
export const nodes = [process.env.REACT_APP_NODE]; //VLX Testnet

const getNodeUrl = () => {
  const randomIndex: any = random(0, nodes.length - 1);
  return nodes[randomIndex];
};

export default getNodeUrl;
