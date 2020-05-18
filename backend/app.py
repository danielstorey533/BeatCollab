import time
import os, random #Needed for accessing backend file structure
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

#If app is in development mode (prototype development, undeployed), we use undeployed database.
ENV = 'dev'

if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:laptopglass5@localhost/BeatCollabProto'
else:
    #This will link to deployment database when ready
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = ''


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


#Creates database object in SQLAlchemy. 
# Sets up database model for tracks table using SQLAlchemy which determines the logical
#structure of the database.

db = SQLAlchemy(app)

class Tracks(db.Model):
    __tablename__ = 'tracks'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250))
    description = db.Column(db.String(1000))
    authorUser = db.Column(db.String(250))
    length = db.Column(db.String(10))
    imageLocation = db.Column(db.String(500))
    fileLocation = db.Column(db.String(500))

    #Table constructor.
    def __init__(self, title, description, authorUser, length, imageLocation, fileLocation):
        self.title = title
        self.description = description
        self.authorUser = authorUser
        self.length = length
        self.imageLocation = imageLocation
        self.fileLocation = fileLocation

    



#FIXME: Delete this, used for testing frontend backend relationship
@app.route('/time')
def get_current_time():
    return {'time': time.time()}
	
	
#TODO: This is for testing selection of random files after an action on the front end
@app.route('/newTrack')
def get_new_track():
	
	
	os.chdir("..") # jump down one to project root
	os.chdir("public") # switch to project folder
	
	cwd = os.getcwd() # get current directory
	
	tracks_path = os.path.join(cwd, "tracks") # tracks are in a folder by the same name
	
	track_name = random.choice(os.listdir(tracks_path)) # Assume only tracks are in directory, NOT EFFICIENT AS ALL ARE LOADED INTO MEM
	
	return {'trackpath': track_name}
	
	



@app.route('/')
def index():
    return render_template('index.html')

#Submit route takes in form information from front-end and saves it into PostgreSQL database.
@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        authorUser = request.form['authorUser']
        length = request.form['length']
        imageLocation = request.form['imageLocation']
        fileLocation = request.form['fileLocation']

        data = Tracks(title, description, authorUser, length, imageLocation, fileLocation)
        db.session.add(data)
        db.session.commit()


        return render_template('index.html')
