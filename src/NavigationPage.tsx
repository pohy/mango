import * as React from 'react';
import { LatLngTuple } from 'leaflet';
import {
    Grid,
    Theme,
    createStyles,
    WithStyles,
    withStyles,
    Button,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { DefaultMap } from './DefaultMap';
import { Waypoints } from './App';
import { Polyline } from 'react-leaflet';
import { RouteMarkers } from './RouteMarkers';

const API_KEY = '5b3ce3597851110001cf6248d18141a0047849b5a28ae11e5e140f50';

const styles = (theme: Theme) =>
    createStyles({
        fab: {
            position: 'absolute',
            bottom: theme.spacing.unit * 2,
            right: theme.spacing.unit * 2,
        },
    });

export interface INavigationPageProps extends WithStyles<typeof styles> {
    waypoints: Waypoints;
}

export interface INavigationPageState {
    routePoints: LatLngTuple[];
    peerRoute: LatLngTuple[];
    compoundRoute: LatLngTuple[];
}

class NavigationPageComponent extends React.Component<
    INavigationPageProps,
    INavigationPageState
> {
    state = {
        routePoints: [],
        peerRoute: [],
        compoundRoute: [],
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

    mergeRoutes = async () => {
        const { peerRoute } = this.state;
        const {
            waypoints: { origin, destination },
        } = this.props;
        const compoundRoute = await fetchRoute([
            origin,
            peerRoute[0],
            peerRoute[peerRoute.length - 1],
            destination,
        ]);
        this.setState({ compoundRoute });
    };

    render() {
        const {
            waypoints: { origin, destination },
            classes,
        } = this.props;
        const { routePoints, peerRoute, compoundRoute } = this.state;
        return (
            <>
                <Grid item xs={12}>
                    <DefaultMap center={origin} zoom={11}>
                        <RouteMarkers {...{ origin, destination }} />
                        {routePoints.length && (
                            <>
                                {compoundRoute.length ? (
                                    <>
                                        <Polyline positions={compoundRoute} />
                                        <Polyline
                                            positions={peerRoute}
                                            color="purple"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Polyline positions={routePoints} />
                                        <Polyline
                                            positions={peerRoute}
                                            color="red"
                                        />
                                    </>
                                )}
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
                <Button
                    variant="fab"
                    color="primary"
                    className={classes.fab}
                    onClick={this.mergeRoutes}
                >
                    <DoneIcon />
                </Button>
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

export function routeURL(points: LatLngTuple[]) {
    const coordinates = points.map(([lat, lng]) => `${lng},${lat}`).join('|');
    return `https://api.openrouteservice.org/directions?api_key=${API_KEY}&coordinates=${coordinates}&profile=driving-car&geometry_format=polyline`;
}

export const NavigationPage = withStyles(styles)(NavigationPageComponent);
