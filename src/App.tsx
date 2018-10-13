import * as React from 'react';
import {
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    Grid,
    createStyles,
    Theme,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import { MainForm } from './MainForm';

const styles = (theme: Theme) =>
    createStyles({
        main: {
            padding: theme.spacing.unit,
        },
    });

class AppComponent extends React.Component<WithStyles<typeof styles>, {}> {
    public render() {
        const { classes } = this.props;
        return (
            <>
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            ManGo
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.main}>
                    <Grid container spacing={8}>
                        <MainForm />
                    </Grid>
                </main>
            </>
        );
    }
}

export const App = withStyles(styles)(AppComponent);
