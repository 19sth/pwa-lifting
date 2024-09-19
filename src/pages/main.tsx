import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePageState } from '../redux/slicePage';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Main() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updatePageState({
            navItems: [
                { icon: "ImportExport", link: "./importexport" },
                { icon: "Add", link: "./define" }
            ],
            title: ""
        }));
    }, [dispatch]);

    const definitions = useSelector((state: RootState) => state.definition.items);

    return (
        <>
            {definitions.length === 0 ? (
                <Typography>No definitions yet. Create one!</Typography>
            ) : (
                <List>
                    {definitions.map((definition) => (
                        
                        <ListItem 
                            key={definition.id}
                            divider
                            to={`./definition/${definition.id}`}
                            component={Link}
                            >
                            <ListItemText
                                primary={definition.name}
                                secondary={`${definition.exercises.length} exercise(s)`}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </>
    );

}