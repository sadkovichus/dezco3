import { useCallback, useState } from "react";


const useStorage = (key: string, initial: any) => {
    const [storageValue, setStorageValue] = useState(() => {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : initial;
    })

    const setValue = useCallback((value: any) => {
        setStorageValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [])

    return {storageValue, setValue};
}

export default useStorage;



// import { useCallback, useState } from "react";
// import CryptoJS from 'crypto-js';


// const useStorage = (key: string, initial: any) => {
//     const encryptInitial = CryptoJS.AES.encrypt(JSON.stringify(initial), 'secret key').toString();
//     const [storageValue, setStorageValue] = useState(() => {
//         const item = window.localStorage.getItem(key);

//         return item ? JSON.parse(item) : encryptInitial;
//     })

//     const setValue = useCallback(async (value: any) => {
//         const encryptValue = await CryptoJS.AES.encrypt(JSON.stringify(value), 'secret key').toString();
//         setStorageValue(encryptValue);
//         window.localStorage.setItem(key, JSON.stringify(encryptValue));
//     }, [])

//     return { storageValue, setValue };
// }

// export default useStorage;