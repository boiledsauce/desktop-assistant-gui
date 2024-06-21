import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardContent, Typography } from '@mui/material';

interface Feature {
    path: string;
    title: string;
    description: string;
}

const features: Feature[] = [
    { path: "/main_window", title: "Home", description: "Main dashboard" },
    { path: "/duplicate-cleanup", title: "Duplicate Files Cleanup", description: "Remove duplicate files from your system" },
    { path: "/job-applyer", title: "Job Applyer", description: "Automate sending job applications" },
    { path: "/clipboard-access", title: "Clipboard Access", description: "Manage your clipboard history" },
    { path: "/setup-environments", title: "Setup Environments", description: "Configure your work environments" },
    { path: "/picture-generator", title: "Picture Generator", description: "Generate pictures based on AI" },
];

interface FeatureCardProps {
    path: string;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ path, title, description }) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card raised>
                {/* Wrap CardActionArea with Link instead of using component prop on CardActionArea */}
                <Link to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5" component="h2">{title}</Typography>
                            <Typography variant="body2" color="textSecondary">{description}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </Grid>
    );
};

const Dashboard = () => {
    return (
        <Grid container spacing={2} style={{ padding: 20 }}>
            {features.map(feature => (
                <FeatureCard key={feature.title} {...feature} />
            ))}
        </Grid>
    );
};

export default Dashboard;
