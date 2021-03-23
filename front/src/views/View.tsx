import React from "react";
import axios from "axios";
import { RouteComponentProps } from 'react-router';
import { Link } from "react-router-dom";

type Entry = {
    id: number; title: string; text: string; created_at: string;
}
interface State {
    entry: Entry;
}
type Prop = RouteComponentProps<{ id: string }>;

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
if (!SERVER_URL) new Error("SERVER_URL must be specified");

export default class View extends React.Component<Prop, State> {
    state = { entry: { id: -1, title: "string", text: "string", created_at: "" } };

    async componentDidMount() {
        const res = await axios.get(`${SERVER_URL}/entries/${this.props.match.params.id}`);
        this.setState({ entry: res.data });
    }

    render() {
        if (this.state.entry.id === -1) return <p>ロード中...</p>;
        return (
            <><h2>{this.state.entry.title}</h2>
                <p>{this.state.entry.text}</p>
                <p>投稿日時{this.state.entry.created_at}</p>
                <div className="btn-group">
                    <Link to={`/entries/${this.state.entry.id}/edit`}>
                        <button className="btn btn-primary">編集</button>
                    </Link>
                    <Link to="/" className="btn btn-danger ml-3" onClick={() => {
                        axios.delete(`${SERVER_URL}/entries/${this.state.entry.id}`);
                    }}>削除</Link>
                </div></>
        );
    }
}
