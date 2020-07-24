function is_null(v) {
    return v === null;
}

function is_defined(variable) {
    // 只是伪定义，因为函数的机制导致走不到这一步
    if (typeof variable !== 'undefined') {
        return true;
    }
    return false;
}

function getParsedQuery() {
    var queryString = window.location.search.substring(1);
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}
getParsedQuery();
