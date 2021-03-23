import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {handleSubmitAnswer} from '../actions/questions';
import cx from "clsx";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const styles = ({ spacing, palette }) => {
  const family =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  return {
    root: {
      display: "block",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 151,
    },
    flex: {
      display: "flex",
      padding: spacing(2),
      minWidth: 288,
      borderRadius: 12,
      margin: "1rem",
      borderBottom: "1px solid red",
      boxShadow: "0 2px 4px 0 rgba(138, 148, 159, 0.2)",
      "& > *:nth-child(1)": {
        marginRight: spacing(2),
      },
      "& > *:nth-child(2)": {
        flex: "auto",
      },
    },

    avatar: {},
    heading: {
      fontFamily: family,
      fontSize: 16,
      marginBottom: 0,
    },
    subheader: {
      fontFamily: family,
      fontSize: 14,
      color: palette.grey[600],
      letterSpacing: "1px",
      marginBottom: 4,
    },
  };
};
class Question extends React.Component {
  static propTypes = {
    prop: PropTypes,
  };
  state = {
    value: "",
    error: false,
  };

  handleChange = (event) => {
    this.setState({
      value: event,
      error: false,
      helperText: "",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { value } = this.state;
    const { dispatch, id } = this.props;
    if (!value || value === "") {
      this.setState({
        error: true,
        helperText: "Please Select one option!",
      });
    } else {
      dispatch(handleSubmitAnswer(id, value));
      console.log(id,value);
    }
  };
  render() {
    const { error, value, helperText } = this.state;
    const { classes } = this.props;
    const { avatar, name, optionOne, optionTwo } = this.props.question;
    console.log(this.props.question)
    return (
      <Grid container justify={"center"}>
        <Grid style={{ paddingTop: "3rem" }} item>
          <Grid>
            <Card className={classes.root}>
              <div className={classes.details}>
                <Card className={cx(classes.flex)} elevation={0}>
                  <Avatar
                    src={"https://i.pravatar.cc/300"}
                    className={classes.avatar}
                  />
                  <Box>
                    <h3 className={classes.heading}>{name} Asks ..</h3>
                    <p className={classes.subheader}>Would you rather?</p>
                  </Box>
                </Card>
                <CardContent className={classes.content}>
                  <form onSubmit={this.handleSubmit}>
                    <FormControl
                      component="fieldset"
                      error={error}
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        Would you rather ?
                      </FormLabel>
                      <RadioGroup
                        aria-label="Poll"
                        name="Poll"
                        value={value}
                        onChange={e => this.handleChange(e.currentTarget.value)}
                      >
                        <FormControlLabel
                          value={optionOne.text}
                          control={<Radio />}
                          label={optionOne.text}
                        />
                        <FormControlLabel
                          value={optionTwo.text}
                          control={<Radio />}
                          label={optionTwo.text}
                        />
                      </RadioGroup>
                      <FormHelperText>{helperText}</FormHelperText>
                      <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                      >
                        Check Answer
                      </Button>
                    </FormControl>
                  </form>
                </CardContent>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps ({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const author = question ? users[question.author] : '';
  const authedUserDetails = users[authedUser];

  return {
      question,
      author,
      authedUserDetails
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Question));