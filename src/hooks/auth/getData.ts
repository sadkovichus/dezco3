import { get, getDatabase, ref } from "firebase/database";

const getData = async (path: string) => {
    const db = getDatabase();
    let result: any;

    await get(ref(db, path))
        .then(data => result = data.val())
        .catch(err => result = err)

    return result
};

export default getData;
