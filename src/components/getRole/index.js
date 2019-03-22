import React from 'react';
import $ from 'jquery';

const GetRole = (props) => {
    //console.log(props)
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/license-manager/users/" + props.id + "/roles",
        "method": "GET",
        "headers": {
            "x-vtex-api-appKey": "ebrodriguezb@elektra.com.mx",
            "x-vtex-api-appToken": "B@ruch2891",
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": ""
    }

    let allroles = $.ajax(settings).done(function (response) {
        console.log(response)
        return (response);
    });
    return (
        allroles
    );
};

export default GetRole;
