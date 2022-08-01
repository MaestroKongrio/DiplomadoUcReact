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
      params: [{chainId: '0x7B35722',
        chainName: "Demo Diplomado",
        nativeCurrency: {
          name: "Ether",
          symbol: "ETH",
          decimals: 18
        },
        rpcUrls: ['https://u0zgy0337c:mkqfSWAHwArqS6_EbHidBoosK7uJYGgRhaqGXN9Q-Q0@u0addag0g5-u0s8erlthr-rpc.us0-aws.kaleido.io/']
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

  const firmarMensaje= async ()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const signature = await signer.signMessage("Acepto las condiciones del servicio");
    console.log(signature)
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={btnClickHandler}>Conectar a metamask</button>
        <button onClick={addNetwork}>Agregar Red</button>
        <button onClick={addToken}>Agregar Token</button>    
        <button onClick={firmarMensaje}>Firmar Mensaje</button>   
        </header>
    </div>
  );
}

export default App;
