import React, { Component } from 'react'

import OptionComponent from 'component/option-component'

const Discogs = require('disconnect').Client
const userToken = 'ONWOJvxzlRwscFCGGFGJRwtwxDtUebKwhmaKxBWl'
const discogs = new Discogs({ userToken: userToken })

// import * as countries from '../../countries.min.json'

class ApplicationContainer extends Component {
    constructor () {
        super()

        this.state = {
            playlists: [],
            content: '',
            input: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleGoClick = this.handleGoClick.bind(this)
    }

    /* handleCountrySelected (event) {
        this.setState({ country: event.target.value, temp: '' })
    } */

    /* handleCitySelected (event) {
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + event.target.value + '&APPID=52261c83c6e8a4c8e14e163120944701', { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ temp: (Number.parseFloat(response.main.temp) - 273.15).toFixed(2) })
            })
    } */

    componentDidMount () {
        // interroger le serveur connecté à la bdd pour récupérer les noms des playlists
        fetch('http://localhost:8080/playlists', { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ playlists: response })
            })
    }

    handleInputChange (event) {
        this.setState({ input: event.target.value })
    }

    handleGoClick () {
        // let temp
        discogs.database().search(this.state.input, { type: 'master', per_page: 2000 }, (error, data) => {
            if (error) {
                throw error
            }
            // resultCallback(data)
            console.log(data.results[0])
            this.setState({ content: data.results })
            // temp = data.results[0].master_id
        })

        /* discogs.database().getMaster(temp, { 'Access-Control-Allow-Origin': '*' }, (error, master) => {
            if (error) {
                throw error
            }
            // resultCallback(master)
            console.log(master)
        }) */
    }

    render () {
        return (
            <div>
                <header>
                    <h1>musicap</h1>
                    <select>
                        {this.state.playlists.map((playlist, index) => <OptionComponent key={index} text={playlist.title} />)}
                    </select>
                    <input type='text' placeholder='rechercher de la musique' onChange={this.handleInputChange} />
                    <button onClick={this.handleGoClick}>go</button>
                </header>
                <main>
                    {JSON.stringify(this.state.content)}
                </main>
            </div>
        )
    }
}

export default ApplicationContainer
