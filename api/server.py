# Flaskのサーバを起動する

from flask_blog import current_app as app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
