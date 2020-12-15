import React, { Component } from 'react'

import OptionComponent from 'component/option-component'
import AlbumListComponent from 'component/album-list-component'
import TrackListComponent from 'component/track-list-component'
import PlaylistComponent from 'component/playlist-component'

const Discogs = require('disconnect').Client
const userToken = 'ONWOJvxzlRwscFCGGFGJRwtwxDtUebKwhmaKxBWl'
const discogs = new Discogs({ userToken: userToken })

class ApplicationContainer extends Component {
    constructor () {
        super()

        this.state = {
            playlists: [],
            playlistId: '1',
            albums: [],
            tracks: null,
            playlist: null,
            playlistIndex: 0,
            autoplay: 0,
            input: ''
        }

        this.handleHeaderChange = this.handleHeaderChange.bind(this)
        this.handleHeaderClick = this.handleHeaderClick.bind(this)
        this.handleMainClick = this.handleMainClick.bind(this)
        this.handleVideo = this.handleVideo.bind(this)
    }

    componentDidMount () {
        // interroger le serveur connecté à la bdd pour récupérer les noms des playlists
        fetch('http://localhost:8080/playlists', { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ playlists: response })
            })
    }

    handleHeaderChange () {
        if (event.target.tagName === 'SELECT') {
            this.setState({ playlistId: event.target.value })
        } else if (event.target.tagName === 'INPUT') {
            this.setState({ input: event.target.value })
        }
    }

    handleHeaderClick (event) {
        if (event.target.tagName === 'H1') {
            fetch('http://localhost:8080/playlists/' + this.state.playlistId, { method: 'GET' })
                .then(response => response.json())
                .then(response => {
                    // console.log(response)
                    this.setState({ playlist: { name: this.state.playlists.filter((playlist) => playlist.id.toString() === this.state.playlistId)[0].title, videos: response }, playlistIndex: 0, autoplay: 0 })
                })
        } else if (event.target.tagName === 'BUTTON') {
            event.preventDefault()
            this.setState({ tracks: null, playlist: null })
            discogs.database().search(this.state.input, { type: 'master', per_page: 2000 }, (error, data) => {
                if (error) {
                    throw error
                }
                this.setState({ albums: data.results })
            })
        }
    }

    handleMainClick (event) {
        if (event.target.tagName === 'BUTTON') {
            if (event.target.textContent === 'Voir le détail') {
                discogs.database().getMaster(event.target.value, (error, master) => {
                    if (error) {
                        throw error
                    }
                    if (master.videos == null) {
                        master.videos = []
                    }
                    // console.log(master)
                    this.setState({ tracks: master })
                })
            } else if (event.target.textContent === 'Ajouter à la playlist') {
                fetch('http://localhost:8080/tracks' + event.target.value, { method: 'GET' })
            } else if (event.target.textContent === 'Retirer de la playlist') {
                fetch('http://localhost:8080/tracks/' + event.target.value, { method: 'GET' })
                // this.handleHeaderClick({ target: { tagName: 'H1' } })
                this.setState({ playlist: { name: this.state.playlist.name, videos: this.state.playlist.videos.filter((video) => video.id.toString() !== event.target.value) } })
            } else if (event.target.textContent === 'Retour') {
                if (event.target.value === 'tracks') {
                    this.setState({ tracks: null })
                } else if (event.target.value === 'playlist') {
                    this.setState({ playlist: null })
                }
            }
        }
    }

    handleVideo (event) {
        if (event.target.textContent === '<') {
            this.setState({ playlistIndex: this.state.playlistIndex < 1 ? this.state.playlist.videos.length - 1 : this.state.playlistIndex - 1, autoplay: 1 })
        } else {
            this.setState({ playlistIndex: (this.state.playlistIndex + 1) % this.state.playlist.videos.length, autoplay: 1 })
        }
    }

    render () {
        return (
            <div>
                <header onClick={this.handleHeaderClick} onChange={this.handleHeaderChange}>
                    <h1>musicap</h1>
                    <select>
                        {this.state.playlists.map((playlist, index) => <OptionComponent key={index} text={playlist.title} value={playlist.id} />)}
                    </select>
                    <form>
                        <input type='text' placeholder='entrer un artiste / album' />
                        <button>rechercher</button>
                    </form>
                </header>
                <main>
                    {this.state.playlist ? <PlaylistComponent onClick={this.handleMainClick} result={this.state.playlist} playlistIndex={this.state.playlistIndex} autoplay={this.state.autoplay} onVideo={this.handleVideo} /> : this.state.tracks ? <TrackListComponent onClick={this.handleMainClick} playlistId={this.state.playlistId} result={this.state.tracks} /> : <AlbumListComponent onClick={this.handleMainClick} results={this.state.albums} />}

                </main>
            </div>
        )
    }
}

export default ApplicationContainer
