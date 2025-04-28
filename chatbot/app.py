from chatterbot import ChatBot
from flask import Flask, render_template, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
bot = ChatBot("chatbot",
    storage_adapter="chatterbot.storage.SQLStorageAdapter",
    database_uri="sqlite:///database.sqlite3",
    read_only=True,
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            "default_response": "Sorry, I don't understand that.",
            "max_similarity_threshold": 0.9
        }
    ]
)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get")
def get_bot_response():
    user_text = request.args.get('msg')  # Get message from user
    return str(bot.get_response(user_text))

if __name__ == "__main__":
    app.run(debug=True)
