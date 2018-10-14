import * as React from 'react';
import { LatLngTuple } from 'leaflet';
import { Grid } from '@material-ui/core';
import { DefaultMap } from './DefaultMap';
import { Waypoints } from './App';
import { Polyline } from 'react-leaflet';
import { RouteMarkers } from './RouteMarkers';

const API_KEY = '5b3ce3597851110001cf6248d18141a0047849b5a28ae11e5e140f50';

export interface INavigationPageProps {
    waypoints: Waypoints;
}

export interface INavigationPageState {
    routePoints: LatLngTuple[];
    peerRoute: LatLngTuple[];
}

export class NavigationPage extends React.Component<
    INavigationPageProps,
    INavigationPageState
> {
    state = {
        routePoints: [],
        peerRoute: [],
    };

    async componentDidMount() {
        const {
            waypoints: { origin, destination },
        } = this.props;
        const routePoints = await fetchRoute([origin, destination]);
        const peerRoutePoints = generatePeerRoute(routePoints);
        console.log([origin, destination], peerRoutePoints);
        const peerRoute = await fetchRoute(peerRoutePoints);
        this.setState({ routePoints, peerRoute });
    }

    render() {
        const {
            waypoints: { origin, destination },
        } = this.props;
        const { routePoints, peerRoute } = this.state;
        // const peerRoute = routePoints.slice(
        //     ,
        //     Math.floor(routePoints.length * 0.8)
        // );
        return (
            <>
                <Grid item xs={12}>
                    <DefaultMap center={origin} zoom={11}>
                        <RouteMarkers {...{ origin, destination }} />
                        {routePoints.length && (
                            <>
                                <Polyline positions={routePoints} />
                                <Polyline positions={peerRoute} color="red" />
                                <RouteMarkers
                                    color="red"
                                    origin={peerRoute[0]}
                                    destination={
                                        peerRoute[peerRoute.length - 1]
                                    }
                                />
                            </>
                        )}
                    </DefaultMap>
                </Grid>
            </>
        );
    }
}

function generatePeerRoute(points: LatLngTuple[]) {
    return [
        points[Math.floor(points.length * 0.4)],
        points[Math.floor(points.length * 0.8)],
    ].map(([lat, lng]) => [
        lat + peerRouteOffset(),
        lng + peerRouteOffset(),
    ]) as LatLngTuple[];
}

function peerRouteOffset() {
    return (Math.random() / 128) * (Math.random() > 0.5 ? 1 : -1);
}

async function fetchRoute(points: LatLngTuple[]) {
    const routeRequestURL = routeURL(points);
    // const result = await window.fetch('/ors__directions_get_1539471971810.json').then((res) => res.json());
    const result = await window
        .fetch(routeRequestURL)
        .then((res) => res.json());
    const [route] = result.routes;
    const { geometry } = route;
    return geometry.map((point: LatLngTuple) =>
        point.reverse(),
    ) as LatLngTuple[];
}

export function routeURL(
    // [originLat, originLng]: LatLngTuple,
    // [destinationLat, destinationLng]: LatLngTuple,
    points: LatLngTuple[],
) {
    const coordinates = points.map(([lat, lng]) => `${lng},${lat}`).join('|');
    return `https://api.openrouteservice.org/directions?api_key=${API_KEY}&coordinates=${coordinates}&profile=driving-car&geometry_format=polyline`;
}

// function formatCoord(coord: number) {
//     return coord.toString().substring(0, 7);
// }
