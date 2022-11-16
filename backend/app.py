import os
import re
import ibm_db
from flask import Flask, flash, jsonify, render_template, request, session
from flask_cors import CORS
from flask_mail import Mail, Message
from werkzeug.wrappers import Request, Response
from sendgrid import * 
app = Flask(__name__)
CORS(app)


conn = ibm_db.connect(    
"DATABASE=bludb;HOSTNAME=6667d8e9-9d4d-4ccb-ba32-21da3bb5aafc.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud;PORT=30376;SECURITY=SSL;SSLServerCertificate=DigiCertGlobalRootCA.crt;UID=yzk69108;PWD=vL0zrqj9PeaSutC4",'',''
)
print(conn)
print("connection successful...")

app.config['MAIL_SERVER'] = 'smtp.sendgrid.net'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'Flask-mail'
app.config['MAIL_PASSWORD'] = os.environ.get('sendgrid-api-key')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('antonyhyson@protonmail.com')
mail = Mail(app)
app.secret_key = 'a'

@app.route('/')
def hello_world():
   return 'Hello World'


@app.route('/list')
def list():
  students = []
  sql = "SELECT * FROM test"
  stmt = ibm_db.exec_immediate(conn, sql)
  dictionary = ibm_db.fetch_both(stmt)
  while dictionary != False:
    print ("The Name is :",  dictionary)
    students.append(dictionary)
    dictionary = ibm_db.fetch_both(stmt)

  if students:
    return render_template("list.html", students = students)




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
     mesg = Message('Twilio SendGrid Test Email', recipients=[email])
     mesg.body = ('Congratulations! You have sent a test email with' 'Twilio SendGrid!')
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

@app.route('/add-products', methods =['POST'])
def addProducts():
  msg = ''
  if request.method == 'POST' :
    product_id = request.json.get("product_id", None)
    productname = request.json.get("productname", None)
    productdetails = request.json.get("productdetails", None)
    warehouse_location = request.json.get("warehouse_location", None)
    quantity = request.json.get("quantity", None)
    price = request.json.get("price", None)

  if product_id and productname and productdetails and warehouse_location and quantity and  price and request.method == 'POST':
     insert_sql = "INSERT INTO products VALUES (?, ?, ?, ?, ?, ?)"
     prep_stmt = ibm_db.prepare(conn, insert_sql)
     ibm_db.bind_param(prep_stmt, 1,  product_id)
     ibm_db.bind_param(prep_stmt, 2, productname)
     ibm_db.bind_param(prep_stmt, 3, productdetails)
     ibm_db.bind_param(prep_stmt, 4,  warehouse_location)
     ibm_db.bind_param(prep_stmt, 5, quantity)
     ibm_db.bind_param(prep_stmt, 6, price)
     ibm_db.execute(prep_stmt)
     msg = 'Product Added!',200
  return {"msg":msg,"success":True}

@app.route('/get-products')
def view_stock():

    sql = "SELECT * FROM products"
    stmt = ibm_db.prepare(conn, sql)
    result=ibm_db.execute(stmt)
    print(result)

    products=[]
    row = ibm_db.fetch_assoc(stmt)
    print(row)
    while(row):
        products.append(row)
        row = ibm_db.fetch_assoc(stmt)
        print(row)
   #  products=tuple(products)
    print(products)

    if result>0:
       return {"data":products,"success":True}
    else:
        msg='No products found'
        return {"data":[],"success":False}

@app.route('/update-product',methods=['GET','POST'])
def update_stock():
    mg=''
    if request.method == "POST":
        product_id = request.json.get("product_id", None)
        productname = request.json.get("productname", None)
        productdetails = request.json.get("productdetails", None)
        warehouse_location = request.json.get("warehouse_location", None)
        quantity = request.json.get("quantity", None)
        price = request.json.get("price", None)
        sql='SELECT * FROM products WHERE product_id =?'
        stmt = ibm_db.prepare(conn, sql)
        ibm_db.bind_param(stmt,1,product_id)
        ibm_db.execute(stmt)
        product = ibm_db.fetch_assoc(stmt)
        print(product)
            
        if product:
            insert_sql='UPDATE products SET productname=?,productdetails=?, warehouse_location=? ,quantity =?,price=? WHERE product_id=?'
            pstmt=ibm_db.prepare(conn, insert_sql)
            ibm_db.bind_param(pstmt,1,productname)
            ibm_db.bind_param(pstmt,2,productdetails)
            ibm_db.bind_param(pstmt,2, warehouse_location)
            ibm_db.bind_param(pstmt,3,quantity)
            ibm_db.bind_param(pstmt,2,price)
            ibm_db.bind_param(pstmt,4,product_id)
            ibm_db.execute(pstmt)
            mg='You have successfully updated the products!!'
            # limit=5
            # print(type(limit))
            # if(quantity<=limit):
            #       alert("Please update the quantity of the product {}, Atleast {} number of pieces must be added!".format(prodname,10))
            return {"msg":mg,"success":True}
        else:
            return {"msg":"Update Failed!","success":False}
               
@app.route('/delete-products',methods=['GET','POST'])
def delete_stock():
    if(request.method=="POST"):
        product_id = request.json.get("product_id", None)
        sql2="DELETE FROM products WHERE  product_id=?"
        stmt2 = ibm_db.prepare(conn, sql2)    
        ibm_db.bind_param(stmt2,1, product_id)
        ibm_db.execute(stmt2)
        flash("Product Deleted", "success")
        return {"msg":"product deleted!","success":True}

@app.route('/delete-user',methods=['GET','POST'])
def delete_user():
    if(request.method=="POST"):
        email= request.json.get("email", None)
        sql2="DELETE FROM users WHERE  email=?"
        stmt2 = ibm_db.prepare(conn, sql2)    
        ibm_db.bind_param(stmt2,1, email)
        ibm_db.execute(stmt2)
        flash("user Deleted", "success")
        return {"msg":"user deleted!","success":True}


if __name__ == '__main__':
   app.run(debug = True)