import * as React from 'react';
import { LatLngTuple } from 'leaflet';
import { Grid } from '@material-ui/core';
import { DefaultMap } from './DefaultMap';
import { Waypoints } from './App';
import { Marker, Polyline } from 'react-leaflet';

const API_KEY = '5b3ce3597851110001cf6248d18141a0047849b5a28ae11e5e140f50';

export interface INavigationPageProps {
    waypoints: Waypoints;
}

const initialState = {
    routePoints: [],
};

export class NavigationPage extends React.Component<
    INavigationPageProps,
    typeof initialState
> {
    state = { ...initialState };
    async componentDidMount() {
        const {
            waypoints: { origin, destination },
        } = this.props;
        const routeRequestURL = routeURL(origin, destination);
        // const result = await window.fetch('/ors__directions_get_1539471971810.json').then((res) => res.json());
        const result = await window
            .fetch(routeRequestURL)
            .then((res) => res.json());
        const [route] = result.routes;
        const { geometry } = route;
        const routePoints = geometry.map((point: LatLngTuple) =>
            point.reverse(),
        );
        this.setState({ routePoints });
    }

    render() {
        const {
            waypoints: { origin, destination },
        } = this.props;
        const { routePoints } = this.state;
        return (
            <>
                <Grid item xs={12}>
                    <DefaultMap center={origin} zoom={11}>
                        <Marker position={origin}>Origin</Marker>
                        <Marker position={destination}>Destination</Marker>
                        {routePoints.length && (
                            <Polyline positions={routePoints} />
                        )}
                    </DefaultMap>
                </Grid>
            </>
        );
    }
}

export function routeURL(
    [originLat, originLng]: LatLngTuple,
    [destinationLat, destinationLng]: LatLngTuple,
) {
    return `https://api.openrouteservice.org/directions?api_key=${API_KEY}&coordinates=${formatCoord(
        originLng,
    )},${formatCoord(originLat)}|${formatCoord(destinationLng)},${formatCoord(
        destinationLat,
    )}&profile=driving-car&geometry_format=polyline`;
}

function formatCoord(coord: number) {
    return coord.toString().substring(0, 7);
}
