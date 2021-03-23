import React from "react";
import axios from "axios";
import { RouteComponentProps } from 'react-router';

type Entry = {
    id: number; title: string; text: string; created_at: string;
}
type State = Entry;
type Prop = RouteComponentProps<{ id: string }>;

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
if (!SERVER_URL) new Error("SERVER_URL must be specified");

export default class Edit extends React.Component<Prop, State> {
    state = { id: -1, title: "string", text: "string", created_at: "" };

    async componentDidMount() {
        const res = await axios.get(`${SERVER_URL}/entries/${this.props.match.params.id}`);
        this.setState(res.data);
    }

    render() {
        if (this.state.id === -1) return <p>ロード中...</p>;
        return (
            <>
                <form method="POST" className="add-entry">
                    <div className="form-group">
                        <label htmlFor="InputTitle" className="form-label">タイトル</label>
                        <input type="text" className="form-control" id="InputTitle" name="title" defaultValue={this.state.title} onChange={(e) => { this.setState({ title: e.target.value }) }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputText" className="form-label">本文</label>
                        <textarea className="form-control" id="InputText" name="text" rows={3} defaultValue={this.state.text} onChange={(e) => { this.setState({ text: e.target.value }) }}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(e) => {
                        e.preventDefault();
                        axios.put(`${SERVER_URL}/entries/${this.state.id}`, this.state).catch(e => console.log(e));
                    }}>更新</button>
                </form>
            </>
        );
    }
}
