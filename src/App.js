import './App.css';
import { ethers } from "ethers";


function App() {

  const btnClickHandler= async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
   // const bloque= await provider.getBlockNumber()
    const tx = signer.sendTransaction({
      to: "0xf42aF850CEBe15e3b6bc0a189Eb5d4f9a35ddCE1",
      value: ethers.utils.parseEther("1.0")
  });
  console.log(tx)
  }

  const addNetwork= async()=>{
    window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{chainId: '0x3536EF8',
        chainName: "Asicom Sandbox",
        nativeCurrency: {
          name: "Asicoin",
          symbol: "Asicoin",
          decimals: 18
        },
        rpcUrls: ['https://u0jkis62x6:4cF9Bwb8DDMIJAncY8VnEZePdHV9C90E82hkfvezlw4@u0ayejgdrv-u0h1ne3a0k-rpc.us0-aws.kaleido.io/']
  }]
  })
  }

  const addToken = async () =>{
    const tokenAddress = '0x8b64966e57f4e50dc2c05aff4a44745b371276c3';
    const tokenSymbol = 'Adt';
    const tokenDecimals = 0;
    const tokenImage = 'http://placekitten.com/200/300';
    
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });
    
      if (wasAdded) {
        console.log('Token Agregado');
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.log(error);
    }
    }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={btnClickHandler}>Conectar a metamask</button>
        <button onClick={addNetwork}>Agregar Red</button>
        <button onClick={addToken}>Agregar Token</button>      
        </header>
    </div>
  );
}

export default App;