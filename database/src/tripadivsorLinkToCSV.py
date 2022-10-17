import installPackage
import csv
import json
from playwright.sync_api import sync_playwright


# data from 'tripadvisor'

def get_attraction_link() :
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for page_num in range(0, 25) :
            if page_num == 0 :
                string = ''
            else :
                string = '-oa{}'.format(30 * page_num)

            with open ('attractionLink.csv', 'a') as f :
                try : 
                    # USA
                    page = browser.new_page()
                    page.goto('https://en.tripadvisor.com.hk/Attractions-g191-Activities{}-United_States.html'.format(string))
                    attractionList = page.evaluate('[...document.querySelectorAll(".tnGGX > a")].map(a => { return a.href })')
                    for i in range(len(attractionList)) :
                        if '#REVIEWS' in attractionList[i] :
                            pass
                        else :
                            f.write(attractionList[i])
                            f.write('\n')
            
                    # UK
                    page = browser.new_page()
                    page.goto('https://en.tripadvisor.com.hk/Attractions-g186216-Activities{}-United_Kingdom.html'.format(string))
                    attractionList = page.evaluate('[...document.querySelectorAll(".tnGGX > a")].map(a => { return a.href })')
                    for i in range(len(attractionList)) :
                        if '#REVIEWS' in attractionList[i] :
                            pass
                        else :
                            f.write(attractionList[i])
                            f.write('\n')

                    # HKG
                    page = browser.new_page()
                    page.goto('https://en.tripadvisor.com.hk/Attractions-g294217-Activities{}-Hong_Kong.html'.format(string))
                    attractionList = page.evaluate('[...document.querySelectorAll(".tnGGX > a")].map(a => { return a.href })')
                    for i in range(len(attractionList)) :
                        if '#REVIEWS' in attractionList[i] :
                            pass
                        else :
                            f.write(attractionList[i])
                            f.write('\n')

                except ValueError as error:
                    print(error)

        browser.close()



def get_city_link() :
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        with open('attractionLink.csv', 'r') as f :
            attractionLink = csv.reader(f)
            attractionArr = []
            for link in attractionLink :
                link = ''.join(link)
                attractionArr.append(link)
            for attraction in attractionArr :
                page = browser.new_page()
                page.goto(attraction)
                cityLinkList = page.evaluate('[...document.querySelectorAll(".Nm > .Cj > a")].map(city => { return city.href })')
                for i in range(len(cityLinkList)) :
                    if i == len(cityLinkList) - 1 :
                        pass
                    elif i == 0 :
                        pass
                    else :
                        with open('cityLink.csv', 'a') as fa :
                            fa.write(cityLinkList[i])
                            fa.write('\n')

        browser.close()


def filter_city_link() :
    with open('cityLink.csv', 'r') as f :
        cityLink = csv.reader(f)
        cityArr = []
        for link in cityLink :
            link = ''.join(link)
            cityArr.append(link)
        cityArr = set(cityArr)
        for city in cityArr :
            with open('cityFilterLink.csv', 'a') as fa :
                fa.write(city)
                fa.write('\n')


def get_attraction_data() :
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)        
        attractionList = []
        with open('attractionLink.csv', 'r') as f :
            attractionLink = csv.reader(f)
            for attraction in attractionLink : 
                attraction = ''.join(attraction)
                attractionList.append(attraction)

        for i in range(len(attractionList)) :
            page = browser.new_page()
            page.goto(attractionList[i])
            attractionTitle = page.evaluate('[document.querySelector("h1")].map(h => { return h.innerText })')
            attractionTime = page.evaluate('[...document.querySelectorAll(".EIVzV > .pZUbB > span")].map(time => { return time.innerText })')
            attractionDescription = page.evaluate('[document.querySelector(".FKffI > .fIrGe")].map(about => { return about.innerText })')
            attractionImg = page.evaluate('[document.querySelector("li > .Kxegy")].map(img => { return img.style.backgroundImage })')
            attractionLocation = page.evaluate('[...document.querySelectorAll(".MJ > button > .Wb")].map(local => { return local.innerText })')
            attractionCity = page.evaluate('[...document.querySelectorAll(".Nm > .Cj > a")].map(city => { return city.innerText })')
            attractionType = page.evaluate('[...document.querySelectorAll(".KxBGd > .FKffI > .bgMZj")].map(type => { return type.innerText })')
            
            if len(attractionTime) == 0 :
                openTime = ''
            else :
                openTime = attractionTime[0]

            if len(attractionLocation) == 0 :
                location = ''
            else :
                location = attractionLocation[0]
            
            cityArrList = []
            for i in range(len(attractionCity)) :
                if i == len(attractionCity) - 1 :
                    pass
                else :
                    cityArrList.append(attractionCity[i])
            cityList = ', '.join(cityArrList)
                
            if len(attractionType) == 0 :
                aType = ''
            else :
                aType = attractionType[0]
                aType = aType.replace(' • ', ', ')

            attraction = {
                'name' : attractionTitle[0],
                'description' : attractionDescription[0],
                'image' : attractionImg[0],
                'address' : location,
                'city_list' : cityList,
                'open_time' : openTime,
                'type' : aType
            }
            attraction = json.dumps(attraction)
            with open('attractionData.csv', 'a') as f :
                f.write(attraction)
                f.write('\n')


def get_city_data() :
    with sync_playwright() as p :
        browser = p.chromium.launch(headless=True) 
        cityList = []
        with open('cityFilterLink.csv', 'r') as f :
            cityLink = csv.reader(f)
            for city in cityLink :
                city = ''. join(city)
                cityList.append(city)

        for i in range(len(cityList)) :
            pageCity = browser.new_page()
            pageCity.goto(cityList[i])
            cityName = pageCity.evaluate('[...document.querySelectorAll("h1 > span > span")].map(city => { return city.innerText })')
            cityDescription = pageCity.evaluate('[...document.querySelectorAll(".SSPMW > .GYFPJ")].map(city => { return city.innerText })')
            cityImg = pageCity.evaluate('[...document.querySelectorAll(".Gm > button > picture > img")].map(img => { return img.src })')
            cityClass = pageCity.evaluate('[...document.querySelectorAll(".KCGqk > a")].map(a => { return a.innerText })')

            if len(cityDescription) == 0 :
                description = ''
            else :
                description = cityDescription[0]
            
            if len(cityImg)== 0 : 
                image = ''
            else :
                image = cityImg[0]
            
            cityArr = []
            for i in range(len(cityClass)) :
                cityArr.append(cityClass[i])
            cityStr = ', '.join(cityArr)
            
            city = {
                'name' : cityName[1],
                'description' : description,
                'image' : image,
                'city_list' : cityStr
            }
            city = json.dumps(city)
            with open('cityData.csv', 'a') as fc :
                fc.write(city)
                fc.write('\n')


# get_attraction_link()
# get_city_link()
# filter_city_link()
# get_attraction_data()
# get_city_data()
