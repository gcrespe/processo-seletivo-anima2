import React,{Component} from 'react'
import './Sidebar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import DropDown from '../Dropdown/Dropdown'

class Sidebar extends Component{
    state = {
        list: [{id: 1,  title: 'First Option'}, {id: 2,  title: 'Second Option'}, {id: 3,  title: 'Third Option'}],
    }
    render(){
        return (
            <div class="wrapper">
            <nav id="sidebar">
                <div class="sidebar-header">
                    <h4>Processo seletivo</h4>
                    <h6>Front-End</h6>
                </div>
        
                <ul class="list-unstyled components">
                    <li>
                        <a>
                      <DropDown title="Home"
                        list= {this.state.list}/>
                        </a>
                    </li>
                    <li>
                        <a >About</a>
                    </li>
                    <li>
                        <a>
                        <DropDown title="Our Jobs"
                        list= {this.state.list}/></a>
                        
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
}

export default Sidebar