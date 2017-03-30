import React, { Component } from 'react';
import Auth from '../routes/auth'
import Avatar from 'material-ui/Avatar';

class LeaderBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        this.getUsers = this.getUsers.bind(this)
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

    render() {
        let users = this.state.users.map((user, i) => {
            return (
                <tr key={i}>
                    <th scope="row">{i+1}</th>
                    <td><div style={{display: 'flex', justifyContent: 'flexStart', alignItems: 'center'}}><Avatar src={user.picture} /><p style={{margin:0, paddingLeft:5}} className="h4">{user.name}</p></div></td>
                    <td>{parseFloat(user.points).toFixed(0)}</td>
                </tr>
            )
        })
        return (
            <div className="col-sm-9">
                <h1 className="display-3">LeaderBoard<p className="h3"><small className="text-muted">Top Tipsters</small></p></h1>
                <table className="table table-striped table-responsive table-bordered">
                    <thead className="thead-inverse">
                        <tr>
                            <th>#</th>
                            <th>Tipster</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default LeaderBoard;