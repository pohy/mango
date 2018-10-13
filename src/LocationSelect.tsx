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
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapMarker } from './MapMarker';
import { LatLngTuple, LatLngExpression } from 'leaflet';

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
}

const initialState = {
    center: [50.08804, 14.42076],
};

class LocationSelectComponent extends React.Component<
    ILocationSelectProps,
    typeof initialState
> {
    state = { ...initialState };

    viewportChangeHandler = ({ center }: any) => this.setState({ center });

    locationConfirmHandler = () =>
        this.props.onLocation(this.state.center as LatLngExpression);

    render() {
        const { label, classes } = this.props;
        const { center } = this.state;
        return (
            <>
                <Grid item xs={12}>
                    <Paper>
                        <TextField
                            fullWidth
                            value={center.join(', ')}
                            {...{ label }}
                            variant="outlined"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Map
                        className={classes.map}
                        zoom={11}
                        zoomControl={false}
                        onViewportChange={this.viewportChangeHandler}
                        center={center as LatLngTuple}
                    >
                        <TileLayer
                            url="http://{s}.tile.openstreetmap.com/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        <MapMarker />
                    </Map>
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
