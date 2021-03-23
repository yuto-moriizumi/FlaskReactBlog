# 記事関連のルーティングを行う

from flask import request, redirect, url_for, render_template, flash, Response, jsonify
from flask_blog import db
from flask_blog.models.entries import Entry
from flask import Blueprint
import json
import os

entry = Blueprint("entry", __name__)


# インデックス
@entry.route('/entries', methods=['GET'])
def show_entries():
    entries = Entry.query.order_by(Entry.id.desc()).all()  # ORMですべての記事を整列して返す
    # render_templateの第2引数以降で変数を渡せる
    res = json.dumps([i.toDict() for i in entries], ensure_ascii=False)
    res = Response(res, headers=dict(
        [["Content-Type", "text/json"]]))
    return res


@ entry.route("/entries", methods=['POST'])
def add_entry():
    # request.formでフォームのデータを受け取れる nameを指定する
    req = json.loads(request.get_data())
    entry = Entry(title=req.title, text=req.text)
    db.session.add(entry)  # addしてcommitすることでデータベースに変更を行える
    db.session.commit()
    return Response(status=201)


# URLで変数を受け取るときは<型名:変数名>で記述
@ entry.route('/entries/<int:id>', methods=["GET"])
def show_entry(id):
    entry = Entry.query.get(id)
    res = json.dumps(entry.toDict(), ensure_ascii=False)
    return Response(res, headers=dict([["Content-Type", "text/json"]]))


@ entry.route('/entries/<int:id>', methods=["PUT"])
def update_entry(id):
    entry = Entry.query.get(id)
    req = json.loads(request.get_data())
    entry.title = req.form["title"]
    entry.text = req.form["text"]
    db.session.add(entry)
    db.session.commit()
    return Response(status=200)


@ entry.route('/entries/<int:id>', methods=["DELETE"])
def delete_entry(id):
    entry = Entry.query.get(id)
    db.session.delete(entry)  # deleteで削除
    db.session.commit()
    return Response(status=204)


@entry.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin',
                         os.environ.get("CLIENT_URL"))
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET,PUT,POST,DELETE,OPTIONS')
    return response
