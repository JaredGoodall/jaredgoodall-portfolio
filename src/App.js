import React, { useState } from 'react';
import './App.css';
import {isMobile} from 'react-device-detect';

function App() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className='App'>
      <div className={isMobile ? 'mobile components' : 'components'}>
        <table className='no-border'>
          <tbody>
            <tr className='layer'>
              <td>
                <img
                  src={require('./images/1.png')}
                  className='image-element'
                  alt='top component'
                />
              </td>
            </tr>
            </tbody>
          </table>
          <table className='no-border'>
            <tbody>  
              <tr className='layer'>
                <td>
                  <img
                    src={require('./images/2.png')}
                    className='image-element'
                    alt='left layer 1 component'
                  />
                </td>
                <td>
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className={isHovered ? 'fade-out' : ''}
                  style={{ position: 'relative' }}
                >
                  <a href='https://youtu.be/BNig6xG36i4'>
                    <img
                      src={require('./images/3.png')}
                      className='image-element'
                      alt='goob doobs component'
                    />
                  </a>
                  <a href='https://youtu.be/BNig6xG36i4'>
                    <img
                      src={require('./images/3-highlight.png')}
                      className='image-element overlay'
                      alt='goob doobs highlight component'
                    />
                  </a>
                </div>
              </td>
                <td>
                  <img
                    src={require('./images/4.png')}
                    className='image-element'
                    alt='linkedin component'
                  />
                </td>
                <td>
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className={isHovered ? 'fade-out' : ''}
                  style={{ position: 'relative' }}
                >
                  <a href='https://www.linkedin.com/in/jaredgoodall/'>
                    <img
                      src={require('./images/5.png')}
                      className='image-element'
                      alt='goob doobs component'
                    />
                  </a>
                  <a href='https://www.linkedin.com/in/jaredgoodall/'>
                    <img
                      src={require('./images/5-highlight.png')}
                      className='image-element overlay'
                      alt='goob doobs highlight component'
                    />
                  </a>
                </div>
              </td>
                <td>
                <img
                    src={require('./images/6.png')}
                    className='image-element'
                    alt='left layer 1 component'
                  />
                </td>
              </tr>
              </tbody>
          </table>
          <table className='no-border'>
            <tbody>  
            <tr className='layer'>
              <td>
                <img
                  src={require('./images/7.png')}
                  className='image-element'
                  alt='left layer 2 component'
                />
              </td>
              <td>
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className={isHovered ? 'fade-out' : ''}
                  style={{ position: 'relative' }}
                >
                  <a href='https://www.goobdoobs.com'>
                    <img
                      src={require('./images/8.png')}
                      className='image-element'
                      alt='goob doobs component'
                    />
                  </a>
                  <a href='https://www.goobdoobs.com'>
                    <img
                      src={require('./images/8-highlight.png')}
                      className='image-element overlay'
                      alt='goob doobs highlight component'
                    />
                  </a>
                </div>
              </td>
              <td>
                <img
                  src={require('./images/9.png')}
                  className='image-element'
                  alt='right layer 2 component'
                />
              </td>
            </tr>
            </tbody>
          </table>
          <table className='no-border'>
            <tbody>  
            <tr className='layer'>
              <td>
                <img
                  src={require('./images/10.png')}
                  className='image-element'
                  alt='bottom component'
                />
              </td>
            </tr>
            </tbody>
          </table>
          <table className='no-border'>
            <tbody>  
            <tr className='layer'>
            <td>
                <img
                  src={require('./images/11.png')}
                  className='image-element'
                  alt='bottom component'
                />
              </td>
              <td>
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className={isHovered ? 'fade-out' : ''}
                  style={{ position: 'relative' }}
                >
                  <a href='https://www.jaredgoodall.com'>
                    <img
                      src={require('./images/12.png')}
                      className='image-element'
                      alt='goob doobs component'
                    />
                  </a>
                  <a href='https://www.jaredgoodall.com'>
                    <img
                      src={require('./images/12-highlight.png')}
                      className='image-element overlay'
                      alt='goob doobs highlight component'
                    />
                  </a>
                </div>
              </td>
              <td>
                <img
                  src={require('./images/13.png')}
                  className='image-element'
                  alt='bottom component'
                />
              </td>
            </tr>
            </tbody>
          </table>
          <table className='no-border'>
            <tbody>  
            <tr className='layer'>
              <td>
                <img
                  src={require('./images/14.png')}
                  className='image-element'
                  alt='bottom component'
                />
              </td>
            </tr>
            </tbody>
          </table>
      </div>
    </div>
  );
}

export default App;
