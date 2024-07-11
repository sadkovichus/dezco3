const getLinkToFile = (files: FileList)  => {
    let reader = new FileReader();
    console.log(files);
    if (files[0]) {
        reader.readAsDataURL(files[0]);
        reader.onload = async function () {
            console.log(reader.result);
            return reader.result;
        };
        reader.onerror = function () {
            return 'Error path file';
        };
    } else 'Error path file'
}

export default getLinkToFile;