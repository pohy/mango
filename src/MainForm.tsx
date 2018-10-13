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

enum Roles {
    Rider = 'rider',
    Driver = 'driver',
}

const initialState = {
    origin: '',
    destination: '',
    role: Roles.Rider,
};

const styles = createStyles({
    role: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
});

class MainFormComponent extends React.Component<
    WithStyles<typeof styles>,
    typeof initialState
> {
    state = { ...initialState };

    handleChange = (fieldName: keyof typeof initialState) => ({
        target: { value },
    }: React.ChangeEvent<HTMLInputElement>) =>
        (this.setState as any)({ [fieldName]: value });

    render() {
        const { origin, destination, role } = this.state;
        const { classes } = this.props;
        return (
            <>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Origin"
                        value={origin}
                        onChange={this.handleChange('origin')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Destination"
                        value={destination}
                        onChange={this.handleChange('destination')}
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
