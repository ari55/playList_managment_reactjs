import React from 'react'
import YouTube from 'react-youtube'

const TrackListComponent = ({ onClick, playlistId, result }) => (
    <div className='discogs-results' onClick={onClick}>
        <button value='tracks'>Retour</button>
        <h2>Vidéos</h2>
        {result.videos.map((video, index) =>
            <div key={index}>
                <div>
                    <YouTube videoId={video.uri.split('=')[1]} opts={{ height: '240', width: '320' }} />
                </div>
                <div>
                    <a href={video.uri}>{video.title}</a>
                </div>
                <div>
                    <button value={'/' + [playlistId, video.title.replace(/ /g, '%20').replace(/\//g, '%2F').replace(/\./g, '%2E').replace(/\?/g, '%3F'), video.uri.replace(/ /g, '%20').replace(/\//g, '%2F').replace(/\./g, '%2E').replace(/\?/g, '%3F'), result.id].join('/')}>Ajouter à la playlist</button>
                </div>
            </div>
        )}
        <h2>Tracklist</h2>
        {result.tracklist.map((track, index) =>
            <div key={index}>
                <div>
                    {track.position + '.'}
                </div>
                <div>
                    {track.title}
                </div>
            </div>
        )}
    </div>
)

export default TrackListComponent
