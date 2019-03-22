import React, { Component } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import $ from 'jquery';

let Count = 0;

class GetProducts extends Component {

    constructor() {
        super();
        this.state = {};
        this.export = this.export.bind(this);
        this.NumTemplate = this.NumTemplate.bind(this);
        this.actionTemplate = this.actionTemplate.bind(this);
        this.onEditorValueChange = this.onEditorValueChange.bind(this);
    }
    export() {
        this.dt.exportCSV();
    }
    componentDidMount() {
        let _this = this;
        $.ajax({
            url: "/api/catalog_system/pvt/seller/list?sc=1&sellerType=1&isBetterScope=false",
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
                console.log(data)
                _this.setState({ sellers: data });
            },
            error: function () { console.log('Failed!'); }
        });
    }
    componentDidUpdate() {
        Count = 0;
    }
    GetProducts(value) {
        console.log(this.state)
        let _this = this;
        value && $.ajax({
            url: "/api/catalog_system/pub/products/search/?fq=sellerIds:" + value,
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
                console.log(data)
                _this.setState({ products: data });
            },
            error: function () { console.log('Failed!'); }
        });
    }
    NumTemplate(rowData, column, e) {
        Count++;
        return <span>{Count}</span>;
    }
    actionTemplate(rowData, column) {
        return <div>
            <Button type="button" icon="pi pi-search" className="p-button-success" style={{ marginRight: '.5em' }}></Button>
        </div>;
    }
    onEditorValueChange(value) {
        console.log(value)
        //this.setState({ seller: value })
        this.GetProducts(value.SellerId);
    }
    render() {

        console.log(this.state)
        return (
            <div>
                <Dropdown value={this.state.seller} options={this.state.sellers} optionLabel="Name" dataKey="SellerId" onChange={(e) => this.onEditorValueChange(e.value)} placeholder="Selecciona un seller" />

                {this.state.products && <div className="content-section implementation">
                    <h3>Productos de {this.state.seller}</h3>
                    <DataTable value={this.state.products} ef={(el) => { this.dt = el; }}>
                        <Column header="#" body={this.NumTemplate} />
                        <Column field="productId" header="productId" />
                        <Column field="productName" header="productName" />
                    </DataTable>

                </div>}
            </div>
        );
    }
}
export default GetProducts;
