from flask import Flask, render_template, send_file, request
import os
from replit import db

app = Flask('app')

@app.route('/')
def home():
	user_name = request.headers['X-Replit-User-Name']
	api = os.environ['API']
	leader_render = ''
	if user_name not in db.keys():
		db[user_name] = 0
	users = list(db.keys())
	leader_dict = {}
	for i in users:
		if len(i) < 1:
			del db[i]
		else:
			leader_dict[i] = db[i]
	leader_dict = {k: v for k, v in sorted(leader_dict.items(), key=lambda item: item[1], reverse=True)}
	count = 1
	for j in leader_dict:
		leader_render = leader_render + '<div class = "tile"><p>' +  str(count) + ') ' + j + ': ' + str(leader_dict[j]) + '</p></div>' 
		count += 1
	return render_template('index.html', api=api, user_name=user_name, leaderboard=leader_render)


@app.route("/test",methods=["POST","GET"])
def test():
	if request.method == "POST":
			user_name = request.headers['X-Replit-User-Name']
			api = os.environ['API']
			leader_render = ''
			point = request.form.get("todo")
			db[user_name] = db[user_name] + int(point)
			users = list(db.keys())
			leader_dict = {}
			for i in users:
				if len(i) < 1:
					del db[i]
				else:
					leader_dict[i] = db[i]
			leader_dict = {k: v for k, v in sorted(leader_dict.items(), key=lambda item: item[1], reverse=True)}
			count = 1
			for j in leader_dict:
				leader_render = leader_render + '<div class = "tile"><p>' +  str(count) + ') ' + j + ': ' + str(leader_dict[j]) + '</p></div>' 
				count += 1
	return render_template('index.html', api=api, user_name=user_name, leaderboard=leader_render)

@app.route('/submit', methods=['POST'])
def submit():
	pass

@app.route('/favicon.ico')
def favicon():
	return send_file('./static/img/favicon/favicon.ico')


if __name__ == '__main__':
	app.run(host='0.0.0.0', port=8080)
