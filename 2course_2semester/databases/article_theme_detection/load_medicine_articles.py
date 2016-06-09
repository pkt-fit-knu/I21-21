import http.client
from html.parser import HTMLParser


def make_request(host, url, encoding):
    conn = http.client.HTTPConnection(host)
    conn.request("GET", url, {}, {})
    r = conn.getresponse()
    data = r.read()
    conn.close()
    return data.decode(encoding)


class MedicineHTMLParser(HTMLParser):
    was_h2 = False
    hrefs = []

    def handle_starttag(self, tag, attrs):
        if tag == "h2" and len(attrs) > 0 and len(attrs[0]) > 1 and attrs[0][1] == "entry-title":
            self.was_h2 = True
        elif tag == "a" and self.was_h2:
            href = attrs[0][1][attrs[0][1].find("//") + 2:]
            spl = href.find("/")
            href = [href[:spl], href[spl:]]
            self.hrefs.append(href)
            self.was_h2 = False


class MedicinePageHTMLParser(HTMLParser):
    was_p = False
    content = ""

    def handle_starttag(self, tag, attrs):
        """if tag == "div" and len(attrs) > 0 and attrs[0][1] == "content":
            self.was_outer_div = True
        elif self.was_outer_div and tag == "div":
            self.was_content = True"""
        if tag == "p":
            self.was_p = True

    def handle_data(self, data):
        """if self.was_content and self.was_outer_div:
            self.content += data"""
        if self.was_p:
            self.content += data

    def handle_endtag(self, tag):
        """if tag == "div" and self.was_content:
            self.was_content = False
        elif tag == "div" and self.was_outer_div and not self.was_content:
            self.was_outer_div = False"""
        if tag == "p":
            self.was_p = False


def load_medicine_page(host, url, file_var):
    page = make_request(host, url, "utf-8")
    page_parser = MedicinePageHTMLParser()
    page_parser.feed(page)
    content = page_parser.content
    print(content, file=file_var)
    file_var.close()


def load_medicine_contents(page_number):
    page = make_request("www.webmedinfo.ru", "/article/page/" + str(page_number) + "/", "utf-8")
    page = page.replace("&", "&amp;")

    parser = MedicineHTMLParser()
    parser.feed(page)


for i in range(100, 200):
    load_medicine_contents(i)

hrefs = MedicineHTMLParser.hrefs
print("Hrefs count:", len(hrefs))
print(hrefs)

for i in range(len(hrefs)):
    try:
        f = open("articles/medicine/" + str(i) + ".txt", "w")
        load_medicine_page(hrefs[i][0], hrefs[i][1], f)
        print("File #" + str(i), "has been created")
    except:
        print("File #" + str(i), "error")
#for i in range(len(hrefs)):
#    f = open("articles/medicine/" + str(i) + ".txt", "w")
#    load_medicine_page(hrefs[i][0], hrefs[i][1], f)