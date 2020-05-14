import React, {Component} from 'react';
import './App.css';
import Employee from './Employee/Employee'
import Sidebar from './Sidebar/Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import NumberFormat from 'react-number-format';

class App extends Component{
    state = {
      error: null,
      items: [{
        id: '',
        employee_name: '',
        employee_salary: '',
        employee_age: '',
        profie_image: '',
        value: '',
      }],
      valuesInserted: [
        {id: 0, value: 0, green: false},
        {id: 1, value: 0, green: false},
        {id: 2, value: 0, green: false},
        {id: 3, value: 0, green: false},
        {id: 4, value: 0, green: false},
        {id: 5, value: 0, green: false},
        {id: 6, value: 0, green: false},
        {id: 7, value: 0, green: false},
        {id: 8, value: 0, green: false},
        {id: 9, value: 0, green: false},
        {id: 10, value: 0, green: false},
        {id: 11, value: 0, green: false},
        {id: 12, value: 0, green: false},
        {id: 13, value: 0, green: false},
        {id: 14, value: 0, green: false},
        {id: 15, value: 0, green: false},
        {id: 16, value: 0, green: false},
        {id: 17, value: 0, green: false},
        {id: 18, value: 0, green: false},
        {id: 19, value: 0, green: false},
        {id: 20, value: 0, green: false},
        {id: 21, value: 0, green: false},
        {id: 22, value: 0, green: false},
        {id: 23, value: 0, green: false},
      ],
      maxValue: 200,
      creating: false,
      idModal: 0,
      firstValue: '',
      //array para armazenar os dados que serão obtidos pela api
    };

  componentDidMount() {//consumindo a API
    fetch("http://dummy.restapiexample.com/api/v1/employees")
      .then(res => res.json())
      .then(
        (result) => {//passando os dados da api para o array no state
          this.setState({
            items: result.data
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  catchInfo = (event) => {
    let a = parseInt(event.target.value, 10);
    let b = parseInt(this.state.valuesInserted[this.state.idModal].value, 10);
    let value = a+b;
    if(value > 200) value = 200;
    this.setState({firstValue: value})
    console.log('firstvalue:' , this.state.firstValue)
  }

  startCreateEventHandler = (id) =>{
    this.setState({creating : true});
    const a = parseInt(id, 10);
    this.setState({idModal: (a)});
  }

  stopCreateEventHandlerCancel = (event, id) =>{
    this.setState({creating : false});
  }

  stopCreateEventHandlerConfirm = (event, id) =>{
    let a = this.state.valuesInserted.slice(); //creates the clone of the state
    a[this.state.idModal].value = this.state.firstValue;
    if(a[this.state.idModal].value > 0) a[this.state.idModal].green = true;
    this.setState({valuesInserted: a});
    this.setState({creating : false});
  }

  findIdBarWidth = (props) => {
    let id = parseInt(props.id);
    let barWidth = this.state.valuesInserted.find(
      value => value.id === id-1
    );
    if(barWidth === undefined) return false;
    return barWidth.value;
  }

  findId = (props) => {
    let id = parseInt(props.id);
    let green = this.state.valuesInserted.find(
      value => value.id === id-1
    );
    if(green === undefined) return false;
    return green.green;
  }

  render() {
    const { error, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }else {
      return (
        <div className='geral'>
         <Sidebar/>
         {this.state.creating && <div className="divModal"><header className='modalHeader'><h1>Inserir valor em reais para {this.state.items[this.state.idModal].employee_name}</h1></header>
                <section className='modalContent'>
                    <input type="text"  onChange={(event) => this.catchInfo(event)}></input>
                </section>
                <section className='modalActions'> 
                    <button className='btnModal' onClick={() => this.stopCreateEventHandlerCancel()}>Cancelar</button>
                    <button className='btnModal' onClick={() => this.stopCreateEventHandlerConfirm(this.state.idModal)}>Confirmar</button>
                </section>
              </div>}
         <div className='container' >
          {console.log('estado criando: ', this.state.creating)}
          
            <div className='row mt-5'>  
              <div className='col-md-12'>
              <h2 className='titulo'>Pessoas cadastradas e seus valores</h2>
                <div className='employees'>
                  {items.map(item => (
                    <div className='row mt-5'>
                      <div className='row mt-5'>
                        <div className='col-12'>
                          <Employee id={item.id}
                            name={item.employee_name}
                            salary={item.employee_salary}
                            age={item.employee_age}
                            profileImage={item.profie_image}
                            barWidth = {this.findIdBarWidth(item)} 
                            idModal = {this.state.idModal}
                            green = {this.findId(item)}>
                              
                              <div class="row">
                                  <div className='col-4 offset-8'>
                                    {this.findId(item) ? 
                                      ( <div class='employeeHeaderWithValue'></div> ) 
                                      : ( <div class='employeeHeaderWithoutValue'></div> )
                                    }
                                  </div>
                              </div>
                              <h6>Id:{item.id}  Salário: <NumberFormat thousandSeparator={true} prefix={'R$'} value={item.employee_salary} style={{border:'none', background:'#91a2eb', color:'#FFFFFF', width:'9%'}}/>    Idade: {item.employee_age}</h6>                            
                              
                              <div class="row">
                                  <div className='col offset-9'>
                              <button className='createEventButton' onClick={() => this.startCreateEventHandler(item.id-1)}><i className='icon+'> + </i>Adicionar um valor em reais</button>
                              </div>
                    </div>
                          </Employee>
                        </div>  
                      </div>
                    </div>
                  ))}
                </div>  
              </div>
            </div>
          </div>
        </div>  
      );
    }
  }
}

export default App;
