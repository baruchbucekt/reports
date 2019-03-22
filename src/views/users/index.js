import React, { Component } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import $ from 'jquery';

import GetRol from '../../components/getRole';
import GetRole from '../../components/getRole';

let Count = 0;

class UsersTable extends Component {

    constructor() {
        super();
        this.state = {};
        this.export = this.export.bind(this);
        this.NumTemplate = this.NumTemplate.bind(this);
        this.actionTemplate = this.actionTemplate.bind(this);
    }
    export() {
        this.dt.exportCSV();
    }
    componentDidMount() {
        let _this = this;
        $.ajax({
            type: 'GET',
            //url: '/api/license-manager/site/pvt/logins/list/paged?sort=name&sortType=ASC&numItems=12000',
            url: './allUser.json',
            dataType: 'json',
            success: function (data) {
                //console.log(data.items)
                _this.setState({ users: data.items });
            },
            error: function () { console.log('Failed!'); }
        });
    }
    actionTemplate = (data) => {
        //console.log(data)
        return GetRole(data).toString();
    }
    NumTemplate(rowData, column, e) {
        Count++;
        return <span>{Count}</span>;
    }
    render() {
        var header = <div style={{ textAlign: 'left' }}><Button type="button" icon="pi pi-external-link" iconPos="left" label="CSV" onClick={this.export}></Button></div>;

        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>DataTable</h1>
                        <p>DataTable displays data in tabular format.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <h3>Basic</h3>
                    <DataTable value={this.state.users} header={header} ref={(el) => { this.dt = el; }}>
                        <Column header="#" body={this.NumTemplate} />
                        <Column field="email" header="email" />
                        <Column field="name" header="name" />
                        <Column body={this.actionTemplate} />
                    </DataTable>

                </div>
            </div>
        );
    }
}
export default UsersTable;
