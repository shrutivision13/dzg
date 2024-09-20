import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';


export default function Loader() {
    const isLoading = useSelector(state => state.data.loader)
    
    return (
        
        <>
        {
                isLoading ?
                    <Box className='loader'>
                        <CircularProgress />
                    </Box>
                    :
                    null
        }
        </>
    );
}