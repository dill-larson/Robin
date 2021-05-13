import mysql.connector

def get_connection_to_db():
	try:
		conn = mysql.connector.connect(
			host='cs160.cri3ntizyxvg.us-east-2.rds.amazonaws.com',
			user='admin',
			password='Appli2020',
			database='Robin'
		)
		return conn
	except Exception as e:
		print('stress in connecting to db')
		print(e)