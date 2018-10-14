// import 'leaflet/dist/leaflet.css';

import * as React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import { LatLngExpression } from 'leaflet';

const styles = createStyles({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        zIndex: -1,
    },
});

export interface IDefaultMapProps extends WithStyles<typeof styles> {
    center?: LatLngExpression;
    zoom?: number;
    onViewportChange?: (
        viewport: { center: LatLngExpression; zoom: number },
    ) => void;
}

const DefaultMapComponent: React.SFC<IDefaultMapProps> = ({
    classes,
    children,
    center,
    zoom,
    onViewportChange,
}) => (
    <Map
        scrollWheelZoom
        touchZoom
        className={classes.map}
        zoomControl={false}
        zoom={zoom || 11}
        center={center || [50, 8]}
        {...{ onViewportChange }}
    >
        <TileLayer
            url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {children}
    </Map>
);

export const DefaultMap = withStyles(styles)(DefaultMapComponent);
