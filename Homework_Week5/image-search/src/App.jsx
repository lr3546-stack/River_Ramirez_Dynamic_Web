/*
  HW: dependency arrays
  - The default search uses [] -- run once, when App first mounts. It only
    needs to fill the empty page one time; after that the SearchBar takes over.
    (In dev, StrictMode mounts twice on purpose, so the network tab shows two
    requests. The built app only sends one.)
  - If `images` were in the dependency array: the effect fetches, then calls
    setImages, so `images` changes, so the effect runs again, fetches again,
    sets images again... forever. Every loop is a request, and the 50-per-hour
    budget would be gone in seconds.
*/
import {useState, useEffect} from 'react'
import SearchBar from './components/SearchBar'
import ImageList from './components/ImageList'
import {searchImages} from './api'

const DEFAULT_TERM = 'pasta'

const App = () => {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)
  // the term we last searched for, so the heading can say what is showing
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = async (term) => {
    setIsLoading(true)
    setError(null)
    setSearched(true)
    setSearchTerm(term)

    try {
      // since our imageSearch function is async and we need to await the results,
      // we need to await when calling searchImages()
      // which means, you need to flag this function async
      const results = await searchImages(term)
      setImages(results)
    } catch (err) {
      console.error(err)
      setError('The search did not work. Check the console.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleSubmit(DEFAULT_TERM)
  }, [])

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} /> <br />
      {searchTerm && (
        <h2 className="px-4 text-2xl font-bold">Photos of "{searchTerm}"</h2>
      )}
      {isLoading && <p className="p-4 text-gray-500">Searching ...</p>}
      {error && <p className="p-4 text-red-500">{error}</p>}
      {!isLoading && !error && searched && images.length === 0 && (
        <p className="p-4 text-gray-500">
          No photos for that one. Try another word!
        </p>
      )}
      <ImageList images={images} />
    </div>
  )
}

export default App
