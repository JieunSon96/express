import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
export default class Footer extends Component {
    render(){
        return(

<footer className="footer">
                        <div className="content has-text-centered">
                            <div>
                                <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
      <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
      is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
    </div>
                        </div>
                    </footer>
        )
    }
}
