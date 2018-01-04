var exec = require('child_process').exec;

var vmstatInfo = {
    'r'     : { name: 'procs-r'     , unit:'number' , explain: '実行待ちプロセス数' },
    'b'     : { name: 'procs-b'     , unit:'number' , explain: '割り込み不可能なスリープ状態のプロセス数' },
    'swapd' : { name: 'memory-swapd', unit:'KB'     , explain: 'スワップ領域のサイズ(KB)' },
    'free'  : { name: 'memory-free' , unit:'KB'     , explain: '空きメモリサイズ(KB)' },
    'buff'  : { name: 'memory-buff' , unit:'KB'     , explain: 'バッファに割り当てられたメモリサイズ(KB)' },
    'cache' : { name: 'memory-cache', unit:'KB'     , explain: 'キャッシュに割り当てられたメモリサイズ(KB)' },
    'si'    : { name: 'swap-si'     , unit:'KB/s'   , explain: 'ディスクからスワップインされているメモリサイズ(KB/s)' },
    'so'    : { name: 'swap-so'     , unit:'KB/s'   , explain: 'ディスクへスワップアウトされているメモリサイズ(KB/s)' },
    'bi'    : { name: 'io-bi'       , unit:'block/s', explain: 'ブロックデバイスから受け取ったブロック(ブロック/s)' },
    'bo'    : { name: 'io-bo'       , unit:'block/s', explain: 'ブロックデバイスに送られたブロック(ブロック/s)' },
    'in'    : { name: 'system-in'   , unit:'times/s', explain: '1秒あたりの割り込み回数' },
    'cs'    : { name: 'system-cs'   , unit:'times/s', explain: '1秒あたりのコンテキストスイッチの回数' },
    'us'    : { name: 'cpu-us'      , unit:'%'      , explain: 'ユーザープロセスがCPUを使用している時間の割合' },
    'sy'    : { name: 'cpu-sy'      , unit:'%'      , explain: 'カーネルがCPUを使用している時間の割合' },
    'id'    : { name: 'cpu-id'      , unit:'%'      , explain: 'CPUがアイドル状態の時間の割合' },
    'wa'    : { name: 'cpu-wa'      , unit:'%'      , explain: 'ディスクI/O待ち時間の割合' },
    'st'    : { name: 'cpu-st'      , unit:'%'      , explain: 'ゲストOSがCPUを割り当てられなかった時間の割合' }
};

var vmstat = function() {
    var promise = new Promise((resolve, reject) => {
        exec('vmstat', function(err, stdout, stderr){
            var lines = stdout.split(/\r?\n/);
            var labels = lines[1].split(/\s+/g);
            var values = lines[2].split(/\s+/g);
        
            var data = {};
            for (var i = 0; i < labels.length; i++) {
                var item = vmstatInfo[labels[i]];
                if (!item) continue;
        
                data[item.name] = values[i] + ' ' + item.unit;
            }
        
            resolve(data);
        });
    });

    return promise;
};


module.exports = vmstat;








