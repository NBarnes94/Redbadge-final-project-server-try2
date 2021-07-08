module.exports = (req, res, next) =>{
    res.header('access-control-allow-origin', "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE");
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, accept, Authorization');

    next()
}