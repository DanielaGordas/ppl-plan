import React from 'react';
import '../styles/components/lightbulb.scss'

const LightBulb = () => {

  return (
      <div className="center">
        <a>
          <div className="lightbulb">
          <div className="bulb-top">
            <div className="reflection"></div>
          </div>
            <div className="bulb-middle-1"></div>
            <div className="bulb-middle-2"></div>
            <div className="bulb-middle-3"></div>
            <div className="bulb-bottom">
              <div className="line"></div>
              <div className="line"></div>
              <div className="bottom"></div>
            </div>
          </div>
        </a>
      </div>
  )
}

export default LightBulb;