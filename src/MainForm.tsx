import * as React from 'react';
import {
    Grid,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    createStyles,
    WithStyles,
    withStyles,
    Button,
} from '@material-ui/core';
import { LocationSelect } from './LocationSelect';
import { LatLngTuple } from 'leaflet';

enum Roles {
    Rider = 'rider',
    Driver = 'driver',
}

enum SelectingLocation {
    Origin = 'origin',
    Destination = 'destination',
}

const initialState = {
    origin: '',
    destination: '',
    role: Roles.Rider,
    selectingLocation: null,
};

const styles = createStyles({
    role: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
});

export interface IMainFormState {
    origin: string;
    destination: string;
    role: Roles;
    selectingLocation: null | SelectingLocation;
}

class MainFormComponent extends React.Component<
    WithStyles<typeof styles>,
    IMainFormState
> {
    state = { ...initialState };

    handleChange = (fieldName: keyof typeof initialState) => ({
        target: { value },
    }: React.ChangeEvent<HTMLInputElement>) =>
        (this.setState as any)({ [fieldName]: value });

    selectLocation = (selectingLocation: SelectingLocation) => () =>
        this.setState({ selectingLocation });

    locationHandler = (selectingLocation: SelectingLocation) => (
        location: LatLngTuple,
    ) =>
        (this.setState as any)({
            [selectingLocation]: location,
            selectingLocation: null,
        });

    render() {
        const { origin, destination, role, selectingLocation } = this.state;
        const { classes } = this.props;
        if (selectingLocation) {
            return (
                <LocationSelect
                    label={selectingLocation}
                    onLocation={this.locationHandler(selectingLocation)}
                />
            );
        }
        return (
            <>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Origin"
                        value={origin}
                        onFocus={this.selectLocation(SelectingLocation.Origin)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Destination"
                        value={destination}
                        onFocus={this.selectLocation(
                            SelectingLocation.Destination,
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <RadioGroup
                        value={role}
                        className={classes.role}
                        onChange={this.handleChange('role')}
                    >
                        <FormControlLabel
                            label="Rider"
                            control={<Radio />}
                            value={Roles.Rider}
                        />
                        <FormControlLabel
                            label="Driver"
                            control={<Radio />}
                            value={Roles.Driver}
                        />
                    </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth color="primary" variant="contained">
                        Let's go
                    </Button>
                </Grid>
            </>
        );
    }
}

export const MainForm = withStyles(styles)(MainFormComponent);
