import React, { Component } from 'react';
import Auth from '../routes/auth';
import Avatar from 'material-ui/Avatar';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import FullStar from 'material-ui/svg-icons/toggle/star';
import Star from 'material-ui/svg-icons/toggle/star-border';
import { Link } from 'react-router';
import { Helmet } from "react-helmet";
import './Leaderboard.css'

class LeaderBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        this.getUsers = this.getUsers.bind(this)
        this.avatarFormatter = this.avatarFormatter.bind(this)
        this.statusFormatter = this.statusFormatter.bind(this)
    }
    componentDidMount() {
        this.getUsers()
    }
    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error); // eslint-disable-line no-console
        throw error;
    }
    parseJSON(response) {
        return response.json();
    }
    getUsers() {
        fetch('/api/gettopusers', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${Auth.getToken()}`
            }
        }).then(this.checkStatus)
            .then(this.parseJSON)
            .then((data) => {
                this.setState({
                    users: data
                })
            })
    }
    avatarFormatter(cell, row) {
        return (
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={"/profile/" + cell.fbId}>
                <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                    <Avatar src={cell.picture} /><p style={{ margin: 0, paddingLeft: 5 }} className="h4">{cell.name}</p>
                </div>
            </Link>
        )
    }
    statusFormatter(cell, row) {
        let rank = []
        let colors = {
            '1': '#d59267',
            '2': '#a5c9e1',
            '3': '#b4b4b4',
            '4': '#dbb87e',
            '5': '#cc3e32'
        }
        for (let i = 0; i < 5; i++) {
            console.log(cell)
            i < cell ?
                rank.push(<FullStar style={{ width: '18px', height: '18px' }} viewBox='-1.5 -1.5 27 27' color={colors[`${cell}`]} key={i} />) :
                rank.push(<Star style={{ width: '18px', height: '18px' }} viewBox='-1.5 -1.5 27 27' color='#f4dacb' key={i} />)
        }
        return (
            <div>
                {rank}
            </div>
        )
    }
    render() {
        let users = this.state.users.map((user, i) => (
            {
                id: i + 1,
                name: { name: user.name, picture: user.picture, fbId: user.fbId },
                points: parseFloat(user.points).toFixed(0),
                rank: parseFloat(user.rank).toFixed(0)
            }
        ))
        return (
            <div>
                <Helmet>
                    <title>{`Football Today - Leaderboard of top prediction makers`}</title>
                </Helmet>
                <BootstrapTable data={users} bordered={false} striped hover>
                    <TableHeaderColumn headerAlign='center' columnClassName="clmn" dataAlign='center' width='80' dataField='id' isKey={true}>#</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataFormat={this.avatarFormatter}>Name</TableHeaderColumn>
                    <TableHeaderColumn headerAlign='center' columnClassName="clmn" dataAlign='center' width='80' dataField='points'>Points</TableHeaderColumn>
                    <TableHeaderColumn headerAlign='center' columnClassName="clmn" dataAlign='center' width='120' dataField='rank' dataFormat={this.statusFormatter}>Status</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default LeaderBoard;