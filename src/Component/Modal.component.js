import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useEffect} from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const DetailModal = (props) => {
    const [open, setOpen] = React.useState(props.openModal);
    const [detailData, setDetailData] = React.useState(props.openModal);
    const handleClose = () => {
        setOpen(false);
        props.setOpenModal(false);
    }

    useEffect(() =>{

       if(props.currentPokemon) {
           fetch(props.currentPokemon.url)
               .then(response => response.json())
               .then(data => {
                   setDetailData(data)
               })
       }
        if(props.openModal){
            setOpen(true)
        }else{
            setOpen(false)
        }
    },[open, props.openModal])

    const _renderBaseStats = () =>{
        return detailData.stats.map(item => {
            const statName = item.stat.name;
            const baseStat = item.base_stat;
            return <div>{`${statName}: ${baseStat}`}</div>
        })
    }

    return <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <h2>{props?.currentPokemon?.name}</h2>
            <br/>
            <h3>Base Stats</h3>
            <br/>
            {detailData && _renderBaseStats()}
        </Box>
    </Modal>
}

export default DetailModal
