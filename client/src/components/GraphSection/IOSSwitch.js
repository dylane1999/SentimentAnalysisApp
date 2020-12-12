import { withStyles } from '@material-ui/core/styles';
import {Switch} from '@material-ui/core';

export const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 50,
    height: 28,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(22px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#434343',
        opacity: 1,
        border: `1px solid ${theme.palette.grey[400]}`,
      },
    },
    '&$focusVisible $thumb': {
      color: '#434343',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 26,
    height: 26,
  },
  track: {
    borderRadius: 28 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: "#5DD7FC",
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});


export default IOSSwitch