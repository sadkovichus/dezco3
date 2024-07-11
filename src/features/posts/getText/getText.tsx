const getText = (arr: string[]) => {
    return <>
        {
            arr.map(item => (
                <p key={item}>{item}</p>
            ))
        }
    </>;
}

export default getText;