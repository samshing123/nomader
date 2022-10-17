import installPackage
from config import Config
config = Config()

def setup_spark(config : Config) :
    from pyspark.sql import SparkSession
    packages = [
        "com.amazonaws:aws-java-sdk-s3:1.12.95",
        "org.apache.hadoop:hadoop-aws:3.2.0",
        "org.apache.spark:spark-avro_2.12:2.4.4",
        "org.mongodb.spark:mongo-spark-connector_2.12:3.0.1",
        "org.postgresql:postgresql:42.2.18"
    ]
    
    spark = SparkSession.builder.appName("Transform Recent change stream")\
            .master('spark://{}:7077'.format(config.MASTER_SPARK))\
            .config("spark.jars.packages",",".join(packages))\
            .config("spark.hadoop.fs.s3a.access.key",config.AWS_ACCESS_KEY)\
            .config("spark.hadoop.fs.s3a.secret.key",config.AWS_SECRET_KEY)\
            .config("spark.hadoop.fs.s3a.impl","org.apache.hadoop.fs.s3a.S3AFileSystem")\
            .config('spark.hadoop.fs.s3a.aws.credentials.provider', 'org.apache.hadoop.fs.s3a.SimpleAWSCredentialsProvider')\
            .config("spark.hadoop.fs.s3a.multipart.size",104857600)\
            .config("com.amazonaws.services.s3a.enableV4", "true")\
            .config("spark.hadoop.fs.s3a.path.style.access", "false")\
            .getOrCreate()
    return spark
