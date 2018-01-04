var ngrok = require('ngrok');
var Ftp = require('ftp');
var config = require('./config')

ngrok.connect({
    proto: 'http',
    addr: 3000,
    auth: config.ngrok.basicAuth,
    authtoken: config.ngrok.authToken,
    region: 'ap', // Asia Pacific
    bind_tls: true
}, (err, url) => {
    console.log("[ngrok] Error:", err);
    console.log("[ngrok] Url:", url);

    if (!url) return;

    var azProxies = {
        "$schema": "http://json.schemastore.org/proxies",
        "proxies": {
            "proxy01": {
                "matchCondition": {
                    "route": "/proxies/{*path}"
                },
                "backendUri": `${url}/{path}`
            }
        }
    };

    var ftp = new Ftp();

    ftp.connect({
        host: config.azure.host,
        port: 21,
        secure: true,
        user: config.azure.user,
        password: config.azure.password
    });
    ftp.on('ready', () => {
        console.log("[ftp] ready");

        var buf = Buffer.from(JSON.stringify(azProxies), 'utf-8');
        ftp.put(buf, "/site/wwwroot/proxies.json", (err) => {
            console.log("[ftp] put Error:", err);
            ftp.end();
        });
    });
});
