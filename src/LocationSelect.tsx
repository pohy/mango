import * as React from 'react';
import {
    Grid,
    TextField,
    withStyles,
    createStyles,
    WithStyles,
    Paper,
    Theme,
    Button,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { MapMarker } from './MapMarker';
import { LatLngTuple, LatLngExpression } from 'leaflet';
import { DefaultMap } from './DefaultMap';

const styles = (theme: Theme) =>
    createStyles({
        map: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            zIndex: -1,
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing.unit * 2,
            right: theme.spacing.unit * 2,
        },
    });

export interface ILocationSelectProps extends WithStyles<typeof styles> {
    label: string;
    onLocation: (location: LatLngExpression) => void;
    center?: LatLngExpression;
}

export interface ILocationSelectState {
    center: LatLngExpression;
    zoom: number;
}

class LocationSelectComponent extends React.Component<
    ILocationSelectProps,
    ILocationSelectState
> {
    state = { center: this.props.center || [50.08804, 14.42076], zoom: 10 };

    viewportChangeHandler = ({ center, zoom }: any) =>
        this.setState({ center, zoom });

    locationConfirmHandler = () =>
        this.props.onLocation(this.state.center as LatLngExpression);

    render() {
        const { label, classes } = this.props;
        const { center, zoom } = this.state;
        return (
            <>
                <Grid item xs={12}>
                    <Paper>
                        <TextField
                            fullWidth
                            value={center.toString()}
                            {...{ label }}
                            variant="outlined"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <DefaultMap
                        onViewportChange={this.viewportChangeHandler}
                        center={center as LatLngTuple}
                        {...{ zoom }}
                    >
                        <MapMarker />
                    </DefaultMap>
                </Grid>
                <Button
                    variant="fab"
                    color="primary"
                    className={classes.fab}
                    onClick={this.locationConfirmHandler}
                >
                    <DoneIcon />
                </Button>
            </>
        );
    }
}

export const LocationSelect = withStyles(styles)(LocationSelectComponent);
