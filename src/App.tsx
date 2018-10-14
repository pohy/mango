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
import { MainForm, IFormData } from './MainForm';
import { NavigationPage } from './NavigationPage';
import { LatLngTuple } from 'leaflet';

const styles = (theme: Theme) =>
    createStyles({
        main: {
            padding: theme.spacing.unit,
        },
    });

export type Waypoints = {
    origin: LatLngTuple;
    destination: LatLngTuple;
};

export interface IAppState {
    waypoints: Waypoints | null;
}

class AppComponent extends React.Component<
    WithStyles<typeof styles>,
    IAppState
> {
    state = {
        waypoints: null,
        // waypoints: {
        //     origin: null,
        //     destination: null,
        // origin: [50.11793646935712, 14.367370605468752] as LatLngTuple,
        // destination: [50.08804, 14.42076] as LatLngTuple,
        // origin: [8.34234, 48.23424] as LatLngTuple,
        // destination: [8.34423, 48.26424] as LatLngTuple,
        // },
    };

    formSubmitHandler = ({ origin, destination }: IFormData) =>
        this.setState({ waypoints: { origin, destination } });

    public render() {
        const { classes } = this.props;
        const {
            waypoints,
            // waypoints: { origin, destination },
        } = this.state;
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
                        {waypoints ? (
                            <NavigationPage {...{ waypoints }} />
                        ) : (
                            <MainForm onSubmit={this.formSubmitHandler} />
                        )}
                    </Grid>
                </main>
            </>
        );
    }
}

export const App = withStyles(styles)(AppComponent);
