import re
import ibm_db
from flask import Flask, jsonify, render_template, request, session
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


conn = ibm_db.connect(    
"DATABASE=bludb;HOSTNAME=6667d8e9-9d4d-4ccb-ba32-21da3bb5aafc.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud;PORT=30376;SECURITY=SSL;SSLServerCertificate=DigiCertGlobalRootCA.crt;UID=yzk69108;PWD=vL0zrqj9PeaSutC4",'',''
)
print(conn)
print("connection successful...")


app.secret_key = 'a'

@app.route('/')
def hello_world():
   return 'Hello World'


# post.text = request.form.get('body','')
@app.route('/sign-up', methods =['POST'])
def register():
  msg = ''
  if request.method == 'POST' :
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    sql = "SELECT * FROM users WHERE email =?"
    print(sql)
    stmt = ibm_db.prepare(conn, sql)
    ibm_db.bind_param(stmt,1,email)
    ibm_db.execute(stmt)
    account = ibm_db.fetch_assoc(stmt)
    print(account,"hello")
    if account:
       return {"msg": "Account already exist"}, 401
    elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
       return {"msg": "invalid email address"}, 401
    elif not re.match(r'[A-Za-z0-9]+', username):
        return {"msg": "name must contain only char and numbers"}, 401
    else:
     insert_sql = "INSERT INTO users VALUES (?, ?, ?)"
     prep_stmt = ibm_db.prepare(conn, insert_sql)
     ibm_db.bind_param(prep_stmt, 1, username)
     ibm_db.bind_param(prep_stmt, 2, email)
     ibm_db.bind_param(prep_stmt, 3, password)
     ibm_db.execute(prep_stmt)
     msg = 'You have successfully registered !',200
  elif request.method == 'POST':
    msg = 'Please fill out the form !'

  return {"msg":msg,"success":True}


@app.route('/sign-in',methods =['POST'])
def login():
  global userid
  msg = ''
  if request.method == 'POST' :
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    sql = "SELECT * FROM users WHERE email =? AND password=?"
    stmt = ibm_db.prepare(conn, sql)
    ibm_db.bind_param(stmt,1,email)
    ibm_db.bind_param(stmt,2,password)
    ibm_db.execute(stmt)
    account = ibm_db.fetch_assoc(stmt)
    print (account)
    if account:
       session['loggedin'] = True
       session['id'] = account['USERNAME']
       userid= account['USERNAME']
       session['username'] = account['USERNAME']
       return {"msg": "user loggedin successfully","success":True}, 200
    else:
     return {"msg": "Incorrect username / password!"},400


if __name__ == '__main__':
   app.run(debug = True)