import http.client
from html.parser import HTMLParser


def make_request(host, url, encoding):
    conn = http.client.HTTPConnection(host)
    conn.request("GET", url, {}, {})
    r = conn.getresponse()
    data = r.read()
    conn.close()
    return data.decode(encoding)


class SportUaHTMLParser(HTMLParser):
    was_h2 = False
    hrefs = []

    def handle_starttag(self, tag, attrs):
        if tag == "h2" and len(attrs) > 0 and len(attrs[0]) > 1 and attrs[0][1] == "hentry__title":
            self.was_h2 = True
        elif tag == "a" and self.was_h2:
            href = attrs[0][1][attrs[0][1].find("//") + 2:]
            spl = href.find("/")
            href = [href[:spl], href[spl:]]
            self.hrefs.append(href)
            self.was_h2 = False


class SportUaPageHTMLParser(HTMLParser):
    was_outer_div = False
    was_content = False
    content = ""

    def handle_starttag(self, tag, attrs):
        if tag == "div" and len(attrs) > 0 and attrs[0][1] == "content":
            self.was_outer_div = True
        elif self.was_outer_div and tag == "div":
            self.was_content = True

    def handle_data(self, data):
        if self.was_content and self.was_outer_div:
            self.content += data

    def handle_endtag(self, tag):
        if tag == "div" and self.was_content:
            self.was_content = False
        elif tag == "div" and self.was_outer_div and not self.was_content:
            self.was_outer_div = False


def load_sport_page(host, url, file_var):
    page = make_request(host, url, "windows-1251")
    page_parser = SportUaPageHTMLParser()
    page_parser.content = ""
    page_parser.feed(page)
    content = page_parser.content
    print(content, file=file_var)
    file_var.close()


def load_sport_contents(page_number):
    page = make_request("sport.ua", "/news/archive?all&all&page=" + str(page_number * 20), "windows-1251")
    page = page.replace("&", "&amp;")

    parser = SportUaHTMLParser()
    parser.feed(page)

    #for i in range(len(parser.hrefs)):
    #    f = open("articles/sport/" + str(page_number + i) + ".txt", "w")
    #    load_sport_page(parser.hrefs[i][0], parser.hrefs[i][1], f)


for i in range(500):
    load_sport_contents(i)

print("Hrefs count:", len(SportUaHTMLParser.hrefs))
print(SportUaHTMLParser.hrefs)
print()

hrefs = SportUaHTMLParser.hrefs

for i in range(len(hrefs)):
    try:
        f = open("articles/sport/" + str(i) + ".txt", "w")
        load_sport_page(hrefs[i][0], hrefs[i][1], f)
        print("File #" + str(i), "has been created")
    except:
        print("File #" + str(i), "exception")

print("Success!!!")
