from db.connect import get_connection_to_db
import json

def get_single_record(user_email, table_name):
    try:
        print('got request to fetch data from ' + table_name + ' table for user = ' + user_email)
        conn = get_connection_to_db()
        cursor = conn.cursor(dictionary=True)
        query = 'SELECT * FROM ' + table_name + ' WHERE email = "' + user_email + '"'
        cursor.execute(query)
        
        print(cursor)
        print(str(cursor))

        result = cursor.fetchone()

        if result is None:
            print("empty jsnv")
            return {}, 200
        
        
        cursor.close()
        conn.close()
        print(result)
        
        return result, 200
    except Exception as e:
        print(str(e))
        return str(e), 400
    
    
def get_all_records(user_email, table_name):
    try:
        print('get all records from ' + table_name + ' table for user = ' + user_email)
        conn = get_connection_to_db()
        cursor = conn.cursor(dictionary=True)
        query = 'SELECT * FROM ' + table_name + ' WHERE email = "' + user_email + '"'
        cursor.execute (query)
        
        result = cursor.fetchall()
        cursor.close()
        conn.close()
        res = {}
        res["data"] = result
        # print(result)
        
        return res, 200
    except Exception as e:
        return str(e), 400

