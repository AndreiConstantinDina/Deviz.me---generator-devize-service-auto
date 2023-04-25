import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {useEffect} from "react";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function ItemsList({itemsData, setItemsData, requirementsLabourData,
                                      deletionError, newDeletionError, setNewDeletionError, setDeletionError, deleteEnabled}) {
    const handleItemDelete = (value) => {
        let requirementsLabourElements = []
        requirementsLabourData.forEach(element => {
            requirementsLabourElements.push(element.value.items)
        })
        requirementsLabourElements = requirementsLabourElements.flat(1)


        var items = itemsData.items.slice(0);
        const index = items.indexOf(value)
        if (requirementsLabourElements.includes(itemsData.items[index].itemName))
        {
            setDeletionError("Această verificare nu poate fi ștearsă deoarece este asociată unei constatări!")
            setNewDeletionError(true)
            return
        }
        items.splice(index, 1);

        setItemsData({
            ...itemsData,
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
                                {`${item.itemName}`}
                            </Typography>
                        </Grid>



                        <Grid item justifyContent={'flex-end'}>
                            <FormControl sx={{ width: '8vw'}}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={item.corresponds}
                                    label="Age"
                                    onChange={() => {
                                        setItemsData({
                                            ...itemsData,
                                            items: itemsData.items
                                        }, [])
                                    }}

                                    sx={{fontSize: '85%'}}
                                >
                                    <MenuItem value='' onClick={(event) => {
                                        item.corresponds = ''
                                    }}
                                    >-</MenuItem>

                                    <MenuItem value='corespunde' onClick={(event) => {
                                        item.corresponds = 'corespunde'
                                    }}
                                    >corespunde</MenuItem>
                                    <MenuItem value='nu corespunde'
                                              onClick={(event) => {
                                                  item.corresponds = 'nu corespunde'
                                              }}
                                    >nu corespunde</MenuItem>

                                </Select>
                            </FormControl>
                            <TextField label={"Preț (lei)"} sx ={{width: '8vw'}}

                                       value={item.price}

                                       inputProps={{style: {fontSize: '100%', fontWeight: 'bold'}}}
                                       InputLabelProps={{style: {fontWeight: 'bold', fontSize: '110%'}}}



                                       onChange={(event) => {
                                           if (event.target.value >= 0 && event.target.value < 999999){
                                               item.price = event.target.value
                                               setItemsData({
                                                   ...itemsData,
                                                   items: itemsData.items
                                               }, [])
                                           }
                                           else if (event.target.value < 0)
                                               event.target.value = 0
                                           else event.target.value = 999999
                                       }}
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