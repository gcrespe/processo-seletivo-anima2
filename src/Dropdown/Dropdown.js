import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

//Criação do componente Dropdown Button
class DropDown extends Component{
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.title,
    }
  }
  handleClickOutside(){
    this.setState({
      listOpen: false
    })
  }
  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }
  render(){
    //convertendo o props.list em um array e o passando para data
    const data = Array.from(this.props.list);
    const{listOpen, headerTitle} = this.state
    return(
      <div className="dd-wrapper">
        <div className="dd-header" onClick={() => this.toggleList()}>
          <div className="dd-header-title">{headerTitle}</div>
        </div>
        {listOpen && <ul  className="list-unstyled-components">
          {/* map para poder percorrer o vetor data e exibir cada um de seus elementos*/}
         {data.map( item => (
           <li  className="dd-list-item" key={item.id} >{item.title}</li>
          ))}
        </ul>}
      </div>
    )
  }
}

export default DropDown