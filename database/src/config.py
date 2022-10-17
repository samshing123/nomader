import installPackage
from dataclasses import dataclass
import os
from dotenv import load_dotenv

load_dotenv()

@dataclass
class Config :
    AWS_ACCESS_KEY : str = os.getenv('AWS_ACCESS_KEY')
    AWS_SECRET_KEY : str = os.getenv('AWS_SECRET_KEY')
    POSTGRES_DB : str = os.getenv('POSTGRES_DB')
    POSTGRES_USER : str = os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD : str = os.getenv("POSTGRES_PASSWORD")
    POSTGRES_HOST : str = os.getenv("POSTGRES_HOST")
    MASTER_SPARK : str = os.getenv('MASTER_SPARK')
    MONGODB : str = os.getenv('MONGODB')
    POSTGRES_DW : str = os.getenv('POSTGRES_DW')

    RDS_DB_NAME : str = os.getenv('RDS_DB_NAME')
    RDS_USERNAME : str = os.getenv('RDS_USERNAME')
    RDS_PASSWORD : str = os.getenv('RDS_PASSWORD')
    RDS_HOST_NAME : str = os.getenv('RDS_HOST_NAME')


config = Config()