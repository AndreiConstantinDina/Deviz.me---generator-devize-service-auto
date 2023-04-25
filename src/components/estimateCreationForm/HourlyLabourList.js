import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {useEffect} from "react";
import {TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function HourlyLabourList({itemsData, setItemsData, requirementsLabourData,
                                             deletionError, newDeletionError, setNewDeletionError, setDeletionError, deleteEnabled}) {
    const handleItemDelete = (value) => {
        let requirementsLabourElements = []
        requirementsLabourData.forEach(element => {
            requirementsLabourElements.push(element.value.items)
        })
        requirementsLabourElements = requirementsLabourElements.flat(1)
        var items = itemsData.items.slice(0);
        const index = items.indexOf(value)
        if (requirementsLabourElements.includes(itemsData.items[index].item))
        {
            setDeletionError("Această lucrare nu poate fi ștearsă deoarece este asociată unei constatări!")
            setNewDeletionError(true)
            return
        }
        items.splice(index, 1);

        setItemsData({
            ...items,
            items: items
        }, [])
    }

    return (
        <List sx={{ width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper' ,
            alignItems: 'flex-start' ,
            paddingLeft: '20px'
        }}>
            {itemsData.items.map((item) => (
                <ListItem
                    justifyContent= 'flex-start'
                    alignItems = "center"
                    key={item}
                    sx={{borderStyle: 'solid',
                        borderWidth: '0.5px',
                        borderColor: 'gray',
                        borderRadius: '5px',
                        margin: '8px',
                        width: '60vw',
                        paddingLeft: '10px'
                    }}
                >
                    <Grid container spacing={0} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Grid item justifyContent={'flex-start'}>
                            <Typography sx = {{width: '10vw', overflowWrap: 'break-word', fontSize: '100%'}} >
                                {`${item.item}`}
                            </Typography>
                        </Grid>

                        <Grid item>

                            <TextField label={"Tarif (lei/ oră)"} type={'text'} sx ={{width: '8vw'}} value={item.price}
                                       onChange={(event) => {
                                           if (event.target.value >= 0 && event.target.value < 999999){
                                               item.price = event.target.value
                                               item.price!== '' && item.quantity!== '' ?
                                                   item.total = (parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2).toString()
                                                   : item.total = ''
                                               setItemsData({
                                                   ...itemsData,
                                                   items: itemsData.items
                                               }, [])
                                           }
                                           else if (event.target.value < 0)
                                               event.target.value = 0
                                           else event.target.value = 999999
                                       }}

                                       inputProps={{style: {fontSize: '85%'}}}
                            />
                            <TextField label={"Ore"} type={'text'} sx ={{width: '5vw'}}
                                       inputProps={{ inputProps: { min: 1, max: 99 }, inputMode: 'numeric', pattern: '[0-9]*' }}
                                       value = {item.quantity}
                                       onChange={(event) => {
                                           if (event.target.value >= 0 && event.target.value <= 99)
                                           {

                                               item.quantity = event.target.value
                                               item.price!== '' && item.quantity!== '' ?
                                                   item.total = (parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2).toString()
                                                   : item.total = ''
                                               setItemsData({
                                                   ...itemsData,
                                                   items: itemsData.items
                                               }, [])

                                           }
                                           else if (event.target.value < 0){
                                               item.quantity = 0
                                           }
                                           else item.quantity = 99

                                       }}

                                       inputProps={{style: {fontSize: '85%'}}}
                            />
                            <TextField label={"Total (lei)"} sx ={{width: '8vw'}}
                                       InputProps={{
                                           shrink: true,
                                           readOnly: true,
                                       }}
                                       value={item.total}
                                       inputProps={{style: {fontSize: '100%', fontWeight: 'bold'}}}
                                       InputLabelProps={{style: {fontWeight: 'bold', fontSize: '110%'}}}
                            />

                            {deleteEnabled && <IconButton>
                                <DeleteIcon onClick={() => {
                                    handleItemDelete(item)
                                }}>
                                </DeleteIcon>
                            </IconButton>}
                        </Grid>
                    </Grid>

                </ListItem>
            ))}
        </List>
    );
}