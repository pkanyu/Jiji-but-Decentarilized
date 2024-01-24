import React from 'react';
import './ArtSlider.scss'; // Ensure this path is correct

const ArtSlider: React.FC = () => {
  const handleNavigation = (direction: 'next' | 'prev') => {
    const slider = document.querySelector('.art-slider .slider');
    const items = document.querySelectorAll('.art-slider .item');

    if (slider) {
      if (direction === 'next' && items.length > 0) {
        slider.append(items[0]);
      } else if (direction === 'prev' && items.length > 0) {
        slider.prepend(items[items.length - 1]);
      }
    }
  };

  return (
    <main className="art-slider">
      <ul className='slider'>
        <li className='item' style={{ backgroundImage: "url('https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg')" }}>
          <div className='content'>
            <h2 className='title'>"Lossless Youths" by Elara Thalassa</h2>
            <p className='description'>In a realm where time stands still, the eternal youths dance amidst the cosmos. Their laughter echoes in the void, a melody of unending innocence and joy. Here, in the cradle of stars, they play, untouched by the ravages of time, forever young, forever free.</p>
            <button>Read More</button>
          </div>
        </li>
        {/* Repeat for other items */}
        <li className='item' style={{ backgroundImage: "url('https://i.redd.it/tc0aqpv92pn21.jpg')" }}>
          <div className='content'>
            <h2 className='title'>"Estrange Bond" by Orion Vesper</h2>
            <p className='description'>Beneath a sky painted with twilight whispers, two souls stand, tethered yet apart. In their eyes, the reflection of unspoken stories, a bond forged in the crucible of fate. Around them, the world fades, a blur of memories and dreams, leaving only the poignant silhouette of their estranged embrace.</p>
            <button>Read More</button>
          </div>
        </li>
        <li className='item' style={{ backgroundImage: "url('https://wharferj.files.wordpress.com/2015/11/bio_north.jpg')" }}>
          <div className='content'>
            <h2 className='title'>"The Gate Keeper" by Lysander Eos</h2>
            <p className='description'>At the threshold of worlds, the Gate Keeper stands, a solitary sentinel. His gaze pierces the veil of realities, guarding secrets untold. Around him, ancient stones whisper tales of forgotten epochs, and the air shimmers with the magic that flows through the gate's archaic arch.</p>
            <button>Read More</button>
          </div>
        </li>
        <li className='item' style={{ backgroundImage: "url('https://images7.alphacoders.com/878/878663.jpg')" }}>
          <div className='content'>
            <h2 className='title'>"Last Trace Of Us" by Aurora Callista</h2>
            <p className='description'>Amidst the ruins of what once was, echoes of the past linger like ghosts. Here, amidst the fragments of yesteryears, the last trace of us remains, a testament to what was lost, a memory etched in the silent stones and the still air.</p>
            <button>Read More</button>
          </div>
        </li>
        <li className='item' style={{ backgroundImage: " url('https://theawesomer.com/photos/2017/07/simon_stalenhag_the_electric_state_6.jpg')"}}>
          <div className='content'>
            <h2 className='title'>"Urban Decay" by Artemis Phaedra</h2>
            <p className='description'>In the heart of the forsaken city, where nature reclaims what was once hers, lies the beauty of decay. Buildings, once symbols of human triumph, now stand as monuments to the relentless passage of time, their crumbling facades a canvas for the artistry of decay.</p>
            <button>Read More</button>
          </div>
        </li>
        <li className='item' style={{ backgroundImage: "url('https://da.se/app/uploads/2015/09/simon-december1994.jpg')" }}>
          <div className='content'>
            <h2 className='title'>"The Migration" by Evander Sol</h2>
            <p className='description'>Across the cold, vast canvas of the sky, they move, a flowing river of wings. The migration speaks of ancient rhythms, of journeys etched into the very bones of the earth. Above, the sky watches, a silent guardian of these travelers of the wind.</p>
            <button>Read More</button>
          </div>
        </li>
        {/* Add more items as needed */}
      </ul>
      <nav className='nav'>
        <button className='btn prev' onClick={() => handleNavigation('prev')}>{"<-"}</button>
        <button className='btn next' onClick={() => handleNavigation('next')}>{"->"}</button>
      </nav>
    </main>
  );
};

export default ArtSlider;
