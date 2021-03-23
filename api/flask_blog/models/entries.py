# 記事を表現するモデルファイル
from flask_blog import db
from datetime import datetime
from flask import jsonify


# クラス形式で表現する
class Entry(db.Model):
    __tablename__ = "entries"
    id = db.Column(db.Integer, primary_key=True)  # カラムの登録
    title = db.Column(db.String(255), unique=True)
    text = db.Column(db.Text)
    created_at = db.Column(db.DateTime)

    def __init__(self, title=None, text=None):  # コンストラクタ
        self.title = title
        self.text = text
        self.created_at = datetime.utcnow()

    def __repr__(self):  # コンソール出力時に呼び出される
        return "<Entry id:{} title:{} text:{}".format(self.id, self.title, self.text)

    def toDict(self):
        return {"id": self.id, "title": self.title, "text": self.text, "created_at": str(self.created_at)}
