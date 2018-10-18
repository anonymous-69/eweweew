const Regex = require('regex');

function paytm_url(url){
	const middleware_regex = /https:\/\/(middleware)/gm;
    const catalog_regex = /https:\/\/(catalog)/gm;
    let middleware_checker;
    let catalog_checker;
    if ((middleware_checker = middleware_regex.exec(url)) !== null) {
        if (middleware_checker.index === middleware_regex.lastIndex) {
            middleware_regex.lastIndex++;
        }
        let product_url = url.replace(/middleware\./gm, '');
        return product_url
    }
    else if  ((catalog_checker = catalog_regex.exec(url)) !== null) {
        if (catalog_checker.index === catalog_regex.lastIndex) {
            catalog_regex.lastIndex++;
        }
        let product_url = url.replace(/catalog\.paytm/gm, 'paytmmall');
        return product_url
    }
    else{
        let product_url = "URL not found."
        return product_url
    }
}


module.exports.paytm_url= paytm_url