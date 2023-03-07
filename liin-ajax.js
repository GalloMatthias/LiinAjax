function LiinAjax_Endpoint(endpointObject) {

    var endpoint = endpointObject.url + '?';
    var isFirstProperty = true;

    for (property in endpointObject.query) {
        if (isFirstProperty) {
            endpoint += property + '=' + endpointObject.query[property];
            isFirstProperty = false;
        } else {
            endpoint += '&' + property + '=' + endpointObject.query[property];
        }
    }

    return endpoint;

}


function LiinAjax(object) {

    /* AJAX method 'GET', 'POST', 'PUT' default: 'GET' */
    var method = 'GET';

    if ( object.method !== undefined ) {
        method = object.method;
    }

    /* AJAX endpoint, string or LiinAjax_Endpoint object */
    var endpoint = false;

    if (typeof object.endpoint === 'string' || object.endpoint instanceof String) {
        endpoint = object.endpoint;
    } else {
        endpoint = LiinAjax_Endpoint(object.endpoint);
    }

    /* AJAX XMLHttpRequest */
    var xhr = new XMLHttpRequest();
    xhr.open(method, endpoint, true);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                object.success(this.responseText);
            } else {
                object.error();
            }
        }
    }

    if (method == 'POST') {
        xhr.send(object.data);
    } else {
        xhr.send();
    }
}

function LiinAjaxSerializeFormData(form) {
    return new FormData(form);
}