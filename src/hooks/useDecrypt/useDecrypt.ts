import CryptoJS from 'crypto-js';

const useDecrypt = (item: string) => {
    const bytes = CryptoJS.AES.decrypt(item, 'secret key');
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export default useDecrypt;