
import useMediaQuery from '@mui/material/useMediaQuery';

export default function isMobile() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMediaQuery('(max-width: 800px)', {noSsr: true});
}
