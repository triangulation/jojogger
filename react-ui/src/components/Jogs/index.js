import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'babel-polyfill'
import ErrorMessage from '../elements/ErrorMessage'
import JogsList from './JogsList'
import JogForm from './JogForm'
import { createJog, updateJog, deleteJog } from '../../util/api'

export default class Jogs extends Component {
  constructor () {
    super()
    this.state = {
      loading: false,
      view: 'list', // ['list', 'add', 'edit']
      editJog: null,
      error: null
    }
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.gotoList = this.gotoList.bind(this)
    this.handleUpdateJog = this.handleUpdateJog.bind(this)
    this.handleDeleteJog = this.handleDeleteJog.bind(this)
    this.handleCreateJog = this.handleCreateJog.bind(this)
  }

  handleEditClick (id) {
    const { jogs } = this.props
    const jog = jogs.find(jog => jog.id === id)
    const editJog = { ...jog }
    this.setState({ view: 'edit', editJog })
  }

  handleAddClick (event) {
    event.preventDefault()
    this.setState({ view: 'add' })
  }

  gotoList () {
    this.setState({ view: 'list' })
  }

  handleUpdateJog (updatedJog) {
    const { jogs, setJogs, user, handleJogError } = this.props
    const updatedJogs = JSON.parse(JSON.stringify(jogs))
    const i = jogs.findIndex(jog => jog.id === updatedJog.id)
    updatedJogs[i] = updatedJog
    setJogs(updatedJogs)
    this.gotoList()
    updateJog(user, updatedJog)
      .catch(error => {
        setJogs(jogs)
        handleJogError(error)
      })
  }

  handleDeleteJog (deletedJog) {
    const { jogs, setJogs, user, handleJogError } = this.props
    const updatedJogs = JSON.parse(JSON.stringify(jogs))
    const i = jogs.findIndex(jog => jog.id === deletedJog.id)
    updatedJogs.splice(i, 1)
    setJogs(updatedJogs)
    this.gotoList()
    deleteJog(user, deletedJog)
      .catch(error => {
        setJogs(jogs)
        handleJogError(error)
      })
  }

  handleCreateJog (createdJog) {
    const { jogs, setJogs, user, handleJogError } = this.props
    const updatedJogs = JSON.parse(JSON.stringify(jogs))
    this.setState({ loading: true })
    createJog(user, createdJog)
      .then(j => {
        this.setState({ loading: false })
        updatedJogs.push(j)
        setJogs(updatedJogs)
        this.gotoList()
      })
      .catch(error => {
        this.setState({ loading: false })
        setJogs(jogs)
        handleJogError(error)
      })
  }

  render () {
    const { view, editJog, loading, error } = this.state
    const { noJogs } = this.props
    if (loading || this.props.loading) {
      return <h1>Loading</h1>
    }
    if (error) {
      return <ErrorMessage error={error} onCancel={() => { this.setState({ error: null }) }} />
    }
    if (view === 'add') {
      return <JogForm createJog={this.handleCreateJog} onCancel={this.gotoList} />
    }
    if (noJogs) {
      return (
        <p className='info'>No jogs tracked.
          <button onClick={() => { this.setState({ view: 'add' }) }}>
            Add one.
          </button>
        </p>
      )
    }
    if (view === 'list') {
      return <JogsList onEdit={this.handleEditClick} onAddClick={this.handleAddClick} {...this.props} />
    }
    if (view === 'edit') {
      return <JogForm
        updateJog={this.handleUpdateJog}
        deleteJog={this.handleDeleteJog}
        onCancel={this.gotoList}
        jog={editJog}
      />
    }
  }
}

Jogs.propTypes = {
  onDatesChange: PropTypes.func.isRequired,
  setJogs: PropTypes.func.isRequired,
  jogs: PropTypes.array.isRequired,
  noJogs: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}
