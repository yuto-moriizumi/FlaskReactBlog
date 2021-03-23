import React from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

type Entry = {
  id: number; title: string; text: string; created_at: string;
}
interface State {
  entries: Entry[];
}

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
if (!SERVER_URL) new Error("SERVER_URL must be specified");

export default class Index extends React.Component<{}, State> {
  state = { entries: new Array<Entry>() };

  async componentDidMount() {
    const res = await axios.get(`${SERVER_URL}/entries`);
    this.setState({ entries: res.data });
  }

  render() {
    return (
      <ul className="list-group list-group-flush">
        {this.state.entries.length === 0 ? "投稿がありません" : this.state.entries.map(entry =>
          <Card key={entry.id} className="mt-3">
            <Card.Body>
              <Card.Title>{entry.title}</Card.Title>
              <Card.Body>
                <p>{entry.text}</p>
                <Link to={`/entries/${entry.id}`}>
                  続きを読む
                </Link>
              </Card.Body>
            </Card.Body>
          </Card>
        )}
      </ul>
    );
  }
}
