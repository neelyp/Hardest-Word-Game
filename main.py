from flask import Flask, render_template, send_file, request
import os
from replit import db

app = Flask("app")


@app.route("/")
def home():
	# user_name = request.headers['X-Replit-User-Name']
	api = os.environ["API"]
	# if user_name not in db.keys():
	# 	db[user_name] = 0
	users = list(db.keys())
	leader_dict = {}
	for i in users:
		if len(i) < 1:
			del db[i]
		else:
			leader_dict[i] = db[i]
	leader_dict = {k: v for k, v in sorted(leader_dict.items(), key=lambda item: item[1], reverse=True)}
	for j in leader_dict:
		print(j, leader_dict[j])
	return render_template("index.html", api=api)


@app.route('/submit', methods=['POST'])
def submit():
	user_name = request.headers['X-Replit-User-Name']
	api = os.environ["API"]
	score = request.form['score']
	db[user_name] += score
	return render_template("index.html", api=api)


@app.route("/favicon.ico")
def favicon():
	return send_file("./static/img/favicon/favicon.ico")


if __name__ == "__main__":
	app.run(host="0.0.0.0", port=8080)
