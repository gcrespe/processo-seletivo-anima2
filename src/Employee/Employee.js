import React from 'react'
import './Employee.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar'

const Employee = (props) => {
    let aux = props.barWidth;  
    return(
        <div>
            <div className='employeeWrapper'>
                <h3 className='employeeName'>{props.name}</h3>
                <p className='employeeInfo'>{props.children}</p>
                <p className='additionalInfo'>Ao clicar no botão acima, uma caixa de diálogo se abrirá perguntando quantos reais você deseja adicionar à barra de progresso. A barra deve começar em R$0 e vai até R$200. Ao adicionar um valor, o retângulo na parte direita superior ficará verde, enquanto não o fizer, ficará vermelho.</p>
                <p className='maxValue'>Max: R$200</p>
                {props.green ? 
                ( <ProgressBar animated now={props.barWidth/2} label={`R$${props.barWidth}`} /> ) 
                : ( <ProgressBar animated now={0} /> )
                }
            </div>
        </div>
    )
}

export default Employee