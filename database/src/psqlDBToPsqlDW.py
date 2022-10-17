import installPackage
# import schedule
# import time
from config import Config
from sparkSetting import setup_spark

config = Config()
spark = setup_spark(config)

import pyspark.sql.functions as F

def extract_data(spark, config, table) :
    return spark.read.format('jdbc')\
            .option("url", "jdbc:postgresql://{}/{}".format(config.POSTGRES_HOST, config.POSTGRES_DB))\
            .option("dbtable", "{}".format(table))\
            .option("user", config.POSTGRES_USER)\
            .option("password", config.POSTGRES_PASSWORD)\
            .option("driver", "org.postgresql.Driver")\
            .load()
    

def load_data(df, config, table):
    print(df.show())
    df.write.format('jdbc')\
        .option("url", "jdbc:postgresql://{}/{}".format(config.RDS_HOST_NAME, config.RDS_DB_NAME))\
        .option("dbtable", "{}".format(table))\
        .option("user", config.RDS_USERNAME)\
        .option("password", config.RDS_PASSWORD)\
        .option("driver", "org.postgresql.Driver")\
        .mode('append')\
        .save()


def main() :
    df_countries = extract_data(spark, config, 'countries')
    df_countries = df_countries.drop('id')
    df_countries = df_countries.drop('location_group')
    df_countries = df_countries.drop('tel_code')
    df_countries = df_countries.drop('emergency_tel')
    df_countries = df_countries.drop('police_tel')
    df_countries = df_countries.drop('ambulance_tel')
    df_countries = df_countries.drop('fire_tel')
    df_countries = df_countries.drop('info')
    load_data(df_countries, config, 'staging_countries')


    df_cities = extract_data(spark, config, 'cities')
    df_cities = df_cities.drop('id')
    df_cities = df_cities.drop('description')
    df_cities = df_cities.drop('image')
    load_data(df_cities, config, 'staging_cities')


    df_attractions = extract_data(spark, config, 'attractions')
    df_attractions = df_attractions.drop('id')
    df_attractions = df_attractions.drop('description')
    df_attractions = df_attractions.drop('image')
    df_attractions = df_attractions.drop('address')
    df_attractions = df_attractions.drop('open_time')
    df_attractions = df_attractions.drop('class')
    load_data(df_attractions, config, 'staging_attractions')


    df_interests = extract_data(spark, config, 'interests')
    df_interests =df_interests.drop('id')
    df_interests =df_interests.drop('image')
    load_data(df_interests, config, 'staging_interests')


    df_jobs = extract_data(spark, config, 'jobs')
    df_jobs = df_jobs.drop('id')
    load_data(df_jobs, config, 'staging_jobs')


    df_users = extract_data(spark, config, 'users')
    df_users = df_users.drop('id')
    df_users = df_users.drop('username')
    df_users = df_users.drop('password')
    df_users = df_users.drop('first_name')
    df_users = df_users.drop('last_name')
    df_users = df_users.drop('information')
    df_users = df_users.drop('profile')
    df_users = df_users.drop('email')
    df_users = df_users.drop('phone_num')
    df_users = df_users.drop('emergency_contact_person')
    df_users = df_users.drop('emergency_contact_num')
    df_users = df_users.drop('isVisible')
    df_users = df_users.drop('allow_post')
    df_users = df_users.drop('allow_comment')
    df_users = df_users.drop('allow_upload')
    df_users = df_users.drop('allow_match')
    df_users = df_users.withColumn('birthday_year', F.split(df_users['birthday'], '-').getItem(2))
    df_users = df_users.withColumn('birthday_month', F.split(df_users['birthday'], '-').getItem(1))
    df_users = df_users.withColumn('birthday_day', F.split(df_users['birthday'], '-').getItem(0))
    df_users = df_users.withColumn('birthday_year', df_users['birthday_year'].cast('integer'))
    df_users = df_users.withColumn('birthday_month', df_users['birthday_month'].cast('integer'))
    df_users = df_users.withColumn('birthday_day', df_users['birthday_day'].cast('integer'))
    df_users = df_users.drop('birthday')
    df_users = df_users.drop('updated_at')
    df_users = df_users.withColumn('created_year', F.year(df_users['created_at']))
    df_users = df_users.withColumn('created_month', F.month(df_users['created_at']))
    df_users = df_users.withColumn('created_day', F.dayofmonth(df_users['created_at']))
    df_users = df_users.drop('created_at')
    load_data(df_users, config, 'staging_users')


    df_chat_rooms = extract_data(spark, config, 'chat_rooms')
    df_chat_rooms = df_chat_rooms.drop('id')
    df_chat_rooms = df_chat_rooms.drop('room_title')
    df_chat_rooms = df_chat_rooms.drop('updated_at')
    df_chat_rooms = df_chat_rooms.withColumn('created_year', F.year(df_chat_rooms['created_at']))
    df_chat_rooms = df_chat_rooms.withColumn('created_month', F.month(df_chat_rooms['created_at']))
    df_chat_rooms = df_chat_rooms.withColumn('created_day', F.dayofmonth(df_chat_rooms['created_at']))
    df_chat_rooms = df_chat_rooms.drop('created_at')
    load_data(df_chat_rooms, config, 'staging_chat_rooms')


    df_chats = extract_data(spark, config, 'chats')
    df_chats = df_chats.drop('id')
    df_chats = df_chats.drop('user_speech_id')
    df_chats = df_chats.drop('user_listen_id')
    df_chats = df_chats.drop('content')
    df_chats = df_chats.drop('image')
    df_chats = df_chats.drop('voice')
    df_chats = df_chats.drop('updated_at')
    df_chats = df_chats.withColumn('created_year', F.year(df_chats['created_at']))
    df_chats = df_chats.withColumn('created_month', F.month(df_chats['created_at']))
    df_chats = df_chats.withColumn('created_day', F.dayofmonth(df_chats['created_at']))
    df_chats = df_chats.drop('created_at')
    load_data(df_chats, config, 'staging_chats')


    df_users_relationship = extract_data(spark, config, 'users_relationship')
    df_users_relationship = df_users_relationship.drop('id')
    df_users_relationship = df_users_relationship.drop('status')
    df_users_relationship = df_users_relationship.drop('updated_at')
    df_users_relationship = df_users_relationship.withColumn('created_year', F.year(df_users_relationship['created_at']))
    df_users_relationship = df_users_relationship.withColumn('created_month', F.month(df_users_relationship['created_at']))
    df_users_relationship = df_users_relationship.withColumn('created_day', F.dayofmonth(df_users_relationship['created_at']))
    df_users_relationship = df_users_relationship.drop('created_at')
    load_data(df_users_relationship, config, 'staging_users_relationship')


    df_like_attractions = extract_data(spark, config, 'users_like_attractions')
    df_like_attractions = df_like_attractions.drop('id')
    df_like_attractions = df_like_attractions.drop('updated_at')
    df_like_attractions = df_like_attractions.withColumn('created_year', F.year(df_like_attractions['created_at']))
    df_like_attractions = df_like_attractions.withColumn('created_month', F.month(df_like_attractions['created_at']))
    df_like_attractions = df_like_attractions.withColumn('created_day', F.dayofmonth(df_like_attractions['created_at']))
    df_like_attractions = df_like_attractions.drop('created_at')
    load_data(df_like_attractions, config, 'staging_browse_attractions')


    df_users_interests = extract_data(spark, config, 'users_interests')
    df_users_interests = df_users_interests.drop('id')
    load_data(df_users_interests, config, 'staging_users_interests')


    df_posts = extract_data(spark, config, 'posts')
    df_posts = df_posts.drop('id')
    df_posts = df_posts.drop('title')
    df_posts = df_posts.drop('content')
    df_posts = df_posts.drop('image')
    df_posts = df_posts.drop('updated_at')
    df_posts = df_posts.withColumn('created_year', F.year(df_posts['created_at']))
    df_posts = df_posts.withColumn('created_month', F.month(df_posts['created_at']))
    df_posts = df_posts.withColumn('created_day', F.dayofmonth(df_posts['created_at']))
    df_posts = df_posts.drop('created_at')
    load_data(df_posts, config, 'staging_posts')


    df_posts_type = extract_data(spark, config, 'posts_type')
    df_posts_type = df_posts_type.drop('id')
    load_data(df_posts_type, config, 'staging_posts_type')
  
    df_attractions_type = extract_data(spark, config, 'attractions_type')
    df_attractions_type = df_attractions_type.drop('id')
    load_data(df_attractions_type, config, 'staging_attractions_type')

    df_browse_posts = extract_data(spark, config, 'users_browse_posts')
    df_browse_posts = df_browse_posts.drop('id')
    df_browse_posts = df_browse_posts.drop('updated_at')
    df_browse_posts = df_browse_posts.withColumn('created_year', F.year(df_browse_posts['created_at']))
    df_browse_posts = df_browse_posts.withColumn('created_month', F.month(df_browse_posts['created_at']))
    df_browse_posts = df_browse_posts.withColumn('created_day', F.dayofmonth(df_browse_posts['created_at']))
    df_browse_posts = df_browse_posts.drop('created_at')
    load_data(df_browse_posts, config, 'staging_browse_posts')



if __name__ == '__main__' :
    main()
    
    # schedule.every().day.at('06:30').do(main)

    # while True:
    #     schedule.run_pending()
    #     time.sleep(1)
