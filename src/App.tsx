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
import { LatLngExpression } from 'leaflet';

const styles = (theme: Theme) =>
    createStyles({
        main: {
            padding: theme.spacing.unit,
        },
    });

export interface IAppState {
    waypoints: {
        origin: LatLngExpression | null;
        destination: LatLngExpression | null;
    };
}

class AppComponent extends React.Component<
    WithStyles<typeof styles>,
    IAppState
> {
    state = {
        waypoints: {
            origin: null,
            destination: null,
        },
    };

    formSubmitHandler = ({ origin, destination }: IFormData) =>
        this.setState({ waypoints: { origin, destination } });

    public render() {
        const { classes } = this.props;
        const {
            waypoints,
            waypoints: { origin, destination },
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
                        {!origin || !destination ? (
                            <MainForm onSubmit={this.formSubmitHandler} />
                        ) : <NavigationPage {...{waypoints}} />}
                    </Grid>
                </main>
            </>
        );
    }
}

export const App = withStyles(styles)(AppComponent);
