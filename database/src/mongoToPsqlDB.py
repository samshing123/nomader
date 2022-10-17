import installPackage
# import schedule
# import time
from config import Config
from sparkSetting import setup_spark

config = Config()
spark = setup_spark(config)

def data_from_mongodb(config, spark, table) :
    df = spark.read.format('mongo').option('spark.mongodb.input.uri','mongodb://{}/project.{}'.format(config.MONGODB, table)).load()
    df = df.drop('_id')
    return df

def data_to_psql(config, df, table) :
    df.write.format('jdbc')\
        .option('url',"jdbc:postgresql://{}/{}".format(config.POSTGRES_HOST,config.POSTGRES_DB))\
        .option('dbtable','{}'.format(table))\
        .option('user',config.POSTGRES_USER)\
        .option('password',config.POSTGRES_PASSWORD)\
        .option('driver','org.postgresql.Driver')\
        .mode('append')\
        .save()

def transform_table_cities(df) :
    df = df.withColumnRenamed('name','city_name')
    return df

def transform_table_attractions(df) :
    df = df.withColumnRenamed('name','attraction_name')
    df = df.withColumnRenamed('type', 'class')
    return df

def transform_data_currencyRates(df) :
    import pyspark.sql.functions as F
    df = df.withColumnRenamed('rates','rate')
    df = df.withColumn('rate', df['rate'].cast('float'))
    df = df.withColumn('date', df['date'].cast('date'))
    df = df.withColumn('year', F.year(df['date']))
    df = df.withColumn('month', F.month(df['date']))
    df = df.withColumn('day', F.dayofmonth(df['date']))
    df = df.drop('date')
    return df

def main() :
    df_emergency = data_from_mongodb(config, spark, 'emergencyData')
    data_to_psql(config, df_emergency, 'db_emergency_data')

    df_city = data_from_mongodb(config, spark, 'cityData')
    df_city = transform_table_cities(df_city)
    data_to_psql(config, df_city, 'db_city_data')

    df_attraction = data_from_mongodb(config, spark, 'attractionData')
    df_attraction = transform_table_attractions(df_attraction)
    data_to_psql(config, df_attraction, 'db_attractions')

    df_currency = data_from_mongodb(config, spark, 'currencyCodes')
    data_to_psql (config, df_currency, 'db_currency_codes')


def currencyRates() :
    df = data_from_mongodb(config, spark, 'currencyRatesNew')
    df = transform_data_currencyRates(df)
    data_to_psql(config, df, 'db_currency_rates')


if __name__ == '__main__' :
    # main()
    currencyRates()

    # schedule.every().day.at('06:30').do(currencyRates)
    # while True:
    #     schedule.run_pending()
    #     time.sleep(1)


