import React from 'react'
import './Sidebar.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
    return (
        <div class="wrapper">
        <nav id="sidebar">
            <div class="sidebar-header">
                <h4>Processo seletivo</h4>
                <h6>Front-End</h6>
            </div>
    
            <ul class="list-unstyled components">
                <li class="active">
                    <a data-toggle="collapse"  aria-expanded="true" class="dropdown-toggle">Home</a>
                    <ul class="collapse list-unstyled" id="homeSubmenu">
                        <li>
                            <a >Home 1</a>
                        </li>
                        <li>
                            <a >Home 2</a>
                        </li>
                        <li>
                            <a >Home 3</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a >About</a>
                </li>
                <li>
                    <a data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Pages</a>
                    <ul class="collapse list-unstyled" id="pageSubmenu">
                        <li>
                            <a >Page 1</a>
                        </li>
                        <li>
                            <a >Page 2</a>
                        </li>
                        <li>
                            <a >Page 3</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a >Portfolio</a>
                </li>
                <li>
                    <a >Contact</a>
                </li>
            </ul>
        </nav>
    
    </div>
    )
}

export default Sidebar