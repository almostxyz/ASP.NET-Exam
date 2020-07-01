import React, { Component } from 'react'
import { Student } from './Student'

export class StudentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groups: [],
            selectedGroup: 0,
            students: [],
            loading: true
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.getGroups()
    }

    async getGroups() {
        const response = await fetch('group')
        const data = await response.json()

        console.log(data)

        this.setState({ groups: data.data })
    }

    async getStudents(groupId) {
        const response = await fetch(`student/getStudentsByGroupId/${groupId}`)
        const data = await response.json()

        console.log(data)

        this.setState({ students: data.data, loading: false })
    }

    remove = (id) => {
        this.setState((prev) => ({
            students: prev.students.filter((st) => st.id !== id)
        }))
    }

    add = (id, name, studentCard) => {
        console.log("ADD", id, name, studentCard)
        this.setState({
            students: [...this.state.students, { id, name, studentCard, groupID: this.state.selectedGroup }]
        })
    }

    async handleChange(e) {
        const { value } = e.target
        if (value > 0) {
            this.setState({ selectedGroup: value, loading: true })
            this.getStudents(value)
        }
    }

    renderTable = (students) =>
        <table className='table table-stripped col-12 border p-3 mt-3'>
            <thead>
                <tr className="d-flex">
                    <th className="col-6">Имя</th>
                    <th className="col-3">Номер зачётки</th>
                    <th className="col-3"></th>
                </tr>
            </thead>
            <tbody>
                {
                    students.map(st =>
                        <Student key={st.id} student={st} onRemove={this.remove} />
                    )
                }
                <Student group={this.state.selectedGroup} onAdd={this.add} />
            </tbody>
        </table>

    render() {
        let contents =
            this.state.selectedGroup === 0
                ? <p className="col-12 text-grey text-center">Выберите группу</p>
                : this.state.loading
                    ? <p className='col-12 text-center'><em>Загрузка...</em></p>
                    : this.renderTable(this.state.students)

        return (

            <div className="container row p-0 m-0">
                <div className="col-9">
                    <h2 className='text-info'>Список студентов</h2>
                </div>
                <div className='col-3'>
                    <select
                        onChange={this.handleChange}
                        className="form-control"
                        value={this.state.selectedGroup}
                    >
                        <option
                            default
                            disabled
                            value={0}
                        >
                            Выберите группу
                        </option>
                        {
                            this.state.groups.map(g =>
                                <option
                                    key={g.id}
                                    value={g.id}
                                >
                                    {g.name}
                                </option>
                            )
                        }
                    </select>
                </div>
                {contents}
            </div>

        )
    }
}