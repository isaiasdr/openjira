import { useContext } from 'react';

import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

import { UIContext } from '../../context/ui';

export const Sidebar = () => {

    const { sidemenuOpen, closeSideMenu } = useContext( UIContext );

    const menuItems: String[] = ['Inbox', 'Starred', 'Send Email', 'Drafts'];

    return (
        <Drawer anchor='left' open={ sidemenuOpen } onClose= { closeSideMenu }>
            <Box sx={{ width: 250 }}>
                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant='h4'>
                        Menu
                    </Typography>

                    <List>
                        {
                            menuItems.map( (text, index) => (
                                <ListItem key={ index }>
                                    <ListItemIcon>
                                        { index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon /> }
                                    </ListItemIcon>
                                    <ListItemText primary = { text } />
                                </ListItem>
                            ) )
                        }
                    </List>
                    <Divider />

                    <List>
                        {
                            menuItems.map( (text, index) => (
                                <ListItem key={ 4 + index }>
                                    <ListItemIcon>
                                        { index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon /> }
                                    </ListItemIcon>
                                    <ListItemText primary = { text } />
                                </ListItem>
                            ) )
                        }
                    </List>
                </Box>
            </Box>

        </Drawer>
    )
}
