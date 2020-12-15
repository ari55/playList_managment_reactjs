import React from 'react'

const AlbumListComponent = ({ onClick, results }) => (
    <div className='discogs-results' onClick={onClick}>
        {results.map((result, index) =>
            <div key={index}>
                <div>
                    <img src={result.thumb} />
                </div>
                <div>{result.title}</div>
                <div>
                    <button value={result.master_id}>Voir le détail</button>
                </div>
            </div>
        )}
    </div>
)

export default AlbumListComponent
