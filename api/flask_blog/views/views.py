# ログインとログアウト処理をまとめたBlueprint

from flask import request, redirect, url_for, render_template, flash, session
from flask import current_app as app
from functools import wraps
from flask import Blueprint

view = Blueprint("view", __name__)


# ルーティングは関数の前にデコレータをつけて実現します
@view.route("/", methods=["GET"])
def index():
    return "Welcome to Flask Blog API Server"


@view.app_errorhandler(404)
def non_existant_route(error):
    return redirect(url_for("view.index"))
