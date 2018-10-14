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
    formData: {
        origin: undefined,
        destination: undefined,
        role: Roles.Rider,
    },
    // formData: {
    //     origin: [50.11793646935712, 14.367370605468752] as LatLngTuple,
    //     destination: [50.08804, 14.42076] as LatLngTuple,
    // },
    // formData: null,
    selectingLocation: null,
};

const styles = createStyles({
    role: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
});

export interface IFormData {
    origin: LatLngTuple;
    destination: LatLngTuple;
    role: Roles;
}

export interface IMainFormProps extends WithStyles<typeof styles> {
    onSubmit?: (formData: IFormData) => void;
}

export interface IMainFormState {
    selectingLocation: null | SelectingLocation;
    formData: Partial<IFormData>;
}

class MainFormComponent extends React.Component<
    IMainFormProps,
    IMainFormState
> {
    state = { ...initialState };

    handleChange = (fieldName: keyof IFormData) => ({
        target: { value },
    }: React.ChangeEvent<HTMLInputElement>) =>
        (this.setState as any)({ formData: {...this.state.formData, [fieldName]: value }});

    selectLocation = (selectingLocation: SelectingLocation) => () =>
        this.setState({ selectingLocation });

    locationHandler = (selectingLocation: SelectingLocation) => (
        location: LatLngTuple,
    ) =>
        (this.setState as any)({
            formData: {...this.state.formData, [selectingLocation]: location},
            selectingLocation: null,
        });

    submitHandler = () =>
        this.props.onSubmit &&
        this.state.formData &&
        this.props.onSubmit(this.state.formData as any);

    render() {
        const { formData, selectingLocation } = this.state;
        const { classes } = this.props;
        const { origin, destination, role } = formData;
        if (selectingLocation) {
            return (
                <LocationSelect
                    label={selectingLocation}
                    onLocation={this.locationHandler(selectingLocation)}
                    center={this.state[selectingLocation]}
                />
            );
        }
        return (
            <>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Origin"
                        value={origin || ''}
                        onFocus={this.selectLocation(SelectingLocation.Origin)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Destination"
                        value={destination || ''}
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
                    <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        onClick={this.submitHandler}
                    >
                        Let's go
                    </Button>
                </Grid>
            </>
        );
    }
}

export const MainForm = withStyles(styles)(MainFormComponent);
