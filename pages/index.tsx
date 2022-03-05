import { useState } from "react"
import axios from 'axios'
import type { NextPage } from "next";

const Home: NextPage = () => {

  const [title, setTitle] = useState('Marshmello'); // Stores the input title by the user, with the default value being "Marshmello"
  const [searchResults, setSearchResults] = useState<any[] | null>(null) // Stores the search results returned by the API
  const [lyrics, setLyrics] = useState<any | null>(null) // Stores the lyrics returned by the API.
  const [loading, setLoading] = useState(false); // Loading State


  // Get Search Results
  const getResults = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.get('api/search/', {
        params: { title }
      });

      const { data } = res;
      setSearchResults(data.response.hits);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // Get Lyrics
  const getLyrics = async (id: string) => {
    try {
      setSearchResults(null); // Remove search results
      setLoading(true);
      const res = await axios.get('api/lyrics/', {
        params: { id }
      });

      const { data } = res;
      setLoading(false);
      setLyrics(data.response.lyrics);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }



  return (
    <div className="flex flex-col md:px-12 px-0 relative bg-background font-poppins items-center min-h-screen
    ">
      <h1 className="text-6xl font-bold text-primary mt-10">
        <span className="text-active">Lyrics</span> App
      </h1>

      <h2 className="text-primary text-2xl font-light mt-6">Get the complete lyrics of any given track</h2>

      <form
        action=""
        className="sm:mx-auto mt-20 justify-center sm:w-full sm:flex"
      >
        <input
          type="text"
          className="flex w-full sm:w-1/3 rounded-lg px-5 py-3 text-base text-background font-semibold focus:outline-none focus:ring-2 focus:ring-active"
          placeholder="Enter a track or artist name eg: Marshmello"
          // value={title}
          onChange={e => {
            setTitle(e.target.value); // Store input value;
            setSearchResults(null); // Remove previous respons
            setLyrics(null); // Remove previous response
          }}
        />

        <div className="mt-4 sm:mt-0 sm:ml-3">
          <button className="block w-full rounded-lg px-5 py-3 bg-active text-base text-primary font-bold hover:text-active hover:bg-primary sm:px-10" type="submit"
            onClick={getResults}
          >
            {loading ? <>Loading..</> : <>Search</>}
          </button>
        </div>
      </form>

      {searchResults && (
        <div className="mt-10">
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.map(song => {
              return (
                <div key={song.result.id} className="pt-6">
                  <div className="flow-root bg-light rounded-lg px-4 pb-8">
                    <div className="mt-6">
                      <div className="flex items-center justify-center">
                        <span className="p-2">
                          <img
                            src={
                              song.result.song_art_image_thumbnail_url
                            }
                            className="w-full h-full rounded-lg"
                            alt={song.result.song_art_image_thumbnail_url}
                          />
                        </span>
                      </div>
                      <div className="text-center justify-center items-center">
                        <h3 className="mt-4 text-lg font-bold w-full break-words overflow-x-auto text-primary tracking-tight">
                          {song.result.title}
                        </h3>
                        <span className="mt-2 text-sm text-secondary block">
                          {song.result.artist_names}
                        </span>
                        <button
                          className="mt-5 text-md text-active"
                          onClick={() => {
                            getLyrics(song.result.id);
                          }}
                        >
                          Get Lyrics &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {lyrics && (
        <div className="mt-10 max-w-2xl">
          <h2 className="text-2xl font-bold text-center text-active">
            Lyrics for {lyrics.trackingData.Title}
          </h2>

          <p className="mt-6 leading-loose text-primary text-xl">
            {lyrics.lyrics.body.plain}
          </p>
        </div>
      )}

      <div className="mt-20 mb-10 text-center">
        <p className="text-primary text-xs">
          Made by Adefeyitimi Adeyeloja -{" "}
          <a
            className="hover:text-active"
            href="https://adefeyitimi.netlify.app"
            target="_blank"
          >
            Check Out My Portfolio Page
          </a>
        </p>
      </div>
    </div>
  )
}

export default Home