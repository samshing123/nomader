import installPackage
import requests
import numpy as np
import csv
import json
import time
import schedule
from pymongo import MongoClient
from playwright.sync_api import sync_playwright

client = MongoClient('localhost', 27017)
db = client.project


def get_emergency_data() : 
    # data from 'adducation.info'
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto('https://www.adducation.info/general-knowledge-travel-and-transport/emergency-numbers/')

        dataFromAdducationInfo = page.evaluate('[...document.querySelectorAll("tbody > tr")].map(tr => { return tr.innerText })')

        for i in range(len(dataFromAdducationInfo)) :
            eachRecordInData = dataFromAdducationInfo[i].split('\t')
            country = eachRecordInData[0]
            countryName = country[3:].replace('&', 'and')

            emergency = ', '.join([str(word) for word in eachRecordInData[1].split() if word.isdigit()])
            police = ', '.join([str(word) for word in eachRecordInData[2].split() if word.isdigit()])
            ambulance = ', '.join([str(word) for word in eachRecordInData[3].split() if word.isdigit()])
            fire = ', '.join([str(word) for word in eachRecordInData[4].split() if word.isdigit()])
            callingCode = eachRecordInData[6]
            if ',' in callingCode : 
                callingCode = callingCode.replace(',', ', ')
            elif '/' in callingCode :
                callingCode = callingCode.replace(' / ', ', ')
            elif '\n' in callingCode :
                callingCode = callingCode.replace('\n', ', ')

            record = {
                'country_name' : countryName,
                'emergency_tel' : emergency,
                'police_tel' : police,
                'ambulance_tel' : ambulance,
                'fire_tel' : fire,
                'location_group' : eachRecordInData[5],
                'calling_code' : callingCode,
                'info' : eachRecordInData[7]
            }
            db.emergencyData.insert_one(record)
        browser.close()
    


def get_currency_data() :
    #  data from 'exchangerate.host'
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        url='https://api.exchangerate.host/symbols'
    
        response = requests.get(url)
        data = response.json()
        symbols = data['symbols'].items()
        codeList = list(symbols)
        code = np.array(codeList)
        codeArr = []
        for i in range(len(code)) :
            record = {
                'code' : code[i][1]['code'],
                'currency_name' : code[i][1]['description']
            }
            codeArr.append(record)

        # data from 'worlddata.info'
        page = browser.new_page()
        page.goto('https://www.worlddata.info/currencies/')
        dataFromWorlddata = page.evaluate('[...document.querySelectorAll("tbody > tr")].map(tr => { return tr.innerText })')

        countryArr = []
        for i in range(len(dataFromWorlddata)) :
            if i > 0 :
                data = dataFromWorlddata[i].split('\t')
                record = {
                    'code' : data[0],
                    'using_country' : data[2]
                }
                countryArr.append(record)
            else :
                pass

        # combine currency code and country
        for i in range(len(codeArr)) :
            for j in range(len(countryArr)) :
                if countryArr[j]['code'] == codeArr[i]['code'] :
                    countryArr[j].update({'currency_name' : codeArr[i]['currency_name']})
        
        codeOfCountryUsing = []
        for i in range(len(countryArr)) :
            codeOfCountryUsing.append(countryArr[i]['code'])

        codeOfCountryUsing = set(codeOfCountryUsing)
        codeArr = list(filter(lambda code : code['code'] not in codeOfCountryUsing, codeArr))
        for i in range(len(codeArr)) :
            codeArr[i].update({'using_country' : ''})
        countryArr.extend(codeArr)
        for i in range(len(countryArr)) :
            db.currencyCodes.insert_one(countryArr[i])

        browser.close()

    
    # data from 'tripadvisor'
def get_attraction_data() :
    with open('attractionData.csv', 'r') as f :
        attractionLink = csv.reader(f)
        for attraction in attractionLink : 
            attraction = ', '.join(attraction)
            attraction = json.loads(attraction)
            db.attractionData.insert_one(attraction)

def get_city_data() :
    with open('cityData.csv', 'r') as f :
        cityLink = csv.reader(f)
        for city in cityLink :
            city = ', '.join(city)
            city = json.loads(city)
            db.cityData.insert_one(city)



def daily_currency() :
    #  data from 'exchangerate.host'
    url='https://api.exchangerate.host/symbols'

    response = requests.get(url)
    data = response.json()
    symbols = data['symbols'].items()
    codeList = list(symbols)
    code = np.array(codeList)
    codeArr = []
    for i in range(len(code)) :
        codeArr.append(code[i][0])

    for i in range(len(codeArr)) :
        currencyURL = 'https://api.exchangerate.host/latest?base={}'.format(codeArr[i])
        response = requests.get(currencyURL)
        data = response.json()
        rates = data['rates'].items()
        ratesList = list(rates)
        rate = np.array(ratesList)
        for j in range(len(rate)) :
            currencyData = {
                'date' : data['date'],
                'code_base' : data['base'],
                'code_to' : rate[j][0],
                'rates' : rate[j][1]
            }
            db.currencyRatesNew.insert_one(currencyData)



def main() :
    get_emergency_data()
    get_currency_data()
    get_attraction_data()
    get_city_data()


if __name__ == '__main__' :
    # main()
    
    daily_currency()

    # schedule.every().day.at('06:00').do(daily_currency)
    # while True:
    #     schedule.run_pending()
    #     time.sleep(1)
