//http://bookmarklets.org/maker/

function getEngine(hostname) {
    if (hostname === "google.com" || hostname.endsWith(".google.com")) {
        return "google";
    }

    if (hostname === "bing.com" || hostname.endsWith(".bing.com")) {
        return "bing";
    }

    return "";
}

function getOppositeEngine(engine) {
    if (engine === "google") {
        return "bing";
    }

    if (engine === "bing") {
        return "google";
    }

    return "";
}

function getVertical(engine, url) {
    if (engine === "google") {
        if (url.startsWith("https://news.google.com") || url.indexOf("tbm=nws") !== -1) {
            return "news";
        }

        if (url.indexOf("tbm=isch") !== -1) {
            return "images";
        }

        if (url.indexOf("tbm=vid") !== -1) {
            return "videos";
        }
    }

    if (engine === "bing") {
        if (url.startsWith("https://www.bing.com/news")) {
            return "news";
        }

        if (url.startsWith("https://www.bing.com/images")) {
            return "images";
        }

        if (url.startsWith("https://www.bing.com/videos")) {
            return "videos";
        }
    }

    return "";
}

function getQuery(url) {
    var regex = /\/search(\?|\?.+&)q=([^&]+)/g;
    var match = regex.exec(url);
    if (match !== null) {
        return match[2];
    }

    if (url.startsWith("https://news.google.com")) {
        var nodes = document.getElementsByClassName("OJMBqe");
        if (nodes.length > 0) {
            return nodes[nodes.length - 1].innerText;
        }
    }

    return "";
}

function getUrl(engine, vertical, query) {
    var normalizedQuery = query.replace("+", " ").toLowerCase();

    if (engine === "google") {
        if (vertical === "news") {
            if (query === "" || normalizedQuery === "top stories" || normalizedQuery === "for you") {
                return "https://news.google.com";
            }

            return "https://www.google.com/search?q=" + query + "&tbm=nws";
        }

        if (vertical === "images") {
            return "https://www.google.com/search?q=" + query + "&tbm=isch";
        }

        if (vertical === "videos") {
            return "https://www.google.com/search?q=" + query + "&tbm=vid";
        }

        if (query === "") {
            return "https://www.google.com";
        }

        return "https://www.google.com/search?q=" + query;
    }

    if (engine === "bing") {
        if (vertical === "news") {
            return "https://www.bing.com/news/search?q=" + query;
        }

        if (vertical === "images") {
            return "https://www.bing.com/images/search?q=" + query;
        }

        if (vertical === "videos") {
            return "https://www.bing.com/videos/search?q=" + query;
        }

        if (query === "") {
            return "https://www.bing.com";
        }

        return "https://www.bing.com/search?q=" + query;
    }

    return "about:blank";
}

function changeUrl(hostname, url) {
    var engine = getEngine(hostname);
    var vertical = getVertical(engine, url);
    var query = getQuery(url);
    //alert("$" + engine + "$\n$" + vertical + "$\n$" + query + "$");
    var oppositeEngine = getOppositeEngine(engine);

    return getUrl(oppositeEngine, vertical, query);
}

window.open(changeUrl(location.hostname, location.href));
