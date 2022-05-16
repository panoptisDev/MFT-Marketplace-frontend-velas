import pinataSDK from '@pinata/sdk';
const pinata = pinataSDK('6c00006636097a0ed8cd', '9d133473482009b5a84d38e05f4bfc9f9c45a2efdd79e5ba705affa74ecfb45c');

export const getIpfsHash = async (data) => {
  const result = await pinata.pinJSONToIPFS(data, null);
  const hash = result.IpfsHash;
  return hash;
};

export const getIpfsHashFromFile = async (file) => {
  return new Promise((resolve, reject) => {
    var headers = new Headers();
    headers.append("pinata_api_key", "6c00006636097a0ed8cd");
    headers.append("pinata_secret_api_key", "9d133473482009b5a84d38e05f4bfc9f9c45a2efdd79e5ba705affa74ecfb45c");
    var formdata = new FormData();
    formdata.append("file", file);
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata
    };
    fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", requestOptions)
        .then(r => r.json())
        .then(r => {
            resolve(r.IpfsHash)
        })
        .catch(error => reject(error))
  })
};
