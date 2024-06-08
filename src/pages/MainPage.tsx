import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Button, Typography, Box } from '@mui/material';

interface Event {
    path: string;
    hash: string;
    last_write: string;
}

const MainPage = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const eventSource = new EventSource('http://127.0.0.1:8081/events');

        eventSource.onopen = () => {
            console.log('Connection to server opened.');
        };

        eventSource.onmessage = (event) => {
            if (event.data) {
                const eventData = JSON.parse(event.data) as Event;
                console.log('Received event:', eventData);
                setEvents(prevEvents => {
                    const updatedEvents = [...prevEvents, eventData];
                    console.log('Updated events:', updatedEvents);
                    return updatedEvents;
                });
            }
        };

        eventSource.onerror = (error) => {
            console.error('EventSource encountered an error:', error);
        };

        return () => {
            console.log("Cleaning up EventSource");
            eventSource.close();
        };
    }, []);

    useEffect(() => {
        console.log('Events state updated:', events);
    }, [events]);

    const handleDelete = async (path: string) => {
        try {
            const response = await fetch('http://127.0.0.1:8081/deleteduplicates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ path }),
            });

            if (response.ok) {
                setEvents(prevEvents => prevEvents.filter(event => event.path !== path));
            } else {
                console.error('Delete request failed:', response);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Main Page
            </Typography>
            <List>
                {events.map(event => (
                    <ListItem key={`${event.path}_${event.last_write}`}
                              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }} 
                              divider>
                        <ListItemText 
                            primary={event.path} 
                            secondary={`Last Modified: ${event.last_write}`} 
                        />
                        <Button variant="outlined" color="error" onClick={() => handleDelete(event.path)}>
                            Delete
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default MainPage;
