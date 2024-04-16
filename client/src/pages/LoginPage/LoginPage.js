
import React from 'react';
import './LoginPage.css';
import Logo from './liferaylogo.png';
import Background from './background.png';

function LoginPage() {
  return (
    <div>
      <header className="u-clearfix u-header u-header" id="sec-f329">
        <div className="u-clearfix u-sheet u-sheet-1"></div>
      </header>
      <section className="u-clearfix u-section-1" id="sec-0f87">
        <div className="u-clearfix u-sheet u-sheet-1">
          <div className="data-layout-selected u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
            <div className="u-layout">
              <div className="u-layout-row">
                <div className="u-container-style u-layout-cell u-size-30 u-layout-cell-1">
                  <div className="u-container-layout u-container-layout-1">
                    <img className="u-image u-image-default u-image-1" src={Background} alt="" data-image-width="878" data-image-height="1018" />
                    <p className="u-align-center u-custom-font u-text u-text-default u-text-white u-text-1">Welcome to Liferay<br /><br /></p>
                  </div>
                </div>
                <div className="u-container-style u-layout-cell u-size-30 u-layout-cell-2">
                <img className="u-image u-image-default u-image-2" src={Logo} alt="" data-image-width="150" data-image-height="150" />
                  <div className="u-container-layout u-container-layout-2">
                    <div className="custom-expanded u-form u-login-control u-form-1">
                      <form action="#" className="u-clearfix u-form-custom-backend u-form-spacing-38 u-form-vertical u-inner-form" source="custom" name="form" style={{padding: '30px'}} method="post">
                        <div className="u-form-group u-form-name">
                          <label htmlFor="username-a30d" className="u-label">Username *</label>
                          <input type="text" placeholder="Enter your Username" id="username-a30d" name="username" className="u-grey-5 u-input u-input-rectangle u-input-1" required />
                        </div>
                        <div className="u-form-group u-form-password">
                          <label htmlFor="password-a30d" className="u-label">Password *</label>
                          <input type="password" placeholder="Enter your Password" id="password-a30d" name="password" className="u-grey-5 u-input u-input-rectangle u-input-2" required />
                        </div>
                        <div className="u-form-checkbox u-form-group">
                          <input type="checkbox" id="checkbox-a30d" name="remember" value="On" className="u-field-input" />
                          <label htmlFor="checkbox-a30d" className="u-field-label" style={{}}>Remember me</label>
                        </div>
                        <div className="u-align-left u-form-group u-form-submit">
                          <button type="submit" className="u-border-none u-btn u-btn-round u-btn-submit u-button-style u-custom-color-1 u-radius u-btn-1">Login</button>
                        </div>
                        <input type="hidden" value="" name="recaptchaResponse" />
                      </form>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
