import React, {Component} from 'react';
import './App.css';
import Employee from './Employee/Employee'
import Sidebar from './Sidebar/Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import NumberFormat from 'react-number-format'; //NumberFormat é usado para formatar a numeração referente ao employee_salary

class App extends Component{
    state = {
      error: null,
      //criação do vetor de objetos que será responsável por armazenar as informações vindas da api
      items: [{
        id: '',
        employee_name: '',
        employee_salary: '',
        employee_age: '',
        profie_image: '',
        value: '',
      }],
      //valuesInserted é o array que irá controlar o valor da ProgressBar e a cor do elemento na parte superior direita de Employee
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
      //creating é a variável responsável por controlar a exibição do modal. Creating = true exibe o modal
      creating: false,
      //idModal é usado para termos acesso ao id do componente responsável por uma ação
      idModal: 0,
      //firstValue é usado para armazenar o valor que será somado na ProgressBar
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

  //essa função é responsável por reunir o valor inserido no input do modal e somá-lo ao valor anterior já armazenado
  catchInfo = (event) => {
    let a = parseInt(event.target.value, 10);
    let b = parseInt(this.state.valuesInserted[this.state.idModal].value, 10);
    let value = a+b;
    if(value > 200) value = 200;//se a soma dos valores for maior que 200, então será 200 pois é o limite
    this.setState({firstValue: value})
  }
  
  //função chamada quando o usuário clica em "adicionar um valor em reais". Mostra o modal e seta idModal como o id do componente responsável pela ação
  startCreateEventHandler = (id) =>{
    this.setState({creating : true});
    const a = parseInt(id, 10);
    this.setState({idModal: (a)});
  }

  //função chamada quando o botão "Cancelar" do modal é clicado. Apenas fecha o modal
  stopCreateEventHandlerCancel = (event, id) =>{
    this.setState({creating : false});
  }

  //função chamada quando o usuário clica no botão "Confirmar". 
  //É realizada uma cópia do vetor valuesInserted e, nessa cópia, 
  //o valor inserido no input é passado para o vetor auxiliar "a" na 
  //posição referente ao id do componente que chamou a ação.
  //A flag "green" na posição do id do componente que chamou a ação é atualizada para true e os valores do state são atualizados
  stopCreateEventHandlerConfirm = (event, id) =>{
    let a = this.state.valuesInserted.slice(); //creates the clone of the state
    a[this.state.idModal].value = this.state.firstValue;
    if(a[this.state.idModal].value > 0) a[this.state.idModal].green = true;
    this.setState({valuesInserted: a});
    this.setState({creating : false});
  }

  //função para buscar no vetor valuesInserted o barWidth(referente ao valor inserido na ProgressBar) na posição do id do componente que chamou a ação
  findIdBarWidth = (props) => {
    let id = parseInt(props.id);
    let barWidth = this.state.valuesInserted.find(
      value => value.id === id-1
    );
    if(barWidth === undefined) return false; //se barWidth for undefined, ou seja, não possuir nenhum valor, retorna false
    return barWidth.value;
  }

  //tem a mesma utilidade da função acima, mas ao invés de barWidth busca pela flag "green" referente ao id do componente que chamou a ação
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
          {/* -------------------------------------------- SideBar --------------------------------------------*/}
         <Sidebar/>
         {/* -------------------------------------------- Modal --------------------------------------------*/}
         {this.state.creating && <div className="divModal"><header className='modalHeader'><h1>Inserir valor em reais para {this.state.items[this.state.idModal].employee_name}</h1></header>
                <section className='modalContent'>
                    <input type="text"  onChange={(event) => this.catchInfo(event)}></input>
                </section>
                <section className='modalActions'> 
                    <button className='btnModal' onClick={() => this.stopCreateEventHandlerCancel()}>Cancelar</button>
                    <button className='btnModal' onClick={() => this.stopCreateEventHandlerConfirm(this.state.idModal)}>Confirmar</button>
                </section>
              </div>}
              {/* -------------------------------------------- div principal --------------------------------------------*/}
         <div className='container' >
            <div className='row mt-5'>  
              <div className='col-md-12'>
              <h2 className='titulo'>Pessoas cadastradas e seus valores</h2>
                <div className='employees'>
                  {/* -------------------------------------------- instanciamento do componente Employee --------------------------------------------*/}
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
                              {/* -------------------------------------------- Indicação de inserção de valor --------------------------------------------*/}
                              <div class="row">
                                  <div className='col-4 offset-8'>
                                    {this.findId(item) ? //renderização condicional: se algum valor já tiver sido inserido na instância, será verde, se não, será vermelho
                                      ( <div class='employeeHeaderWithValue'></div> ) 
                                      : ( <div class='employeeHeaderWithoutValue'></div> )
                                    }
                                  </div>
                              </div>
                              {/*Exibição das informações da pessoa*/}
                              <h6>Id:{item.id}  Salário: <NumberFormat thousandSeparator={true} prefix={'R$'} value={item.employee_salary} style={{border:'none', background:'#91a2eb', color:'#FFFFFF', width:'9%'}}/>    Idade: {item.employee_age}</h6>                            
                              {/*Botão para abrir o modal de inserção de valor*/}                
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
