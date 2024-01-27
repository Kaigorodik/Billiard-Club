import type {} from '@mui/lab/themeAugmentation';

const components = {
    MuiToolbar: {
        styleOverrides: {
            root: {
                minHeight: '30px'
            }
        }
    },
    MuiTablePagination: {
        styleOverrides: {
            root: {
                borderBottom: 'none'
            }
        }
    },
    MuiLink: {
        styleOverrides: {
            root: {
                margin: '0 12px'
            }
        }
    },
};

export default components;
