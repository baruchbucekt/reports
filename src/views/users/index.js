import React, { Component } from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import $ from 'jquery'; 

class UsersTable extends Component {

    constructor() {
        super();
        this.state = {};
        this.export = this.export.bind(this);
    }


    export() {
        this.dt.exportCSV();
    }
    componentDidMount(){
        let _this = this;
        $.ajax({
            type: 'GET',
            url: './allUser.json',
            dataType: 'json',
            success: function(data){
                console.log(data.items)
                
         _this.setState({ users: data.items});
            },
            error: function() { console.log('Failed!'); }
        });
    }

    render() {
        var header = <div style={{textAlign:'left'}}><Button type="button" icon="pi pi-external-link" iconPos="left" label="CSV" onClick={this.export}></Button></div>;

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
                        <Column field="email" header="email" />
                        <Column field="name" header="name" />
                    </DataTable>

                </div>
            </div>
        );
    }
}
export default UsersTable;
