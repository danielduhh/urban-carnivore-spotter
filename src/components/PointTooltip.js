import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {KeyboardArrowRight} from "@material-ui/icons";
import Placeholder from '../assets/placeholder.svg';

const timeToString = time => {
    const date = new Date(time);
    return `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`;
};

const styles = {
    allContent: {
        display: 'flex',
        height: 80,
    },
    caption: {
        fontWeight: 'bold'
    },
    reportLink: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    image: {
        maxWidth: 40,
        maxHeight: 40,
        margin: 4
    }
};

class PointTooltip extends Component {
    render() {
        const { report, classes, history } = this.props;
        return <div className={classes.allContent}>
            <img className={classes.image} src = {report.data.mediaPaths && report.data.mediaPaths.length>0 ? report.data.mediaPaths[0] : Placeholder}  />
            <div className={classes.info}>
                <div><strong>{report.data.species}</strong></div>
                <div><strong>Date & Time:</strong></div>
                <div>{timeToString(report.data.timestamp)}</div>
                <div><strong>Location:</strong> {report.data.neighborhood}</div>
            </div>
            <div className={classes.reportLink} onClick={() => history.push(`/reports/${report.id}`)}>
                <KeyboardArrowRight/>
            </div>
        </div>
    }
};

export default withStyles(styles)(withRouter(PointTooltip));