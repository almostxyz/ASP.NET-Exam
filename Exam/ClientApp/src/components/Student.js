import React, { Component } from 'react'

export class Student extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            name: '',
            studentCard: '',
            editMode: false
        }
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        if (this.props.student) {
            const { id, name, studentCard } = this.props.student
            this.setState({
                id,
                name,
                studentCard
            })
        }
    }

    handleChange = (e) => {
        const target = e.target

        if (target.name === 'studentName')
            this.setState({ name: target.value })
        else this.setState({ studentCard: target.value })
    }

    setEditMode = (e) => {
        this.setState({
            editMode: true
        })
    }

    async handleDelete(e) {
        e.preventDefault()
        this.props.onRemove(this.state.id)

        const res = await fetch(`student/${this.state.id}`, {
            method: 'DELETE'
        })

        const content = await res.json()
        console.log(content)
    }

    // СОХРАНЕНИЕ В БД
    async handleUpdate(e) {
        e.preventDefault()

        console.log('UPDATE', this.state)

        const res = await fetch(`student/${this.state.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Name": this.state.name,
                "StudentCard": this.state.studentCard
            })
        })

        const content = await res.json()

        console.log(content)

        this.setState((prev) => ({
            editMode: !prev.editMode
        }))
    }

    async handleSubmit(e) {
        e.preventDefault()

        const { name, studentCard } = this.state

        this.setState({ name: '', studentCard: '' })

        const res = await fetch(`student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "Name": name, "StudentCard": studentCard, "GroupId": Number(this.props.group) })
        })

        const content = await res.json()
        this.props.onAdd(content.id, name, studentCard)

        console.log(content)
    }

    render() {
        // добавить инпуты
        const regularSt =
            <tr className="d-flex">
                <td className="col-6">
                    {
                        this.state.editMode
                            ? <input
                                type="text"
                                className="form-control"
                                value={this.state.name}
                                name="studentName"
                                placeholder="Имя студента..."
                                onChange={this.handleChange}
                            ></input>

                            : this.state.name
                    }
                </td>
                <td className="col-3">
                    {
                        this.state.editMode
                            ? <input
                                type="text"
                                className="form-control"
                                value={this.state.studentCard}
                                name="studentCard"
                                placeholder="Номер зачётки..."
                                onChange={this.handleChange}
                            ></input>
                            : this.state.studentCard
                    }
                </td>
                <td className="col-3">
                    <button className="btn btn-danger text-white" onClick={this.handleDelete}>Удалить</button>
                    {
                        this.state.editMode
                            ? <button className="btn btn-success text-white" onClick={this.handleUpdate}>Сохранить</button>
                            : <button className="btn btn-info text-white" onClick={this.setEditMode}>Изменить</button>
                    }
                    {/*Кнопки*/}
                </td>
            </tr>

        const newSt =
            <tr className="d-flex">
                <td className="col-6">
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.name}
                        name="studentName"
                        placeholder="Имя студента..."
                        onChange={this.handleChange}
                    ></input>
                </td>
                <td className="col-3">
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.studentCard}
                        name="studentCard"
                        placeholder="Номер зачётки..."
                        onChange={this.handleChange}
                    ></input>
                </td>
                <td className="col-3">
                    <button className="btn btn-primary text-white" onClick={this.handleSubmit}>Добавить</button>
                </td>
            </tr>


        return (
            this.props.student ? regularSt : newSt
        )
    }

}