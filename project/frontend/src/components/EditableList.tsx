import React from "react";
import {IconButton, List, ListItemButton, ListItemText, ListSubheader} from "@mui/material";
import {Clear} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import PageButton from "./PageButton";
import DefaultInput from "./DefaultInput";
import {getOnFieldChange} from "../utils/utils";
import Conditional from "./Conditional";

type ItemsSupplier = (...args: any[]) => string[];

interface EditableListProps {
    title: string
    inputPlaceholder: string
    items: string[]
    onItemsChanged?: (items: string[]) => void
    readonly?: boolean
}

const ItemsList = styled(List)(({theme}) => ({
    width: '100%',
    background: theme.card.background
}));

const StyledListSubheader = styled(ListSubheader)(({theme}) => ({
    background: 'none'//theme.card.background
}));

export default function EditableList({
                                         title,
                                         readonly = false,
                                         inputPlaceholder,
                                         onItemsChanged,
                                         items
                                     }: EditableListProps) {
    // const [items, setItems] = React.useState([] as string[]);
    const [newItem, setNewItem] = React.useState('');

    function getOnItemsChanged(itemsSupplier: ItemsSupplier) {
        return (...args: any[]) => {
            const newItems = itemsSupplier(args);
            setNewItem('');
            // setItems(newItems);
            onItemsChanged?.(newItems);
        }
    }

    const addItem = getOnItemsChanged(() => [...items, newItem]);
    const removeItem = getOnItemsChanged(([item]) => items.filter(i => i !== item));

    return (<>
        <ItemsList
            aria-labelledby="nested-list-subheader"
            subheader={
                <StyledListSubheader color='inherit'>
                    {title}
                </StyledListSubheader>
            }>
            <Conditional condition={!readonly}>
                <div style={{padding: '5px'}}>
                    <DefaultInput inputProps={{'data-testid': 'add-item-input'}} value={newItem}
                                  onChange={getOnFieldChange(setNewItem)} placeholder={inputPlaceholder}
                                  variant='standard' sx={{margin: '5px', width: '70%'}}/>
                    <PageButton onClick={addItem}>Добавить</PageButton>
                </div>
            </Conditional>
            {items.map(i => (
                <ListItemButton disableRipple sx={{cursor: 'default'}} key={i}>
                    <ListItemText primary={i}/>
                    <Conditional condition={!readonly}>
                        <IconButton data-testid='remove-item' onClick={() => removeItem(i)}>
                            <Clear/>
                        </IconButton>
                    </Conditional>
                </ListItemButton>))}
        </ItemsList>
    </>);
}
