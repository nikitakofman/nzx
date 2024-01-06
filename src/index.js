import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import { Logo } from '@pmndrs/branding'
import CustomCursor from './CustomCursor'
import SecondaryCursor from './SecondaryCursor'
import { useState } from 'react'

function Overlay() {
  const [hoverInstagram, setHoverInstagram] = useState(false)
  const [hoverMusic, setHoverMusic] = useState(false)
  const [hoverContact, setHoverContact] = useState(false)

  const hoverStyle = {
    borderRadius: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '20px',
    transition: 'background-color 0.3s, padding 0.3s'
  }

  return (
    <div className="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      {/* <CustomCursor /> */}
      {/* <SecondaryCursor /> */}
      {/* <div style={{ position: 'absolute', fontSize: '16px', fontFamily: 'Oxanium' }} className="mr-10 zap w-full text-left flex items-left ml-10 mt-10 ">
        NZX pushes the boundaries of electronic music, <br></br>delivering a sonic voyage that transcends the ordinary.
      </div> */}

      {/* <a
        href="https://soundcloud.com/nzxmusic"
        target="blank"
        className=" hover-link cursor-none"
        style={{
          ...{ position: 'absolute', bottom: 40, left: 40, fontSize: '13px' }
        }}
        onMouseEnter={() => setHoverInstagram(true)}
        onMouseLeave={() => setHoverInstagram(false)}>
        <span>instagram</span>
      </a>
      <div>
        {' '}
        <a
          href="https://soundcloud.com/nzxmusic"
          style={{
            ...{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }
          }}
          className="hover-link cursor-none text-center"
          target="blank"
          onMouseEnter={() => setHoverMusic(true)}
          onMouseLeave={() => setHoverMusic(false)}>
          <span>From hypnotic basslines to euphoric melodies, NZX pushes the boundaries of electronic music, delivering a sonic voyage that transcends the ordinary.</span>
        </a>
      </div> */}
      <div>
        {' '}
        <a
          href="mailto:nzxaudio@gmail.com"
          target="blank"
          className=" hover-link cursor-none"
          style={{
            ...{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }
          }}
          onMouseEnter={() => setHoverInstagram(true)}
          onMouseLeave={() => setHoverInstagram(false)}>
          <span>contact</span>
        </a>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Overlay />
    {/* <img src="/image.png" className="invert" style={{ position: 'absolute', bottom: 40, left: 40, width: 30 }} /> */}
  </>
)
