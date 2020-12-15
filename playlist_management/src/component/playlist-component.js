import React from 'react'
import YouTube from 'react-youtube'

const PlaylistComponent = ({ onClick, result, playlistIndex, autoplay, onVideo }) => (
    <div className='discogs-results' onClick={onClick}>
        <button value='playlist'>Retour</button>
        <h2>{'Playlist ' + result.name}</h2>
        {result.videos.length < 1 ? <p>Aucune vidéo dans cette playlist pour l'instant</p>
            : <div>
                <div>
                    <YouTube videoId={result.videos[playlistIndex].uri.split('=')[1]} onEnd={onVideo} opts={{ autoplay: autoplay, height: '240', width: '320' }} />
                </div>
                <div>
                    <div>
                        <h3>Tout lire :</h3>
                    </div>
                    <div>
                        <a href={result.videos[playlistIndex].uri}>{result.videos[playlistIndex].title}</a>
                    </div>
                    <div>
                        <button onClick={onVideo}>{'<'}</button>
                        <button onClick={onVideo}>{'>'}</button>
                    </div>
                </div>
            </div>}
        <hr />
        {result.videos.map((video, index) =>
            <div key={index}>
                <div>
                    <YouTube videoId={video.uri.split('=')[1]} opts={{ height: '240', width: '320' }} />
                </div>
                <div>
                    <a href={video.uri}>{video.title}</a>
                </div>
                <div>
                    <button value={video.id}>Retirer de la playlist</button>
                </div>
            </div>
        )}
    </div>
)

export default PlaylistComponent
