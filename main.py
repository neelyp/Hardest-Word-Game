from flask import Flask, render_template, send_file
import os
app = Flask('app')

@app.route('/')
def home():
	api = os.environ['API']
	return render_template('index.html', api=api)

@app.route('/favicon.ico')
def favicon():
	return send_file('./static/img/favicon/favicon.ico')

app.run(host='0.0.0.0', port=8080)