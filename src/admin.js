import { useState } from "react";

function Admin() {
    const [url_original, setUrl_original] = useState('')
    const [url_colored, setUrl_colored] = useState('')
    const [url_now, setUrl_now] = useState('')
    const [location, setLocation] = useState('')
    const [year, setYear] = useState('')
    const [author, setAuthor] = useState('')
    const [external_url, setExternal_url] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const element = {
            url_original,
            url_colored,
            url_now,
            location,
            year,
            author,
            external_url
        }
    
        await fetch('http://localhost:3001/api/elements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(element)
        }).then(() => {
            console.log('Element added')
            setUrl_original(() => '')
            setUrl_colored(() => '')
            setUrl_now(() => '')
            setLocation(() => '')
            setYear(() => '')
            setAuthor(() => '')
            setExternal_url(() => '')
        })
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Admin Panel</h2>
                <input type='text' placeholder='url_original' value={url_original} onChange={(e) => setUrl_original(e.target.value)} required={true} />
                <input type='text' placeholder='url_colored' value={url_colored} onChange={(e) => setUrl_colored(e.target.value)} />
                <input type='text' placeholder='url_now' value={url_now} onChange={(e) => setUrl_now(e.target.value)} required={true} />
                <input type='text' placeholder='location' value={location} onChange={(e) => setLocation(e.target.value)} required={true} />
                <input type='text' placeholder='year' value={year} onChange={(e) => setYear(e.target.value)} required={true} />
                <input type='text' placeholder='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
                <input type='text' placeholder='external_url' value={external_url} onChange={(e) => setExternal_url(e.target.value)} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Admin;