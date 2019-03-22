import React, { Component } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import $ from 'jquery';

let Count = 0;

class GetCoupons extends Component {

    constructor() {
        super();
        this.state = {};
        this.export = this.export.bind(this);
        this.NumTemplate = this.NumTemplate.bind(this);
    }
    export() {
        this.dt.exportCSV();
    }
    componentDidMount() {
        let _this = this;
        console.log(2)
        $.ajax({
            url: "/api/rnb/pvt/coupon/",
            type: "GET",
            dataType: 'json',
            headers: {
                "X-VTEX-API-AppKey": "ebrodriguezb@elektra.com.mx",
                "X-VTEX-API-AppToken": "B@ruch2891",
                "Content-Type": "application/json",
                "cache-control": "no-cache"
            },
            processData: false,
            success: function (data) {
                _this.setState({ coupons: data });
            },
            error: function () { console.log('Failed!'); }
        });
    }
    NumTemplate(rowData, column, e) {
        Count++;
        return <span>{Count}</span>;
    }
    displaySelection(data) {
        if (!data || data.length === 0) {
            return <div style={{ textAlign: 'left' }}>No Selection</div>;
        }
        else {
            return <div style={{ textAlign: 'left' }}>{data.length}></div>;
        }
    }
    render() {
        var header = <div style={{ textAlign: 'left' }}>
            <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Global Search" size="50" />
            <Button type="button" icon="pi pi-external-link" iconPos="left" label="CSV" onClick={this.export}></Button>
        </div>;

        console.log(this.state, this.state.globalFilter)
        return (
            <div>

                <div className="content-section implementation">
                    <h3>Basic</h3>
                    <DataTable value={this.state.coupons} ef={(el) => { this.dt = el; }}
                        header={header}
                        footer={this.displaySelection(this.state.globalFilter)}
                        globalFilter={this.state.globalFilter}>
                        <Column header="#" body={this.NumTemplate} />
                        <Column field="couponCode" header="couponCode" />
                        <Column field="utmSource" header="utmSource" />
                        <Column field="isArchived" header="isArchived" />
                        <Column field="maxItemsPerClient" header="maxItemsPerClient" />
                    </DataTable>

                </div>
            </div>
        );
    }
}
export default GetCoupons;
