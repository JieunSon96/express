import React, { Component } from 'react';
import "../../css/main.css";

export default class Index extends Component {
    render() {
        return (




  <html>
      <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="ie=edge"></meta>
            <div className="container is-fluid">

                <div className="header">
                    <nav class="navbar" role="navigation" aria-label="main navigation">
                        <div class="navbar-brand">
                            <a class="navbar-item" href="https://bulma.io">
                                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"></img>
                            </a>

                            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </a>
                        </div>

                        <div id="navbarBasicExample" class="navbar-menu">
                            <div class="navbar-start">
                                <a class="navbar-item">
                                    Home
      </a>

                                <a class="navbar-item">
                                    Documentation
      </a>

                                <div class="navbar-item has-dropdown is-hoverable">
                                    <a class="navbar-link">
                                        More
        </a>

                                    <div class="navbar-dropdown">
                                        <a class="navbar-item">
                                            About
          </a>
                                        <a class="navbar-item">
                                            Jobs
          </a>
                                        <a class="navbar-item">
                                            Contact
          </a>
                                        <hr class="navbar-divider"></hr>
                                        <a class="navbar-item">
                                            Report an issue
          </a>
                                    </div>
                                </div>
                            </div>

                            <div class="navbar-end">
                                <div class="navbar-item">
                                    <div class="buttons">
                                        <a class="button is-primary">
                                            <strong>Sign up</strong>
                                        </a>
                                        <a class="button is-light">
                                            Log in
          </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                </div>
                
                <div className="row">
                <div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">John Smith</p>
        <p class="subtitle is-6">@johnsmith</p>
      </div>
    </div>

    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
      <a href="#">#css</a> <a href="#">#responsive</a>
      <br/>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
</div>
                </div>




                <footer class="footer">
                    <div class="content has-text-centered">
                        <p>
                            <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
      <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
      is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
    </p>
                    </div>
                </footer>
            </div>
            </html>

        );
    }
}

