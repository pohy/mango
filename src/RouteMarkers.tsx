import { LatLngTuple } from 'leaflet';
import * as React from 'react';
import { Marker } from 'react-leaflet';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';

const styles = createStyles({
    red: {
        filter: 'invert(100%)',
    },
});

enum Colors {
    red = 'red',
}

export interface IRouteMarkersProps extends WithStyles<typeof styles> {
    origin: LatLngTuple;
    destination: LatLngTuple;
    color?: keyof typeof Colors;
}

const RouteMarkersComponent: React.SFC<IRouteMarkersProps> = ({
    origin,
    destination,
    color,
    classes,
}) => {
    const className = color ? classes[color] : undefined;
    return (
        <>
            <Marker position={origin} ref={setColor(className)} />
            <Marker position={destination} ref={setColor(className)} />
        </>
    );
};

function setColor(className?: string) {
    return (ref: any) =>
        className &&
        ref &&
        ref.leafletElement &&
        ref.leafletElement.getElement().classList.add(className);
}

export const RouteMarkers = withStyles(styles)(RouteMarkersComponent);
