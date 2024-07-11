import { useEffect, useState } from 'react'
import TypeThemes from '../../types/theme/themes';

const useTheme = (theme: TypeThemes = 'dark') => {
    const [state, setState] = useState(theme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [state])

    return [state, setState];
}

export default useTheme