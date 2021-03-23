import React from "react";
import axios from "axios";
import { RouteComponentProps } from 'react-router';

type Entry = {
    id: number; title: string; text: string; created_at: string;
}
interface State {
    entry: Entry;
}
type Prop = RouteComponentProps<{ id: string }>;

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
if (!SERVER_URL) new Error("SERVER_URL must be specified");

export default class Post extends React.Component<Prop, State> {
    state = { entry: { id: -1, title: "string", text: "string", created_at: "" } };

    render() {
        return (
            <>
                <form method="POST" className="add-entry">
                    <div className="form-group">
                        <label htmlFor="InputTitle" className="form-label">タイトル</label>
                        <input type="text" className="form-control" id="InputTitle" name="title" defaultValue={this.state.entry.title} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputText" className="form-label">本文</label>
                        <textarea className="form-control" id="InputText" name="text" rows={3} defaultValue={this.state.entry.text}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(e) => {
                        e.preventDefault();
                        axios.post(`${SERVER_URL}/entries`, this.state.entry).catch(e => console.log(e));
                    }}>投稿</button>
                </form>
            </>
        );
    }
}
